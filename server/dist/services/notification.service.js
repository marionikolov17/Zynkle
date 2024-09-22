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
exports.checkForNotifications = exports.readNotifications = exports.deleteNotification = exports.createNotification = exports.getNotifications = void 0;
const Notification_1 = __importDefault(require("../models/Notification"));
const Post_1 = __importDefault(require("../models/Post"));
const getNotifications = (userId, type) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let results = yield Notification_1.default
        .findOne({ userId: userId })
        .populate("notifications.actorId", "_id username profilePicture")
        .populate({ path: "notifications.targetId", model: Post_1.default });
    // Sort notifications by latest
    let sortedNotifications = (_a = results === null || results === void 0 ? void 0 : results.notifications) === null || _a === void 0 ? void 0 : _a.sort((a, b) => b.createdAt - a.createdAt);
    results["notifications"] = sortedNotifications;
    // Filter notifications if type is not null
    let notifications = (_b = results === null || results === void 0 ? void 0 : results.notifications) === null || _b === void 0 ? void 0 : _b.filter((el) => el.type == type);
    if (type != "null" && type != null)
        results["notifications"] = notifications;
    return results;
});
exports.getNotifications = getNotifications;
const createNotification = (userId, notification) => __awaiter(void 0, void 0, void 0, function* () {
    const notificationObj = yield Notification_1.default.findOne({ userId: userId });
    if (!notificationObj) {
        return yield Notification_1.default.create({
            userId: userId,
            notifications: [notification],
        });
    }
    yield Notification_1.default.findOneAndUpdate({ userId: userId }, { $push: { notifications: notification } });
});
exports.createNotification = createNotification;
const deleteNotification = (userId, actorId, targetId, type) => __awaiter(void 0, void 0, void 0, function* () {
    yield Notification_1.default.findOneAndUpdate({ userId: userId }, {
        $pull: {
            notifications: { actorId: actorId, targetId: targetId, type: type },
        },
    });
});
exports.deleteNotification = deleteNotification;
const readNotifications = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield Notification_1.default.findOneAndUpdate({ userId: userId }, { $set: { "notifications.$[].isRead": true } });
});
exports.readNotifications = readNotifications;
const checkForNotifications = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const notifications = yield Notification_1.default.findOne({
        userId: userId,
        "notifications.isRead": false,
    });
    if (!notifications)
        return false;
    return true;
});
exports.checkForNotifications = checkForNotifications;
