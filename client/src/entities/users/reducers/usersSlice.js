import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({
    name: "users",
    initialState: {
        isAuthenticated: false,
        username: "",
        profilePictureUri: "",
        firstName: "",
        lastName: ""
    },
    reducers: {}
});

export default usersSlice.reducer;