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
  scale: {
    type: Number,
    default: 1.0
  },
  translateX: {
    type: Number,
    default: 0
  },
  translateY: {
    type: Number,
    default: 0
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
    default: () => { return new Date() }
  },
});

const postModel = mongoose.model("Post", postSchema);
export default postModel;
