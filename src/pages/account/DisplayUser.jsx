import React, { useState, useEffect } from "react";

const DisplayUser = () => {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/current_user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username); // Assuming the API response has a `username` field
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch user information.");
        }
      } catch (networkError) {
        setError("Network error occurred while fetching user information.");
      }
    };

    fetchCurrentUser();
  }, []); // Empty dependency array ensures this runs only once on component mount

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="user-display">
      {username ? (
        <p>
          Welcome, <strong>{username}</strong>!
        </p>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default DisplayUser;
