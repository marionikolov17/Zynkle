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
            state = {...action.payload, isAuthenticated: true};
        }
    }
});

export default usersSlice.reducer;