import { createSlice } from "@reduxjs/toolkit";

export const reRenderSlice = createSlice({
  name: "reRender",
  initialState: {
    userRendered: JSON.parse(localStorage.getItem("reRenderUser")) || false,
  },
  reducers: {
    UserListRender: (state, action) => {
      state.userRendered = action.payload;
    },
  },
});
export const { UserListRender } = reRenderSlice.actions;

export default reRenderSlice.reducer;
