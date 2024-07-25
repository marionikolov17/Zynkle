import express from "express";

import * as commentService from "./../services/comment.service";

import PATH from "./../constants/path.constants";
import RESPONSE_STATUS from "./../constants/response-statuses.constants";

import { isAuth } from "./../middlewares/auth.middleware";
import { tryCatch } from "./../utils/tryCatch";
import { inputValidationMiddleware } from "./../middlewares/validation.middleware";
import { createCommentValidators } from "./../validators/comment.validator";
import { checkCommentId, checkPostId } from "./../middlewares/params.middleware";

const router = express.Router();

router.param("postId", checkPostId);
router.param("commentId", checkCommentId);

router.get(
    PATH.COMMENTS.GET_COMMENTS,
    tryCatch(async (req: express.Request, res: express.Response) => {
        const comments = await commentService.getComments(req.params.postId as any);

        res.status(200).json({
            status: RESPONSE_STATUS.SUCCESS,
            data: comments
        })
    })
)

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

router.delete(
    PATH.COMMENTS.DELETE_COMMENT,
    isAuth,
    tryCatch(async (req: any, res: express.Response) => {
        await commentService.deleteComment(req.params.postId, req.params.commentId, req.user._id);

        res.status(200).json({
            status: RESPONSE_STATUS.SUCCESS,
            data: {
                message: "Successfully deleted comment"
            }
        });
    })
)

router.put(
    PATH.COMMENTS.LIKE_COMMENT,
    isAuth,
    tryCatch(async (req: any, res: express.Response) => {
        await commentService.likeComment(req.params.commentId, req.user._id);

        res.status(200).json({
            status: RESPONSE_STATUS.SUCCESS,
            data: {
                message: "Successfully liked comment"
            }
        });
    })
)

router.put(
    PATH.COMMENTS.DISLIKE_COMMENT,
    isAuth,
    tryCatch(async (req: any, res: express.Response) => {
        await commentService.dislikeComment(req.params.commentId, req.user._id);

        res.status(200).json({
            status: RESPONSE_STATUS.SUCCESS,
            data: {
                message: "Successfully disliked comment"
            }
        });
    })
)

export default router;