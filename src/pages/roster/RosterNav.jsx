import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const RosterNav = ({ hasPlayers }) => {
  return (
    <>
      {hasPlayers ? (
        <nav className="nav NavFlex">
          <NavLink to="/roster">View Roster</NavLink>
          <NavLink to="/roster/create">Add Players</NavLink>
          <NavLink to="/roster/redshirts">Manage Redshirts</NavLink>
          <NavLink to="/roster/players-leaving">Players Leaving</NavLink>
          <NavLink to="/roster/position-changes">Position Changes</NavLink>
          <NavLink to="/roster/training">Training Results</NavLink>
          <NavLink to="/roster/cuts">Encourage Transfers</NavLink>
        </nav>
      ) : (
        <nav className="NavFlex">
          <NavLink to="/roster">View Roster</NavLink>
          <NavLink to="/roster/create">Add Players</NavLink>
        </nav>
      )}
    </>
  );
};
RosterNav.propTypes = {
  hasPlayers: PropTypes.bool.isRequired,
};

export default RosterNav;
