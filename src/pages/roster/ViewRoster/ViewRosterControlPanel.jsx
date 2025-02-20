import Dropdown from "../../../components/ui/Dropdown";
import { positionDropdownOptions } from "../../../utils/positionDropdownOptions";
import PropTypes from "prop-types";

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
ViewRosterControlPanel.propTypes = {
  sortAttribute: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default ViewRosterControlPanel;
