import React, { useEffect, useState } from "react";

const DynastyList = () => {
  // State to hold the dynasties, current dynasty, and error messages
  const [dynasties, setDynasties] = useState([]);
  const [currentDynasty, setCurrentDynasty] = useState(null);
  const [error, setError] = useState(null);
  const [editingDynasty, setEditingDynasty] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedYear, setUpdatedYear] = useState("");

  // Fetch dynasties from the API on component mount
  useEffect(() => {
    const fetchDynasties = async () => {
      try {
        const response = await fetch("/api/dynasties");
        if (response.ok) {
          const data = await response.json();
          setDynasties(data); // Set dynasties in state
          setError(null); // Clear any previous errors
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch dynasties.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    };

    const fetchCurrentDynasty = async () => {
      try {
        const response = await fetch("/api/dynasties/current");
        if (response.ok) {
          const data = await response.json();
          setCurrentDynasty(data); // Set current dynasty in state
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch current dynasty.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    };

    fetchDynasties();
    fetchCurrentDynasty();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Set the selected dynasty as the current one
  const setCurrent = async (dynastyId) => {
    try {
      const response = await fetch("/api/dynasties/set_current", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: dynastyId }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentDynasty(data); // Set the newly selected dynasty as current
        setError(null); // Clear previous error
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to set current dynasty.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  // Handle dynasty update
  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/dynasties/${editingDynasty.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dynasty_name: updatedName,
          year: updatedYear,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setDynasties((prevDynasties) =>
          prevDynasties.map((dynasty) =>
            dynasty.id === data.id ? data : dynasty
          )
        );
        setEditingDynasty(null); // Close the edit form
        setUpdatedName("");
        setUpdatedYear("");
        setError(null); // Clear previous error
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update dynasty.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  // Handle dynasty deletion
  const handleDelete = async (dynastyId) => {
    try {
      const response = await fetch(`/api/dynasties/${dynastyId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDynasties((prevDynasties) =>
          prevDynasties.filter((dynasty) => dynasty.id !== dynastyId)
        );
        setError(null); // Clear previous error
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to delete dynasty.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Dynasty List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message if there's one */}
      {currentDynasty ? (
        <div>
          <h3>Current Dynasty</h3>
          <p>
            <strong>{currentDynasty.dynasty_name}</strong> (
            {currentDynasty.school_name}) - {currentDynasty.year}
          </p>
        </div>
      ) : (
        <p>No current dynasty set.</p>
      )}
      <ul>
        {dynasties.length === 0 ? (
          <li>No dynasties available.</li> // If no dynasties, show this message
        ) : (
          dynasties.map((dynasty) => (
            <li key={dynasty.id}>
              <strong>{dynasty.dynasty_name}</strong> ({dynasty.school_name}) -{" "}
              {dynasty.year}
              <button onClick={() => setCurrent(dynasty.id)}>
                Set as Current
              </button>
              <button
                onClick={() => {
                  setEditingDynasty(dynasty);
                  setUpdatedName(dynasty.dynasty_name);
                  setUpdatedYear(dynasty.year);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(dynasty.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
      {editingDynasty && (
        <div>
          <h3>Edit Dynasty</h3>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Dynasty Name"
          />
          <input
            type="number"
            value={updatedYear}
            onChange={(e) => setUpdatedYear(e.target.value)}
            placeholder="Year"
          />
          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => setEditingDynasty(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default DynastyList;
