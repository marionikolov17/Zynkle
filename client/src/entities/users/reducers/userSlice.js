import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        _id: "",
        isAuthenticated: false,
        username: "",
        profilePicture: "",
        firstName: "",
        lastName: ""
    },
    reducers: {
        authenticate: (state, action) => { 
            state._id = action.payload._id;
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