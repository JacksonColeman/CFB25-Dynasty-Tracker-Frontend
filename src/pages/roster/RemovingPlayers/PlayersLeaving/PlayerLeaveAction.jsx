import { useState } from "react";
import PropTypes from "prop-types";
import { FaExchangeAlt } from "react-icons/fa";
import Modal from "../../../../components/ui/Modal";
import { useRoster } from "../../../../services/contexts/RosterContext";

const PlayerLeaveAction = ({ player }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { deletePlayer } = useRoster();

  const handleDeletePlayer = (e) => {
    e.preventDefault();
    console.log("deleting player");
    deletePlayer(player.id);
    setModalOpen(false);
  };

  return (
    <div
      className="remove-player-action"
      onClick={() => setModalOpen(!modalOpen)}
    >
      <FaExchangeAlt fontSize={"2rem"} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div>
          <div>
            <p>
              Are you sure you want to encourage {player.first_name}{" "}
              {player.last_name} to transfer?
            </p>
            <button onClick={handleDeletePlayer}>Yes</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
PlayerLeaveAction.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
  }).isRequired,
};

export default PlayerLeaveAction;
