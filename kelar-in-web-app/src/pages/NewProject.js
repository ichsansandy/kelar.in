import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import Selector from "../component/Selector";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../component/ConfirmationModal";

function NewProject() {
  const navigation = useNavigate();
  const members = useSelector((s) => s.newMemberProject);
  const dispatch = useDispatch();
  const listUser = useSelector((s) => s.listUser);
  const loggedInUser = useSelector((s) => s.loggedInUser);
  const [listEditable, setListEditable] = useState([]);
  const [newProject, setNewProject] = useState({});
  // const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);
    return setNewProject((values) => ({ ...values, [e.target.id]: value }));
  };

  useEffect(() => {
    fetchListUser();
    dispatch({ type: "SET_MEMBER", payload: [] });
    setListEditable(listUser.sort());
    setListEditable((currState) => {
      return currState.filter((u) => {
        if (u !== loggedInUser.name) {
          return u;
        }
      });
    });
    setTodayDate(new Date().toLocaleDateString("en-ca"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postNewProject();
  };

  const removeFromMember = (member) => {
    dispatch({ type: "REMOVE_MEMBER", payload: member });
    // setMembers((currMember) => {
    //   return currMember.filter((m) => {
    //     if (m !== member) {
    //       return m;
    //     }
    //   });
    // });
    setListEditable([...listEditable, member]);
  };

  const addToMember = (input) => {
    if (input !== "") {
      // setMembers([...members, input]);
      // if (members.length === 0) {
      // dispatch({ type: "SET_MEBER", payload: [input] });
      // } else {
      dispatch({ type: "ADD_MEMBER", payload: input });
      // }
      console.log(members);
      setNewProject({ ...newProject, members: members });
      toast.success("succesfully added to member");
      //remove from list editable to prevent duplicate
      setListEditable((state) => {
        return state.filter((s) => {
          if (s !== input) {
            return s;
          }
        });
      });
      setSelected("");
    } else {
      toast.error("Please Choose User");
    }
  };

  function postNewProject() {
    setNewProject({ ...newProject, members: members });
    console.log(newProject);
    fetch("http://localhost:8081/api/project", {
      method: "POST",
      headers: {
        Authorization: `${localStorage.getItem("Authorization")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw { message: "ERROR ", status: r.status, body: `${r.text()}` };
        }
      })
      .then(
        (d) => {
          console.log(d);
          toast.success("Succesfully create project");
          dispatch({ type: "SET_MEMBER", payload: [] });
          navigation(`/projects/${d.id}`);
        }
        // postNewMemberProject(d?.id);
      )
      .catch((err) => {
        toast.error("err " + err.body);
      });
  }
  function fetchListUser() {
    console.log("fetching all user list only name data");
    fetch(`http://localhost:8081/api/all-user-nameonly`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((r) => r.json())
      .then((d) => {
        dispatch({ type: "SET_USER_LIST", payload: d });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="container mx-auto p-10 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-secondary-color border-0">
              <form onSubmit={handleSubmit} className="p-10">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-password">
                    Project Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full invalid:ring-red-500"
                    placeholder="Project Name"
                    onChange={handleChange}
                    style={{ transition: "all .15s ease" }}
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-password">
                    Member
                  </label>
                  <div className={isOpen ? " flex" : " hidden"}>
                    <div className="w-4/6 ">
                      <Selector selected={selected} setSelected={setSelected} lists={listEditable} />
                    </div>
                    <button
                      className="bg-third-color text-white px-2 ml-auto rounded hover:bg-primary-color hover:ring-third-color"
                      type="button"
                      onClick={() => {
                        addToMember(selected);
                      }}>
                      ADD
                    </button>
                    <button
                      className="bg-third-color text-white px-2 ml-auto rounded hover:bg-primary-color hover:ring-third-color"
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        // fetchMember();
                        console.log(members);
                      }}>
                      SAVE
                    </button>
                  </div>
                  <div className={"absolute p-2 inset-x-0  w-full top rounded bg-primary-color text-fourth-color font-extrabold z-30 " + (isOpen ? "hidden" : "")}>Members</div>
                  <button className={"animate-hover group hover:bg-primary-color/75 absolute right-0  bg-fourth-color z-40 p-2 rounded " + (isOpen ? " hidden" : " ")} onClick={() => setIsOpen(true)}>
                    <svg className="h-6 w-6 group-hover:text-fourth-color text-white" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" /> <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" /> <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" /> <line x1="16" y1="5" x2="19" y2="8" />
                    </svg>
                  </button>
                  <ul className="list-disc my-5 w-full h-52 overflow-x-auto py-2 pt-6 px-10 bg-white rounded">
                    {members.map((member) => (
                      <div className="group" onClick={() => removeFromMember(member)}>
                        <li className=" p-0 text-left ">
                          {member}
                          <span className="text-third-color invisible group-hover:visible"> click to remove</span>
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>

                <div className="relative w-full mb-3 flex justify-evenly items-center">
                  <div className=" ">
                    <label className="block uppercase text-gray-700 text-sm text-center font-bold mb-2" htmlFor="grid-password">
                      Start date
                    </label>
                    <input
                      id="startDate"
                      onChange={handleChange}
                      required
                      min={todayDate}
                      type="date"
                      className="block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5"
                      placeholder="Start date"
                    />
                  </div>
                  <span className="text-lg mx-4"> </span>
                  <div className=" ">
                    <label className="block uppercase text-gray-700 text-sm text-center font-bold mb-2" htmlFor="grid-password">
                      Due date
                    </label>
                    <input
                      id="dueDate"
                      onChange={handleChange}
                      required
                      min={newProject.startDate}
                      type="date"
                      className="block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5"
                      placeholder="Due date"
                    />
                  </div>
                </div>

                <div className="text-center mt-6">
                  <button
                    className="bg-third-color text-white hover:bg-fourth-color text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    type="submit"
                    style={{ transition: "all .15s ease" }}>
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProject;
