import { useEffect, useState } from "react";
import * as userService from "./../services/user.service";
import { useSelector } from "react-redux";

export default function useGetProfile(userId) {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const { isAuthenticated } = useSelector(state => state.user)

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const response = await userService.getUser(userId);

                console.log(response.data.data.user);
                setUser(response.data.data.user);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [userId, isAuthenticated]);

    return { user, isLoading, error }
}