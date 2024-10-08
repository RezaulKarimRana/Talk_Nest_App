import React from "react";
import Chatting from "../components/chatting";
import Friends from "../components/friends";

const Messages = () => {
  return (
    <>
      <div className="w-11/12 grid grid-cols-[2fr,4fr] bg-white">
        <div className="w-full p-3">
          <Friends />
        </div>
        <div className="w-full p-3">
          <Chatting />
        </div>
      </div>
    </>
  );
};

export default Messages;
