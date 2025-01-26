import React from "react";
import "./RedshirtButton.css";

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

export default RedshirtButton;
