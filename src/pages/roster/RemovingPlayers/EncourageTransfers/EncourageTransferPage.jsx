import React from "react";
import PageHeader from "../../../../components/ui/PageHeader";
import RemovePlayers from "../RemovePlayers";
import { useRoster } from "../../../../services/contexts/RosterContext";
import { useState } from "react";
import SearchBar from "../../../../components/ui/SearchBar";
import { sortPlayers } from "../../../../utils/playerUtils";

const EncourageTransferPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { players } = useRoster();

  const orderedPlayers = sortPlayers(players, "overall", "desc");

  return (
    <div className="main-content">
      <PageHeader content={"Encourage Transfers"} />
      <h4>Roster Size {players.length}/85</h4>
      <SearchBar
        placeholder="Search players by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "100%" }}
      />
      <RemovePlayers players={orderedPlayers} type={"encourage"} />
    </div>
  );
};

export default EncourageTransferPage;
