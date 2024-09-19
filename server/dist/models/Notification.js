"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
    },
    notifications: [
        {
            type: {
                type: String,
                required: true,
                enum: ["like", "follow", "comment", "reply"],
            },
            actorId: {
                type: mongoose_1.default.Types.ObjectId,
                ref: "User",
                required: true,
            },
            targetId: {
                type: mongoose_1.default.Types.ObjectId,
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            isRead: {
                type: Boolean,
                default: false,
            },
            createdAt: {
                type: Date,
                default: () => { return new Date(); }
            },
        },
    ],
});
const notificationModel = mongoose_1.default.model("Notification", notificationSchema);
exports.default = notificationModel;
