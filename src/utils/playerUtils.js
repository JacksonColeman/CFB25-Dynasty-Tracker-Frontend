import { positionCategories } from "./positionCategories";
import { customPositionOrder } from "./positionDropdownOptions";
import { classYears } from "./utils";

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

export const sortPlayers = (players, sortAttribute, sortOrder = "asc") => {
  return [...players].sort((a, b) => {
    let comparison = 0;

    if (sortAttribute === "overall") {
      comparison = b[sortAttribute] - a[sortAttribute];
    } else if (sortAttribute === "position") {
      comparison =
        customPositionOrder.indexOf(a[sortAttribute]) -
        customPositionOrder.indexOf(b[sortAttribute]);
      if (comparison === 0) {
        comparison = b.overall - a.overall; // Tiebreaker: Sort by overall in descending order
      }
    } else if (sortAttribute === "classYear") {
      comparison =
        classYears.indexOf(a.class_year) - classYears.indexOf(b.class_year);
    } else {
      comparison = a[sortAttribute].localeCompare(b[sortAttribute]);
    }

    // Handle ascending/descending order
    if (sortOrder === "desc") {
      comparison = -comparison;
    }

    return comparison;
  });
};
