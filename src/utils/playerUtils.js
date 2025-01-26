import { positionCategories } from "./positionCategories";
import { customPositionOrder } from "./positionDropdownOptions";

export const filterPlayers = (players, filterValue) => {
  if (filterValue === "Offense") {
    return players.filter((p) =>
      positionCategories.Offense.includes(p.position)
    );
  }
  if (filterValue === "Defense") {
    return players.filter((p) =>
      positionCategories.Defense.includes(p.position)
    );
  }
  if (filterValue === "Special Teams") {
    return players.filter((p) =>
      positionCategories["Special Teams"].includes(p.position)
    );
  }
  if (customPositionOrder.includes(filterValue)) {
    return players.filter((p) => p.position === filterValue);
  }
  return players;
};

export const sortPlayers = (players, sortAttribute) => {
  //   console.log(players);
  console.log(sortAttribute);
  return [...players].sort((a, b) => {
    if (sortAttribute === "overall") {
      return b[sortAttribute] - a[sortAttribute];
    } else if (sortAttribute === "position") {
      const positionComparison =
        customPositionOrder.indexOf(a[sortAttribute]) -
        customPositionOrder.indexOf(b[sortAttribute]);
      if (positionComparison !== 0) {
        return positionComparison;
      }
      return b.overall - a.overall; // Tiebreaker: Sort by overall in descending order
    }
    return a[sortAttribute].localeCompare(b[sortAttribute]);
  });
};
