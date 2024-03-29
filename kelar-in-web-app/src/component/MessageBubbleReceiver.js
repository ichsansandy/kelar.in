import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MessageBubbleReceiver({ message }) {
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const [isUserLoggedIn, setisUserLoggedIn] = useState(null);
  const [objectURL, setObjectURL] = useState(null);

  function getPicture(input) {
    fetch(`http://localhost:8081/api/profile/get-picture/${input}`, {
      headers: {
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          return setObjectURL(null);
        }
      })
      .then((myBlob) => {
        setObjectURL(URL.createObjectURL(myBlob));
      })
      .catch((err) => {
        // toast.error(err.message);
      });
  }
  useEffect(() => {
    if (message.user === loggedInUser.name) {
      setisUserLoggedIn(true);
    }
    setTimeout(() => {
      getPicture(message.user);
    }, 1000);
  }, []);

  return (
    <>
      <div className={!isUserLoggedIn ? "chat chat-start" : "chat chat-end"}>
        {/* user not logged in */}
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
            {objectURL !== null ? (
              <img className="z-30 h-11 w-11 rounded-full" src={objectURL} alt="" />
            ) : (
              <svg className="z-30 bg-third-color rounded-full h-11 w-11 text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="7" r="4" /> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              </svg>
            )}
          </div>
        </div>
        <div className="chat-header">{message.user}</div>
        <div className="chat-bubble">{message.message}</div>
        <time className="chat-footer  text-xs opacity-50">{moment(message?.timeSent?.toMillis()).fromNow()}</time>
        {/* <div className="chat-footer opacity-50">Delivered</div> */}
      </div>
    </>
  );
}

export default MessageBubbleReceiver;
