import React, { useEffect, useState } from "react";
import { MicrophoneIcon } from "../../svg/MicrophoneIcon";
import { SmileIcon } from "../../svg/SmileIcon";
import { GalleryIcon } from "../../svg/GalleryIcon";
import avatarImage from "../../assets/man_avatar.png";
import { useSelector } from "react-redux";
import { getDatabase, set, ref, push, onValue } from "firebase/database";
import { formatDistance } from "date-fns";

const Chatting = () => {
  const singleFriend = useSelector((single) => single?.active.active);
  const user = useSelector((user) => user.login.isLoggedIn);
  const [messages, setMessages] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const db = getDatabase();
  const handleSendMessage = () => {
    if (singleFriend?.status == "single") {
      set(push(ref(db, "singleMessage")), {
        whoSendName: user.displayName,
        whoSendId: user.uid,
        whoReceiveName: singleFriend.name,
        whoReceiveId: singleFriend.id,
        messages: messages,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}-${new Date().getHours()}:${new Date().getMinutes()}`,
      }).then(() => {
        setMessages("");
      });
    }
  };
  //get messages
  useEffect(() => {
    onValue(ref(db, "singleMessage"), (snapshot) => {
      let singleMessageArray = [];
      snapshot.forEach((item) => {
        if (
          (user.uid == item.val().whoSendId &&
            item.val().whoReceiveId == singleFriend.id) ||
          (user.uid == item.val().whoReceiveId &&
            item.val().whoSendId == singleFriend.id)
        ) {
          singleMessageArray.push(item.val());
        }
      });
      setAllMessages(singleMessageArray);
    });
  }, [singleFriend?.id]);
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
          {singleFriend?.status == "single"
            ? allMessages?.map((item, i) => (
                <div key={i}>
                  {item.whoSendId == user.uid ? (
                    <div className="w-[60%] ml-auto flex flex-col items-end">
                      <p className="text-white font-fontInter text-sm bg-slate-500 py-2 px-4 rounded-md inline-block text-right">
                        {item.messages}
                      </p>
                      <span className="mt-2 text-sm text-slate-500">
                        {formatDistance(item.date, new Date(), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  ) : (
                    <div className="w-[60%] mr-auto my-3 flex flex-col items-start">
                      <p className="text-white font-fontInter text-sm bg-cyan-500 py-2 px-4 rounded-md inline-block">
                        {item.messages}
                      </p>
                      <span className="mt-2 text-sm text-slate-500">
                        {" "}
                        {formatDistance(item.date, new Date(), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  )}
                </div>
              ))
            : ""}
          {/* <div className="w-[60%] mr-auto overflow-hidden">
            <img
              src={avatarImage}
              alt="image"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="w-[60%] ml-auto my-3 overflow-hidden">
            <img
              src={avatarImage}
              alt="image"
              className="w-full h-full object-cover rounded-md"
            />
          </div> */}
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
              onChange={(e) => setMessages(e.target.value)}
              value={messages}
            />
            <button
              className="bg-[#3E8DEB] px-4 py-2 rounded-md font-fontInter text-sm text-white"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
