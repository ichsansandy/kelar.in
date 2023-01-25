import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn, setUser }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [input, setInput] = useState({});

  const handleChange = (e) => {
    const value = e.target.value;
    setInput((values) => ({ ...values, [e.target.id]: value }));
  };

  function login(e) {
    e.preventDefault();
    fetch("http://localhost:8081/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Login Successfully !");
          return res.json();
        }
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("Authorization", "Bearer " + data.token);
          setIsLoggedIn(true);
          dispatch({ type: "MENU_LOGIN" });
          navigation("/");
          navigation(0);
        }
      })
      .catch((err) => {
        toast.error("This didn't work. Server Error");
        console.log(err);
      });
  }

  function fetchUser() {
    console.log("manggil fetch user");
    // fetch("http://192.168.100.82:8081/api/user-loggedIn", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `${localStorage.getItem("Authorization")}`,
    //   },
    // })
    //   .then((r) => r.json())
    //   .then((d) => {
    //     console.log("user data ");
    //     console.log(d);
    //     setUser(d);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

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
                    <hr className="mt-6 border-b-1 border-third-color" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <h1 className="text-xl">Login</h1>
                    </div>
                    <form onSubmit={login}>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-password">
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                          id="username"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-password">
                          Password
                        </label>
                        <input
                          id="password"
                          onChange={handleChange}
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
                          type="submit"
                          style={{ transition: "all .15s ease" }}>
                          Sign In
                        </button>
                      </div>
                    </form>
                    <div className="flex justify-around items-center mt-6">
                      <div className="">
                        <Link to="" className="text-third-color hover:text-fourth-color">
                          <h1>Forgot password?</h1>
                        </Link>
                      </div>
                      <div className="">
                        <Link to="/register" className="text-third-color hover:text-fourth-color ">
                          <h1>Create new account</h1>
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
