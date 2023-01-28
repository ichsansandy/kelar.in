import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MessageRoomListBox({ room, fetchMessageList }) {
  const userLoggedIn = useSelector((s) => s.loggedInUser);
  const navigation = useNavigate();

  return (
    <div
      key={room.id}
      onClick={(e) => {
        e.preventDefault();
        navigation(`/messaging/${room.id}`);
      }}
      className="flex flex-row items-center h-[100px] bg-secondary-color/50 hover:bg-secondary-color/75 hover:cursor-pointer ">
      <div className="w-1/4  ">
        <div className="rounded-full bg-white w-16 h-16 mx-auto">gambar</div>
      </div>
      <div className="w-3/4 h-full flex flex-col p-2 gap-y-4 ">
        <div className="text-left ">{room.user1.name === userLoggedIn.name ? room.user2.name : room.user1.name}</div>
        {/* <div className="text-right truncate">LastMessage how long we can have</div> */}
      </div>
    </div>
  );
}

export default MessageRoomListBox;
