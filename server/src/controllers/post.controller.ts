import { tryCatch } from "./../utils/tryCatch";
import PATH from "./../constants/path.constants";
import express from "express";

const router = express.Router();

router.post(
    PATH.POSTS.CREATE_POST,
    tryCatch(async (req: express.Request, res: express.Response) => {
        
    })
)

export default router;