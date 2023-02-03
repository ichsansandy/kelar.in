import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AssignProject from "../component/AssignProject";
import ProjectCard from "../component/ProjectCard";
import Test from "../component/TrialHover";

function Projects() {
  const quotes = ["it's looking like a slow day", "Every day is a chance to begin again.", "Do or Do not, there is no try", "Be patient with yourself. Self-growth is tender"];
  const random = Math.floor(Math.random() * quotes.length);
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const [projects, setProjects] = useState([]);
  const [input, setInput] = useState("");

  function fetchAllProject() {
    fetch(`http://localhost:8081/api/projects`, {
      headers: {
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
      })
      .then((d) => {
        setProjects(d);
      })
      .catch((err) => toast.error(err));
  }

  useEffect(() => {
    fetchAllProject();
  }, []);

  return (
    <div
      className="flex-col bg-repeat m-7 p-2"
      // style={{ backgroundImage: "url(/asset/background-repeat-removebg-preview.png)" }}
    >
      <h1 className="text-left text-7xl m-5">Hi {loggedInUser?.name?.split(" ")[0]}</h1>
      <h3 className="text-left text-2xl m-6">{quotes[random]}</h3>
      <div className="bg-secondary-color/50 flex-col justify-self-end items-end m-5 p-5 rounded-lg border-4 border-secondary-color-200 border-y-third-color ">
        <input onChange={(e) => setInput(e.target.value)} value={input} className="w-[435px] py-2 px-4 text-2xl mr-6 mb-4 border-b-4 border-b-third-color " placeholder="Type project name you want to search" />
        <div className="flex">
          <ul className={"grid grid-cols-5 w-full  m-10  gap-y-10 "}>
            {projects.map((project) => (
              <div className={`h-72 + ${project.name.toLowerCase().includes(input) ? " " : "hidden"}`} key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Projects;
