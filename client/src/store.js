import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./entities/users/reducers/userSlice";

export default configureStore({
    reducer: {
        user: userReducer,
    }
});