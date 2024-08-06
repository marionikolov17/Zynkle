"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    postId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Post"
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
    replies: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "Reply"
        }
    ],
    createdAt: {
        type: Date,
        default: new Date()
    }
});
const commentModel = mongoose_1.default.model("Comment", commentSchema);
exports.default = commentModel;
