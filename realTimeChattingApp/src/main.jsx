import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import firebaseConfig from "../Db/firebaseConfig.js";
import { Provider } from "react-redux";
import store from "./features/store.jsx";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
