import { createTokensAndSession, verifyPassword } from "./../helpers/auth.helper";
import userModel from "./../models/User";

export const registerUser = async (data: Record<string, any>) => {
    const user = await userModel.findOne({ email: data?.email });

    if (user) {
        throw new Error("User already exsists");
    }

    const createdUser = await userModel.create(data);

    return createTokensAndSession(createdUser._id);
}

export const loginUser = async (data: Record<string, any>) => {
    const user = await userModel.findOne({ email: data?.email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    if(!(await verifyPassword(data?.password, user.password))) {
        throw new Error("Invalid email or password");
    }

    return createTokensAndSession(user._id);
}