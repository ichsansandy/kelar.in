import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function MessageRoomListBox({ room, fetchMessageList }) {
  const userLoggedIn = useSelector((s) => s.loggedInUser);
  const navigation = useNavigate();
  const [objectURL, setObjectURL] = useState(null);
  const [userRoom, setuserRoom] = useState("");
  const [isPicture, setIsPicture] = useState(false);

  function getPicture(input) {
    fetch(`http://localhost:8081/api/profile/get-picture/${input}`, {
      headers: {
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsPicture(true);
          return response.blob();
        } else {
          return setObjectURL(null);
        }
      })
      .then((myBlob) => {
        setObjectURL(URL.createObjectURL(myBlob));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  

  useEffect(() => {
    if (room?.user1 === userLoggedIn.name ) {
      setuserRoom(room?.user2);
      getPicture(room?.user2);
    } else {
      setuserRoom(room?.user1);
      getPicture(room?.user1);
    }
  }, []);

  return (
    <div
      key={room.id}
      onClick={(e) => {
        e.preventDefault();
        navigation(`/messaging/${room.id}`);
      }}
      className="flex flex-row items-center h-[100px] bg-secondary-color/50 hover:bg-secondary-color/75 hover:cursor-pointer ">
      <div className="w-1/4  ">
        <div className="rounded-full bg-white w-16 h-16 mx-auto">
          {isPicture === true ? (
            <img className="z-30 h-16 w-16 rounded-full" src={objectURL} alt="" />
          ) : (
            <svg className="z-30 bg-third-color rounded-full h-16 w-16 text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="7" r="4" /> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
          )}
        </div>
      </div>
      <div className="w-3/4 h-full flex flex-col p-2 gap-y-4 ">
        <div className="text-left ">{userRoom}</div>
        {/* <div className="text-right truncate">LastMessage how long we can have</div> */}
      </div>
    </div>
  );
}

export default MessageRoomListBox;
