import React from "react";
import { FaTshirt } from "react-icons/fa";

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

export default RedshirtToggleIcon;
