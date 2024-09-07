import React from "react";
import { DirectBoxSendIcon } from "../../svg/DirectBoxSendIcon";

const Navbar = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-between py-3 bg-[#5E3493] px-7">
        <div className="flex flex-col items-center gap-x-2">
          <div className="w-14 h-14 rounded-full bg-orange-200 overflow-hidden"></div>
          <div>
            <span className="font-fontInter text-white text-sm">
              Md. Rezaul Karim
            </span>
          </div>
        </div>
        <div className="text-red-600">
          <DirectBoxSendIcon />
        </div>
        <div>logout</div>
      </div>
    </>
  );
};

export default Navbar;
