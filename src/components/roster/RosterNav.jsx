import React from "react";
import { NavLink } from "react-router-dom";

const RosterNav = () => {
  return (
    <div>
      <div>
        <nav className="NavFlex">
          <NavLink to="/roster">View Roster</NavLink>
          <NavLink to="/roster/create">Add Players</NavLink>
          <NavLink to="/roster/redshirts">Manage Redshirts</NavLink>
          <NavLink to="/roster/players-leaving">Players Leaving</NavLink>
          <NavLink to="/roster/position-changes">Position Changes</NavLink>
          <NavLink to="/roster/training">Training Results</NavLink>
          <NavLink to="/roster/cuts">Encourage Transfers</NavLink>
        </nav>
      </div>
    </div>
  );
};

export default RosterNav;
