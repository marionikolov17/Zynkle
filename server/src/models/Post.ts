import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Types.ObjectId,
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
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  savedBy: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const postModel = mongoose.model("Post", postSchema);
export default postModel;
