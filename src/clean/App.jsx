import { AuthProvider } from "../contexts/AuthContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DynastyPage from "../components/dynasty-saves/DynastyPage";
import AccountPage from "../components/account/AccountPage";
import RosterPage from "../components/roster/RosterPage";
import RecruitingPage from "../components/recruiting/RecruitingPage";
import Navbar from "../components/Navbar";
import { DynastyProvider } from "../contexts/DynastyContext";
import PrivateRoute from "../PrivateRoute";
import LoginForm from "../components/login-signup/LoginForm";
import RegistrationForm from "../components/login-signup/RegistrationForm";
import { RosterProvider } from "../contexts/RosterContext";
import EditDynastyPage from "../components/my-dynasty/EditDynastyPage";

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
              />
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
