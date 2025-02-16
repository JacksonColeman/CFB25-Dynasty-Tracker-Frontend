import PlayerListItem from "./PlayerListItem";
import PropTypes from "prop-types";

const PlayerList = ({ players }) => {
  return (
    <div className="player-list">
      {players.map((p) => (
        <PlayerListItem player={p} key={p.id} />
      ))}
    </div>
  );
};
PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlayerList;
