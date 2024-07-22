import { Types } from "mongoose";
import commentModel from "./../models/Comment";
import postModel from "./../models/Post";

export const createComment = async (
  data: Record<string, any>,
  postId: Types.ObjectId,
  userId: Types.ObjectId
) => {
    const createdComment = await commentModel.create({ ...data, postId: postId, creator: userId });
    await postModel.findOneAndUpdate({ _id: postId }, { $push: { comments: createdComment._id } });
};

export const deleteComment = async (
    postId: Types.ObjectId,
    commentId: Types.ObjectId,
    userId: Types.ObjectId
) => {
    if(!(await isCommentOwner(postId, commentId, userId))) {
        throw new Error("You are unauthorized to delete this comment");
    }

    await commentModel.findByIdAndDelete(commentId);
}

const isCommentOwner = async (
    postId: Types.ObjectId,
    commentId: Types.ObjectId,
    userId: Types.ObjectId
): Promise<boolean> => {
    const comment = await commentModel.findById(commentId);
    const post = await postModel.findById(postId);

    if (comment.creator != userId || post.creator !== userId) return false;

    return true;
}