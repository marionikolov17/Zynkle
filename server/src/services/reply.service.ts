import { Types } from "mongoose";
import replyModel from "./../models/Reply";
import commentModel from "./../models/Comment";
import postModel from "./../models/Post";

export const createReply = async (
    data: Record<string, any>,
    postId: Types.ObjectId,
    commentId: Types.ObjectId,
    userId: Types.ObjectId
) => {
    const createdReply = await replyModel.create({...data, postId: postId, commentId: commentId, creator: userId});
    await commentModel.findOneAndUpdate({ _id: commentId }, { $push: { replies: createdReply._id } });
}

export const deleteReply = async (
    postId: Types.ObjectId,
    replyId: Types.ObjectId,
    userId: Types.ObjectId
) => {
    if(!(await isReplyOwner(postId, replyId, userId))) {
        throw new Error("You are unauthorized to delete this reply");
    }

    await replyModel.findByIdAndDelete(replyId);
}

const isReplyOwner = async (
    postId: Types.ObjectId,
    replyId: Types.ObjectId,
    userId: Types.ObjectId
): Promise<boolean> => {
    const reply = await replyModel.findById(replyId);
    const post = await postModel.findById(postId);

    if (reply.creator != userId || post.creator !== userId) return false;

    return true;
}