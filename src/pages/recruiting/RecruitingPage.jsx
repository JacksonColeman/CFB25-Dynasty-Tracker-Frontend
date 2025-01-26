import React, { useState, useEffect } from "react";
import { useRoster } from "../../services/contexts/RosterContext";
import { Outlet } from "react-router-dom";
import RecruitNav from "./RecruitNav";

const RecruitingPage = () => {
  const { recruits } = useRoster();
  const hasRecruits = recruits > 0;
  return (
    <div>
      <RecruitNav hasRecruits={hasRecruits} />
      <Outlet />
    </div>
  );
};

export default RecruitingPage;
