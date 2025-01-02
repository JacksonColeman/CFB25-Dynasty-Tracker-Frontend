import React from "react";
import PlayerListItem from "./PlayerListItem";

const PlayerList = ({ players }) => {
  return (
    <div>
      <p>Player List</p>
      {players.map((p) => (
        <PlayerListItem player={p} key={p.id} />
      ))}
    </div>
  );
};

export default PlayerList;
