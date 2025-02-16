import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { positions } from "../../../../utils/positions";
import { useRoster } from "../../../../services/contexts/RosterContext";

const BulkUpdatePlayersModal = ({ readOnlyPositionArchetype = false }) => {
  const [updatedPlayers, setUpdatedPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const { players, bulkUpdatePlayers: updatePlayers } = useRoster();

  useEffect(() => {
    if (players) {
      setUpdatedPlayers(
        players.map((player) => ({
          id: player.id,
          overall: player.overall,
          first_name: player.first_name,
          last_name: player.last_name,
          position: player.position,
          archetype: player.archetype,
        }))
      );
    }
  }, [players]);

  const handleOverallChange = (playerId, newValue) => {
    setUpdatedPlayers((current) => {
      const updated = current.map((player) =>
        player.id === playerId
          ? {
              ...player,
              overall: Math.min(99, Math.max(40, parseInt(newValue) || 40)),
            }
          : player
      );

      // Check for changes
      setIsDirty(
        JSON.stringify(updated) !==
          JSON.stringify(
            players.map(({ id, overall, position, archetype }) => ({
              id,
              overall,
              position,
              archetype,
            }))
          )
      );

      return updated;
    });
  };

  const handlePositionChange = (playerId, newValue) => {
    setUpdatedPlayers((current) => {
      const updated = current.map((player) =>
        player.id === playerId
          ? {
              ...player,
              position: newValue,
              archetype: positions[newValue][0],
            }
          : player
      );

      // Check for changes
      setIsDirty(
        JSON.stringify(updated) !==
          JSON.stringify(
            players.map(({ id, overall, position, archetype }) => ({
              id,
              overall,
              position,
              archetype,
            }))
          )
      );

      return updated;
    });
  };

  const handleArchetypeChange = (playerId, newValue) => {
    setUpdatedPlayers((current) => {
      const updated = current.map((player) =>
        player.id === playerId
          ? {
              ...player,
              archetype: newValue,
            }
          : player
      );

      // Check for changes
      setIsDirty(
        JSON.stringify(updated) !==
          JSON.stringify(
            players.map(({ id, overall, position, archetype }) => ({
              id,
              overall,
              position,
              archetype,
            }))
          )
      );

      return updated;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("handle submit try block");
      await updatePlayers({
        players: updatedPlayers.map(({ id, overall, position, archetype }) => ({
          id,
          overall,
          position,
          archetype,
        })),
      });
      setIsDirty(false); // Reset unsaved changes
    } catch {
      setError("Failed to update players");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}

      {updatedPlayers.map((player) => (
        <div key={player.id}>
          <div>
            <span>
              {player.first_name} {player.last_name}
            </span>

            {readOnlyPositionArchetype ? (
              <div>
                <div>{player.position}</div>
                <div>{player.archetype}</div>
              </div>
            ) : (
              <>
                <select
                  value={player.position}
                  onChange={(e) =>
                    handlePositionChange(player.id, e.target.value)
                  }
                >
                  {Object.keys(positions).map((positionKey) => (
                    <option key={positionKey} value={positionKey}>
                      {positionKey}
                    </option>
                  ))}
                </select>
                <select
                  value={player.archetype}
                  onChange={(e) =>
                    handleArchetypeChange(player.id, e.target.value)
                  }
                >
                  {positions[player.position].map((arcOption) => (
                    <option key={arcOption} value={arcOption}>
                      {arcOption}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          <div>
            <label>Overall</label>
            <input
              type="range"
              min="40"
              max="99"
              value={player.overall}
              onChange={(e) => handleOverallChange(player.id, e.target.value)}
            />
            <input
              type="number"
              min="40"
              max="99"
              value={player.overall}
              onChange={(e) => handleOverallChange(player.id, e.target.value)}
            />
          </div>
        </div>
      ))}

      <div>
        <button onClick={handleSubmit} disabled={loading || !isDirty}>
          {loading ? "Updating..." : "Update Players"}
        </button>
      </div>
    </div>
  );
};
BulkUpdatePlayersModal.propTypes = {
  readOnlyPositionArchetype: PropTypes.bool,
};

export default BulkUpdatePlayersModal;
