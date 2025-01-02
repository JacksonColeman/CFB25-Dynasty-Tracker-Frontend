import React from "react";
import PlayerForm from "./PlayerForm";
import PlayerTable from "./PlayerTable";
import { useRoster } from "../../contexts/RosterContext";
import PlayerList from "./PlayerList";

const RosterPage = () => {
  const { players } = useRoster();

  return (
    <div>
      <PlayerForm />
      {/* <PlayerTable players={players} /> */}
      <PlayerList players={players} />
      <button>Advance Year</button>
    </div>
  );
};

export default RosterPage;
