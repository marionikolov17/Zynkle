import express from "express";
import * as authService from "./../services/auth.service";
import PATH from "./../constants/path.constants";
import RESPONSE_STATUS from "./../constants/response-statuses.constants";
import { inputValidationMiddleware } from "./../middlewares/validation.middleware";
import { registerUserValidators } from "./../validators/user.validator";

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

export default router;
