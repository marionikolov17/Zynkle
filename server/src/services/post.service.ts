import { Types } from "mongoose";
import postModel from "./../models/Post";
import userModel from "./../models/User";
import commentModel from "./../models/Comment";
import replyModel from "./../models/Reply";

import { uploadFileToCloud } from "./../utils/storage-upload";

export const getPosts = async () => postModel.find().populate("creator");

export const getPost = async (postId: Types.ObjectId) =>
  (await postModel.findById(postId)).populate("creator"); // Must populate comments

export const createPost = async (
  data: Record<string, any>,
  userId: Types.ObjectId,
  file: Express.Multer.File
) => {
  if (!file) {
    throw new Error("You must upload post picture");
  }

  const imageUri = await uploadFileToCloud(file);

  const createdPost = await postModel.create({
    ...data,
    creator: userId,
    imageUri: imageUri,
  });

  await userModel.findOneAndUpdate(
    { _id: userId },
    { $push: { posts: createdPost._id } }
  );
};

export const deletePost = async (postId: Types.ObjectId, userId: Types.ObjectId) => {
    if(!(await isPostOwner(postId, userId))) {
        throw new Error("You are unauthorized to delete this post");
    }

    // Remove from saved for all the users that have saved it
   await userModel.updateMany({ savedPosts: postId }, { $pull: { savedPosts: postId } })

    // Delete all related comments and replies
    await commentModel.deleteMany({ postId: postId });
    await replyModel.deleteMany({ postId: postId })

    await postModel.findOneAndDelete({ _id: postId });
    await userModel.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } });
};

const isPostOwner = async (
    postId: Types.ObjectId,
    userId: Types.ObjectId
): Promise<boolean> => {
    const post = await postModel.findById(postId);

    if (post.creator != userId) return false;

    return true;
}