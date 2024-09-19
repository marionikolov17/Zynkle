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
exports.checkIfPostExsists = exports.unsavePost = exports.savePost = exports.dislikePost = exports.likePost = exports.deletePost = exports.createPost = exports.getPost = exports.getPosts = void 0;
const Post_1 = __importDefault(require("./../models/Post"));
const User_1 = __importDefault(require("./../models/User"));
const Comment_1 = __importDefault(require("./../models/Comment"));
const Reply_1 = __importDefault(require("./../models/Reply"));
const storage_upload_1 = require("./../utils/storage-upload");
const notification_service_1 = require("./notification.service");
const getPosts = (pageNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const postsPerPage = 3;
    return Post_1.default.find()
        .populate("creator", "_id username profilePicture")
        .sort({ "likedBy": -1 })
        .limit(postsPerPage)
        .skip(postsPerPage * pageNumber);
});
exports.getPosts = getPosts;
const getPost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Post_1.default
        .findById(postId)
        .populate("creator", "_id username profilePicture");
});
exports.getPost = getPost;
const createPost = (data, userId, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new Error("You must upload post picture");
    }
    const imageUri = yield (0, storage_upload_1.uploadFileToCloud)(file);
    const createdPost = yield Post_1.default.create(Object.assign(Object.assign({}, data), { creator: userId, imageUri: imageUri }));
    yield User_1.default.findOneAndUpdate({ _id: userId }, { $push: { posts: createdPost._id } });
});
exports.createPost = createPost;
const deletePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield isPostOwner(postId, userId))) {
        throw new Error("You are unauthorized to delete this post");
    }
    // Remove from saved for all the users that have saved it
    yield User_1.default.updateMany({ savedPosts: postId }, { $pull: { savedPosts: postId } });
    // Delete all related comments and replies
    yield Comment_1.default.deleteMany({ postId: postId });
    yield Reply_1.default.deleteMany({ postId: postId });
    yield Post_1.default.findOneAndDelete({ _id: postId });
    yield User_1.default.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } });
});
exports.deletePost = deletePost;
const likePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (yield hasLikedPost(postId, userId)) {
        throw new Error("You have already liked this post");
    }
    yield Post_1.default.findByIdAndUpdate(postId, { $push: { likedBy: userId } });
    // Create notification
    const post = yield Post_1.default.findById(postId);
    const user = yield User_1.default.findById(userId);
    // Don't Create notification for same user
    if (((_a = post === null || post === void 0 ? void 0 : post.creator) === null || _a === void 0 ? void 0 : _a.toString()) == ((_b = user === null || user === void 0 ? void 0 : user._id) === null || _b === void 0 ? void 0 : _b.toString())) {
        return;
    }
    yield (0, notification_service_1.createNotification)(post === null || post === void 0 ? void 0 : post.creator, {
        type: "like",
        actorId: user === null || user === void 0 ? void 0 : user._id,
        targetId: post === null || post === void 0 ? void 0 : post._id,
        message: `has liked your post`,
        isRead: false
    });
});
exports.likePost = likePost;
const dislikePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield hasLikedPost(postId, userId))) {
        throw new Error("You haven't liked this post");
    }
    yield Post_1.default.findByIdAndUpdate(postId, { $pull: { likedBy: userId } });
    // Delete Like notification
    const post = yield Post_1.default.findById(postId);
    const user = yield User_1.default.findById(userId);
    yield (0, notification_service_1.deleteNotification)(post === null || post === void 0 ? void 0 : post.creator, user === null || user === void 0 ? void 0 : user._id, post === null || post === void 0 ? void 0 : post._id, "like");
});
exports.dislikePost = dislikePost;
const savePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield hasSavedPost(postId, userId)) {
        throw new Error("You have already saved this post");
    }
    yield Post_1.default.findByIdAndUpdate(postId, { $push: { savedBy: userId } });
    yield User_1.default.findByIdAndUpdate(userId, { $push: { savedPosts: postId } });
});
exports.savePost = savePost;
const unsavePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield hasSavedPost(postId, userId))) {
        throw new Error("You haven't saved this post");
    }
    yield Post_1.default.findByIdAndUpdate(postId, { $pull: { savedBy: userId } });
    yield User_1.default.findByIdAndUpdate(userId, { $pull: { savedPosts: postId } });
});
exports.unsavePost = unsavePost;
const isPostOwner = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post_1.default.findById(postId);
    if ((post === null || post === void 0 ? void 0 : post.creator) != userId)
        return false;
    return true;
});
const hasLikedPost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post_1.default.findById(postId);
    if (post === null || post === void 0 ? void 0 : post.likedBy.includes(userId))
        return true;
    return false;
});
const hasSavedPost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post_1.default.findById(postId);
    if (post === null || post === void 0 ? void 0 : post.savedBy.includes(userId))
        return true;
    return false;
});
const checkIfPostExsists = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(postId);
        if (!post)
            return false;
        return true;
    }
    catch (_a) {
        return false;
    }
});
exports.checkIfPostExsists = checkIfPostExsists;
