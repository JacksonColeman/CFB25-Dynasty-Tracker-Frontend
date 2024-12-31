import React, { useState } from "react";
import { positions } from "../../../public/positions";

const RecruitForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [recruitClass, setRecruitClass] = useState("");
  const [position, setPosition] = useState("");
  const [archetype, setArchetype] = useState("");
  const [athlete, setAthlete] = useState(false);
  const [scouted, setScouted] = useState(false);
  const [gem, setGem] = useState(false);
  const [bust, setBust] = useState(false);
  const [recruitingStage, setRecruitingStage] = useState("");
  const [visitWeek, setVisitWeek] = useState(0);
  const [notes, setNotes] = useState("");

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
    setArchetype(""); // Reset archetype when position changes
  };

  const potentialArchetypes = position ? positions[position] : [];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const recruitData = {
      first_name: firstName,
      last_name: lastName,
      recruit_class: recruitClass,
      star_rating: starRating,
      position: position,
      archetype: archetype,
      athlete: athlete,
      scouted: scouted,
      gem: gem,
      bust: bust,
      recruiting_stage: recruitingStage,
      // visit_week: visitWeek,
      notes: notes,
    };

    try {
      const response = await fetch("/api/recruits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recruitData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Recruit created successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
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
          <label htmlFor="recruitClass">Recruit Class:</label>
          <select
            id="recruitClass"
            value={recruitClass}
            onChange={(e) => setRecruitClass(e.target.value)}
            required
          >
            <option value="">Select</option>
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
            value={starRating}
            onChange={(e) => setStarRating(Number(e.target.value))}
            required
          >
            <option value="">Select</option>
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
            type="text"
            id="position"
            value={position}
            onChange={handlePositionChange}
            required
          >
            <option value="">Select Position</option>
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
            value={archetype}
            onChange={(e) => setArchetype(e.target.value)}
            required
            disabled={!position} // Disable if no position is selected
          >
            <option value="">Select Archetype</option>
            {potentialArchetypes.map((archetype) => (
              <option key={archetype} value={archetype}>
                {archetype}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="athlete">Athlete:</label>
          <input
            type="checkbox"
            id="athlete"
            checked={athlete}
            onChange={(e) => setAthlete(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor="scouted">Scouted:</label>
          <input
            type="checkbox"
            id="scouted"
            checked={scouted}
            onChange={(e) => setScouted(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor="gem">Gem:</label>
          <input
            type="checkbox"
            id="gem"
            checked={gem}
            onChange={(e) => setGem(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor="bust">Bust:</label>
          <input
            type="checkbox"
            id="bust"
            checked={bust}
            onChange={(e) => setBust(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor="recruitingStage">Recruiting Stage:</label>
          <select
            id="recruitingStage"
            value={recruitingStage}
            onChange={(e) => setRecruitingStage(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Open">Open</option>
            <option value="Top 8">Top 8</option>
            <option value="Top 5">Top 5</option>
            <option value="Top 3">Top 3</option>
            <option value="Committed">Committed</option>
          </select>
        </div>

        {/* <div>
          <label htmlFor="visitWeek">Visit Week:</label>
          <input
            type="number"
            id="visitWeek"
            value={visitWeek}
            onChange={(e) => setVisitWeek(e.target.value)}
          />
        </div> */}

        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button type="submit">Create Recruit</button>
      </form>
    </div>
  );
};

export default RecruitForm;
