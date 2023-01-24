import React from "react";
import CommentBubble from "./CommentBubble";
import CommentInputBox from "./CommentInputBox";

function CommentContainer() {
  const CommentList = [
    { id: 1, commentBody: "Hi this project is awesome", commentDate: "2023/01/24" },
    { id: 2, commentBody: "Hi this project is awesome", commentDate: "2023/01/24" },
    { id: 3, commentBody: "Hi this project is awesome", commentDate: "2023/01/24" },
  ];

  return (
    <div className="flex flex-col mb-3 mx-auto w-full md:w-[700px] xl:w-full px-5 mt-5">
      <div className={"  p-2 w-full rounded-xl bg-secondary-color text-fourth-color font-extrabold text-xl "}>Comment</div>
      <div className="bg-white rounded h-[700px] xl:h-[90%] overflow-y-auto ">
        <CommentInputBox />
        <div className="p-10">
          <CommentBubble />
          <CommentBubble />
          <CommentBubble />
          <CommentBubble />
          <CommentBubble />
          <CommentBubble />
        </div>
      </div>
    </div>
  );
}

export default CommentContainer;
