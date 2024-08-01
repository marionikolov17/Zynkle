import { useNavigate } from "react-router-dom";
import * as userService from "./../services/user.service";

export default function useRegister() {
    const navigate = useNavigate();

    const handleRegister = async (data) => {
        try {
            const result = await userService.register(data);
      
            localStorage.setItem("accessToken", result.data.data.accessToken);
            localStorage.setItem("refreshToken", result.data.data.refreshToken);
            navigate("/")
          } catch (error) {
            throw new Error(error.response.data.data.message);
          }
    }

    return handleRegister;
}