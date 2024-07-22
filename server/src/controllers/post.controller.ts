import express from "express";

import * as postService from "./../services/post.service";

import RESPONSE_STATUS from "./../constants/response-statuses.constants";
import PATH from "./../constants/path.constants";
import upload from "./../config/file-upload.config";

import { isAuth } from "./../middlewares/auth.middleware";
import { fileTypeValidationMiddleware, inputValidationMiddleware } from "./../middlewares/validation.middleware";
import { tryCatch } from "./../utils/tryCatch";
import { createPostValidators } from "./../validators/post.validator";

const router = express.Router();

router.post(
    PATH.POSTS.CREATE_POST,
    isAuth,
    upload.single("imageUri"),
    fileTypeValidationMiddleware,
    inputValidationMiddleware(createPostValidators),
    tryCatch(async (req: any, res: express.Response) => {
        await postService.createPost(req.body, req.user._id, req.file);

        res.status(201).json({
            status: RESPONSE_STATUS.SUCCESS,
            data: {
              message: "Successfully created post"
            }
          })
    })
)

export default router;