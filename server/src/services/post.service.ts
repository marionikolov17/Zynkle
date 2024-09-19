import { Types } from "mongoose";
import postModel from "./../models/Post";
import userModel from "./../models/User";
import commentModel from "./../models/Comment";
import replyModel from "./../models/Reply";

import { uploadFileToCloud } from "./../utils/storage-upload";
import { createNotification } from "./notification.service";

export const getPosts = async (pageNumber: number) => {
  const postsPerPage = 3;

  return postModel.find()
                  .populate("creator", "_id username profilePicture")
                  .sort({ "likedBy": -1 })
                  .limit(postsPerPage)
                  .skip(postsPerPage * pageNumber);
}

export const getPost = async (postId: Types.ObjectId) =>
  await postModel
    .findById(postId)
    .populate("creator", "_id username profilePicture")

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

export const deletePost = async (
  postId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  if (!(await isPostOwner(postId, userId))) {
    throw new Error("You are unauthorized to delete this post");
  }

  // Remove from saved for all the users that have saved it
  await userModel.updateMany(
    { savedPosts: postId },
    { $pull: { savedPosts: postId } }
  );

  // Delete all related comments and replies
  await commentModel.deleteMany({ postId: postId });
  await replyModel.deleteMany({ postId: postId });

  await postModel.findOneAndDelete({ _id: postId });
  await userModel.findOneAndUpdate(
    { _id: userId },
    { $pull: { posts: postId } }
  );
};

export const likePost = async (
  postId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  if (await hasLikedPost(postId, userId)) {
    throw new Error("You have already liked this post");
  }

  await postModel.findByIdAndUpdate(postId, { $push: { likedBy: userId } });

  // Create notification
  const post = await postModel.findById(postId);
  const user = await userModel.findById(userId);

  // Don't Create notification for same user
  if (post?.creator == user?._id) {
    return;
  }

  await createNotification(userId, {
    type: "like",
    actorId: post?.creator,
    targetId: post?._id,
    message: `${user?.username} has liked your post`,
    isRead: false
  })
};

export const dislikePost = async (
  postId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  if (!(await hasLikedPost(postId, userId))) {
    throw new Error("You haven't liked this post");
  }

  await postModel.findByIdAndUpdate(postId, { $pull: { likedBy: userId } });
};

export const savePost = async (
  postId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  if (await hasSavedPost(postId, userId)) {
    throw new Error("You have already saved this post");
  }

  await postModel.findByIdAndUpdate(postId, { $push: { savedBy: userId } });
  await userModel.findByIdAndUpdate(userId, { $push: { savedPosts: postId } });
};

export const unsavePost = async (
  postId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  if (!(await hasSavedPost(postId, userId))) {
    throw new Error("You haven't saved this post");
  }

  await postModel.findByIdAndUpdate(postId, { $pull: { savedBy: userId } });
  await userModel.findByIdAndUpdate(userId, { $pull: { savedPosts: postId } });
};

const isPostOwner = async (
  postId: Types.ObjectId,
  userId: Types.ObjectId
): Promise<boolean> => {
  const post = await postModel.findById(postId);

  if (post?.creator != userId) return false;

  return true;
};

const hasLikedPost = async (
  postId: Types.ObjectId,
  userId: Types.ObjectId
): Promise<boolean> => {
  const post = await postModel.findById(postId);

  if (post?.likedBy.includes(userId as any)) return true;

  return false;
};

const hasSavedPost = async (postId: Types.ObjectId, userId: Types.ObjectId) => {
  const post = await postModel.findById(postId);

  if (post?.savedBy.includes(userId as any)) return true;

  return false;
};

export const checkIfPostExsists = async (
  postId: Types.ObjectId
): Promise<boolean> => {
  try {
    const post = await postModel.findById(postId);

    if (!post) return false;

    return true;
  } catch {
    return false;
  }
};
