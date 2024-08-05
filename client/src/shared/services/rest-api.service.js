// eslint-disable-next-line no-unused-vars
import axios, { CanceledError } from "axios";

const BASE_URL = "https://zynkle-1.onrender.com/api/v1/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  function(config) {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    
    if (accessToken && refreshToken) {
      config.headers["AccessToken"] = accessToken;
      config.headers["RefreshToken"] = refreshToken;
    }

    return config;
  }, function(error) {
    return Promise.reject(error);
  }
)

// Handle network and connection error
axiosInstance.interceptors.response.use(
  null,
  (error) => {
    if (error instanceof CanceledError || error.message === "Network Error") {
      return alert("server is not working!")
      // Show maintenance page
    } 
    return Promise.reject(error);
  }
);

export const get = async (url, config = null) => {
  return axiosInstance.get(url, config);
};

export const post = async (url, data, config = null) => {
  return axiosInstance.post(url, data, config);
};

export const put = async (url, data, config = null) => {
  return axiosInstance.put(url, data, config);
};

export const del = async (url, config = null) => {
  return axiosInstance.delete(url, config);
};
