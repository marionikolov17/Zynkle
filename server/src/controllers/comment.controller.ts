import express from "express";

import * as commentService from "./../services/comment.service";

import PATH from "./../constants/path.constants";
import RESPONSE_STATUS from "./../constants/response-statuses.constants";

import { isAuth } from "./../middlewares/auth.middleware";
import { tryCatch } from "./../utils/tryCatch";
import { inputValidationMiddleware } from "./../middlewares/validation.middleware";
import { createCommentValidators } from "./../validators/comment.validator";

const router = express.Router();

router.post(
    PATH.COMMENTS.CREATE_COMMENT,
    isAuth,
    inputValidationMiddleware(createCommentValidators),
    tryCatch(async (req: any, res: express.Response) => {
        await commentService.createComment(req.body, req.params.postId, req.user._id);

        res.status(201).json({
            status: RESPONSE_STATUS.SUCCESS,
            data: {
                message: "Successfully created comment"
            }
        });
    })
);

export default router;