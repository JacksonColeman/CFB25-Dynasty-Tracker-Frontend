import React from "react";
import "./DevTraitRibbon.css";

const DevTraitRibbon = ({ devTrait }) => {
  // Determine the ribbon color class based on the devtrait
  const getRibbonClass = () => {
    switch (devTrait.toLowerCase()) {
      case "normal":
        return "ribbon ribbon--bronze";
      case "impact":
        return "ribbon ribbon--silver";
      case "star":
        return "ribbon ribbon--gold";
      case "elite":
        return "ribbon ribbon--diamond";
      default:
        return "ribbon ribbon--hidden"; // Fallback for invalid input
    }
  };

  return <div className={getRibbonClass()}>{devTrait}</div>;
};

export default DevTraitRibbon;
