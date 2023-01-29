import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import MessageBubbleReceiver from "./MessageBubbleReceiver";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { collection, doc, onSnapshot, deleteDoc, addDoc, query, orderBy } from "firebase/firestore";
import { db } from "../firebase-config";
import moment from "moment";

function MessageRoomDetails({}) {
  const [input, setInput] = useState("");
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const { id } = useParams();
  const [messageList, setMessageList] = useState([]);
  const roomListCollection = collection(db, "RealTimeChat", id, "ChatList");

  // const fetchMessageList = () => {
  //   fetch(`http://localhost:8082/api/message-room/${id}`, {
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
  //       setMessageList(d);
  //     })
  //     .catch((err) => {
  //       toast.error(err.message);
  //     });
  // };

  const submit = async (e) => {
    e.preventDefault();
    // console.log(loggedInUser.name);
    // fetch(`http://localhost:8082/api/${loggedInUser.name}/message-room/${id}/message`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     message: input,
    //   }),
    // })
    //   .then((r) => {
    //     if (r.ok) {
    //       return r.json();
    //     } else {
    //       throw { message: `ERROR ${r.status}` };
    //     }
    //   })
    //   .then((d) => {
    //     setMessageList([...messageList, d]);
    //   })
    //   .catch((err) => {
    //     toast.error(err.message);
    //   });
    //

    // fetch to fire base auto id
    const docRef = await addDoc(roomListCollection, {
      user: loggedInUser.name,
      timeSent: new Date(),
      message: input,
    });
    setInput("");
  };

   const scrollToBottom = (id) => {
    const element = document.getElementById(id);
    element.scrollTop = element.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom("box");
  }, [messageList]);

  const sortedCollection = query(roomListCollection, orderBy("timeSent", "asc"));
  
  useEffect(() => {
    // fetchMessageList();
    const unsubscribe = onSnapshot(sortedCollection, (snapshot) => {
      const data = [];
      snapshot.docs.map((doc) => {
        console.log(doc.data());
        data.push({ id: doc.id, ...doc.data() });
      });
      setMessageList(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* <div className="h-[7.5vh] bg-secondary-color/50">Top</div> */}
      <div className="h-[78vh] -z-10 px-3 bg-secondary-color/70 overflow-y-auto  " id="box">
        {messageList !== null &&
          messageList.map((message) => (
            <div key={message.id} className="">
              <MessageBubbleReceiver message={message} />
            </div>
          ))}
      </div>
      <form className="flex bg-white h-full border-red-300 border-4 m-0">
        <textarea className="border-0 m-auto w-[90%]" onChange={(e) => setInput(e.target.value)} value={input} />
        <Button type="submit" className="m-auto" onClick={submit}>
          send
        </Button>
      </form>
    </div>
  );
}

export default MessageRoomDetails;
