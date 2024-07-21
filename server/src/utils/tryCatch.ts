import RESPONSE_STATUS from "./../constants/response-statuses.constants";
import { Request, Response } from "express";

export const tryCatch = async (
  req: Request,
  res: Response,
  method: Function
) => {
  try {
    await method();
  } catch (err) {
    res.status(400).json({
      status: RESPONSE_STATUS.FAILED,
      data: {
        message: err.message,
      },
    });
  }
};
