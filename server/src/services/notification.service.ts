import { Types } from "mongoose";
import notificationModel from "../models/Notification";
import postModel from "../models/Post";

export const getNotifications = async (userId: Types.ObjectId) => {
  return await notificationModel
    .findOne({ userId: userId })
    .populate("notifications.actorId", "_id username profilePicture")
    .populate({ path: "notifications.targetId", model: postModel});
};

export const createNotification = async (
  userId: Types.ObjectId,
  notification: Record<string, any>
) => {
  const notificationObj = await notificationModel.findOne({ userId: userId });

  if (!notificationObj) {
    return await notificationModel.create({
      userId: userId,
      notifications: [notification],
    });
  }

  await notificationModel.findOneAndUpdate(
    { userId: userId },
    { $push: { notifications: notification } }
  );
};

export const deleteNotification = async (
  userId: Types.ObjectId,
  actorId: Types.ObjectId,
  targetId: Types.ObjectId,
  type: string
) => {
  await notificationModel.findOneAndUpdate(
    { userId: userId },
    {
      $pull: {
        notifications: { actorId: actorId, targetId: targetId, type: type },
      },
    }
  );
};

export const readNotifications = async (userId: Types.ObjectId) => {
  await notificationModel.findOneAndUpdate(
    { userId: userId },
    { $set: { "notifications.$[].isRead": true } }
  );
};

export const checkForNotifications = async (userId: Types.ObjectId) => {
    const notifications = await notificationModel.findOne({ userId: userId, "notifications.isRead": false })

    if (!notifications) return false;

    return true;
};
