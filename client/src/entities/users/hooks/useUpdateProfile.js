import { useNavigate } from "react-router-dom";
import * as userService from "./../services/user.service";

export default function useUpdateProfile() {
    const navigate = useNavigate();

    const updateUser = async (data) => {
        try {
            await userService.updateUser(data);

            navigate("/profile");
        } catch (error) {
            console.log(error)
            if (!error.response.data.data[0]) {
                throw new Error("Could not edit profile")
            }
            throw new Error(error.response.data.data[0].message);
        }
    }

    return updateUser;
}