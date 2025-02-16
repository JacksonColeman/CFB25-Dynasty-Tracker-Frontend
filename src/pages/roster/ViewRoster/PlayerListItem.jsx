import "./PlayerListItem.css";
import { FaTshirt } from "react-icons/fa";
import DevTraitRibbon from "./DevTraitRibbon";
import PropTypes from "prop-types";
import PlayerActions from "./PlayerActions";

const PlayerListItem = ({ player }) => {
  const {
    first_name,
    last_name,
    position,
    archetype,
    class_year,
    overall,
    dev_trait,
    redshirted,
    current_redshirt,
    skill_caps,
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
      <div className="player-list-item__middle-row">
        <span className="player-list-item__overall">{overall}</span>
        <h3 className="player-list-item__name">
          {first_name} {last_name}
        </h3>
        {current_redshirt ? (
          <span className="player-list-item__redshirt-icon">
            <FaTshirt color="red" fontSize={25} />
          </span>
        ) : null}
      </div>
      <DevTraitRibbon devTrait={dev_trait} />
      <PlayerActions player={player} />
      <p>Skill caps: {skill_caps ?? "N/A"}</p>{" "}
      {/* Updated to handle missing skill_caps */}
    </div>
  );
};

PlayerListItem.propTypes = {
  player: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    archetype: PropTypes.string.isRequired,
    class_year: PropTypes.string.isRequired,
    overall: PropTypes.number.isRequired,
    dev_trait: PropTypes.string.isRequired,
    redshirted: PropTypes.bool,
    current_redshirt: PropTypes.bool,
    skill_caps: PropTypes.string,
  }).isRequired,
};

export default PlayerListItem;
