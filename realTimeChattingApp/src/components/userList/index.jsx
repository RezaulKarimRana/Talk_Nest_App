import React from "react";
import catImage from "../../assets/CatIcon.png";
import { UserAddIcon } from "../../svg/UserAddIcon";
const UserLists = () => {
  return (
    <>
      <div className="shadow-md rounded-md bg-white p-3 h-[470px] overflow-y-auto">
        <h1 className="font-fontInter text-3xl text-[#494949]">All Users</h1>
        <div className="mt-6">
          <input
            className="w-full h-14 bg-[#F8F8F8] rounded-md placeholder:font-fontInter placeholder:text-xl pl-5 focus:outline-none"
            placeholder="Search Users..."
          />
        </div>
        <div className="flex items-center justify-between gap-x-2 mt-8">
          <div className="flex items-center justify-between">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img src={catImage} />
            </div>
            <div className="text-center">
              <span className="font-fontInter text-[#3D3C3C] text-xl ml-4">
                Md. Rezaul Karim
              </span>
            </div>
          </div>
          <div className="cursor-pointer text-[#292D32]">
            <UserAddIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLists;
