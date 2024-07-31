import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        username: "",
        profilePicture: "",
        firstName: "",
        lastName: ""
    },
    reducers: {
        authenticate: (state, action) => { 
            state.isAuthenticated= true,
            state.username= action.payload.username,
            state.profilePicture= action.payload.profilePicture,
            state.firstName= action.payload.firstName,
            state.lastName= action.payload.lastName
        }
    }
});

export const { authenticate } = userSlice.actions;

export default userSlice.reducer;