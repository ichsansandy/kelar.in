import React, { useEffect, useState } from "react";
import MessageBubble from "../component/MessageRoomListBox";
import MessageRoomDetails from "../component/MessageRoomDetails";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import MessageRoomListBox from "../component/MessageRoomListBox";
import { collection, doc, onSnapshot, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const roomListCollection = collection(db, "RealTimeChat");

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
    // fetchMessageRoomList();
    const unsubscribe = onSnapshot(roomListCollection, (snapshot) => {
      const data = [];
      snapshot.docs.map((doc) => {
        console.log(doc.data());
        data.push({ id: doc.id, ...doc.data() });
      });
      setMessageRoom(data);
      setMessageRoom((currRooms) => {
        return currRooms.filter((room) => {
          if (room.user1 === loggedInUser.name || room.user2 === loggedInUser.name) {
            return room;
          }
        });
      });
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-primary-color/50">
      <div className="flex flex-row justify-evenly max-h-[79vh] max-w-7xl mx-auto ">
        <div className="bg-third-color w-2/6 overflow-y-auto ">{messageRoom !== false && messageRoom.map((room) => <MessageRoomListBox room={room} />)}</div>
        {/* <div className="bg-fourth-color w-4/6">
          { messageList !== null &&
          <MessageRoomDetails messageList={messageList}/>}
        </div> */}
      </div>
    </div>
  );
}

export default Messaging;
