import React, { useEffect, useState } from "react";
import CommentBubble from "./CommentBubble";
import CommentInputBox from "./CommentInputBox";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

function CommentContainer() {
  const [input, setInput] = useState(null);
  const { id } = useParams();

  const [commentList, setCommentList] = useState([
    // { id: 1, commentBody: "Hi this project is awesome", commentDate: "2023/01/24", user: { name: "Ichsan Sandypratama" } },
    // { id: 1, commentBody: "Hi this project is awesome", commentDate: "2023/01/24", user: { name: "Ichsan Sandypratama" } },
    // { id: 1, commentBody: "Hi this project is awesome", commentDate: "2023/01/24", user: { name: "Ichsan Sandypratama" } },
    // { id: 1, commentBody: "Hi this project is awesome", commentDate: "2023/01/24", user: { name: "Ichsan Sandypratama" } },
    // { id: 1, commentBody: "Hi this project is awesome", commentDate: "2023/01/24", user: { name: "Ichsan Sandypratama" } },
  ]);

  function fetchComment() {
    fetch(`http://localhost:8081/api/project/${id}/comment`, {
      headers: {
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw { message: "Error", status: r.status };
        }
      })
      .then((d) => {
        setCommentList(d);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  function postComment(e) {
    e.preventDefault();
    console.log(JSON.stringify({ commentBody: input }));
    fetch(`http://localhost:8081/api/project/${id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
      body: JSON.stringify({ commentBody: input }),
    })
      .then((r) => {
        console.log(r.status);
        if (r.ok) {
          return r.json();
        } else {
          throw { message: "Error", status: r.status };
        }
      })
      .then((d) => {
        setCommentList([...commentList, d]);
        setInput("");
        toast.success("Posted Comment");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <div className="flex flex-col mb-3 mx-auto w-full sm:max-h-[1000px] md:w-[700px] xl:w-full px-5 mt-5 ">
      <div className={"  p-2 w-full rounded-xl bg-secondary-color text-fourth-color font-extrabold text-xl "}>Comment</div>
      <div className="bg-white rounded h-[890px] overflow-y-auto ">
        <CommentInputBox input={input} setInput={setInput} postComment={postComment} />
        <div className="p-10">
          {commentList
            .slice(0)
            .reverse()
            .map((comment) => (
              <div key={comment.id}>
                <CommentBubble comment={comment} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CommentContainer;
