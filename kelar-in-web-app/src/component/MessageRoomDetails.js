import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import MessageBubbleReceiver from "./MessageBubbleReceiver";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { collection, doc, onSnapshot, deleteDoc, addDoc, query, orderBy, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import moment from "moment";

function MessageRoomDetails({}) {
  const [input, setInput] = useState("");
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const { id } = useParams();
  const [messageList, setMessageList] = useState([]);
  const messageListCollectionRef = collection(db, "RealTimeChat", id, "ChatList");

  const [receiverName, setReceiverName] = useState("");
  // const [senderName, setSenderName] = useState("");

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

    // fetch to firebase messageColl
    await addDoc(messageListCollectionRef, {
      user: loggedInUser.name,
      timeSent: new Date(),
      message: input,
    });
    setInput("");

    if (receiverName !== null) {
      const notifCollReceiverRef = collection(db, "PushNotification", receiverName, "NotificationList");
      await addDoc(notifCollReceiverRef, {
        type: "messaging",
        typeId: id,
        message: `${loggedInUser.name} sent you a new message`,
        isRead: false,
        createDate: new Date(),
      });
    }
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
  };

  const scrollToBottom = (id) => {
    const element = document.getElementById(id);
    element.scrollTop = element.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom("box");
  }, [messageList]);

  const sortedCollection = query(messageListCollectionRef, orderBy("timeSent", "asc"));

  useEffect(() => {
    // fetchMessageList();
    //fetch roomReceiver for push notification

    setTimeout(async () => {
      const roomDocRef = doc(db, "RealTimeChat", id);
      const docSnap = await getDoc(roomDocRef);
      if (docSnap.exists) {
        if (docSnap.data().user1 === loggedInUser.name) {
          setReceiverName(docSnap.data().user2);
          // setSenderName(docSnap.data().user1);
        } else {
          setReceiverName(docSnap.data().user1);
          // setSenderName(docSnap.data().user2);
        }
      }
    }, 1000);

    //fetch message list from firestore
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
          Send
        </Button>
      </form>
    </div>
  );
}

export default MessageRoomDetails;
