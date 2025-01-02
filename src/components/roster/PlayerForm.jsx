import React, { useState } from "react";
import { positions } from "../../../public/positions";
import { useRoster } from "../../contexts/RosterContext";

const PlayerForm = () => {
  const defaultValues = {
    firstName: "",
    lastName: "",
    classYear: "",
    position: "",
    archetype: "",
    overall: 75,
    devTrait: "Normal",
    redshirted: false,
    currentRedshirt: false,
  };

  const [formData, setFormData] = useState(defaultValues);

  const { createPlayer } = useRoster();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePositionChange = (e) => {
    const newPosition = e.target.value;
    setFormData((prev) => ({
      ...prev,
      position: newPosition,
      archetype: "", // Reset archetype when position changes
    }));
  };

  const potentialArchetypes = formData.position
    ? positions[formData.position]
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();

    const playerData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      class_year: formData.classYear,
      position: formData.position,
      archetype: formData.archetype,
      overall: formData.overall,
      dev_trait: formData.devTrait,
      redshirted: formData.redshirted,
      current_redshirt: formData.currentRedshirt,
    };

    createPlayer(playerData);
    setFormData(defaultValues);
  };

  return (
    <div>
      <p>Create Player</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="classYear">Class Year:</label>
          <select
            id="classYear"
            name="classYear"
            value={formData.classYear}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Freshman">Freshman</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div>
          <label htmlFor="position">Position:</label>
          <select
            id="position"
            name="position"
            value={formData.position}
            onChange={handlePositionChange}
            required
          >
            <option value="" disabled>
              Select Position
            </option>
            {Object.keys(positions).map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="archetype">Archetype:</label>
          <select
            id="archetype"
            name="archetype"
            value={formData.archetype}
            onChange={handleChange}
            required
            disabled={!formData.position} // Disable if no position is selected
          >
            <option value="" disabled>
              Select Archetype
            </option>
            {potentialArchetypes.map((archetype) => (
              <option key={archetype} value={archetype}>
                {archetype}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="overall">Overall:</label>
          <input
            type="range"
            id="overall"
            name="overall"
            min="1"
            max="99"
            value={formData.overall}
            onChange={handleChange}
          />
          <input
            type="number"
            id="overallNumber"
            name="overall"
            value={formData.overall}
            onChange={handleChange}
            min="1"
            max="99"
            onInput={(e) => {
              // If the input value is outside the allowed range, prevent further input
              if (e.target.value < 1) e.target.value = 1;
              if (e.target.value > 99) e.target.value = 99;
            }}
          />
        </div>

        <div>
          <label htmlFor="devTrait">Development Trait:</label>
          <select
            id="devTrait"
            name="devTrait"
            value={formData.devTrait}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Development Trait
            </option>
            <option value="Normal">Normal</option>
            <option value="Impact">Impact</option>
            <option value="Star">Star</option>
            <option value="Elite">Elite</option>
          </select>
        </div>

        <div>
          <label htmlFor="redshirted">Redshirted:</label>
          <input
            type="checkbox"
            id="redshirted"
            name="redshirted"
            checked={formData.redshirted}
            onChange={handleChange}
            disabled={formData.currentRedshirt}
          />
        </div>

        <div>
          <label htmlFor="currentRedshirt">Current Redshirt:</label>
          <input
            type="checkbox"
            id="currentRedshirt"
            name="currentRedshirt"
            checked={formData.currentRedshirt}
            onChange={handleChange}
            disabled={formData.redshirted}
          />
        </div>

        <button type="submit">Create Player</button>
      </form>
    </div>
  );
};

export default PlayerForm;
