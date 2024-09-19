import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  notifications: [
    {
      type: {
        type: String,
        required: true,
        enum: ["like", "follow", "comment", "reply"],
      },
      actorId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      targetId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

const notificationModel = mongoose.model("Notification", notificationSchema);
export default notificationModel;