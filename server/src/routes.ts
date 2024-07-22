import express from "express";
import userController from "./controllers/user.controller";
import postController from "./controllers/post.controller";
import commentController from "./controllers/comment.controller";

const router = express.Router();

router.use("/users", userController);
router.use("/posts", postController);
router.use("/comments", commentController);

export default router;