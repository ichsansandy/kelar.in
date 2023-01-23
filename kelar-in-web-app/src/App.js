import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavCopy from "./component/NavCopy";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Messaging from "./pages/Messaging";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./component/Footer";
import { Toaster } from "react-hot-toast";
import NewProject from "./pages/NewProject";
import PrivateRoute from "./component/PrivateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const listUser = useSelector((s) => s.listUser);

  function fetchUser() {
    fetch("http://192.168.100.82:8081/api/user-loggedIn", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((r) => r.json())
      .then((d) => {
        setUser(d);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchListUser() {
    fetch(`http://192.168.100.82:8081/api/all-user-nameonly`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((r) => r.json())
      .then((d) => {
        console.log(d);
        console.log(listUser);
        dispatch({ type: "SET_USER_LIST", payload: d });
        console.log(listUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("Authorization")) {
      fetchUser();
      fetchListUser();
    }
  }, [localStorage.getItem("Authorization")]);

  return (
    <div className="App">
      <Toaster />
      <NavCopy isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loggedInUser={user} />
      <Routes>
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home loggedInUser={user} />
            </PrivateRoute>
          }></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="/projects/new-project" element={<NewProject />} />
        <Route path="/messaging" element={<Messaging />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
