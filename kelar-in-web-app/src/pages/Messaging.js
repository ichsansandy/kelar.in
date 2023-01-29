import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import MessageRoomListBox from "../component/MessageRoomListBox";
import { collection,  onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";

const roomListCollection = collection(db, "RealTimeChat");

function Messaging() {
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const listUser = useSelector((s) => s.listUser);
  const [messageRoom, setMessageRoom] = useState([]);
  const [userNotAvailable, setuserNotAvailable] = useState([]);
  const [availUser, setavailUser] = useState([]);
  const [isCreateNewRoom, setisCreateNewRoom] = useState(false);

  useEffect(() => {
    // fetchMessageRoomList();
    const unsubscribe = onSnapshot(roomListCollection, (snapshot) => {
      const data = [];
      snapshot.docs.map((doc) => {
        console.log(doc.data());
        data.push({ id: doc.id, ...doc.data() });
      });
      setMessageRoom(data);
      //only room that logged in user have
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

  function validateAvailUser(){
    let temporary = [];
    messageRoom.forEach((room) => {
      temporary.push(room.user1);
      temporary.push(room.user2);
    });
    let another = listUser;
    let result = another.filter((x) => !temporary.includes(x));
    setavailUser(result);
  }

  return (
    <div className="bg-primary-color/50">
      <div className="flex flex-row justify-evenly h-[80vh] max-w-7xl mx-auto ">
        <div className="bg-third-color w-2/6 overflow-y-auto ">
          <div>Chat Room</div>
          {messageRoom !== false && messageRoom.map((room) => <MessageRoomListBox room={room} isCreateNewRoom={false} />)}
          {!isCreateNewRoom ? (
            <div
              onClick={(e) => {
                e.preventDefault();
                validateAvailUser();
                setisCreateNewRoom(true);
              }}>
              Create New Room
            </div>
          ) : (
            <div>
              <div> Avail User </div>
              {availUser.map((user) => (
                <MessageRoomListBox isCreateNewRoom={true} user={user}/>
              ))}
            </div>
          )}
        </div>
        {/* <div className="bg-fourth-color w-4/6">
          { messageList !== null &&
          <MessageRoomDetails messageList={messageList}/>}
        </div> */}
      </div>
    </div>
  );
}

export default Messaging;

// function fetchMessageRoomList() {
//   fetch(`http://localhost:8082/api/${loggedInUser.name}/message-room`, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((r) => {
//       if (r.ok) {
//         return r.json();
//       } else {
//         throw { message: `Error ${r.status}` };
//       }
//     })
//     .then((d) => {
//       setMessageRoom(d);
//     })
//     .catch((err) => {
//       toast.error(err.message);
//     });
// }
