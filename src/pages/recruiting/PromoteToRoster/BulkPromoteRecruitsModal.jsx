import React, { useState, useEffect } from "react";
import { useRoster } from "../../../services/contexts/RosterContext";
import { positions } from "../../../utils/positions";

const BulkPromoteRecruitsModal = () => {
  const { bulkAddRecruitsToRoster, recruits } = useRoster();
  const [updatedRecruits, setUpdatedRecruits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (recruits) {
      setUpdatedRecruits(
        recruits.map((recruit) => ({
          id: recruit.id,
          first_name: recruit.first_name,
          last_name: recruit.last_name,
          position: recruit.position,
          archetype: recruit.archetype,
          overall:
            50 +
            overallMap[recruit.star_rating] +
            (positionOverallMap[recruit.position] || 0),
          dev_trait: "Normal",
        }))
      );
    }
  }, [recruits]);

  const handleChange = (recruitId, field, value) => {
    setUpdatedRecruits((current) =>
      current.map((recruit) =>
        recruit.id === recruitId
          ? {
              ...recruit,
              [field]: field === "position" ? value : recruit[field],
              archetype:
                field === "position" ? positions[value][0] : recruit.archetype,
            }
          : recruit
      )
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const recruitData = {
        recruits: updatedRecruits.map(
          ({ id, overall, position, archetype, dev_trait }) => ({
            id,
            overall,
            position,
            archetype,
            dev_trait,
          })
        ),
      };

      await bulkAddRecruitsToRoster(recruitData);
    } catch (err) {
      setError("An error occurred while promoting recruits.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Promote Recruits to Roster</h2>

      {error && <p>{error}</p>}

      {updatedRecruits.map((recruit) => (
        <div key={recruit.id}>
          <p>{`${recruit.first_name} ${recruit.last_name}`}</p>

          <select
            value={recruit.position}
            onChange={(e) =>
              handleChange(recruit.id, "position", e.target.value)
            }
          >
            {Object.keys(positions).map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>

          <select
            value={recruit.archetype}
            onChange={(e) =>
              handleChange(recruit.id, "archetype", e.target.value)
            }
          >
            {positions[recruit.position].map((archetype) => (
              <option key={archetype} value={archetype}>
                {archetype}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="40"
            max="99"
            value={recruit.overall}
            onChange={(e) =>
              handleChange(recruit.id, "overall", e.target.value)
            }
          />

          <select
            value={recruit.dev_trait}
            onChange={(e) =>
              handleChange(recruit.id, "dev_trait", e.target.value)
            }
          >
            <option value="Normal">Normal</option>
            <option value="Impact">Impact</option>
            <option value="Star">Star</option>
            <option value="Elite">Elite</option>
          </select>
        </div>
      ))}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Converting..." : "Promote Recruits"}
      </button>
    </div>
  );
};

export default BulkPromoteRecruitsModal;
