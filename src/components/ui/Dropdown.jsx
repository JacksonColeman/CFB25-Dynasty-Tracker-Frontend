import React from "react";

const Dropdown = ({ options, value, onChange, id, label, className }) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="player-filter-dropdown"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
