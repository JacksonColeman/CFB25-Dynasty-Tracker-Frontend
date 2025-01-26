import { useState } from "react";
import React from "react";
import { useDynasty } from "../../../services/contexts/DynastyContext";
import PlayerList from "./PlayerList";
import PlayerTable from "./PlayerTable";
import { useRoster } from "../../../services/contexts/RosterContext";
import { filterPlayers, sortPlayers } from "../../../utils/playerUtils";
import ViewRosterControlPanel from "./ViewRosterControlPanel";
import ListTableDisplay from "../../../components/ui/ListTableDisplay";
import PageHeader from "../../../components/ui/PageHeader";

const ViewRosterPage = () => {
  const { currentDynasty } = useDynasty();
  const [sortAttribute, setSortAttribute] = useState("position");
  const [filterValue, setFilterValue] = useState("");
  const [rosterView, setRosterView] = useState("list");
  const { players } = useRoster();

  const filteredPlayers = filterPlayers(players, filterValue);
  const sortedPlayers = sortPlayers(filteredPlayers, sortAttribute);

  const handleSetSortAttribute = (e) => {
    setSortAttribute(e.target.value);
    console.log("sort attribute set to ");
    console.log(e.target.value);
  };

  const handleSetFilterValue = (e) => {
    setFilterValue(e.target.value);
    console.log("filter value set to");
    console.log(e.target.value);
  };

  if (!currentDynasty) {
    return <div>Loading...</div>;
  }

  const headerContent = `${currentDynasty.year} ${currentDynasty.school_name} Football Roster`;

  return (
    <div className="main-content">
      <PageHeader content={headerContent} />

      <ViewRosterControlPanel
        sortAttribute={sortAttribute}
        onSortChange={handleSetSortAttribute}
        filterValue={filterValue}
        onFilterChange={handleSetFilterValue}
      />

      <ListTableDisplay
        viewType={rosterView}
        items={sortedPlayers}
        ListView={({ items }) => <PlayerList players={items} />}
        TableView={({ items }) => <PlayerTable players={items} />}
      />
    </div>
  );
};

export default ViewRosterPage;
