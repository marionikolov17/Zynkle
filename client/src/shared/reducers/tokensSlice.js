import { createSlice } from "@reduxjs/toolkit"

const tokensSlice = createSlice({
    name: "tokens",
    initialState: {
        accessToken: localStorage.getItem("accessToken") || "",
        refreshToken: localStorage.getItem("refreshToken") || ""
    },
    reducers: {
        setTokens: (state, action) => { 
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        }
    }
});

export const { setTokens } = tokensSlice.actions;

export default tokensSlice.reducer;