import React, { useEffect, useRef, useState } from "react";
import { MicrophoneIcon } from "../../svg/MicrophoneIcon";
import { SmileIcon } from "../../svg/SmileIcon";
import { GalleryIcon } from "../../svg/GalleryIcon";
import avatarImage from "../../assets/man_avatar.png";
import { useSelector } from "react-redux";
import { getDatabase, set, ref, push, onValue } from "firebase/database";
import { formatDistance } from "date-fns";
import EmojiPicker from "emoji-picker-react";
import { ToastContainer, toast } from "react-toastify";
import {
  getStorage,
  ref as Ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Chatting = () => {
  const singleFriend = useSelector((single) => single?.active.active);
  const user = useSelector((user) => user.login.isLoggedIn);
  const [messages, setMessages] = useState("");
  const [emojiShow, setEmojiShow] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const db = getDatabase();
  const storage = getStorage();
  const chooseFile = useRef(null);
  const scrollRef = useRef(null);
  const handleSendMessage = () => {
    if (singleFriend?.status == "single" && messages.length > 0) {
      set(push(ref(db, "singleMessage")), {
        whoSendName: user.displayName,
        whoSendId: user.uid,
        whoReceiveName: singleFriend?.name,
        whoReceiveId: singleFriend?.id,
        messages: messages,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}-${new Date().getHours()}:${new Date().getMinutes()}`,
      }).then(() => {
        setMessages("");
        setEmojiShow(false);
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
            item.val().whoReceiveId == singleFriend?.id) ||
          (user.uid == item.val().whoReceiveId &&
            item.val().whoSendId == singleFriend?.id)
        ) {
          singleMessageArray.push(item.val());
        }
      });
      setAllMessages(singleMessageArray);
    });
  }, [singleFriend?.id]);
  const handleEmojiSelect = ({ emoji }) => {
    setMessages(messages + emoji);
  };
  const handleImageUpload = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile.size > 3 * 1024 * 1024) {
      toast.error("Image must be less than 3 MB", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const storageRef = Ref(
      storage,
      `${user.username} = sendImageMessage/${imgFile}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(push(ref(db, "singleMessage")), {
            whoSendName: user.displayName,
            whoSendId: user.uid,
            whoReceiveName: singleFriend?.name,
            whoReceiveId: singleFriend?.id,
            messages: messages,
            image: downloadURL,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}-${new Date().getHours()}:${new Date().getMinutes()}`,
          }).then(() => {
            setMessages("");
            setEmojiShow(false);
          });
        });
      }
    );
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  const handleSendButton = (e) => {
    if (e.key == "Enter") handleSendMessage();
  };
  return (
    <>
      <ToastContainer />
      <div className="w-full h-[95vh] bg-white shadow-md">
        <div className="py-4 h-[10vh] bg-[#F9F9F9] px-6 rounded-md">
          <div className="flex items-center gap-x-2">
            {singleFriend != null && (
              <div className="w-10 h-10 rounded-full bg-[#D9D9D9] overflow-hidden">
                <img
                  src={singleFriend?.profile}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <span className="font-fontInter">
                {singleFriend?.name || "Please select user for chatting"}
              </span>
            </div>
          </div>
        </div>
        <div className="h-[70vh] bg-[#FBFBFB] px-5 py-3 overflow-y-auto scrollbar-thin">
          {singleFriend?.status == "single"
            ? allMessages?.map((item, i) => (
                <div key={i} ref={scrollRef}>
                  {item.whoSendId == user.uid ? (
                    item.image ? (
                      <div className="w-[30%] ml-auto overflow-hidden">
                        <img
                          src={item.image}
                          alt="image"
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    ) : (
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
                    )
                  ) : item.image ? (
                    <div className="w-[30%] mr-auto my-3 overflow-hidden">
                      <img
                        src={item.image}
                        alt="image"
                        className="w-full h-full object-cover rounded-md"
                      />
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
        </div>
        {singleFriend != null && (
          <div className="py-2 h-[10vh">
            <div className="bg-[#F5F5F5] w-[50vw] rounded-md mx-auto py-3 flex items-center justify-center gap-x-3">
              <div className="flex items-center gap-x-2 w-[15%]">
                <MicrophoneIcon />
                <div className="relative">
                  <div
                    className="cursor-pointer"
                    onClick={() => setEmojiShow((prev) => !prev)}
                  >
                    <SmileIcon />
                  </div>
                  {emojiShow && (
                    <div className="absolute bottom-8 left-0">
                      <EmojiPicker onEmojiClick={handleEmojiSelect} />
                    </div>
                  )}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => chooseFile.current.click()}
                >
                  <GalleryIcon />
                </div>
                <input
                  ref={chooseFile}
                  hidden
                  type="file"
                  accept="image/jpg,image/png,image/jpeg,image/avif"
                  onChange={handleImageUpload}
                />
              </div>
              <input
                placeholder="type here...."
                className="w-[60%] outline-none bg-[#F5F5F5]"
                onChange={(e) => setMessages(e.target.value)}
                value={messages}
                onKeyUp={handleSendButton}
              />
              <button
                className="bg-[#3E8DEB] px-4 py-2 rounded-md font-fontInter text-sm text-white"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatting;
