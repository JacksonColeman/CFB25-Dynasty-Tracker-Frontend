import React from "react";
import RecruitCard from "./RecruitCard"; // Import your RecruitCard component

const RecruitList = ({ recruits, onDeleteRecruit }) => {
  return (
    <div className="recruit-list">
      <h2>Recruiting Board</h2>
      {recruits.map((recruit) => (
        <RecruitCard
          key={recruit.id}
          recruit={recruit}
          onDeleteRecruit={onDeleteRecruit}
        />
      ))}
    </div>
  );
};

export default RecruitList;
