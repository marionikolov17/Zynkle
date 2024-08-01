import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logoutUser } from "./../reducers/userSlice";

import * as userService from "./../services/user.service";

export default function useLogout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            await userService.logout();

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(logoutUser());
            navigate("/login");
        } catch (error) {
            throw new Error(error.message);
        }
    }

    return logout;
}