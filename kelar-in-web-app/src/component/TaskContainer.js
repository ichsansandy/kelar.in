import React from "react";
import TaskCard from "./TaskCard";

function TaskContainer({ taskList }) {
  return (
    <div>
      <div className={"p-2 w-full rounded-xl bg-secondary-color text-fourth-color font-extrabold text-xl "}>Task</div>
      <div className=" lg:w-[50rem] grid grid-rows-3 lg:grid-flow-col overflow-auto max-h-[350px] ">
        {/* <div key={taskList?.id}></div> */}
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </div>
  );
}

export default TaskContainer;
