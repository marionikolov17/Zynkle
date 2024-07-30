import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { authenticate } from "../reducers/usersSlice";

import * as userService from "./../services/user.service";

export default function useAuthenticate() {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const response = await userService.getCurrentUser();

                console.log(response.data.data);
                dispatch(authenticate(response.data.data));
            } catch (error) {
                console.log(error);
            }
        })();
    });
}