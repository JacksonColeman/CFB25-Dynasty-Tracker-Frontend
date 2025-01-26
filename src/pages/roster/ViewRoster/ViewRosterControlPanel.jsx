import React from "react";
import Dropdown from "../../../components/ui/Dropdown";
import { positionDropdownOptions } from "../../../utils/positionDropdownOptions";

const ViewRosterControlPanel = ({
  sortAttribute,
  onSortChange,
  filterValue,
  onFilterChange,
}) => {
  const sortOptions = [
    { label: "Position", value: "position" },
    { label: "Overall", value: "overall" },
    { label: "Name", value: "last_name" },
  ];

  return (
    <div className="player-filter">
      <Dropdown
        id="sort-by"
        // label="Sort By"
        options={sortOptions}
        value={sortAttribute}
        onChange={onSortChange}
        className="control-panel-dropdown"
      />
      <Dropdown
        id="filter"
        // label="Filter"
        options={[
          { label: "All Players", value: "" },
          ...positionDropdownOptions,
        ]}
        value={filterValue}
        onChange={onFilterChange}
        className="control-panel-dropdown"
      />
    </div>
  );
};

export default ViewRosterControlPanel;
