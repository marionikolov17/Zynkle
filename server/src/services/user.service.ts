import { Types } from "mongoose";
import userModel from "./../models/User";
import { uploadFileToCloud } from "./../utils/storage-upload";
import { createNotification, deleteNotification } from "./notification.service";

export const getCurrentUser = async (userId: Types.ObjectId) =>
  userModel.findById(userId, { password: 0 });

export const getUser = async (
  userId: Types.ObjectId,
  currentUserId?: Types.ObjectId
) => {
  let excludeObject: Record<string, any> = { password: 0 };
  if (currentUserId != userId) {
    excludeObject["savedPosts"] = 0;
  }
  return userModel
    .findById(userId, excludeObject)
    .populate("posts", "_id imageUri")
    .populate("savedPosts", "_id imageUri");
}; // Must populate

export const getTopCreators = async () => {
  return userModel.find({}, { password: 0 }).sort({ "followers": -1 }).limit(5);
};

export const searchUsers = async (query: string) => {
  let users = await userModel.find({}, { password: 0 });

  users = users.filter((user: any) => {
    let fullName: string = user?.firstName + " " + user?.lastName;
    if (user?.username?.toLowerCase()?.includes(query.toLowerCase()) || fullName.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }

    return false;
  });

  return users;
}

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

  await userModel.findOneAndUpdate(
    { _id: userId },
    { ...data, profilePicture: profilePictureUrl }
  );
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

  await userModel.findOneAndUpdate(
    { _id: followedUserId },
    { $push: { followers: currentUserId } }
  );
  await userModel.findOneAndUpdate(
    { _id: currentUserId },
    { $push: { follows: followedUserId } }
  );

  // Create notification
  const followerUser = await userModel.findById(currentUserId);

  await createNotification(followedUserId, {
    type: "follow",
    actorId: followerUser?._id,
    targetId: followerUser?._id,
    message: `${followerUser?.username} has followed you`,
    isRead: false
  })
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

  await userModel.findOneAndUpdate(
    { _id: unfollowedUserId },
    { $pull: { followers: currentUserId } }
  );
  await userModel.findOneAndUpdate(
    { _id: currentUserId },
    { $pull: { follows: unfollowedUserId } }
  );

  // Delete notification
  await deleteNotification(unfollowedUserId, currentUserId, currentUserId, "follow");
};

const isFollowedAlready = async (
  currentUserId: Types.ObjectId,
  relatedUserId: Types.ObjectId
): Promise<boolean> => {
  const relatedUser = await userModel.findById(relatedUserId);

  if (relatedUser?.followers.includes(currentUserId as any)) {
    return true;
  }

  return false;
};

export const checkUserId = async (userId: any): Promise<boolean> => {
  try {
    const user = await userModel.findById(userId);

    if (!user) return false;

    return true;
  } catch {
    return false;
  }
};
