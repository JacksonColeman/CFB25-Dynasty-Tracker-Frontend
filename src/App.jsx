import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DynastyPage from "./components/dynasty-saves/DynastyPage";
import AccountPage from "./components/account/AccountPage";
import RosterPage from "./components/roster/RosterPage";
import RecruitingPage from "./components/recruiting/RecruitingPage";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import { DynastyProvider } from "./contexts/DynastyContext";
import PrivateRoute from "./PrivateRoute";
import LoginForm from "./components/login-signup/LoginForm";
import RegistrationForm from "./components/login-signup/RegistrationForm";
import { RosterProvider } from "./contexts/RosterContext";
import EditDynastyPage from "./components/my-dynasty/EditDynastyPage";
import PlayerForm from "./components/roster/PlayerForm";
import { Navigate } from "react-router-dom";
import PlayerDisplay from "./components/roster/PlayerDisplay";
import ManageRedshirtsModal from "./components/roster/ManageRedshirtsModal";
import BulkUpdatePlayersModal from "./components/roster/BulkUpdatePlayersModal";
import EncourageTransferPage from "./components/roster/EncourageTransferPage";

function App() {
  return (
    <AuthProvider>
      <DynastyProvider>
        <RosterProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<RegistrationForm />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <DynastyPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <PrivateRoute>
                    <AccountPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/roster"
                element={
                  <PrivateRoute>
                    <RosterPage />
                  </PrivateRoute>
                }
              >
                <Route path="create" element={<PlayerForm />} />
                <Route
                  path="training"
                  element={
                    <BulkUpdatePlayersModal
                      key={1}
                      readOnlyPositionArchetype={true}
                    />
                  }
                />
                <Route
                  path="position-changes"
                  element={<BulkUpdatePlayersModal key={2} />}
                />
                <Route path="redshirts" element={<ManageRedshirtsModal />} />
                <Route
                  path="players-leaving"
                  element={
                    <EncourageTransferPage sortDirectionAscending={false} />
                  }
                />
                <Route path="cuts" element={<EncourageTransferPage />} />
                <Route index element={<PlayerDisplay />} />
              </Route>
              <Route
                path="/recruiting"
                element={
                  <PrivateRoute>
                    <RecruitingPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mydynasty"
                element={
                  <PrivateRoute>
                    <EditDynastyPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </RosterProvider>
      </DynastyProvider>
    </AuthProvider>
  );
}

export default App;
