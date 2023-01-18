import React from "react";

function ProjectCard({ project, isYourProject }) {
  return (
    <div className={"scroll-ml-6 snap-start min-h-full bg-third-color mx-4 rounded-3xl shadow-xl py-4 " + (isYourProject ? "min-w-1/3 " : "min-w-1/4")}>
      <div className="flex-col justify-center items-center bg-white h-auto">
        <div className="">{project.projectName}</div>
        <div>by {project.projectOwner}</div>
      </div>
    </div>
  );
}

export default ProjectCard;
