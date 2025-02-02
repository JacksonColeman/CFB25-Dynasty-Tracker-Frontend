import React, { useState } from "react";
import "./NumberInput.css";

const NumberInput = ({ onChange, defaultValue, min = 0, max = 99 }) => {
  const [value, setValue] = useState(
    Math.min(Math.max(defaultValue || min, min), max)
  );

  const handleSliderChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleIncrement = () => {
    const newValue = Math.min(value + 1, max); // Increment but ensure it doesn't exceed max
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - 1, min); // Decrement but ensure it doesn't go below min
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="number-input">
      <input
        className="number-input__slider"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleSliderChange}
      />
      <div className="increment-btn" onClick={handleDecrement}>
        -
      </div>
      <div className="number-input__value">{value}</div>
      <div className="increment-btn" onClick={handleIncrement}>
        +
      </div>
    </div>
  );
};

export default NumberInput;
