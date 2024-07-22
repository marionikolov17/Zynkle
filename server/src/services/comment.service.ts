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
