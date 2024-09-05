import React from "react";
import RegistrationFormComponent from "../components/registration";

const Registration = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-1/4 bg-white shadow-md rounded-sm p-4 flex items-center justify-center">
          <div>
            <RegistrationFormComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
