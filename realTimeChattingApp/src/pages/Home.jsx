import React from "react";
import Navbar from "../components/navbar/Navbar";

const Home = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
        <div className="w-3/4 bg-red-400 rounded-md">
          <Navbar />
        </div>
      </div>
    </>
  );
};

export default Home;
