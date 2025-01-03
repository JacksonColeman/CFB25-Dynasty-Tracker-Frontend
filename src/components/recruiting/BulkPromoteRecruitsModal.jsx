import React, { useState, useEffect } from "react";
import { useRoster } from "../../contexts/RosterContext";
import { positions } from "../../../public/positions";

const BulkPromoteRecruitsModal = ({ recruits, isOpen, onClose }) => {
  const { bulkAddRecruitsToRoster } = useRoster();
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

  const handlePositionChange = (recruitId, newValue) => {
    setUpdatedRecruits((current) =>
      current.map((recruit) =>
        recruit.id === recruitId
          ? {
              ...recruit,
              position: newValue,
              archetype: positions[newValue][0],
            }
          : recruit
      )
    );
  };

  const handleArchetypeChange = (recruitId, newValue) => {
    setUpdatedRecruits((current) =>
      current.map((recruit) =>
        recruit.id === recruitId
          ? {
              ...recruit,
              archetype: newValue,
            }
          : recruit
      )
    );
  };

  const handleOverallChange = (recruitId, newValue) => {
    setUpdatedRecruits((current) =>
      current.map((recruit) =>
        recruit.id === recruitId
          ? {
              ...recruit,
              overall: newValue,
            }
          : recruit
      )
    );
  };

  const handleDevTraitChange = (recruitId, newValue) => {
    setUpdatedRecruits((current) =>
      current.map((recruit) =>
        recruit.id === recruitId
          ? {
              ...recruit,
              dev_trait: newValue,
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
      onClose();
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-header">
        <h2>Promote Recruits to Players</h2>
        <button onClick={onClose}>×</button>
      </div>

      <div className="modal-body">
        {error && <div className="error-message">{error}</div>}

        <div className="recruits-grid">
          <div className="recruits-header">
            <div className="recruit-header-item">Name</div>
            <div className="recruit-header-item">Position</div>
            <div className="recruit-header-item">Archetype</div>
            <div className="recruit-header-item">Overall</div>
            <div className="recruit-header-item">Dev Trait</div>
          </div>

          <div className="recruits-list">
            {updatedRecruits.map((recruit) => (
              <div key={recruit.id} className="recruit-row">
                <div className="recruit-name">
                  {`${recruit.first_name} ${recruit.last_name}`}
                </div>

                <div className="recruit-position">
                  <select
                    value={recruit.position}
                    onChange={(e) =>
                      handlePositionChange(recruit.id, e.target.value)
                    }
                  >
                    {Object.keys(positions).map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="recruit-archetype">
                  <select
                    value={recruit.archetype}
                    onChange={(e) =>
                      handleArchetypeChange(recruit.id, e.target.value)
                    }
                  >
                    {positions[recruit.position].map((archetype) => (
                      <option key={archetype} value={archetype}>
                        {archetype}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Overall</label>
                  <input
                    type="range"
                    min="40"
                    max="99"
                    value={recruit.overall}
                    onChange={(e) =>
                      handleOverallChange(recruit.id, e.target.value)
                    }
                    className="w-full"
                  />
                  <input
                    type="number"
                    value={recruit.overall}
                    onChange={(e) =>
                      handleOverallChange(recruit.id, e.target.value)
                    }
                    className="w-16 px-2 py-1 border rounded text-right"
                    min="40"
                    max="99"
                  />
                </div>

                <div className="recruit-dev-trait">
                  <select
                    value={recruit.dev_trait}
                    onChange={(e) =>
                      handleDevTraitChange(recruit.id, e.target.value)
                    }
                  >
                    <option value="Normal">Normal</option>
                    <option value="Impact">Impact</option>
                    <option value="Star">Star</option>
                    <option value="Elite">Elite</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Converting..." : "Promote Recruits"}
        </button>
      </div>
    </div>
  );
};

export default BulkPromoteRecruitsModal;
