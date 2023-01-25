import React, { useState } from "react";
import MessageBubble from "../component/MessageRoomListBox";
import MessageRoomDetails from "../component/MessageRoomDetails";

function Messaging() {
  const [messageRoom, setMessageRoom] = useState([
    { id: 1, user1: "Ichsan Sandypratama", user2: "Arya Stark" },
    { id: 2, user1: "Hilmi Abdurrahim ", user2: "Arya Stark" },
    { id: 3, user1: "Arya Stark", user2: "Ammar Asfari" },
    { id: 4, user1: "Oka Widiawan", user2: "Arya Stark" },
    { id: 5, user1: "Arya Stark", user2: "Ifnu Bima" },
    { id: 6, user1: "Rhaya Mbak", user2: "Arya Stark" },
    { id: 7, user1: "Mbak Ica", user2: "Arya Stark" },
    { id: 8, user1: "Edmund", user2: "Arya Stark" },
    { id: 9, user1: "Anshar", user2: "Arya Stark" },
    { id: 10, user1: "Teuku Dafa", user2: "Arya Stark" },
  ]);

  return (
    <div className="bg-primary-color/50">
      <div className="flex flex-row justify-evenly max-h-[79vh] max-w-7xl mx-auto ">
        <div className="bg-third-color w-2/6 overflow-y-auto ">
          <div>Text Here</div>
          {messageRoom.map((room) => (
            <MessageBubble room={room} />
          ))}
        </div>
        <div className="bg-fourth-color w-4/6">
          <MessageRoomDetails/>
        </div>
      </div>
    </div>
  );
}

export default Messaging;
