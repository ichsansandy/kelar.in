import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import Selector from "../component/Selector";

function NewProject() {
  const listUser = useSelector((s) => s.listUser);
  const [listEditable, setListEditable] = useState([]);
  const [newProject, setNewProject] = useState({});
  const [members, setMembers] = useState([]);

  const [selected, setSelected] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    return setNewProject((values) => ({ ...values, [e.target.id]: value }));
  };

  useEffect(() => {
    setListEditable(listUser);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const removeMember = (member) => {
    setMembers((currMember) => {
      return currMember.filter((m) => {
        if (m !== member) {
          return m;
        }
      });
    });
  };

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
                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Project Name"
                    onChange={handleChange}
                    style={{ transition: "all .15s ease" }}
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-password">
                    Member
                  </label>
                  <div className="flex">
                    {/* <input
                      id="name"
                      type="text"
                      className="border-0 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-4/6 "
                      placeholder="Search User"
                      style={{ transition: "all .15s ease" }}
                    /> */}
                    <div className="w-4/6 "><Selector selected={selected} setSelected={setSelected} lists={listEditable} /></div>
                    <button
                      className="bg-third-color text-white px-5 ml-auto rounded hover:bg-primary-color hover:ring-third-color"
                      onClick={() => {
                        setMembers([...members, selected]);
                      }}>
                      ADD
                    </button>
                  </div>
                  <ul className="list-disc my-5 w-full h-52 overflow-x-auto py-2 px-10 bg-white rounded">
                    {members.map((member) => (
                      <div className="group" onClick={() => removeMember(member)}>
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
                    <input id="startDate" type="date" className="block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5" placeholder="Start date" />
                  </div>
                  <span className="text-lg mx-4"> </span>
                  <div className=" ">
                    <label className="block uppercase text-gray-700 text-sm text-center font-bold mb-2" htmlFor="grid-password">
                      Due date
                    </label>
                    <input id="startDate" type="date" className="block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5" placeholder="Start date" />
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
