import React, { useState, useEffect } from "react";
import { positions } from "../../../utils/positions";
import { useRoster } from "../../../services/contexts/RosterContext";

const EditPlayerForm = ({ player, saveEdit }) => {
  const {
    id,
    first_name,
    last_name,
    position,
    archetype,
    class_year,
    overall,
    dev_trait,
    redshirted,
    current_redshirt,
  } = player;

  const { updatePlayer } = useRoster();

  // Initialize form state with the player's attributes
  const [formValues, setFormValues] = useState({
    firstName: first_name || "",
    lastName: last_name || "",
    position: position || "",
    archetype: archetype || "",
    classYear: class_year || "",
    overall: overall || 0,
    devTrait: dev_trait || "Normal",
    redshirted: redshirted || false,
    currentRedshirt: current_redshirt || false,
  });

  const handleUpdate = async (playerId) => {
    const updatedPlayer = {
      ...formValues,
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      class_year: formValues.classYear,
      position: formValues.position,
      archetype: formValues.archetype,
      overall: formValues.overall,
      dev_trait: formValues.devTrait,
      redshirted: formValues.redshirted,
      current_redshirt: formValues.currentRedshirt,
    };

    console.log("Updating player:", updatedPlayer);
    try {
      updatePlayer(playerId, { player: updatedPlayer });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePositionChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      position: value,
      archetype: positions[value][0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(id);
    saveEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="position">Position:</label>
        <select
          id="position"
          name="position"
          value={formValues.position}
          onChange={handlePositionChange}
          required
        >
          {Object.keys(positions).map((positionKey) => (
            <option key={positionKey} value={positionKey}>
              {positionKey}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="archetype">Archetype:</label>
        <select
          id="archetype"
          name="archetype"
          value={formValues.archetype}
          onChange={handleChange}
          required
        >
          {positions[formValues.position].map((arcOption) => (
            <option key={arcOption} value={arcOption}>
              {arcOption}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>
          Class Year:
          <select
            name="classYear"
            value={formValues.classYear}
            onChange={handleChange}
          >
            <option value="Freshman">Freshman</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
            {formValues.classYear == "Graduate" ? (
              <option value="Graduate">Graduate</option>
            ) : null}
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="overall">Overall:</label>
        <input
          type="range"
          id="overall"
          name="overall"
          min="1"
          max="99"
          onInput={(e) => {
            // If the input value is outside the allowed range, prevent further input
            if (e.target.value < 1) e.target.value = 1;
            if (e.target.value > 99) e.target.value = 99;
          }}
          value={formValues.overall}
          onChange={handleChange}
        />
        <input
          type="number"
          name="overall"
          value={formValues.overall}
          onChange={handleChange}
          min="1"
          max="99"
          onInput={(e) => {
            // If the input value is outside the allowed range, prevent further input
            if (e.target.value < 1) e.target.value = 1;
            if (e.target.value > 99) e.target.value = 99;
          }}
          style={{ width: "50px", marginLeft: "10px" }}
        />
      </div>
      <div>
        <label>
          Dev Trait:
          <select
            name="devTrait"
            value={formValues.devTrait}
            onChange={handleChange}
          >
            <option value="Normal">Normal</option>
            <option value="Impact">Impact</option>
            <option value="Star">Star</option>
            <option value="Elite">Elite</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Redshirted:
          <input
            type="checkbox"
            name="redshirted"
            checked={formValues.redshirted}
            onChange={handleChange}
            disabled={formValues.currentRedshirt}
          />
        </label>
      </div>
      <div>
        <label>
          Current Redshirt:
          <input
            type="checkbox"
            name="currentRedshirt"
            checked={formValues.currentRedshirt}
            onChange={handleChange}
            disabled={formValues.redshirted}
          />
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditPlayerForm;
