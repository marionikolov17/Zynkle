import { Types } from "mongoose";
import postModel from "./../models/Post";
import userModel from "./../models/User";

import { uploadFileToCloud } from "./../utils/storage-upload";

export const createPost = async (
  data: Record<string, any>,
  userId: Types.ObjectId,
  file: Express.Multer.File
) => {
    const imageUri = await uploadFileToCloud(file);

    const createdPost = await postModel.create({ ...data, creator: userId, imageUri: imageUri });

    await userModel.findOneAndUpdate({ _id: userId }, { posts: { $push: createdPost._id } });
};
