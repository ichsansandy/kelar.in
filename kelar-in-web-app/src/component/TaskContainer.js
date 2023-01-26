import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import NewTaskModal from "./NewTaskModal";
import TaskCard from "./TaskCard";

function TaskContainer({ taskList , isYourProject}) {
  const {id} = useParams()
  const [tasks, setTasks] = useState([
    // { id: 1, taskName: "Building Landing Page", assignUser: { name: "Ichsan Sandypratama" }, status: "ASSIGN", dueDate: "2023-01-26" },
    // { id: 2, taskName: "API for Task", assignUser: { name: "Ichsan Sandypratama" }, status: "REJECTED", dueDate: "2023-01-27" },
    // { id: 3, taskName: "Realtime chat using firestore", assignUser: { name: "Ichsan Sandypratama" }, status: "ONHOLD", dueDate: "2023-01-28" },
    // { id: 4, taskName: "MobileApp Screen Messaging", assignUser: { name: "Ichsan Sandypratama" }, status: "INPROGRESS", dueDate: "2023-01-29" },
    // { id: 5, taskName: "Layout Project in Web and Mobile App", assignUser: { name: "Ichsan Sandypratama" }, status: "COMPLETED", dueDate: "2023-01-25" },
    // { id: 5, taskName: "Layout Project in Web and Mobile App", assignUser: { name: "Ichsan Sandypratama" }, status: "COMPLETED", dueDate: "2023-01-25" },
    // { id: 5, taskName: "Layout Project in Web and Mobile App and doinh something  stupid like this very long got damn details task nam like this", assignUser: { name: "Ichsan Sandypratama" }, status: "COMPLETED", dueDate: "2023-01-25" },
  ]);

  const fetchTaskFromProjectId =  () => {
    fetch(`http://localhost:8081/api/project/${id}/task`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw { message: "Error ", status: r.status };
        }
      })
      .then((d) => {
        setTasks(d);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    fetchTaskFromProjectId()
  }, []);

  return (
    <div>
      <div className={"relative p-2 w-full rounded-xl bg-secondary-color text-fourth-color font-extrabold text-xl "}>
        Task
        { isYourProject ? <NewTaskModal task={tasks} setTasks={setTasks}/> : null}
      </div>
      <div className=" lg:w-[50rem] grid lg:grid-rows-5 lg:grid-flow-col overflow-x-auto overflow-y-auto max-h-[600px] ">
        {tasks.map((task) => (
          <>
            <TaskCard task={task} />
          </>
        ))}
      </div>
    </div>
  );
}

export default TaskContainer;
