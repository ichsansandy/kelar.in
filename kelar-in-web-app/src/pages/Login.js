import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <main className="">
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-repeat"
            style={{
              backgroundSize: "100%",
              backgroundImage: "url('/asset/redd-f-5U_28ojjgms-unsplash.jpg')",
            }}></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-secondary-color border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-lg font-bold">Welcome, Partners</h6>
                    </div>
                    {/* <div className="btn-wrapper text-center">
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        disabled="true"
                        style={{ transition: "all .15s ease" }}>
                        Github
                      </button>
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        disabled="true"
                        style={{ transition: "all .15s ease" }}>
                        Google
                      </button>
                    </div> */}
                    <hr className="mt-6 border-b-1 border-third-color" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <h1 className="text-xl">Login</h1>
                    </div>
                    <form>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-password">
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-password">
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <div>
                        {/* <label className="inline-flex items-center cursor-pointer">
                          <input id="customCheckLogin" type="checkbox" className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5" style={{ transition: "all .15s ease" }} />
                          <span className="ml-2 text-sm font-semibold text-gray-700">Remember me</span>
                        </label> */}
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-third-color text-white active:bg-fourth-color text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}>
                          Sign In
                        </button>
                      </div>
                    </form>
                    <div className="flex justify-around items-center mt-6">
                      <div className="">
                        <Link to="" className="text-third-color hover:text-fourth-color">
                          <medium>Forgot password?</medium>
                        </Link>
                      </div>
                      <div className="">
                        <Link to="/register" className="text-third-color hover:text-fourth-color ">
                          <medium>Create new account</medium>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
