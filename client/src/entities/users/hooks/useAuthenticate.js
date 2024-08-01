/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { authenticate } from "../reducers/userSlice";

import * as userService from "./../services/user.service";

import { useNavigate } from "react-router-dom";

export default function useAuthenticate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await userService.getCurrentUser();

        dispatch(authenticate(response.data.data));
      } catch (error) {
        console.log(error);
        //navigate("/login");
      }
    })();
  }, [dispatch, navigate]);
}
