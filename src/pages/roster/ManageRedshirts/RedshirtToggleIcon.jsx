import { FaTshirt } from "react-icons/fa";
import PropTypes from "prop-types";

const RedshirtToggleIcon = ({ isToggled, onToggle }) => {
  const className = isToggled
    ? "manage-redshirts-player-item__icon manage-redshirts-player-item__icon-filled"
    : "manage-redshirts-player-item__icon manage-redshirts-player-item__icon-unfilled";

  return (
    <div onClick={onToggle} className={className}>
      <FaTshirt fontSize={50} />
    </div>
  );
};
RedshirtToggleIcon.propTypes = {
  isToggled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default RedshirtToggleIcon;
