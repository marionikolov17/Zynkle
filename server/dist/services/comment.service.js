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
exports.checkIfCommentExsists = exports.dislikeComment = exports.likeComment = exports.deleteComment = exports.createComment = exports.getComments = void 0;
const Comment_1 = __importDefault(require("./../models/Comment"));
const Post_1 = __importDefault(require("./../models/Post"));
const Reply_1 = __importDefault(require("./../models/Reply"));
const notification_service_1 = require("./notification.service");
const User_1 = __importDefault(require("../models/User"));
const getComments = (postId) => __awaiter(void 0, void 0, void 0, function* () { return Comment_1.default.find({ postId: postId }).populate("creator", "_id username profilePicture"); });
exports.getComments = getComments;
const createComment = (data, postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const createdComment = yield Comment_1.default.create(Object.assign(Object.assign({}, data), { postId: postId, creator: userId }));
    yield Post_1.default.findOneAndUpdate({ _id: postId }, { $push: { comments: createdComment._id } });
    // Create notification
    const post = yield Post_1.default.findById(postId);
    const user = yield User_1.default.findById(userId);
    // Prevent against same user
    if (((_a = post === null || post === void 0 ? void 0 : post.creator) === null || _a === void 0 ? void 0 : _a.toString()) !== ((_b = user === null || user === void 0 ? void 0 : user._id) === null || _b === void 0 ? void 0 : _b.toString())) {
        yield (0, notification_service_1.createNotification)(post === null || post === void 0 ? void 0 : post.creator, {
            type: "comment",
            actorId: userId,
            targetId: post === null || post === void 0 ? void 0 : post._id,
            message: `has commented your post`,
            isRead: false
        });
    }
    return createdComment;
});
exports.createComment = createComment;
const deleteComment = (postId, commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield isCommentOwner(postId, commentId, userId))) {
        throw new Error("You are unauthorized to delete this comment");
    }
    yield Comment_1.default.findByIdAndDelete(commentId);
    // Delete all related replies
    yield Reply_1.default.deleteMany({ commentId: commentId });
    // Delete records from post
    yield Post_1.default.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
    // Delete notification
    const post = yield Post_1.default.findById(postId);
    yield (0, notification_service_1.deleteNotification)(post === null || post === void 0 ? void 0 : post.creator, userId, postId, "comment");
});
exports.deleteComment = deleteComment;
const likeComment = (commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield hasLikedComment(commentId, userId)) {
        throw new Error("You have already liked this comment");
    }
    yield Comment_1.default.findByIdAndUpdate(commentId, {
        $push: { likedBy: userId },
    });
});
exports.likeComment = likeComment;
const dislikeComment = (commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield hasLikedComment(commentId, userId))) {
        throw new Error("You haven't liked this comment");
    }
    yield Comment_1.default.findByIdAndUpdate(commentId, {
        $pull: { likedBy: userId },
    });
});
exports.dislikeComment = dislikeComment;
const isCommentOwner = (postId, commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield Comment_1.default.findById(commentId);
    const post = yield Post_1.default.findById(postId);
    if ((comment === null || comment === void 0 ? void 0 : comment.creator) != userId && (post === null || post === void 0 ? void 0 : post.creator) != userId)
        return false;
    if ((comment === null || comment === void 0 ? void 0 : comment.creator) == userId && (post === null || post === void 0 ? void 0 : post.creator) != userId)
        return true;
    if ((comment === null || comment === void 0 ? void 0 : comment.creator) != userId && (post === null || post === void 0 ? void 0 : post.creator) == userId)
        return true;
    return true;
});
const hasLikedComment = (commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield Comment_1.default.findById(commentId);
    if (comment === null || comment === void 0 ? void 0 : comment.likedBy.includes(userId))
        return true;
    return false;
});
const checkIfCommentExsists = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield Comment_1.default.findById(commentId);
        if (!comment)
            return false;
        return true;
    }
    catch (_a) {
        return false;
    }
});
exports.checkIfCommentExsists = checkIfCommentExsists;
