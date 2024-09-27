import React from "react";
import LoginFormComponent from "../components/login";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="font-fontJotiOne text-5xl">TalkNest</h1>
        <div className="w-2/6 bg-white shadow-md rounded-sm py-3 px-3 flex items-center justify-center">
          <LoginFormComponent toast={toast} />
        </div>
      </div>
    </>
  );
};

export default Login;
