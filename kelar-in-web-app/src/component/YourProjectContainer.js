import React from "react";
import ProjectCard from "./ProjectCard";

function YourProjectContainer() {
  const projects = [
    { id: 1, projectName: "kelar-in-WebApp", projectOwner: "Ichsan" },
    { id: 1, projectName: "kelar-in-WebApp", projectOwner: "Ichsan" },
    { id: 1, projectName: "kelar-in-WebApp", projectOwner: "Ichsan" },
    { id: 1, projectName: "kelar-in-WebApp", projectOwner: "Ichsan" },
  ]
  
  
    return (
    <div className="bg-secondary-color flex-col justify-self-end items-end m-5 p-5 rounded-lg ">
      <div className=" w-fit py-2 px-4 text-3xl mr-6 mb-4 border-b-4 border-b-third-color ">Your Project</div>
      <div className="flex ">
        <button className="w-1/4 h-64 bg-fourth-color p-1 my-4 mx-2 rounded-3xl shadow-lg">add new project</button>
        <ul className="flex items-center w-3/4 snap-x overflow-x-auto p-4 mx-1 ">
          {projects.map((project) => (
            <ProjectCard project={project} isYourProject={true} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default YourProjectContainer;
