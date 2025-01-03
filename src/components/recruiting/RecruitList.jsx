import React from "react";
import RecruitCard from "./RecruitCard"; // Import your RecruitCard component

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

export default RecruitList;
