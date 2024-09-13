import React from "react";
import UserLists from "../components/userList";

const Home = () => {
  return (
    <>
      <div className="w-11/12 grid grid-cols-[2fr,4fr]">
        <div className="w-full h-full bg-white p-5">
          <UserLists />
        </div>
        <div className="w-full h-full bg-green-600">lkj</div>
      </div>
    </>
  );
};

export default Home;
