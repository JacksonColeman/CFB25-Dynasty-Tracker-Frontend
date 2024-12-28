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

function App() {
  return (
    <>
      <h1>College Football 25 Dynasty Tracker</h1>

      <RegistrationForm />
      <LoginForm />
      <DisplayUser />
      <UpdateUser />
      <DeleteUser />
      <LogoutButton />
      <CreateDynastyForm />
      <DynastyList />
      <PlayerForm />
      <PlayerTable />
    </>
  );
}

export default App;
