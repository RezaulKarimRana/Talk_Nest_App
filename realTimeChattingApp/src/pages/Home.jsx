import React from "react";
import UserLists from "../components/userList";
import FriendRequest from "../components/friendRequest";
import Friends from "../components/friends";

const Home = () => {
  return (
    <>
      <div className="w-11/12 grid grid-cols-[2fr,5fr] bg-white">
        <div className="w-full p-3">
          <UserLists />
        </div>
        <div className="w-full grid grid-cols-2 gap-x-2">
          <div className="w-full p-3">
            <FriendRequest />
          </div>
          <div className="w-full p-3">
            <Friends />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
