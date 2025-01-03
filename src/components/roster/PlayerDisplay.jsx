import React, { useState } from "react";
import PlayerList from "./PlayerList";
import PlayerTable from "./PlayerTable";
import { positions } from "../../../public/positions";

const PlayerDisplay = ({ players }) => {
  const [sortAttribute, setSortAttribute] = useState("position");
  const [filterValue, setFilterValue] = useState("");
  const [rosterView, setRosterView] = useState("list");

  const handleToggleRosterView = () => {
    if (rosterView == "list") {
      setRosterView("table");
    } else {
      setRosterView("list");
    }
    return;
  };

  const positionCategories = {
    Offense: ["QB", "HB", "FB", "LT", "LG", "C", "RG", "RT", "TE", "WR"],
    Defense: ["LE", "RE", "DT", "LOLB", "MLB", "ROLB", "CB", "FS", "SS"],
    "Special Teams": ["K", "P"],
  };

  const customPositionOrder = Object.keys(positions);

  const dropdownOptions = [
    { label: "Offense", value: "Offense" },
    { label: "Defense", value: "Defense" },
    { label: "Special Teams", value: "Special Teams" },
    ...customPositionOrder.map((pos) => ({ label: pos, value: pos })),
  ];

  const handleSortChange = (e) => {
    setSortAttribute(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const filteredPlayers = players.filter((p) => {
    if (filterValue === "Offense") {
      return positionCategories.Offense.includes(p.position);
    }
    if (filterValue === "Defense") {
      return positionCategories.Defense.includes(p.position);
    }
    if (filterValue === "Special Teams") {
      return positionCategories["Special Teams"].includes(p.position);
    }
    if (customPositionOrder.includes(filterValue)) {
      return p.position === filterValue;
    }
    return true;
  });

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (sortAttribute === "overall") {
      return b[sortAttribute] - a[sortAttribute];
    } else if (sortAttribute === "position") {
      const positionComparison =
        customPositionOrder.indexOf(a[sortAttribute]) -
        customPositionOrder.indexOf(b[sortAttribute]);
      if (positionComparison !== 0) {
        return positionComparison;
      }
      // Tiebreaker: Sort by overall in descending order
      return b.overall - a.overall;
    }
    return a[sortAttribute].localeCompare(b[sortAttribute]);
  });

  return (
    <div>
      {players.length != 0 ? (
        <div>
          <div>
            <label htmlFor="sort-by">Sort By: </label>
            <select
              id="sort-by"
              value={sortAttribute}
              onChange={handleSortChange}
            >
              <option value="position">Position</option>
              <option value="overall">Overall</option>
              <option value="last_name">Name</option>
            </select>
          </div>

          <div>
            <label htmlFor="filter">Filter By: </label>
            <select
              id="filter"
              value={filterValue}
              onChange={handleFilterChange}
            >
              <option value="">All Players</option>
              {dropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleToggleRosterView}>Toggle View</button>
        </div>
      ) : null}

      {rosterView === "list" ? (
        <PlayerList players={sortedPlayers} />
      ) : (
        <PlayerTable players={sortedPlayers} />
      )}
    </div>
  );
};

export default PlayerDisplay;
