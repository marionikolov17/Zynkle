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
exports.checkUserId = exports.unfollowUser = exports.followUser = exports.updateUser = exports.searchUsers = exports.getTopCreators = exports.getUser = exports.getCurrentUser = void 0;
const User_1 = __importDefault(require("./../models/User"));
const storage_upload_1 = require("./../utils/storage-upload");
const getCurrentUser = (userId) => __awaiter(void 0, void 0, void 0, function* () { return User_1.default.findById(userId, { password: 0 }); });
exports.getCurrentUser = getCurrentUser;
const getUser = (userId, currentUserId) => __awaiter(void 0, void 0, void 0, function* () {
    let excludeObject = { password: 0 };
    if (currentUserId != userId) {
        excludeObject["savedPosts"] = 0;
    }
    return User_1.default
        .findById(userId, excludeObject)
        .populate("posts", "_id imageUri")
        .populate("savedPosts", "_id imageUri");
}); // Must populate
exports.getUser = getUser;
const getTopCreators = () => __awaiter(void 0, void 0, void 0, function* () {
    return User_1.default.find({}, { password: 0 }).sort({ "followers": -1 }).limit(5);
});
exports.getTopCreators = getTopCreators;
const searchUsers = (query) => __awaiter(void 0, void 0, void 0, function* () { return User_1.default.find({ username: { $regex: query } }, { password: 0 }); });
exports.searchUsers = searchUsers;
const updateUser = (data, userId, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        yield User_1.default.findOneAndUpdate({ _id: userId }, data);
        return;
    }
    const profilePictureUrl = yield (0, storage_upload_1.uploadFileToCloud)(file);
    yield User_1.default.findOneAndUpdate({ _id: userId }, Object.assign(Object.assign({}, data), { profilePicture: profilePictureUrl }));
});
exports.updateUser = updateUser;
const followUser = (currentUserId, followedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    if (currentUserId === followedUserId) {
        throw new Error("Same user can't follow himself");
    }
    if (yield isFollowedAlready(currentUserId, followedUserId)) {
        throw new Error("You are already following this user");
    }
    yield User_1.default.findOneAndUpdate({ _id: followedUserId }, { $push: { followers: currentUserId } });
    yield User_1.default.findOneAndUpdate({ _id: currentUserId }, { $push: { follows: followedUserId } });
});
exports.followUser = followUser;
const unfollowUser = (currentUserId, unfollowedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    if (currentUserId === unfollowedUserId) {
        throw new Error("Same user can't unfollow himself");
    }
    if (!(yield isFollowedAlready(currentUserId, unfollowedUserId))) {
        throw new Error("You are not following this user");
    }
    yield User_1.default.findOneAndUpdate({ _id: unfollowedUserId }, { $pull: { followers: currentUserId } });
    yield User_1.default.findOneAndUpdate({ _id: currentUserId }, { $pull: { follows: unfollowedUserId } });
});
exports.unfollowUser = unfollowUser;
const isFollowedAlready = (currentUserId, relatedUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const relatedUser = yield User_1.default.findById(relatedUserId);
    if (relatedUser.followers.includes(currentUserId)) {
        return true;
    }
    return false;
});
const checkUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(userId);
        if (!user)
            return false;
        return true;
    }
    catch (_a) {
        return false;
    }
});
exports.checkUserId = checkUserId;
//# sourceMappingURL=user.service.js.map