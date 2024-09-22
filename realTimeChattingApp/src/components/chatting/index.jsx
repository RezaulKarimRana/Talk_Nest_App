import React from "react";
import { MicrophoneIcon } from "../../svg/MicrophoneIcon";
import { SmileIcon } from "../../svg/SmileIcon";
import { GalleryIcon } from "../../svg/GalleryIcon";
import avatarImage from "../../assets/man_avatar.png";
import { useSelector } from "react-redux";
const Chatting = () => {
  const singleFriend = useSelector((single) => single.active.active);
  return (
    <>
      <div className="w-full h-[95vh] bg-white shadow-md">
        <div className="py-4 h-[10vh] bg-[#F9F9F9] px-6 rounded-md">
          <div className="flex items-center gap-x-2">
            <div className="w-10 h-10 rounded-full bg-[#D9D9D9] overflow-hidden">
              <img
                src={singleFriend.profile || avatarImage}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-fontInter">
                {singleFriend.name || "Please select user for chatting"}
              </span>
            </div>
          </div>
        </div>
        <div className="h-[70vh] bg-[#FBFBFB] px-5 py-3 overflow-y-auto scrollbar-thin">
          {/* Receiver Message */}
          <div className="w-[60%] mr-auto">
            <p className="text-white font-fontInter text-sm bg-cyan-500 py-2 px-4 rounded-md inline-block">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              officia sapiente quod, dolorem maiores dolorum rerum harum,
              mollitia iure autem deserunt molestias impedit quasi vitae sunt?
              Dolore, vero aspernatur asperiores quidem ad unde autem quam ab
              deleniti tempore consectetur! Ullam architecto provident officia
              est, aliquid sit ducimus recusandae odio eaque.
            </p>
          </div>
          <div className="w-[60%] mr-auto overflow-hidden">
            <img
              src={avatarImage}
              alt="image"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          {/* Sender Message */}
          <div className="w-[60%] ml-auto my-3">
            <p className="text-white font-fontInter text-sm bg-slate-500 py-2 px-4 rounded-md inline-block">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              officia sapiente quod, dolorem maiores dolorum rerum harum,
              mollitia iure autem deserunt molestias impedit quasi vitae sunt?
              Dolore, vero aspernatur asperiores quidem ad unde autem quam ab
              deleniti tempore consectetur! Ullam architecto provident officia
              est, aliquid sit ducimus recusandae odio eaque.
            </p>
          </div>
          <div className="w-[60%] ml-auto my-3 overflow-hidden">
            <img
              src={avatarImage}
              alt="image"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
        <div className="py-2 h-[10vh">
          <div className="bg-[#F5F5F5] w-[50vw] rounded-md mx-auto py-3 flex items-center justify-center gap-x-3">
            <div className="flex items-center gap-x-2 w-[15%]">
              <MicrophoneIcon />
              <SmileIcon />
              <GalleryIcon />
            </div>
            <input
              placeholder="type here...."
              className="w-[60%] outline-none bg-[#F5F5F5]"
            />
            <button className="bg-[#3E8DEB] px-4 py-2 rounded-md font-fontInter text-sm text-white">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
