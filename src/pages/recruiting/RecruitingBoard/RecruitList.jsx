import RecruitCard from "./RecruitCard"; // Import your RecruitCard component
import PropTypes from "prop-types";

const RecruitList = ({ recruits }) => {
  return (
    <div className="recruit-list">
      {/* <h2>Recruiting Board</h2> */}
      {recruits.map((recruit) => (
        <RecruitCard key={recruit.id} recruit={recruit} />
      ))}
    </div>
  );
};
RecruitList.propTypes = {
  recruits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // Add other recruit properties here if needed
    })
  ).isRequired,
};

export default RecruitList;
