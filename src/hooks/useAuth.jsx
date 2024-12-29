import React, { useState, useEffect } from "react";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login status
  const [user, setUser] = useState(null); // Stores user data if logged in

  const checkUserStatus = async () => {
    try {
      const response = await fetch("/api/current_user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok && data.id) {
        setIsLoggedIn(true); // User is logged in
        setUser(data); // Save user data
      } else {
        setIsLoggedIn(false); // User is not logged in
        setUser(null); // Clear user data
      }
    } catch {
      setIsLoggedIn(false); // Fallback for unexpected errors
      setUser(null);
    }
  };

  useEffect(() => {
    checkUserStatus(); // Check login status when the component mounts
  }, []);

  return { isLoggedIn, user };
};

export default useAuth;
