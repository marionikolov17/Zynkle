"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const replySchema = new mongoose_1.default.Schema({
    postId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Post"
    },
    commentId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Comment"
    },
    creator: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    },
    likedBy: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "User"
        }
    ],
    createdAt: {
        type: Date,
        default: () => { return new Date(); }
    }
});
const replyModel = mongoose_1.default.model("Reply", replySchema);
exports.default = replyModel;
