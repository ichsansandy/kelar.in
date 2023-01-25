import React from "react";
import { useSelector } from "react-redux";

function MessageRoomListBox({room}) {
  const userLoggedIn = useSelector(s => s.loggedInUser)
  
    return (
    <div className="flex flex-row items-center h-[100px] bg-secondary-color/50 hover:bg-secondary-color/75">
      <div className="w-1/4  ">
        <div className="rounded-full bg-white w-16 h-16 mx-auto">gambar</div>
      </div>
      <div className="w-3/4 text-left">
        <div>{room.user1 === userLoggedIn.name ? room.user2 :room.user1}</div>
        <div className="text-right">LastMessage</div>
      </div>
    </div>
  );
}

export default MessageRoomListBox;
