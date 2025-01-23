import React from "react";
import { Outlet } from "react-router-dom";
import RosterNav from "./RosterNav";

const RosterPage = () => {
  return (
    <div>
      {/* <RosterControlPanel /> */}
      <RosterNav />
      {/* <PlayerDisplay players={sortedPlayers} /> */}
      <Outlet />
    </div>
  );
};

export default RosterPage;
