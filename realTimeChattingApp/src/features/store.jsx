import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import activeSingleSlice from "./slices/activeSingleSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    active: activeSingleSlice,
  },
});
export default store;
