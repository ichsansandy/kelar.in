import React from "react";
import { useSelector } from "react-redux";
import ProjectCard from "./ProjectCard";

function AssignProject() {
  const projects = useSelector((s) => s.assignProjects);

  return (
    <div className="bg-secondary-color/50 flex-col justify-self-end items-end m-5 p-5 rounded-lg border-4 border-secondary-color-200 border-y-third-color ">
      <div className=" w-fit py-2 px-4 text-3xl mr-6 mb-4 border-b-4 border-b-third-color ">Assign Project to You</div>
      <div className="flex h-72">
        <ul className={"flex items-center w-full snap-x overflow-x-auto p-4 mx-1 "}>
          {projects.map((project) => (
            <div className="h-full" key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AssignProject;
