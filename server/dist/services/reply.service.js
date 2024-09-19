"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfReplyExsists = exports.dislikeReply = exports.likeReply = exports.deleteReply = exports.createReply = exports.getReplies = void 0;
const Reply_1 = __importDefault(require("./../models/Reply"));
const Comment_1 = __importDefault(require("./../models/Comment"));
const Post_1 = __importDefault(require("./../models/Post"));
const User_1 = __importDefault(require("../models/User"));
const notification_service_1 = require("./notification.service");
const getReplies = (commentId) => __awaiter(void 0, void 0, void 0, function* () { return Reply_1.default.find({ commentId: commentId }).populate("creator", "_id username profilePicture"); });
exports.getReplies = getReplies;
const createReply = (data, postId, commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const createdReply = yield Reply_1.default.create(Object.assign(Object.assign({}, data), { postId: postId, commentId: commentId, creator: userId }));
    yield Comment_1.default.findOneAndUpdate({ _id: commentId }, { $push: { replies: createdReply._id } });
    // Create notification
    const comment = yield Comment_1.default.findById(commentId);
    const user = yield User_1.default.findById(userId);
    if (((_a = comment === null || comment === void 0 ? void 0 : comment.creator) === null || _a === void 0 ? void 0 : _a.toString()) != ((_b = user === null || user === void 0 ? void 0 : user._id) === null || _b === void 0 ? void 0 : _b.toString())) {
        yield (0, notification_service_1.createNotification)(comment === null || comment === void 0 ? void 0 : comment.creator, {
            type: "reply",
            actorId: userId,
            targetId: postId,
            message: `has replied to your comment`,
            isRead: false
        });
    }
    return createdReply;
});
exports.createReply = createReply;
const deleteReply = (postId, replyId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield isReplyOwner(postId, replyId, userId))) {
        throw new Error("You are unauthorized to delete this reply");
    }
    yield Reply_1.default.findByIdAndDelete(replyId);
    // Delete comment relation
    yield Comment_1.default.findOneAndUpdate({ replies: replyId }, { $pull: { replies: replyId } });
    // TODO: Delete notification 
});
exports.deleteReply = deleteReply;
const likeReply = (replyId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield hasLikedReply(replyId, userId)) {
        throw new Error("You have already liked this reply");
    }
    yield Reply_1.default.findByIdAndUpdate(replyId, {
        $push: { likedBy: userId },
    });
});
exports.likeReply = likeReply;
const dislikeReply = (replyId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield hasLikedReply(replyId, userId))) {
        throw new Error("You haven't liked this reply");
    }
    yield Reply_1.default.findByIdAndUpdate(replyId, {
        $pull: { likedBy: userId },
    });
});
exports.dislikeReply = dislikeReply;
const isReplyOwner = (postId, replyId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reply = yield Reply_1.default.findById(replyId);
    const post = yield Post_1.default.findById(postId);
    if ((reply === null || reply === void 0 ? void 0 : reply.creator) != userId && (post === null || post === void 0 ? void 0 : post.creator) != userId)
        return false;
    if ((reply === null || reply === void 0 ? void 0 : reply.creator) == userId && (post === null || post === void 0 ? void 0 : post.creator) != userId)
        return true;
    if ((reply === null || reply === void 0 ? void 0 : reply.creator) != userId && (post === null || post === void 0 ? void 0 : post.creator) == userId)
        return true;
    return true;
});
const hasLikedReply = (replyId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reply = yield Reply_1.default.findById(replyId);
    if (reply === null || reply === void 0 ? void 0 : reply.likedBy.includes(userId))
        return true;
    return false;
});
const checkIfReplyExsists = (replyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reply = yield Reply_1.default.findById(replyId);
        if (!reply)
            return false;
        return true;
    }
    catch (_a) {
        return false;
    }
});
exports.checkIfReplyExsists = checkIfReplyExsists;
