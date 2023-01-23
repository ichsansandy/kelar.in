import React from "react";

function ProjectCard({ project, isYourProject }) {
  return (
    <div
      className={
        "scroll-ml-6 snap-start min-h-full bg-third-color mx-4 rounded-3xl shadow-xl py-4 min-w-200 flex flex-col justify-center "
        // + (isYourProject ? "min-w-200 " : "min-w-1/4")
      }>
      <div className="bg-secondary-color/75 rounded-2xl p-3 m-3">
        <svg className="h-36 w-36 text-fourth-color text-center" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" /> <rect x="4" y="4" width="16" height="4" rx="1" /> <rect x="4" y="12" width="6" height="8" rx="1" /> <line x1="14" y1="12" x2="20" y2="12" /> <line x1="14" y1="16" x2="20" y2="16" />{" "}
          <line x1="14" y1="20" x2="20" y2="20" />
        </svg>
        <div className="text-left">{project.projectName}</div>
        <div className="text-left">by {project.projectOwner}</div>
      </div>
    </div>
  );
}

export default ProjectCard;
