import { getDatabase, onValue, ref, remove, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import avatarImage from "../../../public/images/man_avatar.png";
import { ActiveSingle } from "../../features/slices/activeSingleSlice";
import { UserListRender } from "../../features/slices/reRenderSlice";
const Friends = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [friends, setFriends] = useState([]);
  const user = useSelector((user) => user.login.isLoggedIn);
  const singleFriend = useSelector((single) => single?.active.active);
  const userRendered = useSelector((render) => render.reRender.userRendered);
  const db = getDatabase();
  const getFriends = () => {
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
  };
  useEffect(() => {
    getFriends();
  }, [db, user.uid]);
  const handleSingleChat = (data) => {
    if (user.uid == data.receiverId) {
      dispatch(
        ActiveSingle({
          status: "single",
          id: data.senderId,
          name: data.senderName,
          profile: data.senderProfile,
          isBlocked: data.isBlocked,
        })
      );
      localStorage.setItem(
        "active",
        JSON.stringify({
          status: "single",
          id: data.senderId,
          name: data.senderName,
          profile: data.senderProfile,
          isBlocked: data.isBlocked,
        })
      );
    } else {
      dispatch(
        ActiveSingle({
          status: "single",
          id: data.receiverId,
          name: data.receiverName,
          profile: data.receiverProfile,
          isBlocked: data.isBlocked,
        })
      );
      localStorage.setItem(
        "active",
        JSON.stringify({
          status: "single",
          id: data.receiverId,
          name: data.receiverName,
          profile: data.receiverProfile,
          isBlocked: data.isBlocked,
        })
      );
    }
  };
  const handleUnfriend = (itemId) => {
    const reqToUnfriend = friends.find((req) => req.id == itemId);
    if (reqToUnfriend) {
      remove(ref(db, "friends/" + reqToUnfriend.id)).then(() => {
        getFriends();
        dispatch(
          UserListRender({
            isRendered: !userRendered,
          })
        );
      });
    }
  };
  const handleBlock = (itemId) => {
    const reqToBlock = friends.find((req) => req.id == itemId);
    if (reqToBlock) {
      const postData = {
        id: reqToBlock.id,
        isBlocked: true,
        receiverId: reqToBlock.receiverId,
        receiverName: reqToBlock.receiverName,
        receiverProfile: reqToBlock.receiverProfile,
        senderId: reqToBlock.senderId,
        senderName: reqToBlock.senderName,
        senderProfile: reqToBlock.senderProfile,
      };
      const updates = {};
      updates["/friends/" + itemId] = postData;
      update(ref(db), updates).then(() => {
        dispatch(
          ActiveSingle({
            status: "single",
            id: singleFriend.id,
            name: singleFriend.name,
            profile: singleFriend.profile,
            isBlocked: true,
          })
        );
        getFriends();
      });
    }
  };
  const handleUnBlock = (itemId) => {
    const reqToBlock = friends.find((req) => req.id == itemId);
    if (reqToBlock) {
      const postData = {
        id: reqToBlock.id,
        isBlocked: false,
        receiverId: reqToBlock.receiverId,
        receiverName: reqToBlock.receiverName,
        receiverProfile: reqToBlock.receiverProfile,
        senderId: reqToBlock.senderId,
        senderName: reqToBlock.senderName,
        senderProfile: reqToBlock.senderProfile,
      };
      const updates = {};
      updates["/friends/" + itemId] = postData;
      update(ref(db), updates).then(() => {
        dispatch(
          ActiveSingle({
            status: "single",
            id: singleFriend.id,
            name: singleFriend.name,
            profile: singleFriend.profile,
            isBlocked: false,
          })
        );
        getFriends();
      });
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
            className={
              (singleFriend?.id == item.senderId ||
              singleFriend?.id == item.receiverId
                ? "sticky top-0"
                : "") +
              " flex items-center justify-between mt-3 hover:bg-[#efefef] px-2 py-2 cursor-pointer transition-all ease-linear duration-100 rounded-md"
            }
            key={key}
            onClick={() => handleSingleChat(item)}
          >
            <div
              className="flex items-center gap-x-2"
              onClick={() => navigate("/message")}
            >
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
            <div className="flex items-center gap-x-2">
              <button
                className="cursor-pointer px-3 py-1 font-fontInter bg-[#4A81D3] text-white rounded-md"
                onClick={() => handleUnfriend(item.id)}
              >
                Unfriend
              </button>
              {!item.isBlocked && (
                <button
                  className="cursor-pointer px-3 py-1 font-fontInter bg-[#D34A4A] text-white rounded-md"
                  onClick={() => handleBlock(item.id)}
                >
                  Block
                </button>
              )}
              {item.isBlocked && (
                <button
                  className="cursor-pointer px-3 py-1 font-fontInter bg-[#D34A4A] text-white rounded-md"
                  onClick={() => handleUnBlock(item.id)}
                >
                  UnBlock
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Friends;
