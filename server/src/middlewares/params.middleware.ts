import { NextFunction, Request, Response } from "express";

import * as postService from "./../services/post.service";
import * as commentService from "./../services/comment.service";
import * as replyService from "./../services/reply.service";
import * as userService from "./../services/user.service";

import RESPONSE_STATUS from "./../constants/response-statuses.constants";

export const checkPostId = async (
  req: Request,
  res: Response,
  next: NextFunction,
  value: any
) => {
  if (!(await postService.checkIfPostExsists(value))) {
    return res.status(404).json({
      status: RESPONSE_STATUS.FAILED,
      data: {
        message: "Post not found",
      },
    });
  }
  next();
};

export const checkCommentId = async (
  req: Request,
  res: Response,
  next: NextFunction,
  value: any
) => {
  if (!(await commentService.checkIfCommentExsists(value))) {
    return res.status(404).json({
      status: RESPONSE_STATUS.FAILED,
      data: {
        message: "Comment not found",
      },
    });
  }
  next();
};

export const checkReplyId = async (
  req: Request,
  res: Response,
  next: NextFunction,
  value: any
) => {
  if (!(await replyService.checkIfReplyExsists(value))) {
    return res.status(404).json({
      status: RESPONSE_STATUS.FAILED,
      data: {
        message: "Reply not found",
      },
    });
  }
  next();
};

export const checkUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
  value: any
) => {
  if (!(await userService.checkUserId(value))) {
    return res.status(404).json({
      status: RESPONSE_STATUS.FAILED,
      data: {
        message: "User not found",
      },
    });
  }
  next();
}
