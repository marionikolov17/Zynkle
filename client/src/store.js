import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./entities/users/reducers/usersSlice";

export default configureStore({
    reducer: {
        users: usersReducer
    }
});