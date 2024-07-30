import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./entities/users/reducers/usersSlice";
import tokensReducer from "./shared/reducers/tokensSlice";

export default configureStore({
    reducer: {
        users: usersReducer,
        tokens: tokensReducer
    }
});