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
import Calendar from "./pages/Calendar";
import { useDispatch } from "react-redux";
import Footer from "./component/Footer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import NewProject from "./pages/NewProject";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      <Toaster />
      <NavCopy isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
