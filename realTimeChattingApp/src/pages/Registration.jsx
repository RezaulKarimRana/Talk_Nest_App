import React from "react";
import RegistrationFormComponent from "../components/registration";
import { ToastContainer, toast } from "react-toastify";
const Registration = () => {
  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="font-fontJotiOne text-5xl">TalkNest</h1>
        <div className="w-1/4 bg-white shadow-md rounded-sm py-3 flex items-center justify-center">
          <RegistrationFormComponent toast={toast} />
        </div>
      </div>
    </>
  );
};

export default Registration;
