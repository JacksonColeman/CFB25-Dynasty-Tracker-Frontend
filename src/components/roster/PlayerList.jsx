import React from "react";
import PlayerListItem from "./PlayerListItem";
import { positions } from "../../../public/positions";

const PlayerList = ({ players }) => {
  return (
    <div>
      {players.map((p) => (
        <PlayerListItem player={p} key={p.id} />
      ))}
    </div>
  );
};

export default PlayerList;
