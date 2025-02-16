import { useState, useEffect } from "react";

const UpdateUser = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch current user's details on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/current_user");
        if (!response.ok) {
          throw new Error("Not logged in");
        }
        const userData = await response.json();
        setUserId(userData.id);
        setUsername(userData.username); // Pre-fill with current username
        setEmail(userData.email); // Pre-fill with current email
      } catch {
        setError("Could not fetch current user");
      }
    };

    fetchCurrentUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("No user is logged in.");
      return;
    }

    const updatedData = {
      username,
      email,
    };

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH", // Use PATCH for partial updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: updatedData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred");
        setMessage(null);
      } else {
        await response.json();
        setMessage("User details updated successfully");
        setError(null);
      }
    } catch {
      setError("Failed to update user");
      setMessage(null);
    }
  };

  return (
    <div>
      <h2>Update User Information</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit">Update</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UpdateUser;
