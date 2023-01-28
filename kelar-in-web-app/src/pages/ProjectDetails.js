import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentContainer from "../component/CommentContainer";
import DateBubble from "../component/DateBubble";
import MemberCard from "../component/MemberCard";
import ProjectCard from "../component/ProjectCard";
import TaskContainer from "../component/TaskContainer";

function ProjectDetails() {
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const { id } = useParams();

  const testproject = {
    name: "Alpha Creation",
    startDate: "2023-1-24",
    dueDate: "2023-2-24",
    dueDate: "2023-2-24",
    status: "INPROGRESS",
    user: {
      name: "Ichsan Sandypratama",
    },
  };

  const [project, setProject] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [isYourProject, setisYourProject] = useState(false);
  const [membership, setMembership] = useState([]);
  const [availUser, setAvailUser] = useState([]);

  const fetchProjectDetails = async () => {
    const r = await fetch(`http://localhost:8081/api/project/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem("Authorization")}`,
        "Content-Type": "application/json",
      },
    });

    if (r.ok) {
      return r.json();
    } else {
      toast.error(`Something Wrong, ${r.status} : ${r?.text()}`);
      throw { message: "Something went wrong", status: r.status };
    }
  };

  // function fetchMemberFromProjectId() {
  //   fetch(`http://192.168.100.82:8081/api/project/${id}/membership-availuser`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `${localStorage.getItem("Authorization")}`,
  //     },
  //   })
  //     .then((r) => {
  //       if (r.ok) {
  //         return r.json();
  //       } else {
  //         throw { message: "Error ", status: r.status };
  //       }
  //     })
  //     .then((d) => {
  //       setMembership(d.membership);
  //       setAvailUser(d.availUser);
  //     })
  //     .catch((err) => {
  //       toast.error(err.message);
  //     });
  // }

  useEffect(() => {
    fetchProjectDetails()
      .then((d) => {
        setProject(d);
      })
      .catch((err) => {
        console.error(err);
      });
    // fetchMemberFromProjectId();
  }, []);

  useEffect(() => {
    if (project.user?.name === loggedInUser.name) {
      setisYourProject(true);
    }
  }, [project]);

  const projectLogo = null;

  return (
    <div className="w-7xl min-h-screen flex flex-col justify- xl:flex-row bg-third-color/25">
      <div className="ml-4">
        <div className="bg-third-color/ p-5 flex justify-center items-center lg:flex-row flex-col">
          <div className="flex justify-center h-64 mt-3">
            <ProjectCard project={project} isYourProject={isYourProject} />
            <div className="flex flex-col justify-evenly">
              <DateBubble date={project.startDate} title={"Start"} />
              <DateBubble date={project.dueDate} title={"Due"} />
            </div>
          </div>
          <div className="mx-6 min-w-[369px] lg:w-1/4 w-1/2 my-4 lg:my-0">
            <MemberCard isYourProject={isYourProject} />
          </div>
        </div>
        <div className="flex justify-evenly bg-third-color/">
          <TaskContainer isYourProject={isYourProject} taskList={taskList} projectDueDate = {project.dueDate} />
        </div>
      </div>
      <CommentContainer />
    </div>
  );
}

export default ProjectDetails;
