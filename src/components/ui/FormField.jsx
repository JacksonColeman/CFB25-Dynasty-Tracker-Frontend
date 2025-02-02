import React from "react";
import "./FormField.css";

const FormField = ({
  label,
  type = "text",
  id,
  name,
  value,
  placeholder,
  onChange,
  required = false,
  disabled = false,
  options = [],
  min,
  max,
  onInput,
  showLabel = true,
  className,
}) => {
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
          >
            <option
              value=""
              className="form-field__select--disabled"
              disabled
            ></option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
          />
        );
      case "range":
        return (
          <>
            <input
              type="range"
              id={id}
              name={name}
              min={min}
              max={max}
              value={value}
              onChange={onChange}
              required={required}
            />
            <input
              type="number"
              value={value}
              name={name}
              min={min}
              max={max}
              onChange={onChange}
            />
          </>
        );
      case "number":
        return (
          <input
            type="number"
            value={value}
            name={name}
            min={min}
            max={max}
            onChange={onChange}
          />
        );
      default:
        return (
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className={`form-field ${className}`}>
      {showLabel ? <label htmlFor={id}>{label}</label> : null}
      {renderInput()}
    </div>
  );
};

export default FormField;
