import React from "react";
import { useDispatch } from "react-redux";
import AssignProject from "../component/AssignProject";
import ProjectCard from "../component/ProjectCard";
import YourProjectContainer from "../component/YourProjectContainer";

function Home({ loggedInUser }) {
  const quotes = ["it's looking like a slow day", "Every day is a chance to begin again.", "Do or Do not, there is no try", "Be patient with yourself. Self-growth is tender"];
  const random = Math.floor(Math.random() * quotes.length);

  return (
    <div
      className="flex-col bg-repeat m-7 p-2"
      // style={{ backgroundImage: "url(/asset/background-repeat-removebg-preview.png)" }}
    >
      <h1 className="text-left text-7xl m-5">Hi {loggedInUser?.name?.split(" ")[0]}</h1>
      <h3 className="text-left text-2xl m-6">{quotes[random]}</h3>
      <YourProjectContainer />
      <AssignProject />
    </div>
  );
}

export default Home;
