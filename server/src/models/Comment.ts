import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Types.ObjectId,
        ref: "Post"
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
    replies: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Reply"
        }
    ],
    createdAt: {
        type: Date,
        default: () => { return new Date() }
    }
});

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;