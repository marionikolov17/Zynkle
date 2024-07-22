import { Types } from "mongoose";
import postModel from "./../models/Post";
import userModel from "./../models/User";

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
    const post = await getPost(postId);

    // Remove from saved for all the users that has saved it
    for (let savedUserId of post.savedBy) {
        await userModel.findOneAndUpdate({ _id: savedUserId }, { $pull: { savedPosts: postId } });
    }

    // Must delete all related comments and replies

    await postModel.findOneAndDelete({ _id: postId });
    await userModel.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } });
};
