import React from "react";
import "./styles.css"; // Make sure the path matches where your CSS file is located
import { FaTshirt } from "react-icons/fa";

const PlayerTable = ({ players }) => {
  if (!players || players.length === 0) {
    return <div>No players</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Class Year</th>
            <th>Position</th>
            <th>Archetype</th>
            <th>Overall</th>
            <th>Dev Trait</th>
            <th>Current Redshirt</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>
                {player.first_name.charAt(0).toUpperCase() +
                  player.first_name.slice(1)}
              </td>
              <td>{player.last_name.toUpperCase()}</td>
              <td>
                {player.class_year}
                {player.redshirted ? " (RS)" : ""}
              </td>
              <td>{player.position}</td>
              <td>{player.archetype}</td>
              <td>{player.overall}</td>
              <td>{player.dev_trait}</td>

              <td>{player.current_redshirt ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;
