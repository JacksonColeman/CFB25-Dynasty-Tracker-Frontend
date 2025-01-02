import React, { useState, useEffect } from "react";
import { positions } from "../../../public/positions";
import "./styles.css";

const BulkUpdatePlayersModal = ({
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
    setUpdatedPlayers((current) =>
      current.map((player) =>
        player.id === playerId
          ? {
              ...player,
              overall: Math.min(99, Math.max(1, parseInt(newValue) || 40)),
            }
          : player
      )
    );
  };

  const handlePositionChange = (playerId, newValue) => {
    setUpdatedPlayers((current) =>
      current.map((player) =>
        player.id === playerId
          ? {
              ...player,
              position: newValue,
              archetype: positions[newValue][0],
            }
          : player
      )
    );
  };

  const handleArchetypeChange = (playerId, newValue) => {
    setUpdatedPlayers((current) =>
      current.map((player) =>
        player.id === playerId
          ? {
              ...player,
              archetype: newValue,
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
        players: updatedPlayers.map(({ id, overall, position, archetype }) => ({
          id,
          overall,
          position,
          archetype,
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
          <h2 className="text-xl font-bold">Update Players</h2>
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
                <select
                  value={player.position}
                  onChange={(e) =>
                    handlePositionChange(player.id, e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                >
                  {Object.keys(positions).map((positionKey) => (
                    <option key={positionKey} value={positionKey}>
                      {positionKey}
                    </option>
                  ))}
                </select>
                <select
                  id="archetype"
                  name="archetype"
                  value={player.archetype}
                  onChange={(e) =>
                    handleArchetypeChange(player.id, e.target.value)
                  }
                  required
                >
                  {positions[player.position].map((arcOption) => (
                    <option key={arcOption} value={arcOption}>
                      {arcOption}
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
                  value={player.overall}
                  onChange={(e) =>
                    handleOverallChange(player.id, e.target.value)
                  }
                  className="w-full"
                />
                <input
                  type="number"
                  value={player.overall}
                  onChange={(e) =>
                    handleOverallChange(player.id, e.target.value)
                  }
                  className="w-16 px-2 py-1 border rounded text-right"
                  min="40"
                  max="99"
                />
              </div>

              {/* <div className="mt-2">
                <label className="block font-medium">Position</label>
                <select
                  value={player.position}
                  onChange={(e) =>
                    handlePositionChange(player.id, e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                >
                  {Object.keys(positions).map((positionKey) => (
                    <option key={positionKey} value={positionKey}>
                      {positionKey}
                    </option>
                  ))}
                </select>
              </div> */}
              {/* 
              <div className="mt-2">
                <label htmlFor="archetype">Archetype:</label>
                <select
                  id="archetype"
                  name="archetype"
                  value={player.archetype}
                  onChange={(e) =>
                    handleArchetypeChange(player.id, e.target.value)
                  }
                  required
                >
                  {positions[player.position].map((arcOption) => (
                    <option key={arcOption} value={arcOption}>
                      {arcOption}
                    </option>
                  ))}
                </select>
              </div> */}
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
            {loading ? "Updating..." : "Update Players"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkUpdatePlayersModal;
