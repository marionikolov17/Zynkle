import { Types } from "mongoose";
import userModel from "./../models/User";

export const getUser = async (userId: Types.ObjectId) =>
  userModel.findById(userId);

export const getUsers = async () => userModel.find();

export const updateUser = async (
  data: Record<string, any>,
  userId: Types.ObjectId,
  file: Express.Multer.File | { [fieldname: string]: Express.Multer.File }
) => {};

export const followUser = async (
  currentUserId: Types.ObjectId,
  followedUserId: Types.ObjectId
) => {};

export const unfollowUser = async (
  currentUserId: Types.ObjectId,
  unfollowedUserId: Types.ObjectId
) => {};

const isFollowedAlready = async (
  currentUserId: Types.ObjectId,
  followedUserId: Types.ObjectId
): Promise<boolean> => {
    return false;
};
