import PropTypes from "prop-types";

const RecruitCardDetail = ({ header, content }) => {
  return (
    <div className="recruit-card-detail">
      <span className="recruit-card-detail-header">{header}</span>
      <span className="recruit-card-detail-content">{content}</span>
    </div>
  );
};

RecruitCardDetail.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default RecruitCardDetail;
