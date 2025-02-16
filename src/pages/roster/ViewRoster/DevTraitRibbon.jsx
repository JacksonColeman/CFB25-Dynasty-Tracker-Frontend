// import "./DevTraitRibbon.css";
import "./DevTraitRibbon.css";

import PropTypes from "prop-types";

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

DevTraitRibbon.propTypes = {
  devTrait: PropTypes.string.isRequired,
};

export default DevTraitRibbon;
