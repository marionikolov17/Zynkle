import express from "express";
import * as authService from "./../services/auth.service";
import * as userService from "./../services/user.service";
import PATH from "./../constants/path.constants";
import RESPONSE_STATUS from "./../constants/response-statuses.constants";
import { inputValidationMiddleware } from "./../middlewares/validation.middleware";
import { registerUserValidators } from "./../validators/user.validator";
import { tryCatch } from "./../utils/tryCatch";
import { isAuth } from "./../middlewares/auth.middleware";

const router = express.Router();

router.post(
  PATH.USERS.REGISTER,
  inputValidationMiddleware(registerUserValidators),
  async (req: express.Request, res: express.Response) => {
    try {
      const [accessToken, refreshToken, session] =
        await authService.registerUser(req.body);

      res.status(200).json({
        status: RESPONSE_STATUS.SUCCESS,
        data: {
          session,
          accessToken,
          refreshToken,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: RESPONSE_STATUS.FAILED,
        data: {
          message: err.message,
        },
      });
    }
  }
);

router.post(
  PATH.USERS.LOGIN,
  async (req: express.Request, res: express.Response) => {
    try {
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
    } catch (err) {
      res.status(400).json({
        status: RESPONSE_STATUS.FAILED,
        data: {
          message: err.message,
        },
      });
    }
  }
);

router.put(
  PATH.USERS.FOLLOW_USER,
  isAuth,
  tryCatch(async (req: any, res: express.Response) => {
    await userService.followUser(req.user._id, req.params.userId);

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        message: "Successfully followed this user"
      }
    })
  })
)

router.put(
  PATH.USERS.UNFOLLOW_USER,
  isAuth,
  tryCatch(async (req: any, res: express.Response) => {
    await userService.unfollowUser(req.user._id, req.params.userId);

    res.status(200).json({
      status: RESPONSE_STATUS.SUCCESS,
      data: {
        message: "Successfully unfollowed this user"
      }
    })
  })
)

export default router;
