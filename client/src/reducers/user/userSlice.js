import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        username: "",
        profilePictureUri: "",
        firstName: "",
        lastName: ""
    },
    reducers: {}
});