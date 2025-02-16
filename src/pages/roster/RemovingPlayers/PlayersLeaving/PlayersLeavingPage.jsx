// import EncourageTransferPage from "../EncourageTransfers/EncourageTransferPage";
import PageHeader from "../../../../components/ui/PageHeader";
import RemovePlayers from "../RemovePlayers";
import { useRoster } from "../../../../services/contexts/RosterContext";
import { useState } from "react";
import SearchBar from "../../../../components/ui/SearchBar";
import { sortPlayers } from "../../../../utils/playerUtils";

const PlayersLeavingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { players } = useRoster();

  const orderedPlayers = sortPlayers(players, "classYear", "desc");

  return (
    <div className="main-content">
      <PageHeader content={"Players Leaving"} />
      <SearchBar
        placeholder="Search players by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "100%" }}
      />
      <RemovePlayers players={orderedPlayers} />
    </div>
  );
};

export default PlayersLeavingPage;
