import React, { useState, useEffect } from "react";
import { useRoster } from "../../contexts/RosterContext";
import RecruitControlPanel from "./RecruitControlPanel";
import RecruitDisplay from "./RecruitDisplay";

const RecruitingPage = () => {
  const { recruits } = useRoster();

  const customPositionOrder = [
    "QB",
    "HB",
    "FB",
    "WR",
    "TE",
    "LT",
    "LG",
    "C",
    "RG",
    "RT",
    "LE",
    "RE",
    "DT",
    "LOLB",
    "MLB",
    "ROLB",
    "CB",
    "FS",
    "SS",
    "K",
    "P",
  ];

  // Sort players by star rating and then position
  const sortedRecruits = [...recruits].sort((a, b) => {
    // Sort by star rating (descending)
    if (b.star_rating !== a.star_rating) {
      return b.star_rating - a.star_rating;
    }

    // Sort by position based on custom order
    const positionComparison =
      customPositionOrder.indexOf(b.position) -
      customPositionOrder.indexOf(a.position);
    if (positionComparison !== 0) {
      return positionComparison;
    }

    // Tiebreaker: Sort by last name (ascending)
    return a.last_name.localeCompare(b.last_name);
  });

  return (
    <div>
      <RecruitControlPanel recruits={sortedRecruits} />
      <RecruitDisplay recruits={sortedRecruits} />
    </div>
  );
};

export default RecruitingPage;
