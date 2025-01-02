import React, { useState } from "react";
import { useDynasty } from "../../contexts/DynastyContext";
import { useRoster } from "../../contexts/RosterContext";
import BulkUpdatePlayersModal from "./BulkUpdatePlayersModal";
import ManageRedshirtsModal from "./ManageRedshirtsModal";
import PlayerForm from "./PlayerForm";

const RosterControlPanel = ({ players }) => {
  const { advanceYear } = useDynasty();
  const { clearGraduates, clearRoster, bulkUpdatePlayers, bulkUpdateRedshirt } =
    useRoster();

  const [confirmClearGraduates, setConfirmClearGraduates] = useState(false);
  const [confirmClearRoster, setConfirmClearRoster] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRedshirtModalOpen, setIsRedshirtModalOpen] = useState(false);
  const [isCreatePlayerModalOpen, setIsCreatePlayerModalOpen] = useState(false);

  const handleAdvanceYear = async () => {
    try {
      await advanceYear();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClearGraduates = async () => {
    if (!confirmClearGraduates) {
      setConfirmClearGraduates(true);
      setTimeout(() => setConfirmClearGraduates(false), 5000); // Reset after 5 seconds
      return;
    }
    try {
      await clearGraduates();
      setConfirmClearGraduates(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClearRoster = async () => {
    if (!confirmClearRoster) {
      setConfirmClearRoster(true);
      setTimeout(() => setConfirmClearRoster(false), 5000); // Reset after 5 seconds
      return;
    }
    try {
      await clearRoster();
      setConfirmClearRoster(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsCreatePlayerModalOpen(!isCreatePlayerModalOpen)}
      >
        Create Players?
      </button>
      <button onClick={handleAdvanceYear}>Advance Year</button>
      <button onClick={handleClearGraduates}>
        {confirmClearGraduates ? "Confirm Clear Graduates?" : "Clear Graduates"}
      </button>
      <button onClick={handleClearRoster}>
        {confirmClearRoster ? "Confirm Clear Roster?" : "Clear Roster"}
      </button>
      <button onClick={() => setIsModalOpen(true)}>
        Position Changes/Training Results
      </button>
      <button onClick={() => setIsRedshirtModalOpen(true)}>
        Manage Redshirts
      </button>
      <BulkUpdatePlayersModal
        players={players}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        updatePlayers={bulkUpdatePlayers}
      />
      <ManageRedshirtsModal
        players={players}
        isOpen={isRedshirtModalOpen}
        onClose={() => setIsRedshirtModalOpen(false)}
        updatePlayers={bulkUpdateRedshirt}
      />
      {isCreatePlayerModalOpen ? <PlayerForm /> : null}
    </div>
  );
};

export default RosterControlPanel;
