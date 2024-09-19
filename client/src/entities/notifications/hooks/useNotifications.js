/* eslint-disable no-prototype-builtins */
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

                if (response.data.data?.hasOwnProperty("notifications")) {
                    return setNotifications(response.data.data.notifications);
                }

                setNotifications([]);
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

export const useReadNotifications = () => {
    useEffect(() => {
        (async () => {
            try {
                await notificationService.readNotifications()
            } catch (error) {
                console.log("read error", error)
            } 
        })()
    }, [])
}