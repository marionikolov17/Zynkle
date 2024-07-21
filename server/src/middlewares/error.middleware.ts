import RESPONSE_STATUS from "./../constants/response-statuses.constants";
import { NextFunction, Request, Response } from "express";
import multer from "multer";

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(error.message)
    if (error instanceof multer.MulterError) {
        return res.status(409).json({
            status: RESPONSE_STATUS.FAILED,
            data: {
                message: error.message
            }
        })
    } else {
        res.status(500).json({
            status: RESPONSE_STATUS.ERROR,
            data: {
                message: "Internal server error"
            }
        })
    }
}