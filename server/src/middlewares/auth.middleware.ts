import { NextFunction, Response } from "express";
import * as jwt from "./../lib/jwt.lib";

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.get("Authorization");

  if (!token) return next();

  try {
    const decoded = await jwt.verify(token, process.env.SECRET);

    req.user = decoded;

    next();
  } catch {
    next();
  }
};

export const isAuth = (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ status: "fail", data: { message: "You must login!" } });
  }

  next();
};
