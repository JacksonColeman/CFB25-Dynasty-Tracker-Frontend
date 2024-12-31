import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RegistrationForm from "./components/login-signup/RegistrationForm";
import LogoutButton from "./components/account/LogoutButton";
import DisplayUser from "./components/account/DisplayUser";
import LoginForm from "./components/login-signup/LoginForm";
import CreateDynastyForm from "./components/dynasty-saves/CreateDynastyForm";
import DynastyList from "./components/dynasty-saves/DynastyList";
import DeleteUser from "./components/account/DeleteUser";
import UpdateUser from "./components/UpdateUser";
import PlayerForm from "./components/roster/PlayerForm";
import PlayerTable from "./components/roster/PlayerTable";
import RecruitForm from "./components/recruiting/RecruitForm";
import RecruitTable from "./components/recruiting/RecruitTable";
import useAuth from "./hooks/useAuth";
import LoginPage from "./components/login-signup/LoginPage";
import { Routes, Route } from "react-router-dom";
import DynastyPage from "./components/dynasty-saves/DynastyPage";
import AccountPage from "./components/account/AccountPage";
import RosterPage from "./components/roster/RosterPage";
import RecruitingPage from "./components/recruiting/RecruitingPage";
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
