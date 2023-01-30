import React, { useEffect, useRef, useState } from "react";

function CommentInputBox({setInput, input, postComment}) {


  return (
    <form>
      <div className="relative p-4 focus:ring-blue-400 ">
        <textarea className=" w-full p-2 block focus-within:border-blue-400 border-third-color border-2 min-h-[200px] text-left" placeholder="Type your comment here" 
        onChange={(e) => setInput(e.target.value)} 
        value={input}
        />
        {/* <span id="spanInput" onChange={(e) => setInput(e.target.value)}  className="p-4 block focus-within:border-blue-400 border-third-color border-2 min-h-[200px] text-left" placeholder="type here" role="textbox" contentEditable ></span> */}
        <button 
        className=" hover:bg-secondary-color hover:text-fourth-color absolute bottom-7 right-5 p-2 bg-third-color w-fit ml-auto mr-3 rounded text-white font-bold"
        onClick={postComment}
        >
          Comment
          </button>
      </div>
    </form>
  );
}

export default CommentInputBox;
