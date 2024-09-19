import express from "express";
import userController from "./controllers/user.controller";
import postController from "./controllers/post.controller";
import commentController from "./controllers/comment.controller";
import replyController from "./controllers/reply.controller";
import notificationController from "./controllers/notification.controller";

const router = express.Router();

router.use("/users", userController);
router.use("/posts", postController);
router.use("/comments", commentController);
router.use("/replies", replyController);
router.use("/notifications", notificationController)

export default router;