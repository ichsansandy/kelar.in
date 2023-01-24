import React from "react";
import ProgressBubble from "./ProgressBubble";

function TaskCard({ task }) {
  return (
    <div className="w-96 group hover:bg-secondary-color bg-third-color/50 p-4 m-2 rounded-lg">
      <div className="flex">
        <div className="flex flex-col text-white w-3/5 group-hover:text-fourth-color">
          <div className="mb-4 text-left text-xl">Task name</div>
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
