import PropTypes from "prop-types";

const ListTableDisplay = ({ viewType, items, ListView, TableView }) => {
  return (
    <div>
      {viewType === "list" ? (
        <ListView items={items} />
      ) : (
        <TableView items={items} />
      )}
    </div>
  );
};

ListTableDisplay.propTypes = {
  viewType: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  ListView: PropTypes.elementType.isRequired,
  TableView: PropTypes.elementType.isRequired,
};

export default ListTableDisplay;
