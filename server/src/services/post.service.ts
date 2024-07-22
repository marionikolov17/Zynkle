import { Types } from "mongoose";
import postModel from "./../models/Post";

export const createPost = async (
  data: Record<string, any>,
  userId: Types.ObjectId,
  file: Express.Multer.File
) => {
    
};
