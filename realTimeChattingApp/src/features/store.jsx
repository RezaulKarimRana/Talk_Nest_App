import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import activeSingleSlice from "./slices/activeSingleSlice";
import reRenderSlice from "./slices/reRenderSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    active: activeSingleSlice,
    reRender: reRenderSlice,
  },
});
export default store;
