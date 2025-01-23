import React from "react";

const ControlPanel = ({ buttons }) => {
  return (
    <div className="control-panel">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className={button.classNames.join(" ")} // Join class names array into a space-separated string
          disabled={button.disabled} // Disable the button if it has the 'disabled' class
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ControlPanel;
