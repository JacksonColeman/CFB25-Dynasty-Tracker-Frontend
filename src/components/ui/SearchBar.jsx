import PropTypes from "prop-types";

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

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default SearchBar;
