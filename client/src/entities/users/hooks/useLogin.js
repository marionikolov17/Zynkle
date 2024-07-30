/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAxios from "../../../shared/hooks/useAxios";
import { setTokens } from "../../../shared/reducers/tokensSlice";

export default function useLogin() {
  const { axiosInstance } = useAxios();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const result = await axiosInstance.post("users/login", data);

      localStorage.setItem("accessToken", result.data.data.accessToken);
      localStorage.setItem("refreshToken", result.data.data.refreshToken);
      dispatch(setTokens({ accessToken: result.data.data.accessToken, refreshToken: result.data.data.refreshToken }));
      navigate("/")
    } catch (error) {
      throw new Error(error.response.data.data.message);
    }
  };

  return { login };
}

