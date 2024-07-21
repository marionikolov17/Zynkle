import express from "express";

import * as authService from "./../services/auth.service";
import * as userService from "./../services/user.service";
import upload from "./../config/file-upload.config";

import PATH from "./../constants/path.constants";
import RESPONSE_STATUS from "./../constants/response-statuses.constants";

import { fileTypeValidationMiddleware, inputValidationMiddleware } from "./../middlewares/validation.middleware";
import { registerUserValidators, updateUserValidators } from "./../validators/user.validator";
import { tryCatch } from "./../utils/tryCatch";
import { isAuth } from "./../middlewares/auth.middleware";

const router = express.Router();

router.post(
  PATH.USERS.REGISTER,
  inputValidationMiddleware(registerUserValidators),
  tryCatch(async (req: express.Request, res: express.Response) => {
    const [accessToken, refreshToken, session] = await authService.registerUser(
      req.body
    );

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        session,
        accessToken,
        refreshToken,
      },
    });
  })
);

router.post(
  PATH.USERS.LOGIN,
  tryCatch(async (req: express.Request, res: express.Response) => {
    const [accessToken, refreshToken, session] = await authService.loginUser(
      req.body
    );

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        session,
        accessToken,
        refreshToken,
      },
    });
  })
);

router.put(
  PATH.USERS.UPDATE_USER,
  isAuth,
  upload.single('profilePicture'),
  fileTypeValidationMiddleware,
  inputValidationMiddleware(updateUserValidators),
  tryCatch(async (req: any, res: express.Response) => {
    await userService.updateUser(req.body, req.user._id, req.file);

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        message: "Successfully updated user"
      }
    })
  })
);

/* Get User public profile */
router.get(
  PATH.USERS.GET_USER,
  tryCatch(async (req: express.Request, res: express.Response) => {
    const user = await userService.getUser(req.params.userId as any);

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        user
      }
    })
  })
);

router.put(
  PATH.USERS.FOLLOW_USER,
  isAuth,
  tryCatch(async (req: any, res: express.Response) => {
    await userService.followUser(req.user._id, req.params.userId);

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        message: "Successfully followed this user",
      },
    });
  })
);

router.put(
  PATH.USERS.UNFOLLOW_USER,
  isAuth,
  tryCatch(async (req: any, res: express.Response) => {
    await userService.unfollowUser(req.user._id, req.params.userId);

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        message: "Successfully unfollowed this user",
      },
    });
  })
);

export default router;
