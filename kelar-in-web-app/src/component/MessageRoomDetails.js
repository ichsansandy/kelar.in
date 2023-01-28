import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import MessageBubbleReceiver from "./MessageBubbleReceiver";

function MessageRoomDetails({}) {
  const { id } = useParams();
  const [messageList, setMessageList] = useState([]);

  const fetchMessageList = () => {
    fetch(`http://localhost:8082/api/message-room/${id}`, {
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
        setMessageList(d);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    fetchMessageList();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="h-[55px] bg-secondary-color/50">Top</div>
      <div className="h-[62vh] -z-10 px-3 bg-secondary-color/70 overflow-y-auto">
        {messageList !== null &&
          messageList.map((message) => (
            <div key={message.id} className="">
              <MessageBubbleReceiver message={message} />
            </div>
          ))}
      </div>
      <form className="flex bg-white h-full border-red-300 border-4 m-0">
        <textarea className="border-0 m-auto w-[90%]" />
        <button className="m-auto">send</button>
      </form>
    </div>
  );
}

export default MessageRoomDetails;
