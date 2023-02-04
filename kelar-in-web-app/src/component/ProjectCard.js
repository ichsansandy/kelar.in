import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DueDateBadge from "./DueDateBadge";
import ProgressBubble from "./ProgressBubble";

function ProjectCard({ project, isYourProject, isAllTaskComplete }) {
  const id = project.id;
  const navigation = useNavigate();
  const projectLogo = null;

  useEffect(() => {
    // fetchIsAllTaskCompleted();
    // fetchIsYourProject();
  }, []);

  function navigateToProjectDetails() {
    navigation(`/projects/${project?.id}`);
  }

  return (
    <>
      <div className=""></div>
      <div
        key={project?.id}
        onClick={() => {
          navigateToProjectDetails();
        }}
        className={
          "group relative scroll-ml-6 pt-1.5 snap-start min-h-full animate-hover  bg-third-color hover:bg-secondary-color mx-4 rounded-3xl shadow-xl  min-w-200 flex flex-col justify-center items-center cursor-pointer "
          // + (isYourProject ? "min-w-200 " : "min-w-1/4")
        }>
        <div className="absolute -top-5">
          <DueDateBadge dueDate={project.dueDate} endData={project.endDate} />
        </div>
        <ProgressBubble status={project.status} isYourProject={isYourProject} isAllTaskComplete={isAllTaskComplete} />
        {!projectLogo ? (
          <svg className="h-36 w-36 text-white group-hover:text-fourth-color" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" /> <rect x="4" y="4" width="16" height="4" rx="1" /> <rect x="4" y="12" width="6" height="8" rx="1" /> <line x1="14" y1="12" x2="20" y2="12" /> <line x1="14" y1="16" x2="20" y2="16" />{" "}
            <line x1="14" y1="20" x2="20" y2="20" />
          </svg>
        ) : (
          <div>{projectLogo}</div>
        )}
        <div className="w-11/12 rounded-lg text-center group-hover:text-fourth-color group-hover:bg-secondary-color text-white bg-fourth-color">
          <div className="font-bold truncate">{project?.name}</div>
          <div className={"" + (project?.user?.name > 15)}>by {project?.user?.name.split(" ")[0]}</div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default ProjectCard;
