import React from "react";

function ProjectCard({ project, isYourProject }) {
  return (
    <div
      key={project.id}
      className={
        "scroll-ml-6 snap-start min-h-full bg-third-color mx-4 rounded-3xl shadow-xl py-4 min-w-200 flex flex-col justify-center "
        // + (isYourProject ? "min-w-200 " : "min-w-1/4")
      }>
      <div className="bg-secondary-color/50 p-3 m-3">
        <div className="text-left">{project.projectName}</div>
        <div className="text-left">by {project.projectOwner}</div>
      </div>
    </div>
  );
}

export default ProjectCard;
