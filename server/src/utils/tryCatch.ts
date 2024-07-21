import RESPONSE_STATUS from "./../constants/response-statuses.constants";
import { Request, Response } from "express";

export const tryCatch = (
  method: (req: any, res: Response) => Promise<void>
) => {
  return async (req: Request, res: Response) => {
    method(req, res).catch((err) => {
      res.status(400).json({
        status: RESPONSE_STATUS.FAILED,
        data: {
          message: err.message,
        },
      });
    });
  };
};
