import React, { useState } from "react";
import RecruitForm from "./RecruitForm";
import { useRoster } from "../../contexts/RosterContext";
import BulkPromoteRecruitsModal from "./BulkPromoteRecruitsModal";

const RecruitControlPanel = ({ recruits }) => {
  const [addRecruits, setAddRecruits] = useState(false);
  const [isBulkPromoteModal, setIsBulkPromoteModal] = useState(false);

  const { clearRecruits } = useRoster();
  const handleClearRecruits = () => {
    clearRecruits();
  };

  const handleCloseModal = () => {
    setIsBulkPromoteModal(false);
  };

  return (
    <div>
      <button onClick={() => setAddRecruits(!addRecruits)}>
        Create Recruit
      </button>
      <button onClick={handleClearRecruits} disabled={recruits.length == 0}>
        Clear All
      </button>
      <button
        onClick={() => setIsBulkPromoteModal(!isBulkPromoteModal)}
        disabled={recruits.length == 0}
      >
        Promote All to Roster
      </button>

      {addRecruits ? <RecruitForm /> : null}

      <BulkPromoteRecruitsModal
        recruits={recruits}
        isOpen={isBulkPromoteModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RecruitControlPanel;
