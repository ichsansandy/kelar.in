import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Selector from "./Selector";

export default function NewTaskModal({ setTasks, tasks }) {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [members, setMembers] = useState([]);
  const [newTask, setNewTask] = useState({});
  const [isChangeSelected, setisChangeSelected] = useState(true);
  const [isSelected, setisSelected] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setNewTask((values) => ({ ...values, [e.target.id]: value }));
  };

  const handleSubmit = () => {
    setNewTask({ ...newTask, user: `${selected}` });
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
        setTasks([...tasks, d]);
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
        className="absolute  right-0 -top-[1.1px] w-10 h-full bg-third-color text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}>
        <svg className="absolute inset-[10px]  h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <div className="" hidden={isChangeSelected ? false : true}>
                        <label className="font-bold w-1/4">Assign User :</label>
                        <input id="user" value={selected} onChange={handleChange} type="text" disabled className="placeholder:text-gray-300 placeholder:font-normal border-transparent p-2 " placeholder="Task name" />
                      </div>
                      <div className="w-full justify-between">
                        <div className="w-3/4">
                          <Selector selected={selected} setSelected={setSelected} lists={members} />
                        </div>
                        <button onClick={(e) => e.preventDefault()} className="bg-third-color">
                          add
                        </button>
                      </div>
                      <div>
                        <label className="font-bold w-1/4">Due Date :</label>
                        <input id="dueDate" onChange={handleChange} type="date" className="placeholder:text-gray-300 placeholder:font-normal border-transparent p-2  ml-5" placeholder="Task name" />
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
