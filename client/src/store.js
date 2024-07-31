import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./entities/users/reducers/userSlice";
import tokensReducer from "./shared/reducers/tokensSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        tokens: tokensReducer
    }
});