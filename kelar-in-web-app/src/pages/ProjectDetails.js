import React from "react";
import DateBubble from "../component/DateBubble";
import ProjectCard from "../component/ProjectCard";
import TaskContainer from "../component/TaskContainer";

function ProjectDetails() {
  const project = {
    name: "Alpha Creation",
    startDate: "2023-1-24",
    dueDate: "2023-2-24",
    dueDate: "2023-2-24",
    status: "INPROGRESS",
    user: {
      name: "Ichsan Sandypratama",
    },
  };

  const projectLogo = null;

  return (
    <div className="w-7xl min-h-screen">
      <div className="bg-third-color/50 p-5">
        <div className="flex justify-center  h-64">
          <ProjectCard project={project} />
        <div className="flex flex-col justify-evenly">
          <DateBubble date={project.startDate} title={"Start"} />
          <DateBubble date={project.dueDate} title={"Due"} />
        </div>
        </div>
      </div>
      <div className="flex justify-evenly bg-third-color/50">
        <div>Member</div>
        <TaskContainer/>
        <div>Comment</div>
      </div>
    </div>
  );
}

export default ProjectDetails;
