import React from "react";

const MyDynastyControlPanel = ({ onClickEdit, onClickDelete }) => {
  return (
    <div>
      <button onClick={onClickEdit}>Edit</button>
      <button onClick={onClickDelete}>Delete</button>
    </div>
  );
};

export default MyDynastyControlPanel;
