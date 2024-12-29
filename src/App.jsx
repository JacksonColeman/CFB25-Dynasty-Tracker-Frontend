import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import LogoutButton from "./components/LogoutButton";
import DisplayUser from "./components/DisplayUser";
import LoginForm from "./components/LoginForm";
import CreateDynastyForm from "./components/CreateDynastyForm";
import DynastyList from "./components/DynastyList";
import DeleteUser from "./components/DeleteUser";
import UpdateUser from "./components/UpdateUser";
import PlayerForm from "./components/Playerform";
import PlayerTable from "./components/PlayerTable";
import RecruitForm from "./components/RecruitForm";
import RecruitTable from "./components/RecruitTable";
import useAuth from "./hooks/useAuth";
import LoginPage from "./components/LoginPage";
import { Routes, Route } from "react-router-dom";
import DynastyPage from "./components/DynastyPage";
import AccountPage from "./components/AccountPage";
import RosterPage from "./components/RosterPage";
import RecruitingPage from "./components/RecruitingPage";
import Navbar from "./components/Navbar";

function App() {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/saves" element={<DynastyPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/roster" element={<RosterPage />} />
        <Route path="/recruiting" element={<RecruitingPage />} />
      </Routes>
    </>
  );
}

export default App;
