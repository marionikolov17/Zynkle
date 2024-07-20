import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String,
        required: true
    },
    imageUri: {
        type: String,
        required: true
    },
    likedBy: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    savedBy: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    comments: [
        {
            comment: {
                type: mongoose.Types.ObjectId,
                ref: "Comment"
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const postModel = mongoose.model("Post", postSchema);
export default postModel;