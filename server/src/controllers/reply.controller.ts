import express from "express";

import * as replyService from "./../services/reply.service";

import PATH from "./../constants/path.constants";
import RESPONSE_STATUS from "./../constants/response-statuses.constants";

import { isAuth } from "./../middlewares/auth.middleware";
import { tryCatch } from "./../utils/tryCatch";
import { inputValidationMiddleware } from "./../middlewares/validation.middleware";
import { createReplyValidators } from "./../validators/reply.validator";
import { checkPostId, checkCommentId, checkReplyId} from "./../middlewares/params.middleware";

const router = express.Router();

router.param("postId", checkPostId);
router.param("commentId", checkCommentId);
router.param("replyId", checkReplyId);

router.post(
    PATH.REPLIES.CREATE_REPLY,
    isAuth,
    inputValidationMiddleware(createReplyValidators),
    tryCatch(async (req: any, res: express.Response) => {
        await replyService.createReply(req.body, req.params.postId, req.params.commentId, req.user._id);

        res.status(201).json({
            status: RESPONSE_STATUS.SUCCESS,
            data: {
                message: "Successfully created reply"
            }
        })
    })
);

router.delete(
    PATH.REPLIES.DELETE_REPLY,
    isAuth,
    tryCatch(async (req: any, res: express.Response) => {
        await replyService.deleteReply(req.params.postId, req.params.replyId, req.user._id);

        res.status(200).json({
            status: RESPONSE_STATUS.SUCCESS,
            data: {
                message: "Successfully deleted reply"
            }
        });
    })
)

router.put(
    PATH.REPLIES.LIKE_REPLY,
    isAuth,
    tryCatch(async (req: any, res: express.Response) => {
        await replyService.likeReply(req.params.replyId, req.user._id);

        res.status(200).json({
            status: RESPONSE_STATUS.SUCCESS,
            data: {
                message: "Successfully liked reply"
            }
        });
    })
)

router.put(
    PATH.REPLIES.DISLIKE_REPLY,
    isAuth,
    tryCatch(async (req: any, res: express.Response) => {
        await replyService.dislikeReply(req.params.replyId, req.user._id);

        res.status(200).json({
            status: RESPONSE_STATUS.SUCCESS,
            data: {
                message: "Successfully disliked reply"
            }
        });
    })
)

export default router;