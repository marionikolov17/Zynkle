import * as bcrypt from "bcrypt";
import * as jwt from "../lib/jwt.lib";
import { Secret } from "jsonwebtoken";
import { createSession } from "./../services/user.session";

export const generatePasswordHash = async (password: string) => {
  return bcrypt.hash(password, 12);
};

export const verifyPassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

const generateAccessToken = async (
  user: Record<string, any>,
  sessionId: string,
  secret: Secret,
  expiresIn: string
) => {
  const payload = {
    id: user.id,
    role: user.user_role,
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

export const createTokensAndSession = async (user: Record<string, any>) => {
  const session = createSession(user._id);

  const accessToken = await generateAccessToken(
    user,
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