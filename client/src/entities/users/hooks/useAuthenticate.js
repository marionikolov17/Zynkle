/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authenticate } from "../reducers/usersSlice";

import { useNavigate } from "react-router-dom";
import useAxios from "../../../shared/hooks/useAxios";

export default function useAuthenticate() {
  const { axiosInstance } = useAxios();

  const tokens = useSelector(state => state.tokens);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("users/current");

        console.log(response.data.data)
        dispatch(authenticate(response.data.data));
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    })();
  }, [dispatch, navigate, tokens.accessToken, tokens.refreshToken]);
}
