import DevTraitRibbon from "../../ViewRoster/DevTraitRibbon";
import PropTypes from "prop-types";
import { FaUserGraduate } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
// import { IoShieldSharp } from "react-icons/io5";
import "./PlayersLeavingPlayerItem.css";
import FootballShieldIcon from "../../../../components/icons/FootballShieldIcon";
import PlayerLeaveAction from "./PlayerLeaveAction";

const PlayersLeavingPlayerItem = ({ player, type }) => {
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
  } = player;

  // const handleClickTransfer = () => {
  //   console.log("transfer");
  // };

  return (
    <div className="player-list-item players-leaving-item">
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
        {type !== "encourage" ? (
          <div className="remove-player-action">
            {class_year === "Senior" && !current_redshirt ? (
              <FaUserGraduate fontSize={"2rem"} />
            ) : (
              <FaExchangeAlt fontSize={"2rem"} />
            )}
            {overall > 84 ? <FootballShieldIcon /> : null}
          </div>
        ) : (
          <PlayerLeaveAction player={player} />
        )}
        <DevTraitRibbon devTrait={dev_trait} />
      </div>
    </div>
  );
};
PlayersLeavingPlayerItem.propTypes = {
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
  type: PropTypes.string,
};

export default PlayersLeavingPlayerItem;
