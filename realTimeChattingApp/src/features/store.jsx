import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});
export default store;
