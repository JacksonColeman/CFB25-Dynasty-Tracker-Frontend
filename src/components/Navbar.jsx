import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav>
      <h1>CFB 25 Tracker</h1>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          gap: "1rem",
          padding: 0,
        }}
      >
        {!isLoggedIn && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/saves">Saves</Link>
            </li>

            <li>
              <Link to="/roster">Roster</Link>
            </li>
            <li>
              <Link to="/recruiting">Recruiting</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
