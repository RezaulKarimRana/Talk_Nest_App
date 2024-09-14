import React from "react";
import { HouseIcon } from "../../svg/HouseIcon";
import { MessageTextIcon } from "../../svg/MessageTextIcon";
import { BackSquareIcon } from "../../svg/BackSquareIcon";
import { DirectBoxSendIcon } from "../../svg/DirectBoxSendIcon";
import natureImage from "../../assets/nature.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <div className="h-full w-1/12 flex flex-col justify-between py-3">
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
          <div className="grid grid-cols-3 text-center">
            <div className="col-start-2">
              <Link
                to="/"
                className="text-white flex w-10 h-10 items-center justify-center"
              >
                <HouseIcon />
              </Link>
            </div>
            {location.pathname === "/" ? (
              <div className="col-start-4 bg-white pl-1 py-3"></div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="grid grid-cols-3 text-center">
            <div className="col-start-2">
              <Link
                to="/message"
                className="text-white flex w-10 h-10 items-center justify-center"
              >
                <MessageTextIcon />
              </Link>
            </div>
            {location.pathname === "/message" ? (
              <div className="col-start-4 bg-white pl-1 py-3"></div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          <div className="text-white flex w-[14px] h-[14px] items-center justify-center">
            <BackSquareIcon />
          </div>
          <div className="flex pl-2">
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
