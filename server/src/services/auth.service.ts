import {
  createTokensAndSession,
  verifyPassword,
} from "./../helpers/auth.helper";
import userModel from "./../models/User";
import { invalidateAccessToken } from "./invalid-tokens";
import { invalidateSession } from "./user.session";

export const registerUser = async (data: Record<string, any>) => {
  const user = await userModel.findOne({
    $or: [{ email: data?.email }, { username: data?.username }],
  });

  if (user) {
    throw new Error("User already exsists");
  }

  const createdUser = await userModel.create(data);

  return createTokensAndSession(createdUser._id);
};

export const loginUser = async (data: Record<string, any>) => {
  const user = await userModel.findOne({ email: data?.email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!(await verifyPassword(data?.password, user.password as string))) {
    throw new Error("Invalid email or password");
  }

  return createTokensAndSession(user._id);
};

export const logoutUser = (sessionId: string, token: string) => {
  invalidateSession(sessionId);
  invalidateAccessToken(token);
};
