import React, { useState } from "react";
import PlayerForm from "./PlayerForm";
import PlayerTable from "./PlayerTable";
import { useRoster } from "../../contexts/RosterContext";
import PlayerList from "./PlayerList";
import { useDynasty } from "../../contexts/DynastyContext";
import RosterControlPanel from "./RosterControlPanel";

const RosterPage = () => {
  const { players } = useRoster();
  const [rosterView, setRosterView] = useState("list");

  const onToggleRosterView = () => {
    if (rosterView == "list") {
      setRosterView("table");
    } else {
      setRosterView("list");
    }
    return;
  };

  return (
    <div>
      <PlayerForm />
      <RosterControlPanel
        players={players}
        toggleRosterView={onToggleRosterView}
      />
      {rosterView == "list" ? (
        <PlayerList players={players} />
      ) : (
        <PlayerTable players={players} />
      )}
    </div>
  );
};

export default RosterPage;
