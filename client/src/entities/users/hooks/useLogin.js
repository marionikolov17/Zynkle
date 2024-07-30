import * as userService from "./../services/user.service";

export default function useLogin() {
    const login = async (data) => {
        try {
            const result = await userService.login(data);

            console.log(result);
        } catch (error) {
            throw new Error(error.response.data.data.message);
        }
    }

    return { login };
}
