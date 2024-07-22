import express from "express";
import userController from "./controllers/user.controller";
import postController from "./controllers/post.controller";

const router = express.Router();

router.use("/users", userController);
router.use("/posts", postController);

export default router;