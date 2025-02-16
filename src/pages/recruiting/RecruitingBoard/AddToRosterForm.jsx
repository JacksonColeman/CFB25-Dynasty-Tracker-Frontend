import { useState } from "react";
import PropTypes from "prop-types";
import { useRoster } from "../../../services/contexts/RosterContext";
import { positions } from "../../../utils/positions";

const AddToRosterForm = ({ recruit, closeForm }) => {
  const { addRecruitToRoster } = useRoster();

  //   predicted overall from MaxPlaysCFB
  const overallMap = {
    5: 25,
    4: 22,
    3: 14,
    2: 7,
    1: 0,
  };

  const positionOverallMap = {
    QB: 2,
    HB: 1,
    FB: 3,
    WR: 0,
    TE: 1,
    LT: 2,
    RT: 2,
    LG: 2,
    RG: 2,
    C: 0,
    LE: 2,
    RE: 2,
    DT: 2,
    LOLB: 2,
    ROLB: 2,
    MLB: 2,
    CB: 3,
    FS: 2,
    SS: 2,
    K: 2,
    P: 3,
  };

  const [formData, setFormData] = useState({
    position: recruit.position || "",
    archetype: recruit.archetype || "",
    overall:
      50 +
        overallMap[recruit.star_rating] +
        positionOverallMap[recruit.position] || "",
    dev_trait: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePositionChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      position: value,
      archetype: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRecruitToRoster(recruit.id, formData);
      closeForm(); // Close the form upon successful submission
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h3>Add Recruit to Roster</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="position">Position:</label>
          <select
            id="position"
            name="position"
            value={formData.position}
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
            value={formData.archetype}
            onChange={handleInputChange}
            required
          >
            {positions[formData.position].map((arcOption) => (
              <option key={arcOption} value={arcOption}>
                {arcOption}
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
            onInput={(e) => {
              // If the input value is outside the allowed range, prevent further input
              if (e.target.value < 1) e.target.value = 1;
              if (e.target.value > 99) e.target.value = 99;
            }}
            value={formData.overall}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="overall"
            value={formData.overall}
            onChange={handleInputChange}
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
              name="dev_trait"
              value={formData.dev_trait}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Normal">Normal</option>
              <option value="Impact">Impact</option>
              <option value="Star">Star</option>
              <option value="Elite">Elite</option>
            </select>
          </label>
        </div>
        <div style={{ marginTop: "10px" }}>
          <button type="submit">Add to Roster</button>
          <button
            type="button"
            onClick={closeForm}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
AddToRosterForm.propTypes = {
  recruit: PropTypes.object.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default AddToRosterForm;
