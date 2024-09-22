import React, { useEffect, useState } from "react";
import manImage from "../../assets/man_avatar.png";
import { UserAddIcon } from "../../svg/UserAddIcon";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref as Ref } from "firebase/storage";
const UserLists = () => {
  const [search, setSearch] = useState("");
  const user = useSelector((user) => user.login.isLoggedIn);
  const db = getDatabase();
  const storage = getStorage();
  const [users, setUsers] = useState([]);
  const [searchUsers, setsearchUsers] = useState([]);
  const [friendReqList, setFriendReqList] = useState([]);
  const [cancelReq, setCancelReq] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const users = [];
      snapshot.forEach((userList) => {
        if (user.uid !== userList.key) {
          getDownloadURL(Ref(storage, userList.key))
            .then((downloadURL) => {
              users.push({
                ...userList.val(),
                id: userList.key,
                photoURL: downloadURL,
              });
              searchUsers.push({
                ...userList.val(),
                id: userList.key,
                photoURL: downloadURL,
              });
            })
            .catch((error) => {
              users.push({
                ...userList.val(),
                id: userList.key,
                photoURL: null,
              });
              searchUsers.push({
                ...userList.val(),
                id: userList.key,
                photoURL: downloadURL,
              });
            })
            .then(() => {
              setUsers([...users]);
              setsearchUsers([...searchUsers]);
            });
        }
      });
      // const data = snapshot.val();
      // updateStarCount(postElement, data);
    });
  }, [db, user.uid, storage]);
  const handleFriendRequest = (data) => {
    set(push(ref(db, "friendRequest")), {
      senderName: user.displayName,
      senderId: user.uid,
      senderProfile: user.photoURL ?? "/src/assets/man_avatar.png",
      receiverName: data.username,
      reveiverId: data.id,
      receiverProfile: data.photoURL ?? "/src/assets/man_avatar.png",
    });
  };
  //show friend request
  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      let reqArr = [];
      let cancelReq = [];
      snapshot.forEach((item) => {
        reqArr.push(item.val().reveiverId + "" + item.val().senderId);
        cancelReq.push({ ...item.val(), id: item.key });
      });
      setFriendReqList(reqArr);
      setCancelReq(cancelReq);
    });
  }, [db]);
  const handleCancelReq = (itemId) => {
    const reqToCancel = cancelReq.find(
      (req) => req.receiverId == itemId && req.senderId == user.uid
    );
    if (reqToCancel) {
      remove(ref(db, "friendRequest/" + reqToCancel.id));
    }
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      var data = searchUsers.filter(
        (x) => x.username.toLowerCase() == e.target.value.toLowerCase()
      );
      setUsers(data);
    } else {
      setUsers(searchUsers);
    }
  };
  return (
    <>
      <div className="shadow-md rounded-md bg-white p-3 h-[95vh] overflow-y-auto scrollbar-thin">
        <h1 className="font-fontInterBold text-lg text-[#494949] mb-5">
          All Users
        </h1>
        <div className="mt-6">
          <input
            className="w-full h-12 bg-[#F8F8F8] rounded-md placeholder:font-fontInter placeholder:text-lg pl-5 focus:outline-none"
            placeholder="Search Users..."
            value={search}
            onChange={(e) => handleSearch(e)}
          />
        </div>
        {users.map((item, i) => (
          <div className="flex items-center justify-between mt-5" key={i}>
            <div className="flex items-center gap-x-2">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img
                  src={item.photoURL || manImage}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-fontRegular text-black text-lg">
                {item.username}
              </h3>
            </div>
            {friendReqList.includes(item.id + "" + user.uid) ||
            friendReqList.includes(user.uid + "" + item.id) ? (
              <button
                className="bg-red-500 px-4 py-2 rounded-md text-white font-fontRegular"
                onClick={() => handleCancelReq(item.id)}
              >
                Cancel Request
              </button>
            ) : (
              <div
                className="text-black cursor-pointer"
                onClick={() => handleFriendRequest(item)}
              >
                <UserAddIcon />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserLists;
