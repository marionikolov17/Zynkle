import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
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
        default: Date.now()
    }
});

const replyModel = mongoose.model("Reply", replySchema);
export default replyModel;