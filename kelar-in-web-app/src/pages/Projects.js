import React from "react";
import { Outlet } from "react-router-dom";
import Test from "../component/TrialHover";

function Projects() {
  const bg = "kelar-in-web-app\\public\\asset\\background-repeat-removebg-preview.png";

  return (
    <div className="">
      Project
      <Test/>
    </div>
  );
}

export default Projects;
