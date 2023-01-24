import React from "react";
import ProgressBubble from "./ProgressBubble";

function TaskCard({ task }) {
  return (
    <div className="w-96 bg-third-color/50 p-4 m-2 rounded-lg">
      <div className="flex">
        <div className="flex flex-col w-3/5">
          <div className="mb-4 text-left text-xl">Title</div>
          <div className="text-left">assign to Ichsan</div>
        </div>
        <div className="w-2/5 place-self-center p-3">
            <ProgressBubble/>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
