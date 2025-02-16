import { useState } from "react";
import RecruitList from "./RecruitList";
import RecruitTable from "./RecruitTable";
import { positions } from "../../../utils/positions";
import { useRoster } from "../../../services/contexts/RosterContext";
import { useDynasty } from "../../../services/contexts/DynastyContext";

const RecruitDisplay = () => {
  const [sortAttribute, setSortAttribute] = useState("position");
  const [filterValue, setFilterValue] = useState("");
  // const [recruitView, setRecruitView] = useState("list");
  const recruitView = "list";
  const { recruits } = useRoster();
  const { currentDynasty } = useDynasty();

  // const customPositionOrder = [
  //   "QB",
  //   "HB",
  //   "FB",
  //   "WR",
  //   "TE",
  //   "LT",
  //   "LG",
  //   "C",
  //   "RG",
  //   "RT",
  //   "LE",
  //   "RE",
  //   "DT",
  //   "LOLB",
  //   "MLB",
  //   "ROLB",
  //   "CB",
  //   "FS",
  //   "SS",
  //   "K",
  //   "P",
  // ];

  // // Sort players by star rating and then position
  // const sortedRecruits = [...recruits].sort((a, b) => {
  //   // Sort by star rating (descending)
  //   if (b.star_rating !== a.star_rating) {
  //     return b.star_rating - a.star_rating;
  //   }

  //   // Sort by position based on custom order
  //   const positionComparison =
  //     customPositionOrder.indexOf(b.position) -
  //     customPositionOrder.indexOf(a.position);
  //   if (positionComparison !== 0) {
  //     return positionComparison;
  //   }

  //   // Tiebreaker: Sort by last name (ascending)
  //   return a.last_name.localeCompare(b.last_name);
  // });

  // const handleToggleRecruitView = () => {
  //   setRecruitView(recruitView === "list" ? "table" : "list");
  // };

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

  // const getSortValue = (recruit, attribute) => {
  //   switch (attribute) {
  //     case "star_rating":
  //       return recruit.star_rating;
  //     case "recruiting_stage":
  //       return recruitingStages.indexOf(recruit.recruiting_stage);
  //     case "position":
  //       return customPositionOrder.indexOf(recruit.position);
  //     default:
  //       return recruit[attribute];
  //   }
  // };

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

  if (!currentDynasty) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-content">
      <h2 className="roster-view-header">
        {currentDynasty.school_name} Recruiting Class of{" "}
        {currentDynasty.year + 1}
      </h2>
      {recruits.length != 0 ? (
        <div className="player-filter">
          <div className="items-center gap-2">
            <select
              id="sort-by"
              value={sortAttribute}
              onChange={handleSortChange}
              className="player-filter-dropdown"
            >
              <option value="position">Position</option>
              <option value="star_rating">Star Rating</option>
              <option value="recruiting_stage">Recruiting Stage</option>
              <option value="last_name">Name</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              id="filter"
              value={filterValue}
              onChange={handleFilterChange}
              className="player-filter-dropdown"
            >
              <option value="">All Recruits</option>
              {dropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
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
