import React, { useState, useEffect } from "react";
import { useRoster } from "../../../services/contexts/RosterContext";

const ManageRedshirtsModal = () => {
  const [updatedPlayers, setUpdatedPlayers] = useState([]);
  const [initialPlayers, setInitialPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { players, bulkUpdateRedshirt: updatePlayers } = useRoster();

  useEffect(() => {
    if (players) {
      const filteredPlayers = players
        .filter((player) => !player.redshirted)
        .map((player) => ({
          id: player.id,
          first_name: player.first_name,
          last_name: player.last_name,
          current_redshirt: player.current_redshirt,
          position: player.position,
          overall: player.overall,
        }));
      setUpdatedPlayers(filteredPlayers);
      setInitialPlayers(filteredPlayers); // Keep a copy of the original state for comparison
    }
  }, [players]);

  const handleRedshirtChange = (playerId, newValue) => {
    setUpdatedPlayers((current) =>
      current.map((player) =>
        player.id === playerId
          ? { ...player, current_redshirt: newValue }
          : player
      )
    );
  };

  const hasChanges = () => {
    return JSON.stringify(updatedPlayers) !== JSON.stringify(initialPlayers);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await updatePlayers({
        players: updatedPlayers.map(({ id, current_redshirt }) => ({
          id,
          current_redshirt,
        })),
      });
      setInitialPlayers(updatedPlayers); // Sync initial state with updated state after saving
    } catch {
      setError("Failed to update players");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h2>Manage Redshirt Status</h2>

        {error && <div>{error}</div>}

        {updatedPlayers.map((player) => (
          <div key={player.id}>
            <label>
              <input
                type="checkbox"
                checked={player.current_redshirt}
                onChange={(e) =>
                  handleRedshirtChange(player.id, e.target.checked)
                }
              />
              <span>
                {player.first_name} {player.last_name} - {player.overall} OVR{" "}
                {player.position}
              </span>
            </label>
          </div>
        ))}

        <div>
          <button onClick={handleSubmit} disabled={!hasChanges() || loading}>
            {loading ? "Updating..." : "Update Redshirt Status"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageRedshirtsModal;
