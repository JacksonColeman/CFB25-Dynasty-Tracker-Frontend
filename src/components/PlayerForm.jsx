import React, { useState } from "react";

const PlayerForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [classYear, setClassYear] = useState("");
  const [position, setPosition] = useState("");
  const [archetype, setArchetype] = useState("");
  const [overall, setOverall] = useState(0);
  const [devTrait, setDevTrait] = useState("");
  const [redshirted, setRedshirted] = useState(false);
  const [currentRedshirt, setCurrentRedshirt] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const playerData = {
      first_name: firstName,
      last_name: lastName,
      class_year: classYear,
      position: position,
      archetype: archetype,
      overall: overall,
      dev_trait: devTrait,
      redshirted: redshirted,
      current_redshirt: currentRedshirt,
    };

    try {
      const response = await fetch("/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playerData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Player created successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (err) {
      console.error("Error creating player:", err);
      alert("An error occurred while creating the player.");
    }
  };

  return (
    <div>
      <h2>Create Player</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="classYear">Class Year:</label>
          <input
            type="text"
            id="classYear"
            value={classYear}
            onChange={(e) => setClassYear(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="archetype">Archetype:</label>
          <input
            type="text"
            id="archetype"
            value={archetype}
            onChange={(e) => setArchetype(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="overall">Overall:</label>
          <input
            type="number"
            id="overall"
            value={overall}
            onChange={(e) => setOverall(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="devTrait">Development Trait:</label>
          <input
            type="text"
            id="devTrait"
            value={devTrait}
            onChange={(e) => setDevTrait(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="redshirted">Redshirted:</label>
          <input
            type="checkbox"
            id="redshirted"
            checked={redshirted}
            onChange={(e) => setRedshirted(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor="currentRedshirt">Current Redshirt:</label>
          <input
            type="checkbox"
            id="currentRedshirt"
            checked={currentRedshirt}
            onChange={(e) => setCurrentRedshirt(e.target.checked)}
          />
        </div>

        <button type="submit">Create Player</button>
      </form>
    </div>
  );
};

export default PlayerForm;
