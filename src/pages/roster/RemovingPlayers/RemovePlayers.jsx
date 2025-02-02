import React, { useState } from "react";
import { useRoster } from "../../../services/contexts/RosterContext";
import PlayersLeavingPlayerItem from "./PlayersLeaving/PlayersLeavingPlayerItem";

const RemovePlayers = ({ players, type }) => {
  const { deletePlayers } = useRoster();
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Toggle selection of a player
  const togglePlayerSelection = (playerId) => {
    setSelectedPlayerIds((prevSelected) => {
      const isSelected = prevSelected.includes(playerId);
      setHasUnsavedChanges(true); // Mark changes as unsaved
      if (isSelected) {
        return prevSelected.filter((id) => id !== playerId);
      } else {
        return [...prevSelected, playerId];
      }
    });
  };

  // Handle delete button click
  const handleDelete = async () => {
    if (selectedPlayerIds.length > 0) {
      await deletePlayers(selectedPlayerIds);
      setSelectedPlayerIds([]);
      setHasUnsavedChanges(false); // Reset unsaved changes
    }
  };

  return (
    <div>
      <form>
        <div>
          {players.map((player) => (
            <PlayersLeavingPlayerItem
              player={player}
              key={player.id}
              type={type}
            />
            // <div key={player.id}>
            //   <label>
            //     <input
            //       type="checkbox"
            //       checked={selectedPlayerIds.includes(player.id)}
            //       onChange={() => togglePlayerSelection(player.id)}
            //     />
            //     {player.first_name} {player.last_name} • {player.overall} OVR{" "}
            //     {player.position}
            //   </label>
            // </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleDelete}
          disabled={!hasUnsavedChanges || selectedPlayerIds.length === 0}
        >
          Encourage Transfer
        </button>
      </form>
    </div>
  );
};

export default RemovePlayers;
