import * as bcrypt from "bcrypt";
import * as jwt from "../lib/jwt.lib";
import { Secret } from "jsonwebtoken";
import { createSession } from "./../services/user.session";
import { Types } from "mongoose";

export const generatePasswordHash = async (password: string) => {
  return bcrypt.hash(password, 12);
};

export const verifyPassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

const generateAccessToken = async (
  _id: Types.ObjectId,
  sessionId: string,
  secret: Secret,
  expiresIn: string
) => {
  const payload = {
    _id,
    sessionId,
  };

  const token = await jwt.sign(payload, secret, { expiresIn });
  return token;
};

const generateRefreshToken = async (
  sessionId: string,
  secret: Secret,
  expiresIn: string
) => {
  const payload = {
    sessionId,
  };

  const token = await jwt.sign(payload, secret, { expiresIn });
  return token;
};

export const createTokensAndSession = async (_id: Types.ObjectId) => {
  const session = createSession(_id);

  const accessToken = await generateAccessToken(
    _id,
    session.sessionId,
    process.env.ACCESS_TOKEN_SECRET,
    "2m"
  );
  const refreshToken = await generateRefreshToken(
    session.sessionId,
    process.env.REFRESH_TOKEN_SECRET,
    "10m"
  );
  return [accessToken, refreshToken, session];
}