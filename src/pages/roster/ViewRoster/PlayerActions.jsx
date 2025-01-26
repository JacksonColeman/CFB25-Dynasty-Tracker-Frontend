import React, { useState } from "react";
import Modal from "../../../components/ui/Modal";
import EditPlayerForm from "./EditPlayerForm";
import EditButton from "../../../components/ui/EditButton";

const PlayerActions = ({ player }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <EditButton onClick={() => setModalOpen(!modalOpen)} />
      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <EditPlayerForm
            player={player}
            saveEdit={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default PlayerActions;
