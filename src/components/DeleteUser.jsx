import React, { useState, useEffect } from "react";

const DeleteUser = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState(null);

  // Fetch the current user's id when the component mounts
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/current_user");
        if (!response.ok) {
          throw new Error("Not logged in");
        }
        const userData = await response.json();
        setUserId(userData.id); // Save user id for the delete request
      } catch (error) {
        setError("Could not fetch current user");
      }
    };

    fetchCurrentUser();
  }, []);

  const handleDelete = async () => {
    if (!userId) {
      setError("No user is logged in.");
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred");
        setMessage(null);
      } else {
        const data = await response.json();
        setMessage(data.message);
        setError(null);
      }
    } catch (error) {
      setError("Failed to delete user");
      setMessage(null);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} style={{ color: "red" }}>
        Delete Account
      </button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeleteUser;
