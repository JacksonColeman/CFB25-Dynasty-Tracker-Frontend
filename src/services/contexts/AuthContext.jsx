import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const userData = await api.getCurrentUser();
//         setUser(userData);
//       } catch (err) {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);
// };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("AuthContext: useEffect");
    const checkAuth = async () => {
      try {
        const userData = await api.getCurrentUser();
        setUser(userData);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const userData = await api.login(credentials);
      setUser(userData.user);
    } catch (err) {
      setError(err.message || "An error occurred during login.");
      throw err; // Rethrow the error if you want to propagate it further
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setError(null);
    }
  };

  const resetError = () => {
    setError(null); // Assuming 'setError' is used to handle the authError
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        error,
        resetError,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
