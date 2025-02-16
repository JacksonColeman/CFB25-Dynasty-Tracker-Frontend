import "./RedshirtButton.css";
import PropTypes from "prop-types";

const RedshirtButton = ({ isToggled, onToggle }) => {
  return (
    <div
      className={`redshirt-button ${
        isToggled ? "redshirt-button--active" : "redshirt-button--inactive"
      }`}
      onClick={onToggle}
    >
      (RS)
    </div>
  );
};
RedshirtButton.propTypes = {
  isToggled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default RedshirtButton;
