import React from "react";
import friendImage from "../../assets/Friend.png";
const Friends = () => {
  return (
    <>
      <div className="shadow-md rounded-md bg-white p-4 h-[90vh] overflow-y-auto scrollbar-thin">
        <h1 className="font-fontInterBold text-[#494949] text-xl">
          My Friends
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
              Unfriend
            </button>
            <button className="px-4 py-2 font-fontInter bg-[#D34A4A] text-white rounded-md">
              Block
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
