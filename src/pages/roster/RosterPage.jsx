import { Outlet } from "react-router-dom";
import RosterNav from "./RosterNav";
import { useRoster } from "../../services/contexts/RosterContext";

const RosterPage = () => {
  const { players } = useRoster();
  const hasPlayers = players.length > 0;

  return (
    <div className="roster-page">
      <RosterNav hasPlayers={hasPlayers} />
      <Outlet />
    </div>
  );
};

export default RosterPage;
