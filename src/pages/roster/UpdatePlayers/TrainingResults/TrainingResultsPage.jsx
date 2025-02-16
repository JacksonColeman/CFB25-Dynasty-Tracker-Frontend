import PageHeader from "../../../../components/ui/PageHeader";
// import BulkUpdatePlayersModal from "../PositionChanges/BulkUpdatePlayersModal";
import { useRoster } from "../../../../services/contexts/RosterContext";
import TrainingResultsComponent from "./TrainingResultsComponent";
import { sortPlayers } from "../../../../utils/playerUtils";

const TrainingResultsPage = () => {
  const { players } = useRoster();

  const filteredPlayers = players.filter(
    (player) => player.class_year !== "Freshman"
  );

  const sortedPlayers = sortPlayers(filteredPlayers, "overall", "asc");

  return (
    <div className="main-content">
      <PageHeader content={"Training Results"} />
      <TrainingResultsComponent players={sortedPlayers} />
    </div>
  );
};

export default TrainingResultsPage;
