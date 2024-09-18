import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import firebaseConfig from "../Db/firebaseConfig.js";
createRoot(document.getElementById("root")).render(<App />);
