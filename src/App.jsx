// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DynastyPage from "./pages/dynasty/DynastyPage";
import AccountPage from "./pages/account/AccountPage";
import RosterPage from "./pages/roster/RosterPage";
import RecruitingPage from "./pages/recruiting/RecruitingPage";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./services/contexts/AuthContext";
import { DynastyProvider } from "./services/contexts/DynastyContext";
import PrivateRoute from "./PrivateRoute";
import LoginForm from "./pages/auth/login/LoginForm";
import RegistrationForm from "./pages/auth/signup/RegistrationForm";
import { RosterProvider } from "./services/contexts/RosterContext";
import EditDynastyPage from "./pages/dynasty/ManageDynasty/EditDynastyPage";
import EncourageTransferPage from "./pages/roster/RemovingPlayers/EncourageTransfers/EncourageTransferPage";
import RecruitDisplay from "./pages/recruiting/RecruitingBoard/RecruitDisplay";
import BulkPromoteRecruitsModal from "./pages/recruiting/PromoteToRoster/BulkPromoteRecruitsModal";
import RecruitForm from "./pages/recruiting/CreateRecruits/RecruitForm";
import ViewRosterPage from "./pages/roster/ViewRoster/ViewRosterPage";
import CreatePlayerPage from "./pages/roster/CreatePlayer/CreatePlayerPage";
import ManageRedshirtsPage from "./pages/roster/ManageRedshirts/ManageRedshirtsPage";
import PlayersLeavingPage from "./pages/roster/RemovingPlayers/PlayersLeaving/PlayersLeavingPage";
import PositionChangesPage from "./pages/roster/UpdatePlayers/PositionChanges/PositionChangesPage";
import TrainingResultsPage from "./pages/roster/UpdatePlayers/TrainingResults/TrainingResultsPage";

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
                <Route path="create" element={<CreatePlayerPage />} />
                <Route path="training" element={<TrainingResultsPage />} />
                <Route
                  path="position-changes"
                  element={<PositionChangesPage />}
                />
                <Route path="redshirts" element={<ManageRedshirtsPage />} />
                <Route
                  path="players-leaving"
                  element={<PlayersLeavingPage />}
                />
                <Route path="cuts" element={<EncourageTransferPage />} />
                <Route index element={<ViewRosterPage />} />
              </Route>
              <Route
                path="/recruiting"
                element={
                  <PrivateRoute>
                    <RecruitingPage />
                  </PrivateRoute>
                }
              >
                <Route path="create" element={<RecruitForm />} />
                <Route path="promote" element={<BulkPromoteRecruitsModal />} />
                <Route index element={<RecruitDisplay />} />
              </Route>
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
