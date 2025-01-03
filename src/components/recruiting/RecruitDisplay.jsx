import React, { useState } from "react";
import RecruitList from "./RecruitList";
import RecruitTable from "./RecruitTable";
import { positions } from "../../../public/positions";

const RecruitDisplay = ({ recruits }) => {
  const [sortAttribute, setSortAttribute] = useState("position");
  const [filterValue, setFilterValue] = useState("");
  const [recruitView, setRecruitView] = useState("list");

  const handleToggleRecruitView = () => {
    setRecruitView(recruitView === "list" ? "table" : "list");
  };

  const positionCategories = {
    Offense: ["QB", "HB", "FB", "LT", "LG", "C", "RG", "RT", "TE", "WR"],
    Defense: ["LE", "RE", "DT", "LOLB", "MLB", "ROLB", "CB", "FS", "SS"],
    "Special Teams": ["K", "P"],
  };

  const recruitingStages = ["Committed", "Top 3", "Top 5", "Top 8", "Open"];
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

  const filteredRecruits = recruits.filter((r) => {
    if (filterValue === "Offense") {
      return positionCategories.Offense.includes(r.position);
    }
    if (filterValue === "Defense") {
      return positionCategories.Defense.includes(r.position);
    }
    if (filterValue === "Special Teams") {
      return positionCategories["Special Teams"].includes(r.position);
    }
    if (customPositionOrder.includes(filterValue)) {
      return r.position === filterValue;
    }
    return true;
  });

  const getSortValue = (recruit, attribute) => {
    switch (attribute) {
      case "star_rating":
        return recruit.star_rating;
      case "recruiting_stage":
        return recruitingStages.indexOf(recruit.recruiting_stage);
      case "position":
        return customPositionOrder.indexOf(recruit.position);
      default:
        return recruit[attribute];
    }
  };

  const sortedRecruits = [...filteredRecruits].sort((a, b) => {
    if (sortAttribute === "star_rating") {
      // Sort by star_rating in descending order
      return b[sortAttribute] - a[sortAttribute];
    } else if (sortAttribute === "position") {
      // Sort by custom position order
      const positionComparison =
        customPositionOrder.indexOf(a[sortAttribute]) -
        customPositionOrder.indexOf(b[sortAttribute]);
      if (positionComparison !== 0) {
        return positionComparison;
      }
      // Tiebreaker: Sort by star_rating in descending order
      return b.star_rating - a.star_rating;
    } else if (sortAttribute === "recruiting_stage") {
      // Sort by recruiting stage order
      const stageComparison =
        recruitingStages.indexOf(a[sortAttribute]) -
        recruitingStages.indexOf(b[sortAttribute]);
      if (stageComparison !== 0) {
        return stageComparison;
      }
      // Tiebreaker: Sort by star_rating in descending order
      return b.star_rating - a.star_rating;
    }
    // Default string sorting
    return a[sortAttribute].localeCompare(b[sortAttribute]);
  });

  return (
    <div className="space-y-4">
      {recruits.length != 0 ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start">
          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="font-medium">
              Sort By:
            </label>
            <select
              id="sort-by"
              value={sortAttribute}
              onChange={handleSortChange}
              className="rounded border p-1"
            >
              <option value="position">Position</option>
              <option value="star_rating">Star Rating</option>
              <option value="recruiting_stage">Recruiting Stage</option>
              <option value="last_name">Name</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="filter" className="font-medium">
              Filter By:
            </label>
            <select
              id="filter"
              value={filterValue}
              onChange={handleFilterChange}
              className="rounded border p-1"
            >
              <option value="">All Recruits</option>
              {dropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleToggleRecruitView}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Show as {recruitView === "list" ? "Table" : "List"}
          </button>
        </div>
      ) : null}

      {recruitView === "list" ? (
        <RecruitList recruits={sortedRecruits} />
      ) : (
        <RecruitTable recruits={sortedRecruits} />
      )}
    </div>
  );
};

export default RecruitDisplay;
