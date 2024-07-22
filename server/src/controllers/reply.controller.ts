import express from "express";

import * as replyService from "./../services/reply.service";

import PATH from "./../constants/path.constants";
import RESPONSE_STATUS from "./../constants/response-statuses.constants";

import { isAuth } from "./../middlewares/auth.middleware";
import { tryCatch } from "./../utils/tryCatch";

const router = express.Router();

router.post(
    PATH.REPLIES.CREATE_REPLY,
    isAuth,
    tryCatch(async (req: any, res: express.Response) => {
        await replyService.createReply(req.body, req.params.commentId, req.user._id);

        res.status(201).json({
            status: RESPONSE_STATUS,
            data: {
                message: "Successfully created reply"
            }
        })
    })
);

export default router;