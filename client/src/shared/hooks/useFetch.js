import { useEffect, useState } from "react";
import useAxios from "./useAxios";

export default function useFetch(url, options = undefined) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { axiosInstance } = useAxios();

    useEffect(() => {
        let isCancelled = false;

        (async () => {
            try {
                const response = await axiosInstance.get(url, options);

                if (!isCancelled) setData(response.data);
            } catch (error) {
                if (!isCancelled) setError(error);
            } finally {
                if (!isCancelled) setLoading(false);
            }
        })();

        return () => {
            isCancelled = true;
        };
    }, [url, options, axiosInstance]);

    return { data, loading, error }
}