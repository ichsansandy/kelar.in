import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";

function YourProjectContainer() {
  const projects = useSelector((s) => s.ownProjects);
  const navigate = useNavigate();

  const addNewProject = () => {
    navigate("/projects/new-project")
  };

  return (
    <div className="bg-secondary-color/50 min-w-[500px] w-7/12 flex-col justify-self-end items-end m-5 p-5 rounded-lg border-4 border-secondary-color-200 border-y-third-color ">
      <div className=" w-fit py-2 px-4 text-3xl mr-6 mb-4 border-b-4 border-b-third-color ">Your Project</div>
      <div className="flex ">
        <button className="min-w-200 text-secondary-color h-80 bg-fourth-color  my-4 mx-2 rounded-3xl shadow-lg flex-col justify-center items-center p-7 hover:bg-secondary-color/50 hover:text-fourth-color" onClick={addNewProject}>
          <svg className="h-40 w-40  text-center hover:text-fourth-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
            />
          </svg>
          <h1 className="text-2xl font-bold ">New Project</h1>
        </button>
        <ul className="flex items-center w-3/4 snap-x overflow-x-auto p-4 pt-7 mx-1 ">
          {projects.map((project) => (
            <div className="h-full" key={project.id}>
              <ProjectCard project={project} isYourProject={true} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default YourProjectContainer;
