"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    creator: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
    },
    description: {
        type: String,
    },
    imageUri: {
        type: String,
        required: true,
    },
    likedBy: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "User",
        },
    ],
    savedBy: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "Comment",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const postModel = mongoose_1.default.model("Post", postSchema);
exports.default = postModel;
