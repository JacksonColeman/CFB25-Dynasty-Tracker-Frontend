import PlayerList from "./PlayerList";
import PlayerTable from "./PlayerTable";
import PropTypes from "prop-types";

const PlayerDisplay = ({ rosterView, players }) => {
  return (
    <div>
      {rosterView === "list" ? (
        <PlayerList players={players} />
      ) : (
        <PlayerTable players={players} />
      )}
    </div>
  );
};
PlayerDisplay.propTypes = {
  rosterView: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
};

export default PlayerDisplay;
