import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "Post"
    },
    commentId: {
        type: mongoose.Types.ObjectId,
        ref: "Comment"
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    },
    likedBy: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

const replyModel = mongoose.model("Reply", replySchema);
export default replyModel;