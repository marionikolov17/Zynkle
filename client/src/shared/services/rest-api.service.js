// eslint-disable-next-line no-unused-vars
import axios, { CanceledError } from "axios";

const BASE_URL = "http://localhost:3000/api/v1/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

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

//TODO: Add authentication interceptor

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
