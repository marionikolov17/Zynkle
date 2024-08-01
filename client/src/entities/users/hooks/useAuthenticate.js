/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { authenticate } from "../reducers/userSlice";

import * as userService from "./../services/user.service";

import { useLocation, useNavigate } from "react-router-dom";

const publicPathnames = ['/register'];

export default function useAuthenticate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const response = await userService.getCurrentUser();

        dispatch(authenticate(response.data.data));
      } catch (error) {
        if (publicPathnames.includes(location.pathname)) return;
        navigate("/login");
      }
    })();
  }, [dispatch, navigate]);
}
