import { Types } from "mongoose";
import userModel from "./../models/User";
import { uploadFileToCloud } from "./../utils/storage-upload";

export const getUser = async (userId: Types.ObjectId) =>
  userModel.findById(userId, { password: 0 }).populate('posts', '_id imageUri').populate('savedPosts', '_id imageUri'); // Must populate 

export const getUsers = async () => {
    return userModel.find({}, { password: 0 });
};

export const searchUsers = async (query: string) => userModel.find({ username: { "$regex":  query} }, { password: 0 });

export const updateUser = async (
  data: Record<string, any>,
  userId: Types.ObjectId,
  file?: Express.Multer.File 
) => {
    if (!file) {
        await userModel.findOneAndUpdate({ _id: userId }, data);
        return;
    }
    const profilePictureUrl = await uploadFileToCloud(file);

    await userModel.findOneAndUpdate({ _id: userId }, { ...data, profilePicture: profilePictureUrl });
};

export const followUser = async (
  currentUserId: Types.ObjectId,
  followedUserId: Types.ObjectId
) => {
    if (currentUserId === followedUserId) {
        throw new Error("Same user can't follow himself");
    }

    if (await isFollowedAlready(currentUserId, followedUserId)) {
        throw new Error("You are already following this user");
    }

    await userModel.findOneAndUpdate({ _id: followedUserId }, { $push: { followers: currentUserId } });
    await userModel.findOneAndUpdate({ _id: currentUserId }, { $push: { follows: followedUserId } });
};

export const unfollowUser = async (
  currentUserId: Types.ObjectId,
  unfollowedUserId: Types.ObjectId
) => {
    if (currentUserId === unfollowedUserId) {
        throw new Error("Same user can't unfollow himself");
    }

    if (!(await isFollowedAlready(currentUserId, unfollowedUserId))) {
        throw new Error("You are not following this user");
    }

    await userModel.findOneAndUpdate({ _id: unfollowedUserId }, { $pull: { followers: currentUserId } });
    await userModel.findOneAndUpdate({ _id: currentUserId }, { $pull: { follows: unfollowedUserId } });
};

const isFollowedAlready = async (
  currentUserId: Types.ObjectId,
  relatedUserId: Types.ObjectId
): Promise<boolean> => {
    const relatedUser = await userModel.findById(relatedUserId);

    if (relatedUser.followers.includes(currentUserId as any)) {
        return true;
    }

    return false;
};
