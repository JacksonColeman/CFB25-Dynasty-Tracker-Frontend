import React, { useEffect, useState } from "react";

const DynastyList = () => {
  // State to hold the dynasties, current dynasty, and error messages
  const [dynasties, setDynasties] = useState([]);
  const [currentDynasty, setCurrentDynasty] = useState(null);
  const [error, setError] = useState(null);

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
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default DynastyList;
