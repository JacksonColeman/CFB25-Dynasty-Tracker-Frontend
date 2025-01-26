import { positions } from "./positions";
export const customPositionOrder = Object.keys(positions);
export const positionDropdownOptions = [
  { label: "Offense", value: "Offense" },
  { label: "Defense", value: "Defense" },
  { label: "Special Teams", value: "Special Teams" },
  ...customPositionOrder.map((pos) => ({ label: pos, value: pos })),
];
