import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import avatarImage from "../../../public/images/man_avatar.png";
const FriendRequest = () => {
  const [friendReqList, setFriendReqList] = useState([]);
  const user = useSelector((user) => user.login.isLoggedIn);
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      let friendReq = [];
      snapshot.forEach((item) => {
        if (user.uid === item.val().receiverId) {
          friendReq.push({ ...item.val(), id: item.key });
        }
      });
      setFriendReqList(friendReq);
    });
  }, [db, user.uid]);
  const handleAccept = (data) => {
    set(push(ref(db, "friends")), {
      ...data,
    }).then(() => {
      remove(ref(db, "friendRequest/" + data.id));
    });
  };
  const handleReject = (data) => {
    remove(ref(db, "friendRequest/" + data.id));
  };
  return (
    <>
      <div className="shadow-md rounded-md bg-white p-3 h-[95vh] overflow-y-auto scrollbar-thin">
        <h1 className="font-fontInterBold text-[#494949] text-xl mb-5">
          Friend requests
        </h1>
        {friendReqList?.map((item, key) => (
          <div
            className="flex items-center justify-between mt-3 hover:bg-[#efefef] px-2 py-2 cursor-pointer transition-all ease-linear duration-100 rounded-md"
            key={key}
          >
            <div className="flex items-center gap-x-2">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img src={item.senderProfile || avatarImage} />
              </div>
              <h3 className="font-fontInter text-black text-md">
                {item.senderName}
              </h3>
            </div>
            <div className="flex items-center gap-x-2">
              <button
                className="px-3 py-1 font-fontInter bg-[#4A81D3] text-white rounded-md"
                onClick={() => handleAccept(item)}
              >
                Accept
              </button>
              <button
                className="px-3 py-1 font-fontInter bg-[#D34A4A] text-white rounded-md"
                onClick={() => handleReject(item)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FriendRequest;
