import React from "react";
import friendImage from "../../assets/Friend.png";
const FriendRequest = () => {
  return (
    <>
      <div className="shadow-md rounded-md bg-white p-5 h-[90vh] overflow-y-auto scrollbar-thin">
        <h1 className="font-fontInterBold text-[#494949] text-xl">
          Friend requests
        </h1>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-x-2">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img src={friendImage} />
            </div>
            <h3 className="font-fontInter text-black text-lg">
              Md. Rezaul Karim
            </h3>
          </div>
          <div className="flex items-center gap-x-2">
            <button className="px-4 py-2 font-fontInter bg-[#4A81D3] text-white rounded-md">
              Accept
            </button>
            <button className="px-4 py-2 font-fontInter bg-[#D34A4A] text-white rounded-md">
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
