import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space, Button } from "antd";
import { toast } from "react-hot-toast";

function ProgressBubble({ status, taskAssignUser, taskId, isYourProject, isAllTaskComplete }) {
  const [bgColor, setBgColor] = useState(null);
  const userLoggedIn = useSelector((s) => s.loggedInUser);
  const [isYourTask, setIsYourTask] = useState(false);
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const navigation = useNavigate();
  // const [isYourProject, setIsYourProject] = useState(false);
  // const [isAllTaskComplete, setIsAllTaskComplete] = useState(false);

  // function fetchIsAllTaskCompleted() {
  //   fetch(`http://localhost:8081/api/project/${id}/isalltaskcompleted`, {
  //     headers: {
  //       Authorization: `${localStorage.getItem("Authorization")}`,
  //     },
  //   })
  //     .then((r) => {
  //       if (r.ok) {
  //         return r.json();
  //       }
  //     })
  //     .then((d) => {
  //       setIsAllTaskComplete(d);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // function fetchIsYourProject() {
  //   fetch(`http://localhost:8081/api/project/${id}/isyourProject`, {
  //     headers: {
  //       Authorization: `${localStorage.getItem("Authorization")}`,
  //     },
  //   })
  //     .then((r) => {
  //       if (r.ok) {
  //         return r.json();
  //       }
  //     })
  //     .then((d) => {
  //       setIsYourProject(d);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  function sentComplete(input) {
    fetch(`http://localhost:8081/api/project/${id}/task-status/${taskId}/${input}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
      method: "PUT",
    })
      .then((r) => {
        if (r.ok) {
          return r.text();
        } else {
          throw { message: "ERROR", status: r.status };
        }
      })
      .then((d) => {
        toast.success(`Task Progress Updated`);
        navigation(0);
      })
      .catch((err) => {
        toast.error(`${err.message}` + " " + `${err.status}`);
      });
  }
  function updateProject() {
    fetch(`http://localhost:8081/api/project/${id}/completed`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
      method: "PUT",
    })
      .then((r) => {
        if (r.ok) {
          return r.text();
        } else {
          throw { message: "ERROR", status: r.status };
        }
      })
      .then((d) => {
        toast.success(`Project Progress Updated`);
        navigation(0);
      })
      .catch((err) => {
        toast.error(`${err.message}` + " " + `${err.status}`);
      });
  }

  useEffect(() => {
    // fetchIsAllTaskCompleted();
    // fetchIsYourProject();
    if (taskAssignUser === userLoggedIn.name) {
      setIsYourTask(true);
    }
    if (isYourProject && isAllTaskComplete) {
      switch (status) {
        case "INPROGRESS":
          setBgColor("bg-yellow-300 text-white");
          setItems([
            {
              key: "3",
              label: (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    updateProject();
                  }}
                  className=" hover:font-bold text-green-500">
                  COMPLETED
                </div>
              ),
            },
          ]);
          break;
        default:
          break;
      }
    } else {
      switch (status) {
        case "ASSIGN":
          setBgColor("bg-blue-300 text-white");
          setItems([
            {
              key: "3",
              label: (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    sentComplete(`START`);
                  }}
                  className=" hover:font-bold text-blue-500">
                  START
                </div>
              ),
            },
          ]);
          break;
        case "INPROGRESS":
          setBgColor("bg-yellow-300 text-white");
          setItems([
            {
              key: "3",
              label: (
                <div
                  onClick={(e) => {
                    e.preventDefault();

                    sentComplete(`COMPLETED`);
                  }}
                  className=" hover:font-bold text-green-500">
                  COMPLETED
                </div>
              ),
            },
            {
              key: "1",
              label: (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    sentComplete(`ONHOLD`);
                  }}
                  className=" hover:font-bold ">
                  ONHOLD
                </div>
              ),
              danger: true,
            },
          ]);
          break;
        case "ONHOLD":
          setBgColor("bg-slate-600 text-white");
          setItems([
            {
              key: "1",
              label: (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    sentComplete(`INPROGRESS`);
                  }}
                  className=" hover:font-bold text-yellow-500">
                  INPROGRESS
                </div>
              ),
            },
            {
              key: "3",
              label: (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    sentComplete(`COMPLETED`);
                  }}
                  className=" hover:font-bold text-green-500">
                  COMPLETED
                </div>
              ),
            },
          ]);
          break;
        case "COMPLETED":
          setBgColor("bg-green-500 text-white cursor-not-allowed");
          break;
        default:
          break;
      }
    }
  }, []);

  return (
    <>
      {/* <div className={"px-3 rounded-2xl w-28 " + `${bgColor}`}>{status}</div> */}
      {isYourProject && isAllTaskComplete ? (
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
          arrow={{
            pointAtCenter: true,
          }}>
          <Button className={"px-3 rounded-2xl w-fit " + `${bgColor}`}>{status}</Button>
        </Dropdown>
      ) : isYourTask ? (
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
          arrow={{
            pointAtCenter: true,
          }}>
          <Button className={"px-3 rounded-2xl w-fit " + `${bgColor}`}>{status}</Button>
        </Dropdown>
      ) : (
        <Button className={"px-3 rounded-2xl w-fit cursor-not-allowed " + `${bgColor}`}>{status}</Button>
      )}
    </>
  );
}

export default ProgressBubble;
