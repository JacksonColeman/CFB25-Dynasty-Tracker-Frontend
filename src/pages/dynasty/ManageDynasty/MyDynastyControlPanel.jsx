import PropTypes from "prop-types";

const MyDynastyControlPanel = ({ onClickEdit, onClickDelete }) => {
  return (
    <div>
      <button onClick={onClickEdit}>Edit</button>
      <button onClick={onClickDelete}>Delete</button>
    </div>
  );
};

MyDynastyControlPanel.propTypes = {
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default MyDynastyControlPanel;
