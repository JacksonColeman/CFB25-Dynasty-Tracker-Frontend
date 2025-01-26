import React from "react";

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

export default ListTableDisplay;
