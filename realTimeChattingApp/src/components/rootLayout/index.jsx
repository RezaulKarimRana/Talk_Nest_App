import React from "react";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <div className="w-full h-screen flex bg-[#5E3493] rounded-xs">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
