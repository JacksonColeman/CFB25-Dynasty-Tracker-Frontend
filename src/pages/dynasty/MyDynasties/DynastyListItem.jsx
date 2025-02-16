import { useDynasty } from "../../../services/contexts/DynastyContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DynastyListItem = ({ dynasty }) => {
  const { setActive } = useDynasty();
  const navigate = useNavigate();

  const handleDynastySelect = async (dynastyId) => {
    try {
      await setActive(dynastyId);
      navigate("/roster"); // Navigate to roster page after selection
    } catch (error) {
      console.error("Error selecting dynasty:", error);
    }
  };

  return (
    <div>
      <p>{dynasty.dynasty_name}</p>
      <p>{dynasty.school_name}</p>
      <p>{dynasty.year}</p>
      <button onClick={() => handleDynastySelect(dynasty.id)}>Manage</button>
    </div>
  );
};
DynastyListItem.propTypes = {
  dynasty: PropTypes.shape({
    dynasty_name: PropTypes.string.isRequired,
    school_name: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default DynastyListItem;
