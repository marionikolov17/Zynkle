import { useEffect, useState } from "react";
import * as notificationService from "./../services/notification.service";

export const useGetNotifications = (type = null) => {
    const [notifications, setNotifications] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                const response = await notificationService.getNotifications(type);

                setNotifications(response.data.data.notifications);
            } catch (error) {
                console.log("notification error", error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        })()
    }, [type]);

    return { notifications, isLoading, error };
}