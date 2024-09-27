import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    LoggedInUser: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    LoggedOutUser: (state) => {
      state.isLoggedIn = null;
    },
  },
});
export const { LoggedInUser, LoggedOutUser } = userSlice.actions;

export default userSlice.reducer;
