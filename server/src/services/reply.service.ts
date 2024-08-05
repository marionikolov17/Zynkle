import { Types } from "mongoose";
import replyModel from "./../models/Reply";
import commentModel from "./../models/Comment";
import postModel from "./../models/Post";

export const getReplies = async (
    commentId: Types.ObjectId
) => replyModel.find({ commentId: commentId }).populate("creator", "_id username profilePicture");

export const createReply = async (
  data: Record<string, any>,
  postId: Types.ObjectId,
  commentId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  const createdReply = await replyModel.create({
    ...data,
    postId: postId,
    commentId: commentId,
    creator: userId,
  });
  await commentModel.findOneAndUpdate(
    { _id: commentId },
    { $push: { replies: createdReply._id } }
  );

  return createdReply;
};

export const deleteReply = async (
  postId: Types.ObjectId,
  replyId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  if (!(await isReplyOwner(postId, replyId, userId))) {
    throw new Error("You are unauthorized to delete this reply");
  }

  await replyModel.findByIdAndDelete(replyId);
  // Delete comment relation
  await commentModel.findOneAndUpdate(
    { replies: replyId },
    { $pull: { replies: replyId } }
  );
};

export const likeReply = async (
  replyId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  if (await hasLikedReply(replyId, userId)) {
    throw new Error("You have already liked this reply");
  }

  await replyModel.findByIdAndUpdate(replyId, {
    $push: { likedBy: userId },
  });
};

export const dislikeReply = async (
  replyId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  if (!(await hasLikedReply(replyId, userId))) {
    throw new Error("You haven't liked this reply");
  }

  await replyModel.findByIdAndUpdate(replyId, {
    $pull: { likedBy: userId },
  });
};

const isReplyOwner = async (
  postId: Types.ObjectId,
  replyId: Types.ObjectId,
  userId: Types.ObjectId
): Promise<boolean> => {
  const reply = await replyModel.findById(replyId);
  const post = await postModel.findById(postId);

  if (reply?.creator != userId && post?.creator != userId) return false;
  if (reply?.creator == userId && post?.creator != userId) return true;
  if (reply?.creator != userId && post?.creator == userId) return true;

  return true;
};

const hasLikedReply = async (
  replyId: Types.ObjectId,
  userId: Types.ObjectId
): Promise<boolean> => {
  const reply = await replyModel.findById(replyId);

  if (reply?.likedBy.includes(userId as any)) return true;

  return false;
};

export const checkIfReplyExsists = async (
  replyId: Types.ObjectId
): Promise<boolean> => {
  try {
    const reply = await replyModel.findById(replyId);

    if (!reply) return false;

    return true;
  } catch {
    return false;
  }
};
