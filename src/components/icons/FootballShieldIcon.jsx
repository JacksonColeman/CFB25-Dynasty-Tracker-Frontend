import { IoShieldSharp } from "react-icons/io5";
import { FaFootballBall } from "react-icons/fa";

const FootballShieldIcon = () => {
  return (
    <div className="football-shield-icon" style={styles.container}>
      <IoShieldSharp style={{ ...styles.icon, ...styles.icon1 }} />
      <FaFootballBall
        className="football-icon"
        style={{ ...styles.icon, ...styles.icon2 }}
      />
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    width: "32px",
    height: "32px",
  },
  icon: {
    position: "absolute",
  },
  icon1: {
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    color: "black",
  },
  icon2: {
    top: "8px", // Adjust this value to control overlap
    left: "10px", // Adjust this value to control overlap
    color: "white",
    width: "43%",
    height: "43%",
  },
};

export default FootballShieldIcon;
