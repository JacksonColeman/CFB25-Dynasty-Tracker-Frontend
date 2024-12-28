import React, { useEffect, useState } from "react";
import "./styles.css"; // Make sure the path matches where your CSS file is located

const PlayerTable = () => {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [error, setError] = useState(null);

  // Fetch the players from the API
  useEffect(() => {
    const fetchPlayers = async () => {
      console.log("Fetching players...");
      try {
        const response = await fetch("api/dynasties/current/players");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched players:", data);
          setPlayers(data);
        } else {
          const errorData = await response.json();
          console.log("Error fetching players:", errorData);
          setError(errorData.error || "Failed to fetch players.");
        }
      } catch (err) {
        console.log("Error occurred while fetching players:", err);
        setError("An error occurred. Please try again.");
      }
    };

    fetchPlayers();
  }, []);

  // Handle editing a player's information
  const handleEdit = (player) => {
    console.log("Editing player:", player);
    setEditingPlayer(player);
  };

  // Handle updating a player's information
  const handleUpdate = async (playerId) => {
    const updatedPlayer = {
      ...editingPlayer,
      first_name: editingPlayer.first_name,
      last_name: editingPlayer.last_name,
      class_year: editingPlayer.class_year,
      position: editingPlayer.position,
      archetype: editingPlayer.archetype,
      overall: editingPlayer.overall,
      dev_trait: editingPlayer.dev_trait,
      redshirted: editingPlayer.redshirted,
      current_redshirt: editingPlayer.current_redshirt,
    };

    console.log("Updating player:", updatedPlayer);

    try {
      const response = await fetch(`api/players/${playerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ player: updatedPlayer }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log("Updated player:", updatedData);
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            player.id === updatedData.id ? updatedData : player
          )
        );
        setEditingPlayer(null);
      } else {
        const errorData = await response.json();
        console.log("Error updating player:", errorData);
        setError(errorData.error || "Failed to update player.");
      }
    } catch (err) {
      console.log("Error occurred while updating player:", err);
      setError("An error occurred. Please try again.");
    }
  };

  // Handle deleting a player
  const handleDelete = async (playerId) => {
    console.log("Deleting player with ID:", playerId);
    try {
      const response = await fetch(`api/players/${playerId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPlayers((prevPlayers) =>
          prevPlayers.filter((player) => player.id !== playerId)
        );
        console.log("Deleted player with ID:", playerId);
      } else {
        const errorData = await response.json();
        console.log("Error deleting player:", errorData);
        setError(errorData.error || "Failed to delete player.");
      }
    } catch (err) {
      console.log("Error occurred while deleting player:", err);
      setError("An error occurred. Please try again.");
    }
  };

  const advanceClassYears = async () => {
    try {
      const response = await fetch(
        "api/dynasties/current/advance_class_years",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Class years advanced successfully");
        // fetchPlayers(); // Re-fetch players to update the class years in the table
        window.location.reload();
      } else {
        alert("Error advancing class years: " + data.error);
      }
    } catch (error) {
      alert("Error calling the API: " + error);
    }
  };

  return (
    <div>
      <h2>Players in Current Dynasty</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

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
            <th>Redshirted</th>
            <th>Current Redshirt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>
                {editingPlayer?.id === player.id ? (
                  <input
                    type="text"
                    value={editingPlayer.first_name}
                    onChange={(e) => {
                      console.log("Editing first name:", e.target.value);
                      setEditingPlayer({
                        ...editingPlayer,
                        first_name: e.target.value,
                      });
                    }}
                  />
                ) : (
                  player.first_name.charAt(0).toUpperCase() +
                  player.first_name.slice(1)
                )}
              </td>
              <td>
                {editingPlayer?.id === player.id ? (
                  <input
                    type="text"
                    value={editingPlayer.last_name}
                    onChange={(e) => {
                      console.log("Editing last name:", e.target.value);
                      setEditingPlayer({
                        ...editingPlayer,
                        last_name: e.target.value,
                      });
                    }}
                  />
                ) : (
                  player.last_name.toUpperCase()
                )}
              </td>
              <td>
                {editingPlayer?.id === player.id ? (
                  <input
                    type="text"
                    value={editingPlayer.class_year}
                    onChange={(e) => {
                      console.log("Editing class year:", e.target.value);
                      setEditingPlayer({
                        ...editingPlayer,
                        class_year: e.target.value,
                      });
                    }}
                  />
                ) : (
                  player.class_year
                )}
              </td>
              <td>
                {editingPlayer?.id === player.id ? (
                  <input
                    type="text"
                    value={editingPlayer.position}
                    onChange={(e) => {
                      console.log("Editing position:", e.target.value);
                      setEditingPlayer({
                        ...editingPlayer,
                        position: e.target.value,
                      });
                    }}
                  />
                ) : (
                  player.position
                )}
              </td>
              <td>
                {editingPlayer?.id === player.id ? (
                  <input
                    type="text"
                    value={editingPlayer.archetype}
                    onChange={(e) => {
                      console.log("Editing archetype:", e.target.value);
                      setEditingPlayer({
                        ...editingPlayer,
                        archetype: e.target.value,
                      });
                    }}
                  />
                ) : (
                  player.archetype
                )}
              </td>
              <td>
                {editingPlayer?.id === player.id ? (
                  <input
                    type="number"
                    value={editingPlayer.overall}
                    onChange={(e) => {
                      console.log("Editing overall:", e.target.value);
                      setEditingPlayer({
                        ...editingPlayer,
                        overall: e.target.value,
                      });
                    }}
                  />
                ) : (
                  player.overall
                )}
              </td>
              <td>
                {editingPlayer?.id === player.id ? (
                  <input
                    type="text"
                    value={editingPlayer.dev_trait}
                    onChange={(e) => {
                      console.log("Editing dev trait:", e.target.value);
                      setEditingPlayer({
                        ...editingPlayer,
                        dev_trait: e.target.value,
                      });
                    }}
                  />
                ) : (
                  player.dev_trait
                )}
              </td>
              <td>
                {editingPlayer?.id === player.id ? (
                  <input
                    type="checkbox"
                    checked={editingPlayer.redshirted}
                    onChange={(e) => {
                      console.log("Editing redshirted:", e.target.checked);
                      setEditingPlayer({
                        ...editingPlayer,
                        redshirted: e.target.checked,
                      });
                    }}
                  />
                ) : player.redshirted ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </td>
              <td>
                {editingPlayer?.id === player.id ? (
                  <input
                    type="checkbox"
                    checked={editingPlayer.current_redshirt}
                    onChange={(e) => {
                      console.log(
                        "Editing current redshirt:",
                        e.target.checked
                      );
                      setEditingPlayer({
                        ...editingPlayer,
                        current_redshirt: e.target.checked,
                      });
                    }}
                  />
                ) : player.current_redshirt ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </td>
              <td>
                {editingPlayer?.id === player.id ? (
                  <button onClick={() => handleUpdate(player.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(player)}>Edit</button>
                )}
                <button onClick={() => handleDelete(player.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={advanceClassYears}>Advance Year</button>
    </div>
  );
};

export default PlayerTable;
