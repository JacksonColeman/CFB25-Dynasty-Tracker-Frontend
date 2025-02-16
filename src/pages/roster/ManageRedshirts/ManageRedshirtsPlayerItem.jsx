import "./ManageRedshirtsPlayerItem.css";
import DevTraitRibbon from "../ViewRoster/DevTraitRibbon";
import RedshirtToggleIcon from "./RedshirtToggleIcon";
import PropTypes from "prop-types";

const ManageRedshirtsPlayerItem = ({ player, onRedshirtChange }) => {
  const {
    id,
    first_name,
    last_name,
    position,
    archetype,
    class_year,
    overall,
    dev_trait,
    redshirted,
    current_redshirt,
  } = player;

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
      <div className="player-list-item__middle-row manage-redshirts-middle-row">
        <span className="player-list-item__overall">{overall}</span>
        <h3 className="player-list-item__name">
          {first_name} {last_name}
        </h3>
        <RedshirtToggleIcon
          isToggled={current_redshirt}
          onToggle={() => onRedshirtChange(id)}
        />
      </div>
      <DevTraitRibbon devTrait={dev_trait} />
    </div>
  );
};
ManageRedshirtsPlayerItem.propTypes = {
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
  onRedshirtChange: PropTypes.func.isRequired,
};

export default ManageRedshirtsPlayerItem;
