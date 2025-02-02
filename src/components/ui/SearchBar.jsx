import React from "react";

const SearchBar = ({ placeholder, value, onChange, style }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={style}
    />
  );
};

export default SearchBar;
