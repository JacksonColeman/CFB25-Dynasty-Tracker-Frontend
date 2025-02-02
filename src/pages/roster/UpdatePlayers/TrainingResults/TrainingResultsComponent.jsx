import React from "react";
import TrainingResultsPlayerItem from "./TrainingResultsPlayerItem";

const TrainingResultsComponent = ({ players }) => {
  return (
    <div className="training-results-component">
      {players.map((player) => (
        <TrainingResultsPlayerItem key={player.id} player={player} />
      ))}
      <button>Save Training Results</button>
    </div>
  );
};

export default TrainingResultsComponent;
