import { useState } from "react";
import { positions } from "../../../utils/positions";
import { useRoster } from "../../../services/contexts/RosterContext";

const RecruitForm = () => {
  const defaultValues = {
    firstName: "",
    lastName: "",
    starRating: "",
    recruitClass: "High School",
    position: "",
    archetype: "",
    athlete: false,
    scouted: false,
    gem: false,
    bust: false,
    recruitingStage: "",
    notes: "",
  };

  const [formValues, setFormValues] = useState(defaultValues);

  const { createRecruit } = useRoster();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePositionChange = (e) => {
    const { value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      position: value,
      archetype: "", // Reset archetype when position changes
    }));
  };

  const potentialArchetypes = formValues.position
    ? positions[formValues.position]
    : [];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const recruitData = {
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      recruit_class: formValues.recruitClass,
      position: formValues.position,
      archetype: formValues.archetype,
      star_rating: formValues.starRating,
      athlete: formValues.athlete,
      scouted: formValues.scouted,
      gem: formValues.gem,
      bust: formValues.bust,
      recruiting_stage: formValues.recruitingStage,
      notes: formValues.notes,
    };

    try {
      await createRecruit(recruitData);
      // alert("Recruit created successfully!");
      setFormValues(defaultValues); // Reset form after submission
    } catch (err) {
      console.error("Error creating recruit:", err);
      alert("An error occurred while creating the recruit.");
    }
  };

  return (
    <div>
      <h2>Create Recruit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="recruitClass">Recruit Class:</label>
          <select
            id="recruitClass"
            value={formValues.recruitClass}
            onChange={handleChange}
            required
          >
            <option value="High School">High School</option>
            <option value="JUCO (FR)">JUCO (FR)</option>
            <option value="JUCO (SO)">JUCO (SO)</option>
            <option value="Transfer (FR)">Transfer (FR)</option>
            <option value="Transfer (SO)">Transfer (SO)</option>
            <option value="Transfer (JR)">Transfer (JR)</option>
          </select>
        </div>

        <div>
          <label htmlFor="starRating">Star Rating:</label>
          <select
            id="starRating"
            value={formValues.starRating}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select
            </option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>

        <div>
          <label htmlFor="position">Position:</label>
          <select
            id="position"
            value={formValues.position}
            onChange={handlePositionChange}
            required
          >
            <option value="" disabled>
              Select Position
            </option>
            {Object.keys(positions).map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="archetype">Archetype:</label>
          <select
            id="archetype"
            value={formValues.archetype}
            onChange={handleChange}
            required
            disabled={!formValues.position} // Disable if no position is selected
          >
            <option value="" disabled>
              Select Archetype
            </option>
            {potentialArchetypes.map((arc) => (
              <option key={arc} value={arc}>
                {arc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="athlete">Athlete:</label>
          <input
            type="checkbox"
            id="athlete"
            checked={formValues.athlete}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="scouted">Scouted:</label>
          <input
            type="checkbox"
            id="scouted"
            checked={formValues.scouted}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="gem">Gem:</label>
          <input
            type="checkbox"
            id="gem"
            checked={formValues.gem}
            onChange={handleChange}
            disabled={!formValues.scouted || formValues.bust}
          />
        </div>

        <div>
          <label htmlFor="bust">Bust:</label>
          <input
            type="checkbox"
            id="bust"
            checked={formValues.bust}
            onChange={handleChange}
            disabled={!formValues.scouted || formValues.gem}
          />
        </div>

        <div>
          <label htmlFor="recruitingStage">Recruiting Stage:</label>
          <select
            id="recruitingStage"
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
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            value={formValues.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Create Recruit</button>
      </form>
    </div>
  );
};

export default RecruitForm;
