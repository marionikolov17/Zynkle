/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios, { CanceledError } from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const BASE_URL = "http://localhost:3000/api/v1/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default function useAxios() {
  const tokens = useSelector(state => state.tokens);

  const requestOnFullfilled = (config) => {
    config.headers = {
      AccessToken: tokens.accessToken,
      RefreshToken: tokens.refreshToken,
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
    console.log("yes", tokens.accessToken)
    const requestInterceptor = axiosInstance.interceptors.request.use(requestOnFullfilled, requestOnError);
    const responseInterceptor = axiosInstance.interceptors.response.use(null, responseOnError);

    return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
    }
  }, [tokens.accessToken, tokens.refreshToken]);

  return { axiosInstance }
}
