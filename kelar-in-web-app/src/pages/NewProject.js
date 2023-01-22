import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function NewProject() {
  const listUser = useSelector((s) => s.listUser);
  const [newProject, setNewProject] = useState({});
  const [searchUser, setSearchUser] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    return setNewProject((values) => ({ ...values, [e.target.id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                    Email
                  </label>
                  <input
                    type="email"
                    id="username"
                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Email"
                    onChange={handleChange}
                    style={{ transition: "all .15s ease" }}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                    placeholder="Password"
                    onChange={handleChange}
                    style={{ transition: "all .15s ease" }}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-password">
                    Range date
                  </label>
                  <input id="startDate" type="date" className="inline bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-5/12 p-2.5" placeholder="Start date" />
                  <span className="text-lg mx-4"> to </span>
                  <input id="startDate" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-5/12 p-2.5" placeholder="Start date" />
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
