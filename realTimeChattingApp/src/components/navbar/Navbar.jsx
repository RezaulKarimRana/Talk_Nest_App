import React, { useState } from "react";
import { HouseIcon } from "../../svg/HouseIcon";
import { MessageTextIcon } from "../../svg/MessageTextIcon";
import { BackSquareIcon } from "../../svg/BackSquareIcon";
import { DirectBoxSendIcon } from "../../svg/DirectBoxSendIcon";
import natureImage from "../../../public/images/nature.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { LoggedOutUser } from "../../features/slices/loginSlice";
import { createPortal } from "react-dom";
import Modals from "../modals";

const Navbar = () => {
  const user = useSelector((user) => user.login.isLoggedIn);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        localStorage.removeItem("user");
        dispatch(LoggedOutUser());
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <>
      <div className="h-full w-1/12 flex flex-col justify-between py-3">
        <div className="flex flex-col items-center gap-y-2 relative">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img src={user?.photoURL || natureImage} />
          </div>
          <div
            className="text-white w-4 h-4 items-center justify-center absolute mt-9 mr-2 cursor-pointer"
            onClick={() => setShow(true)}
          >
            <DirectBoxSendIcon />
          </div>
          <div className="text-center">
            <span className="font-fontInter text-white text-sm">
              {user.displayName}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-14">
          <div className="w-full grid grid-cols-3 text-center">
            <div></div>
            <div>
              <Link
                to="/"
                className="text-white flex w-10 h-10 items-center justify-center"
              >
                <HouseIcon />
              </Link>
            </div>
            {location.pathname === "/" ? (
              <div className="text-end bg-white w-1 h-10 text-white ml-auto mr-0"></div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="w-full grid grid-cols-3 text-center">
            <div></div>
            <div>
              <Link
                to="/message"
                className="text-white flex w-10 h-10 items-center justify-center"
              >
                <MessageTextIcon />
              </Link>
            </div>
            {location.pathname === "/message" ? (
              <div className="text-end bg-white w-1 h-10 text-white ml-auto mr-0"></div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={handleLogout}
        >
          <div className="text-white flex w-[14px] h-[14px] items-center justify-center">
            <BackSquareIcon />
          </div>
          <div className="flex pl-2">
            <label className="text-white text-sm font-fontInter cursor-pointer">
              Log out
            </label>
          </div>
        </div>
        {show && createPortal(<Modals setShow={setShow} />, document.body)}
      </div>
    </>
  );
};

export default Navbar;
