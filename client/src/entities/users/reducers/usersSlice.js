import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({
    name: "users",
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

export const { authenticate } = usersSlice.actions;

export default usersSlice.reducer;