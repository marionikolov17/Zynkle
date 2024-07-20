import express from "express";
import * as authService from "./../services/auth.service";

const router = express.Router();

router.post(
  "/register",
  async (req: express.Request, res: express.Response) => {
    try {
      const [accessToken, refreshToken, session] =
        await authService.registerUser(req.body);

      res.status(200).json({
        status: "success",
        data: {
          session,
          accessToken,
          refreshToken,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        data: {
          message: err.message,
        },
      });
    }
  }
);

export default router;
