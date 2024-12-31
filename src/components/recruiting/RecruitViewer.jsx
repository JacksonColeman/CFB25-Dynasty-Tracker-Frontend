import React from "react";
import RecruitList from "./RecruitList";

const RecruitViewer = ({ recruits, onDeleteRecruit }) => {
  return <RecruitList recruits={recruits} onDeleteRecruit={onDeleteRecruit} />;
};

export default RecruitViewer;
