import { useEffect, useState } from "react";
import * as notificationService from "./../services/notification.service";

export const useGetNotifications = () => {
    const [notifications, setNotifications] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const response = await notificationService.getNotifications();

                setNotifications(response.data.data);
            } catch (error) {
                console.log("notification error", error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        })()
    }, []);

    return { notifications, isLoading, error };
}