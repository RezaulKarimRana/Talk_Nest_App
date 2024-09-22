import { createSlice } from "@reduxjs/toolkit";

export const activeSingleSlice = createSlice({
  name: "single",
  initialState: {
    active: JSON.parse(localStorage.getItem("active")) || null,
  },
  reducers: {
    ActiveSingle: (state, action) => {
      state.active = action.payload;
    },
  },
});
export const { ActiveSingle } = activeSingleSlice.actions;

export default activeSingleSlice.reducer;
