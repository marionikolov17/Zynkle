import { Types } from "mongoose";
import commentModel from "./../models/Comment";
import postModel from "./../models/Post";
import replyModel from "./../models/Reply";

export const getComments = async (
    postId: Types.ObjectId
) => commentModel.find({ postId: postId }).populate("creator", "_id username profilePicture");

export const createComment = async (
  data: Record<string, any>,
  postId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  const createdComment = await commentModel.create({
    ...data,
    postId: postId,
    creator: userId,
  });
  await postModel.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: createdComment._id } }
  );

  return createdComment;
};

export const deleteComment = async (
  postId: Types.ObjectId,
  commentId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  if (!(await isCommentOwner(postId, commentId, userId))) {
    throw new Error("You are unauthorized to delete this comment");
  }

  await commentModel.findByIdAndDelete(commentId);
  // Delete all related replies
  await replyModel.deleteMany({ commentId: commentId });
  // Delete records from post
  await postModel.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
};

export const likeComment = async (
  commentId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  if (await hasLikedComment(commentId, userId)) {
    throw new Error("You have already liked this comment");
  }

  await commentModel.findByIdAndUpdate(commentId, {
    $push: { likedBy: userId },
  });
};

export const dislikeComment = async (
  commentId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  if (!(await hasLikedComment(commentId, userId))) {
    throw new Error("You haven't liked this comment");
  }

  await commentModel.findByIdAndUpdate(commentId, {
    $pull: { likedBy: userId },
  });
};

const isCommentOwner = async (
  postId: Types.ObjectId,
  commentId: Types.ObjectId,
  userId: Types.ObjectId
): Promise<boolean> => {
  const comment = await commentModel.findById(commentId);
  const post = await postModel.findById(postId);

  if (comment?.creator != userId && post?.creator != userId) return false;
  if (comment?.creator == userId && post?.creator != userId) return true;
  if (comment?.creator != userId && post?.creator == userId) return true;

  return true;
};

const hasLikedComment = async (
  commentId: Types.ObjectId,
  userId: Types.ObjectId
): Promise<boolean> => {
  const comment = await commentModel.findById(commentId);

  if (comment?.likedBy.includes(userId as any)) return true;

  return false;
};

export const checkIfCommentExsists = async (
  commentId: Types.ObjectId
): Promise<boolean> => {
  try {
    const comment = await commentModel.findById(commentId);

    if (!comment) return false;

    return true;
  } catch {
    return false;
  }
};
