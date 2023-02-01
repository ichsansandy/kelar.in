import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavCopy from "./component/NavCopy";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Messaging from "./pages/Messaging";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./component/Footer";
import { toast, Toaster } from "react-hot-toast";
import NewProject from "./pages/NewProject";
import PrivateRoute from "./component/PrivateRoute";
import ProjectDetails from "./pages/ProjectDetails";
import Loading from "./component/Loading";
import ScrollToTop from "./scrollToTop";
import MessageRoomDetails from "./component/MessageRoomDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const listUser = useSelector((s) => s.listUser);
  const navigation = useNavigate();
  const [loading, setLoading] = useState(true);

  function fetchUserLoggedIn() {
    fetch("http://localhost:8081/api/user-loggedIn", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else if (r.status === 500) {
          toast.error("You need to re-login");
          navigation("/login");
        }
      })
      .then((d) => {
        setUser(d);
        dispatch({ type: "SET_USER_LOGGEDIN", payload: d });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const fetchListUser = async () => {
    const r = await fetch(`http://localhost:8081/api/all-user-nameonly`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    });
    if (r.ok) {
      return r.json();
    } else {
      throw { message: "error", status: r.status };
    }
  };

  function fetchYourProjectList() {
    fetch(`http://localhost:8081/api/project/created-by-you`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw { message: "error", status: r.status };
        }
      })
      .then((d) => {
        dispatch({ type: "SET_OWN_PROJECT_LIST", payload: d });
      })
      .catch((err) => {
        toast.error(`${err.message} : ${err.status}`);
      });
  }
  function fetchAssignProjectList() {
    fetch(`http://localhost:8081/api/project/assign-to-you`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw { message: "error", status: r.status };
        }
      })
      .then((d) => {
        dispatch({ type: "SET_ASSIGN_PROJECT_LIST", payload: d });
      })
      .catch((err) => {
        toast.error(`${err.message} : ${err.status}`);
      });
  }

  useEffect(
    () => {
      if (localStorage.getItem("Authorization")) {
        setIsLoggedIn(true);
        fetchUserLoggedIn();
        fetchListUser()
          .then((d) => {
            dispatch({ type: "SET_USER_LIST", payload: d });
          })
          .catch((err) => {
            console.log(err);
          });
        fetchAssignProjectList();
        fetchYourProjectList();
      }
      
      window.addEventListener("beforeunload", handleRefresh);

      return () => {
        window.removeEventListener("beforeunload", handleRefresh);
      };
    },
    [
      // localStorage.getItem("Authorization")
    ]
  );

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
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }></Route>
        <Route
          path="/projects/:id"
          element={
            <PrivateRoute>
              <ProjectDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects/new-project"
          element={
            <PrivateRoute>
              <NewProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/messaging"
          element={
            <PrivateRoute>
              <Messaging />
            </PrivateRoute>
          }
        />
        <Route
          path="/messaging/:id"
          element={
            <PrivateRoute>
              <MessageRoomDetails />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
