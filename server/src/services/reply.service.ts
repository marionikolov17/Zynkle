import { Types } from "mongoose";
import replyModel from "./../models/Reply";
import commentModel from "./../models/Comment";

export const createReply = async (
    data: Record<string, any>,
    commentId: Types.ObjectId,
    userId: Types.ObjectId
) => {
    const createdReply = await replyModel.create({...data, commentId: commentId, creator: userId});
    await commentModel.findOneAndUpdate({ _id: commentId }, { $push: { replies: createdReply._id } });
}