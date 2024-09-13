import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
        <div className="h-5/6 w-11/12 flex bg-[#5E3493] rounded-xs">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
