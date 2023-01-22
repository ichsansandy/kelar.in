import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const [user, setUser] = useState({ username: "", password: "", name: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(user);
    const value = e.target.value;
    return setUser((values) => ({ ...values, [e.target.id]: value }));
  };

  const register = () => {
    console.log(user);
    fetch("http://localhost:8081/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.text();
        } else {
          return toast.error("This didn't work. user or email exist.");
        }
      })
      .then((data) => {
        if (data === "OK") {
          toast.success("User Created Successfully !");
          navigate("/login");
        }
      })
      .catch((err) => {
        toast.error("This didn't work.");
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  return (
    <div>
      <main className="">
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full "
            style={{
              backgroundSize: "100%",
              backgroundImage: "url('/asset/redd-f-5U_28ojjgms-unsplash.jpg')",
            }}></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-secondary-color border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    {/* <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-lg font-bold">Welcome, Partners</h6>
                    </div> */}
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
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <h1 className="text-xl">Join Us</h1>
                    </div>
                    <hr className="mt-6 border-b-1 border-third-color" />
                  </div>

                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-password">
                          Your name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Full Name"
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
                      <div>
                        {/* <label className="inline-flex items-center cursor-pointer">
                        <input id="customCheckLogin" type="checkbox" className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5" style={{ transition: "all .15s ease" }} />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Remember me</span>
                      </label> */}
                      </div>
                      <div class="flex items-start">
                        <div class="flex items-center h-5">
                          <input
                            id="terms"
                            aria-describedby="terms"
                            type="checkbox"
                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            required={true}
                          />
                        </div>
                        <div class="ml-3 text-sm">
                          <label for="terms" class="font-light text-gray-500 dark:text-gray-300">
                            I accept the{" "}
                            <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                              Terms and Conditions
                            </a>
                          </label>
                        </div>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-third-color text-white active:bg-fourth-color text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}>
                          Create an Accout
                        </button>
                      </div>
                    </form>
                    <div className="flex justify-around items-center mt-6">
                      <div className="">
                        <Link to="/login" className="text-third-color hover:text-fourth-color">
                          <medium>Already have an account ?</medium>
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

export default Register;
