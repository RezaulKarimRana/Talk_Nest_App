import React from "react";
import LoginFormComponent from "../components/login";

const Login = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="font-fontJotiOne text-6xl">TalkNest</h1>
        <div className="w-1/4 bg-white shadow-md rounded-sm py-24 flex items-center justify-center">
          <LoginFormComponent />
        </div>
      </div>
    </>
  );
};

export default Login;
