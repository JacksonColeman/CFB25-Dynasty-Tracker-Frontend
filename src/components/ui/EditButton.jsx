import { FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import "./EditButton.css";

const EditButton = ({ onClick }) => {
  return (
    <button className="icon-button" onClick={onClick}>
      <FaEdit />
    </button>
  );
};
EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EditButton;
