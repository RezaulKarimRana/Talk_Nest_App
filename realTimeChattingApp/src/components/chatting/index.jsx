import React from "react";
import { MicrophoneIcon } from "../../svg/MicrophoneIcon";
import { SmileIcon } from "../../svg/SmileIcon";
import { GalleryIcon } from "../../svg/GalleryIcon";
const Chatting = () => {
  return (
    <>
      <div className="w-full bg-white shadow-md">
        <div className="py-4 bg-[#F9F9F9] px-6 rounded-md">
          <div className="flex items-center gap-x-2">
            <div className="w-10 h-10 rounded-full bg-[#D9D9D9] overflow-hidden"></div>
            <div>
              <span className="font-fontInter">Md. Rezaul Karim</span>
            </div>
          </div>
        </div>
        <div className="h-[340px] bg-[#FBFBFB] px-5">alsd</div>
        <div className="py-2">
          <div className="bg-[#F5F5F5] w-[670px] rounded-md mx-auto py-3 flex items-center justify-center gap-x-3">
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
