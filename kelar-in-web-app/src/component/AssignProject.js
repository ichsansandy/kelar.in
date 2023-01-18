import React from "react";
import ProjectCard from "./ProjectCard";

function AssignProject() {
  const projects = [
    { id: 1, projectName: "HealMe", projectOwner: "Hilmi" },
    { id: 1, projectName: "Takoni", projectOwner: "Oka" },
    { id: 1, projectName: "Mosewa", projectOwner: "Ammar" },
  ];

  return (
    <div className="bg-secondary-color flex-col justify-self-end items-end m-5 p-2 rounded-lg ">
      <div className=" w-fit py-2 px-4 text-3xl mr-6 border-b-4 border-b-third-color ">Assign Project to You</div>
      <div className="flex ">
        <ul className=
        // {
            "flex items-center w-full snap-x overflow-x-auto p-4 mx-1 h-72 " 
        // + (projects.length <= 3) ? " h-64 " : " h-72"
        // }
        >
          {projects.map((project) => (
            <ProjectCard project={project} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AssignProject;
