import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
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

export default userSlice.reducer;