import React from "react";

function ProjectCard({ project, isYourProject }) {
  return (
    <div key={project.id} className={"scroll-ml-6 snap-start min-h-full bg-third-color mx-4 rounded-3xl shadow-xl py-4 " + (isYourProject ? "min-w-1/3 " : "min-w-1/4")}>
      <div className="flex-col bg-white h-auto">
        <div>{project.projectName}</div>
        <div>by {project.projectOwner}</div>
      </div>
    </div>
  );
}

export default ProjectCard;
