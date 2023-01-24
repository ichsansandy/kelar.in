import React from "react";
import CommentContainer from "../component/CommentContainer";
import DateBubble from "../component/DateBubble";
import MemberCard from "../component/MemberCard";
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
    <div className="w-7xl min-h-screen flex flex-col justify- xl:flex-row bg-third-color/25">
      <div className="ml-4">
        <div className="bg-third-color/ p-5 flex justify-center items-center lg:flex-row flex-col">
          <div className="flex justify-center h-64">
            <ProjectCard project={project} />
            <div className="flex flex-col justify-evenly">
              <DateBubble date={project.startDate} title={"Start"} />
              <DateBubble date={project.dueDate} title={"Due"} />
            </div>
          </div>
          <div className="mx-6 min-w-[369px] lg:w-1/4 w-1/2 my-4 lg:my-0">
            <MemberCard />
          </div>
        </div>
        <div className="flex justify-evenly bg-third-color/">
          <TaskContainer />
        </div>
      </div>
      <CommentContainer/>
    </div>
  );
}

export default ProjectDetails;
