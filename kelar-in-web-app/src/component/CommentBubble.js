import React, { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-hot-toast";

function CommentBubble({ comment }) {
  const [objectURL, setObjectURL] = useState(false);

  function getPicture() {
    fetch(`http://localhost:8081/api/profile/get-picture/${comment.user.name}`, {
      headers: {
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          setObjectURL(null);
        }
      })
      .then((myBlob) => {
        if (myBlob !== null) {
          setObjectURL(URL.createObjectURL(myBlob));
        } else {
          setObjectURL(false);
        }
      })
      .catch((err) => {
        // toast.error(err.message);
        setObjectURL(false);
      });
  }

  useEffect(() => {
    getPicture();
  }, []);

  return (
    <div className="relative w-full my-10">
      {objectURL === false ? (
        <svg
          className="absolute -left-7 -top-8  z-30 bg-third-color rounded-full h-11 w-11 text-white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round">
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="7" r="4" /> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>
      ) : (
        <img
          className="absolute -left-7 -top-8  z-30 h-11 w-11 rounded-full"
          // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          src={objectURL}
          alt=""
        />
      )}
      <div className="absolute p-1 inset-x-0  -top-6 rounded bg-secondary-color text-fourth-color font-extrabold">
        <div className="flex justify-between mx-6 text-sm">
          <div className="">{comment.user.name}</div>
          <div>{moment(comment.commentDate).fromNow()}</div>
        </div>
      </div>
      <div className="bg-third-color/75 p-4 rounded text text-secondary-color font-extrabold">{comment.commentBody}</div>
    </div>
  );
}

export default CommentBubble;
