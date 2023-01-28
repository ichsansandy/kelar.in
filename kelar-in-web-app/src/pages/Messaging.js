import React, { useEffect, useState } from "react";
import MessageBubble from "../component/MessageRoomListBox";
import MessageRoomDetails from "../component/MessageRoomDetails";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import MessageRoomListBox from "../component/MessageRoomListBox";

function Messaging() {
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const [messageRoom, setMessageRoom] = useState([]);
 

  function fetchMessageRoomList() {
    fetch(`http://localhost:8082/api/${loggedInUser.name}/message-room`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw { message: `Error ${r.status}` };
        }
      })
      .then((d) => {
        setMessageRoom(d);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
  useEffect(() => {
    fetchMessageRoomList();
  }, []);

  return (
    <div className="bg-primary-color/50">
      <div className="flex flex-row justify-evenly max-h-[79vh] max-w-7xl mx-auto ">
        <div className="bg-third-color w-2/6 overflow-y-auto ">{messageRoom !== null && messageRoom.map((room) => <MessageRoomListBox room={room} />)}</div>
        {/* <div className="bg-fourth-color w-4/6">
          { messageList !== null &&
          <MessageRoomDetails messageList={messageList}/>}
        </div> */}
      </div>
    </div>
  );
}

export default Messaging;
