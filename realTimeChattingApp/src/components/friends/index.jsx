import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import avatarImage from "../../../public/images/man_avatar.png";
import { ActiveSingle } from "../../features/slices/activeSingleSlice";
const Friends = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [friends, setFriends] = useState([]);
  const user = useSelector((user) => user.login.isLoggedIn);
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    let frndArr = [];
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((item) => {
        if (
          user.uid == item.val().senderId ||
          user.uid == item.val().receiverId
        ) {
          frndArr.push({ ...item.val(), id: item.key });
        }
      });
      setFriends(frndArr);
    });
  }, [db, user.uid]);
  const handleSingleChat = (data) => {
    if (user.uid == data.receiverId) {
      dispatch(
        ActiveSingle({
          status: "single",
          id: data.senderId,
          name: data.senderName,
          profile: data.senderProfile,
        })
      );
      localStorage.setItem(
        "active",
        JSON.stringify({
          status: "single",
          id: data.senderId,
          name: data.senderName,
          profile: data.senderProfile,
        })
      );
    } else {
      dispatch(
        ActiveSingle({
          status: "single",
          id: data.receiverId,
          name: data.receiverName,
          profile: data.receiverProfile,
        })
      );
      localStorage.setItem(
        "active",
        JSON.stringify({
          status: "single",
          id: data.receiverId,
          name: data.receiverName,
          profile: data.receiverProfile,
        })
      );
    }
  };
  return (
    <>
      <div className="shadow-md rounded-md bg-white p-3 h-[95vh] overflow-y-auto scrollbar-thin">
        <h1 className="font-fontInterBold text-[#494949] text-xl mb-5">
          My Friends
        </h1>
        {friends?.map((item, key) => (
          <div
            className="flex items-center justify-between mt-3 hover:bg-[#efefef] px-2 py-2 cursor-pointer transition-all ease-linear duration-100 rounded-md"
            key={key}
            onClick={() => handleSingleChat(item)}
          >
            <div className="flex items-center gap-x-2">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                {user.uid == item.senderId ? (
                  <img src={item.receiverProfile || avatarImage} />
                ) : (
                  <img src={item.senderProfile || avatarImage} />
                )}
              </div>
              <h3 className="font-fontInter text-black text-lg">
                {user.uid == item.senderId
                  ? item.receiverName
                  : item.senderName}
              </h3>
            </div>
            {location.pathname == "/" && (
              <button
                className="px-3 py-1 font-fontInter bg-[#4A81D3] text-white rounded-md"
                onClick={() => navigate("/message")}
              >
                Message
              </button>
            )}
            {location.pathname == "/message" && (
              <div className="flex items-center gap-x-2">
                <button className="px-3 py-1 font-fontInter bg-[#4A81D3] text-white rounded-md">
                  Unfriend
                </button>
                <button className="px-3 py-1 font-fontInter bg-[#D34A4A] text-white rounded-md">
                  Block
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Friends;
