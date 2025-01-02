import React, { useState, useEffect } from "react";
import "./styles.css";

const ManageRedshirtsModal = ({
  players = [],
  isOpen,
  onClose,
  updatePlayers,
}) => {
  const [updatedPlayers, setUpdatedPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (players) {
      // Filter players where redshirted is false
      setUpdatedPlayers(
        players
          .filter((player) => !player.redshirted)
          .map((player) => ({
            id: player.id,
            first_name: player.first_name,
            last_name: player.last_name,
            current_redshirt: player.current_redshirt,
          }))
      );
    }
  }, [players]);

  const handleRedshirtChange = (playerId, newValue) => {
    setUpdatedPlayers((current) =>
      current.map((player) =>
        player.id === playerId
          ? {
              ...player,
              current_redshirt: newValue,
            }
          : player
      )
    );
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
      onClose();
    } catch (err) {
      setError("Failed to update players");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Manage Redshirt Status</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {updatedPlayers.map((player) => (
            <div key={player.id} className="bulk-update-player-item">
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  {player.first_name} {player.last_name}
                </span>
                <input
                  type="checkbox"
                  checked={player.current_redshirt}
                  onChange={(e) =>
                    handleRedshirtChange(player.id, e.target.checked)
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? "Updating..." : "Update Redshirt Status"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageRedshirtsModal;
