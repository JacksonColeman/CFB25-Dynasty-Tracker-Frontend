import React from "react";
import PlayerList from "./PlayerList";
import PlayerTable from "./PlayerTable";

const PlayerDisplay = ({ rosterView, players }) => {
  return (
    <div>
      {rosterView === "list" ? (
        <PlayerList players={players} />
      ) : (
        <PlayerTable players={players} />
      )}
    </div>
  );
};

export default PlayerDisplay;
