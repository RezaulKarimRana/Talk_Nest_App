import React from "react";
import { HouseIcon } from "../../svg/HouseIcon";
import { MessageTextIcon } from "../../svg/MessageTextIcon";
import { BackSquareIcon } from "../../svg/BackSquareIcon";

const Navbar = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-between py-3 bg-[#5E3493] px-7">
        <div className="flex flex-col items-center gap-y-2">
          <div className="w-14 h-14 rounded-full bg-orange-200 overflow-hidden"></div>
          <div>
            <span className="font-fontInter text-white text-sm">
              Md. Rezaul Karim
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-14">
          <div className="text-white flex w-12 h-12 items-center justify-center">
            <HouseIcon />
          </div>
          <div className="text-white flex w-12 h-12 items-center justify-center">
            <MessageTextIcon />
          </div>
        </div>
        <div className="flex items-center justify-around gap-x-2">
          <div className="text-white flex w-6 h-6 items-center justify-center">
            <BackSquareIcon />
          </div>
          <div className="flex items-center justify-center">
            <label className="text-white font-fontInterBold">Log out</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
