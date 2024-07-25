import { NextFunction, Response } from "express";
import * as jwt from "./../lib/jwt.lib";
import { Secret } from "jsonwebtoken";
import Session from "./../interfaces/session.interface";
import RESPONSE_STATUS from "./../constants/response-statuses.constants";
import { getSession } from "./../services/user.session";
import { invalidAccessTokens } from "./../services/token.session";

const verifyToken = async (token: string, secret: Secret) => {
  return await jwt.verify(token, secret);
};

const generateToken = async (session: Session) => {
  return await jwt.sign(
    { _id: session._id, sessionId: session.sessionId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2m" }
  );
};

export const checkAccessToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.get("accessToken");

  if (!accessToken) {
    return next();
  }

  if (invalidAccessTokens.includes(accessToken)) return next();

  try {
    req.user = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      req.expiredAccessToken = true;
    } else {
      console.log(err);
    }

    next();
  }
};

export const checkRefreshToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.expiredAccessToken) return next();

  const refreshToken = req.get("refreshToken");

  if (!refreshToken) {
    return next();
  }

  try {
    const refreshPayload = await verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // @ts-ignore
    const session = getSession(refreshPayload.sessionId);
    if (!session) {
      return next();
    }

    const newAccessToken = await generateToken(session);

    res.setHeader("accessToken", newAccessToken as string);

    // @ts-ignore
    req.user = await verifyToken(newAccessToken, ACCESS_TOKEN_SECRET_KEY);

    next();
  } catch (err) {
    console.error(err.message, "- REFRESH TOKEN");
    next();
  }
};

export const isAuth = (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      status: RESPONSE_STATUS.FAILED,
      data: {
        error: "You must login",
      },
    });
  }

  next();
};
