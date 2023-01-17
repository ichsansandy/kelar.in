import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavCopy from "./component/NavCopy";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Calendar from "./pages/Calendar";
import { useDispatch } from "react-redux";

function App() {


  return (
    <div className="App">
      <NavCopy />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </div>
  );
}

export default App;
