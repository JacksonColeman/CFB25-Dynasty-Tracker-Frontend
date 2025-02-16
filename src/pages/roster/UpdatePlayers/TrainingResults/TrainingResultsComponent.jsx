import TrainingResultsPlayerItem from "./TrainingResultsPlayerItem";
import PropTypes from "prop-types";

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
TrainingResultsComponent.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TrainingResultsComponent;
