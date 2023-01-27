import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Selector from "./Selector";

export default function NewTaskModal({ setTasks, tasks, projectDueDate }) {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [members, setMembers] = useState([]);
  const [newTask, setNewTask] = useState({});
  const [isUserAdd, setIsUserAdd] = useState(false);
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setNewTask((values) => ({ ...values, [e.target.id]: value }));
  };

  function addToNewTask(input) {
    if (input !== null) {
      setNewTask({ ...newTask, user: `${input}` });
      toast.success("Assign " + input);
    }
  }

  const handleSubmit = () => {
    console.log(newTask);
    fetch(`http://localhost:8081/api/project/${id}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
      body: JSON.stringify(newTask),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw { message: "Error", status: r.status };
        }
      })
      .then((d) => {
        // setTasks([...tasks, d]);
        dispatch({type:"ADD_TASK_LIST", payload: d})

        toast.success("New Task Assign");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  function fetchMember() {
    fetch(`http://localhost:8081/api/project/${id}/membership-availuser`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw { message: "Error ", status: r.status };
        }
      })
      .then((d) => {
        setMembers(d.membership);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
  useEffect(() => {
    fetchMember();
  }, []);

  return (
    <>
      <button
        className="absolute  right-0 -top-[1.1px] w-10 h-full bg-fourth-color text-white hover:bg-primary-color/75 group font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}>
        <svg className="absolute inset-[10px] group-hover:text-fourth-color   h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {" "}
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /> <line x1="12" y1="8" x2="12" y2="16" /> <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">New Task</h3>
                  <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowModal(false)}>
                    ×
                  </button>
                </div>
                {/*body*/}
                <form className="relative p-6 flex-auto ">
                  <textarea id="taskName" onChange={handleChange} type="text" className="w-[300px] h-[200px] placeholder:text-gray-300 placeholder:font-normal border-transparent p-2 m-1 " placeholder="Task name" />
                  <div className="text-sm text-black font-normal">
                    <div className="flex flex-col items-start">
                      {/* Selected Assign User if you want to change */}
                      <div className="relative" hidden={isUserAdd ? false : true}>
                        <label className="font-bold w-1/4">Assign User :</label>
                        <input id="user" value={user} onChange={handleChange} type="text" disabled className="placeholder:text-gray-300 placeholder:font-normal border-transparent p-2 " placeholder="Task name" />
                        <button
                          className={"animate-hover group hover:bg-primary-color/75 absolute -right-15 top-3 bg-fourth-color z-40 p-[1.5px] rounded " + (!isUserAdd ? " hidden" : " ")}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsUserAdd(false);
                          }}>
                          <svg className="h-6 w-6 group-hover:text-fourth-color text-white" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            {" "}
                            <path stroke="none" d="M0 0h24v24H0z" /> <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /> <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                            <line x1="16" y1="5" x2="19" y2="8" />
                          </svg>
                        </button>
                      </div>
                      {/* Search Assign User And Select */}
                      <div className={"w-full flex flex-row justify-between " + (isUserAdd ? " hidden" : " ")}>
                        <div className="w-3/4">
                          <Selector selected={selected} setSelected={setSelected} lists={members} />
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setUser(selected);
                            addToNewTask(selected);
                            setIsUserAdd(true);
                          }}
                          className="bg-third-color">
                          add
                        </button>
                      </div>
                      {/* Due date task */}
                      <div>
                        <label className="font-bold w-1/4">Due Date :</label>
                        <input id="dueDate" max={new Date(projectDueDate).toLocaleDateString("en-ca")} min={new Date().toLocaleDateString("en-ca")} onChange={handleChange} type="date" className="placeholder:text-gray-300 placeholder:font-normal border-transparent p-2  ml-5" placeholder="Task name" />
                      </div>
                    </div>
                  </div>
                </form>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}>
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                      setShowModal(false);
                    }}>
                    Create New Task
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
