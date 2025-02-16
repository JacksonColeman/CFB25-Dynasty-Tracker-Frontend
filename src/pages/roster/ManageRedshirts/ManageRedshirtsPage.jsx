import { useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import ManageRedshirtsManager from "./ManageRedshirtsManager";
import { useRoster } from "../../../services/contexts/RosterContext";
import SearchBar from "../../../components/ui/SearchBar";
import { sortPlayers } from "../../../utils/playerUtils";

const ManageRedshirtsPage = () => {
  const { players } = useRoster();
  const [searchTerm, setSearchTerm] = useState("");

  const eligiblePlayers = players.filter((player) => !player.redshirted);

  const filteredPlayers = eligiblePlayers.filter((player) => {
    const fullName = `${player.first_name} ${player.last_name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()); // Only include players where redshirted is false
  });

  const sortedPlayers = sortPlayers(filteredPlayers, "classYear");

  return (
    <div className="main-content">
      <PageHeader content={"Manage Redshirts"} />

      <SearchBar
        placeholder="Search players by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "100%" }}
      />

      {/* add search bar */}
      <ManageRedshirtsManager players={sortedPlayers} />
    </div>
  );
};

export default ManageRedshirtsPage;
