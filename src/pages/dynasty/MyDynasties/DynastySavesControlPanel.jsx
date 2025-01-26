import React from "react";

const DynastySavesControlPanel = ({ onCreateDynasty }) => {
  return (
    <div>
      <button onClick={onCreateDynasty}>Create New Dynasty</button>
    </div>
  );
};

export default DynastySavesControlPanel;
