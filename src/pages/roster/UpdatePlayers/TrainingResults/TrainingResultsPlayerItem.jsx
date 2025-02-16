import { useState } from "react";
import PropTypes from "prop-types";
import DevTraitRibbon from "../../ViewRoster/DevTraitRibbon";
import FormField from "../../../../components/ui/FormField";

const TrainingResultsPlayerItem = ({ player }) => {
  const {
    first_name,
    last_name,
    position,
    archetype,
    class_year,
    overall,
    dev_trait,
    redshirted,
  } = player;

  const [newOverall, setNewOverall] = useState(overall);

  const handleUpdateOverall = (newValue) => {
    setNewOverall(newValue);
  };

  return (
    <div className="player-list-item">
      <div className="player-list-item__top-row">
        <span className="player-list-item__position">{position}</span>
        <span className="player-list-item__archetype"> / {archetype}</span>
        <span className="player-list-item__class-year"> / {class_year}</span>
        {redshirted ? (
          <span className="player-list-item__redshirted"> (RS)</span>
        ) : null}
      </div>
      <div className="player-list-item__middle-row ">
        <h3 className="player-list-item__name">
          {first_name} {last_name}
        </h3>
        <span className="player-list-item__overall">{overall}</span>
        <span>{">"}</span>
        <FormField
          type="number"
          min={overall}
          max={99}
          value={newOverall}
          onChange={(e) => handleUpdateOverall(e.target.value)}
        />
      </div>
      <DevTraitRibbon devTrait={dev_trait} />
    </div>
  );
};
TrainingResultsPlayerItem.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    archetype: PropTypes.string.isRequired,
    class_year: PropTypes.string.isRequired,
    overall: PropTypes.number.isRequired,
    dev_trait: PropTypes.string.isRequired,
    redshirted: PropTypes.bool.isRequired,
    current_redshirt: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TrainingResultsPlayerItem;
