import PropTypes from "prop-types";

const DynastySavesControlPanel = ({ onCreateDynasty }) => {
  return (
    <div>
      <button onClick={onCreateDynasty}>Create New Dynasty</button>
    </div>
  );
};

export default DynastySavesControlPanel;

DynastySavesControlPanel.propTypes = {
  onCreateDynasty: PropTypes.func.isRequired,
};
