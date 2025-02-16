import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRoster } from "../../../services/contexts/RosterContext";
import ManageRedshirtsPlayerItem from "./ManageRedshirtsPlayerItem";

const ManageRedshirtsManager = ({ players }) => {
  const [updatedPlayers, setUpdatedPlayers] = useState([]);
  const [initialPlayers, setInitialPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { bulkUpdateRedshirt: updatePlayers } = useRoster();

  useEffect(() => {
    if (players) {
      setUpdatedPlayers(players);
      setInitialPlayers(players);
    }
  }, [players]);

  const handleRedshirtChange = (playerId) => {
    setUpdatedPlayers((current) =>
      current.map(
        (player) =>
          player.id === playerId
            ? { ...player, current_redshirt: !player.current_redshirt } // Toggle the boolean value
            : player // Leave other players unchanged
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
      setInitialPlayers(updatedPlayers);
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
        <ManageRedshirtsPlayerItem
          key={player.id}
          player={player}
          onRedshirtChange={handleRedshirtChange}
        />
      ))}

      <div>
        <button onClick={handleSubmit} disabled={!hasChanges() || loading}>
          {loading ? "Updating..." : "Update Redshirt Status"}
        </button>
      </div>
    </div>
  );
};
ManageRedshirtsManager.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      current_redshirt: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default ManageRedshirtsManager;
