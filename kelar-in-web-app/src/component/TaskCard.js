import React from "react";
import { useSelector } from "react-redux";
import DueDateBadge from "./DueDateBadge";
import ProgressBubble from "./ProgressBubble";
import UpdateTask from "./UpdateTask";

function TaskCard({ task }) {
  return (
    <div className=" w-96 group hover:bg-secondary-color h-[113px] bg-third-color/50 p-3 m-1.5 rounded-lg">
      <div className="flex">
        <div className="flex flex-col text-white w-3/5 group-hover:text-fourth-color h-full">
          <div className={"text-left font-bold " + (task.taskName.length > 30 ? " text-sm" : "text-base")}>{task.taskName.length > 80 ? task.taskName.slice(0, 77) + " ..." : task.taskName}</div>
          <div className="text-left text-sm ">By {task.assignUser.name.split(" ")[0]}</div>
        </div>
        <div className="w-2/5 flex flex-col gap-y-5 items-center h-full  ">
          <div className="relative">
            <ProgressBubble status={task.status} taskAssignUser={task.assignUser.name} taskId={task.id} />
          </div>
          <div>
            <DueDateBadge dueDate={task.dueDate} endDate={task.endDate} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
