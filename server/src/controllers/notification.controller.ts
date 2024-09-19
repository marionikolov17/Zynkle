import express from "express";
import * as notificationService from "./../services/notification.service";
import { tryCatch } from "../utils/tryCatch";
import { isAuth } from "../middlewares/auth.middleware";
import PATH from "../constants/path.constants";

const router = express.Router();

router.get(
  PATH.NOTIFICATIONS.GET_NOTIFICATIONS,
  isAuth,
  tryCatch(async (req: any, res: express.Response) => {
    const notifications = await notificationService.getNotifications(req.user._id);

    res.status(200).json({
        status: "success",
        data: notifications
    })
  })
);

router.get(
    PATH.NOTIFICATIONS.CHECK_NOTIFICATIONS,
    isAuth,
    tryCatch(async (req: any, res: express.Response) => {
        const hasUnreadNotifications = await notificationService.checkForNotifications(req.user._id);
        
        res.status(200).json({
            status: "success",
            data: hasUnreadNotifications
        })
    })
)

export default router;
