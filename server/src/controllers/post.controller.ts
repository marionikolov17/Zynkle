import express from "express";

import * as postService from "./../services/post.service";

import RESPONSE_STATUS from "./../constants/response-statuses.constants";
import PATH from "./../constants/path.constants";
import upload from "./../config/file-upload.config";

import { isAuth } from "./../middlewares/auth.middleware";
import { fileTypeValidationMiddleware } from "./../middlewares/validation.middleware";
import { tryCatch } from "./../utils/tryCatch";
import { checkPostId } from "./../middlewares/params.middleware";

const router = express.Router();

router.param("postId", checkPostId);

router.get(
  PATH.POSTS.GET_POSTS,
  tryCatch(async (req: express.Request, res: express.Response) => {
    const posts = await postService.getPosts(Number(req.query.page) as number || 0);

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: posts
    })
  })
)

router.post(
  PATH.POSTS.CREATE_POST,
  isAuth,
  upload.single("imageUri"),
  fileTypeValidationMiddleware,
  tryCatch(async (req: any, res: express.Response) => {
    await postService.createPost(req.body, req.user._id as any, req.file);

    res.status(201).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        message: "Successfully created post",
      },
    });
  })
);

router.get(
  PATH.POSTS.GET_POST,
  tryCatch(async (req: express.Request, res: express.Response) => {
    const post = await postService.getPost(req.params.postId as any);

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: post
    })
  })
)

router.delete(
  PATH.POSTS.DELETE_POST,
  isAuth,
  tryCatch(async (req: any, res: express.Response) => {
    await postService.deletePost(req.params.postId, req.user._id);

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        message: "Successfully deleted post",
      },
    });
  })
);

router.put(
  PATH.POSTS.LIKE_POST,
  isAuth,
  tryCatch(async (req: any, res: express.Response) => {
    await postService.likePost(req.params.postId, req.user._id);

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        message: "Successfully liked post",
      },
    });
  })
)

router.put(
  PATH.POSTS.DISLIKE_POST,
  isAuth,
  tryCatch(async (req: any, res: express.Response) => {
    await postService.dislikePost(req.params.postId, req.user._id);

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        message: "Successfully disliked post",
      },
    });
  })
)

router.put(
  PATH.POSTS.SAVE_POST,
  isAuth,
  tryCatch(async (req: any, res: express.Response) => {
    await postService.savePost(req.params.postId, req.user._id);

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        message: "Successfully saved post",
      },
    });
  })
)

router.put(
  PATH.POSTS.UNSAVE_POST,
  isAuth,
  tryCatch(async (req: any, res: express.Response) => {
    await postService.unsavePost(req.params.postId, req.user._id);

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        message: "Successfully unsaved post",
      },
    });
  })
)

export default router;