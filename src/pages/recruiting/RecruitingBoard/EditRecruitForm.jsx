import React, { useState } from "react";
import { positions } from "../../../utils/positions";
import { useRoster } from "../../../services/contexts/RosterContext";

const EditRecruitForm = ({ recruit, saveEdit }) => {
  const { updateRecruit } = useRoster();

  const {
    id,
    first_name,
    last_name,
    position,
    archetype,
    athlete,
    recruit_class,
    star_rating,
    scouted,
    gem,
    bust,
    recruiting_stage,
    notes,
  } = recruit;

  // Initialize form state with recruit's attributes
  const [formValues, setFormValues] = useState({
    firstName: first_name || "",
    lastName: last_name || "",
    position: position || "",
    archetype: archetype || "",
    athlete: athlete || false,
    recruitClass: recruit_class || "",
    starRating: star_rating || 1,
    scouted: scouted || false,
    gem: gem || false,
    bust: bust || false,
    recruitingStage: recruiting_stage || "",
    notes: notes || "",
  });

  const handleUpdate = async (recruitId) => {
    const updatedRecruit = {
      ...formValues,
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      position: formValues.position,
      archetype: formValues.archetype,
      athlete: formValues.athlete,
      recruit_class: formValues.recruitClass,
      star_rating: formValues.starRating,
      scouted: formValues.scouted,
      gem: formValues.gem,
      bust: formValues.bust,
      recruiting_stage: formValues.recruitingStage,
      notes: formValues.notes,
    };

    try {
      updateRecruit(recruitId, { recruit: updatedRecruit });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(e.target.name);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleScoutedChange = (e) => {
    const { checked } = e.target; // Use `checked` for checkboxes
    setFormValues((prevValues) => ({
      ...prevValues,
      scouted: checked,
      gem: checked ? prevValues.gem : false, // Retain current value if scouted is true; otherwise, set to false
      bust: checked ? prevValues.bust : false, // Retain current value if scouted is true; otherwise, set to false
    }));
  };

  const handlePositionChange = (e) => {
    const { value } = e.target;
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
        <label htmlFor="athlete">Athlete:</label>
        <input
          type="checkbox"
          name="athlete"
          checked={formValues.athlete}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>
          Recruit Class:
          <select
            name="recruitClass"
            value={formValues.recruitClass}
            onChange={handleChange}
          >
            <option value="High School">High School</option>
            <option value="JUCO (FR)">JUCO (FR)</option>
            <option value="JUCO (SO)">JUCO (SO)</option>
            <option value="Transfer (FR)">Transfer (FR)</option>
            <option value="Transfer (SO)">Transfer (SO)</option>
            <option value="Transfer (JR)">Transfer (JR)</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Star Rating:
          <select
            name="starRating"
            value={formValues.starRating}
            onChange={handleChange}
          >
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Scouted:
          <input
            type="checkbox"
            name="scouted"
            checked={formValues.scouted}
            onChange={handleScoutedChange}
          />
        </label>
      </div>

      <div>
        <label>
          Gem:
          <input
            type="checkbox"
            name="gem"
            checked={formValues.gem}
            onChange={handleChange}
            disabled={!formValues.scouted || formValues.bust}
          />
        </label>
      </div>

      <div>
        <label>
          Bust:
          <input
            type="checkbox"
            name="bust"
            checked={formValues.bust}
            onChange={handleChange}
            disabled={!formValues.scouted || formValues.gem}
          />
        </label>
      </div>

      <div>
        <label htmlFor="recruitingStage">Recruiting Stage:</label>
        <select
          name="recruitingStage"
          value={formValues.recruitingStage}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select
          </option>
          <option value="Open">Open</option>
          <option value="Top 8">Top 8</option>
          <option value="Top 5">Top 5</option>
          <option value="Top 3">Top 3</option>
          <option value="Committed">Committed</option>
        </select>
      </div>

      <div>
        <label>
          Notes:
          <textarea
            name="notes"
            value={formValues.notes}
            onChange={handleChange}
            rows="4"
          />
        </label>
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default EditRecruitForm;
