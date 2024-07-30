/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios, { CanceledError } from "axios";
import useLocalStorage from "./useLocalStorage";
import { useEffect } from "react";

const BASE_URL = "http://localhost:3000/api/v1/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default function useAxios() {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");

  const requestOnFullfilled = (config) => {
    config.headers = {
      AccessToken: accessToken,
      RefreshToken: refreshToken,
    };
    return config;
  };

  const requestOnError = (error) => Promise.reject(error);

  const responseOnError = (error) => {
    if (error instanceof CanceledError || error.message === "Network Error") {
      return alert("server is not working!");
      // Show maintenance page
    }
    return Promise.reject(error);
  };

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(requestOnFullfilled, requestOnError);
    const responseInterceptor = axiosInstance.interceptors.response.use(null, responseOnError);

    return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
    }
  }, [accessToken, refreshToken]);

  return { axiosInstance }
}
