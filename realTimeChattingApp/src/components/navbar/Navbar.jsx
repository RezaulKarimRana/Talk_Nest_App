import React from "react";
import { HouseIcon } from "../../svg/HouseIcon";
import { MessageTextIcon } from "../../svg/MessageTextIcon";
import { BackSquareIcon } from "../../svg/BackSquareIcon";
import { DirectBoxSendIcon } from "../../svg/DirectBoxSendIcon";
import natureImage from "../../assets/nature.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="h-full w-1/12 flex flex-col justify-between py-3 px-3">
        <div className="flex flex-col items-center gap-y-2 relative">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img src={natureImage} />
          </div>
          <div className="text-white w-4 h-4 items-center justify-center absolute mt-9 mr-2 cursor-pointer">
            <DirectBoxSendIcon />
          </div>
          <div className="text-center">
            <span className="font-fontInter text-white text-sm">
              Md. Rezaul Karim
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-14">
          <Link
            to="/"
            className="text-white flex w-10 h-10 items-center justify-center"
          >
            <HouseIcon />
          </Link>
          <Link
            to="/message"
            className="text-white flex w-10 h-10 items-center justify-center"
          >
            <MessageTextIcon />
          </Link>
        </div>
        <div className="flex items-center justify-around gap-x-2 cursor-pointer">
          <div className="text-white flex w-4 h-4 items-center justify-center">
            <BackSquareIcon />
          </div>
          <div className="flex items-center justify-center">
            <label className="text-white text-sm font-fontInter cursor-pointer">
              Log out
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
