import React, { useEffect, useState } from "react";
import "./styles.css"; // Ensure the path matches where your CSS file is located

const RecruitTable = () => {
  const [recruits, setRecruits] = useState([]);
  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(null); // Track which recruit's form is visible

  // Fetch recruits data
  useEffect(() => {
    const fetchRecruits = async () => {
      try {
        const response = await fetch("api/dynasties/current/recruits");
        if (response.ok) {
          const data = await response.json();
          setRecruits(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch recruits.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    };

    fetchRecruits();
  }, []);

  // Handle updating recruit to player
  const handleConvertToPlayer = async (
    recruitId,
    overall,
    position,
    archetype,
    devTrait
  ) => {
    try {
      const response = await fetch(
        `api/recruits/${recruitId}/convert_to_player`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            overall,
            position,
            dev_trait: devTrait,
            archetype,
          }),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setRecruits((prevRecruits) =>
          prevRecruits.map((recruit) =>
            recruit.id === updatedData.id ? updatedData : recruit
          )
        );
        setFormVisible(null); // Hide the form after conversion
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to convert recruit to player.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h2>Recruits in Current Dynasty</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Athlete</th>
            <th>Archetype</th>
            <th>Star Rating</th>
            <th>Scouted</th>
            <th>Gem</th>
            <th>Bust</th>
            <th>Recruiting Stage</th>
            <th>Notes</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {recruits.map((recruit) => (
            <tr key={recruit.id}>
              <td>{recruit.first_name}</td>
              <td>{recruit.last_name}</td>
              <td>{recruit.position}</td>
              <td>{recruit.athlete ? "Yes" : "No"}</td>
              <td>{recruit.archetype}</td>
              <td>{recruit.star_rating}</td>
              <td>{recruit.scouted ? "Yes" : "No"}</td>
              <td>{recruit.gem ? "Yes" : "No"}</td>
              <td>{recruit.bust ? "Yes" : "No"}</td>
              <td>{recruit.recruiting_stage}</td>
              <td>{recruit.notes}</td>
              {/* <td>
                <button
                  onClick={() =>
                    setFormVisible(
                      formVisible === recruit.id ? null : recruit.id
                    )
                  } // Toggle visibility
                >
                  Convert to Player
                </button>

                {formVisible === recruit.id && (
                  <div style={{ marginTop: "10px" }}>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target;
                        const selectedPosition = form.position.value;
                        const selectedArchetype = form.archetype.value;
                        const selectedOverall = form.overall.value;
                        const selectedDevTrait = form.dev_trait.value;
                        handleConvertToPlayer(
                          recruit.id,
                          selectedOverall,
                          selectedPosition,
                          selectedArchetype,
                          selectedDevTrait
                        );
                      }}
                    >
                      <div>
                        <label>
                          Position:
                          <input type="text" name="position" required />
                        </label>
                      </div>
                      <div>
                        <label>
                          Archetype:
                          <input type="text" name="archetype" required />
                        </label>
                      </div>
                      <div>
                        <label>
                          Overall:
                          <input type="text" name="overall" required />
                        </label>
                      </div>
                      <div>
                        <label>
                          Dev Trait:
                          <input type="text" name="dev_trait" required />
                        </label>
                      </div>
                      <div>
                        <button type="submit">Submit</button>
                        <button
                          type="button"
                          onClick={() => setFormVisible(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecruitTable;
