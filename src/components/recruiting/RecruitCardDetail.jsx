import React from "react";

const RecruitCardDetail = ({ header, content }) => {
  return (
    <div className="recruit-card-detail">
      <span className="recruit-card-detail-header">{header}</span>
      <span className="recruit-card-detail-content">{content}</span>
    </div>
  );
};

export default RecruitCardDetail;
