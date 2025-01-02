import React from "react";
import { useRoster } from "../../contexts/RosterContext";
import RosterControlPanel from "./RosterControlPanel";
import PlayerDisplay from "./PlayerDisplay";

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

const RosterPage = () => {
  const { players } = useRoster();

  // Sort players by position and then by overall
  const sortedPlayers = [...players].sort((a, b) => {
    const positionComparison =
      customPositionOrder.indexOf(a.position) -
      customPositionOrder.indexOf(b.position);

    if (positionComparison !== 0) {
      return positionComparison; // Sort by position first
    }

    return b.overall - a.overall; // Tiebreaker: Sort by overall descending
  });

  return (
    <div>
      <RosterControlPanel players={sortedPlayers} />
      <PlayerDisplay players={sortedPlayers} />
    </div>
  );
};

export default RosterPage;
