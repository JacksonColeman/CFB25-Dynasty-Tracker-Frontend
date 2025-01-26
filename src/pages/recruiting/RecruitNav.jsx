import React from "react";
import { NavLink } from "react-router-dom";

const RecruitNav = () => {
  return (
    <div>
      <div>
        <nav className="nav NavFlex">
          <NavLink to="/recruiting">View Recruits</NavLink>
          <NavLink to="/recruiting/create">Add Recruits</NavLink>
          <NavLink to="/recruiting/promote">Promote to Roster</NavLink>
        </nav>
      </div>
    </div>
  );
};

export default RecruitNav;
