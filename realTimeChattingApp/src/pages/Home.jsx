import React from "react";
import Navbar from "../components/navbar/Navbar";

const Home = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
        <div className="h-5/6 w-36 bg-[#5E3493] rounded-xs">
          <Navbar />
        </div>
      </div>
    </>
  );
};

export default Home;
