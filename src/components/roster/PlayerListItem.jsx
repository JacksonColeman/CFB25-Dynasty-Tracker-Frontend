import React, { useState } from "react";
import RecruitCardDetail from "../recruiting/RecruitCardDetail";
import "./playerlistitem.css";
import { useRoster } from "../../contexts/RosterContext";
import { FaTshirt } from "react-icons/fa";
import EditPlayerForm from "./EditPlayerForm";

const PlayerListItem = ({ player }) => {
  const { deletePlayer, updatePlayer } = useRoster();
  const [editing, setEditing] = useState(false);

  const handleDeletePlayer = async (playerId) => {
    console.log("Deleting player with ID:", playerId);
    deletePlayer(playerId);
  };

  const saveEdit = () => {
    setEditing(false);
  };

  const {
    id,
    first_name,
    last_name,
    position,
    archetype,
    class_year,
    overall,
    dev_trait,
    redshirted,
    current_redshirt,
  } = player;

  if (editing) {
    return (
      <div>
        <EditPlayerForm player={player} saveEdit={saveEdit} />
      </div>
    );
  }

  return (
    <div className="player-list-item">
      <p>
        {first_name} {last_name}
      </p>
      <RecruitCardDetail header="overall" content={overall} />
      <RecruitCardDetail header="position" content={position} />
      <RecruitCardDetail header="archetype" content={archetype} />
      <RecruitCardDetail
        header="class"
        content={`${class_year}${redshirted ? " (RS)" : ""}`}
      />
      <RecruitCardDetail header="dev trait" content={dev_trait} />
      {current_redshirt ? <FaTshirt color="red" fontSize={40} /> : null}
      <button onClick={() => handleDeletePlayer(id)}>Delete</button>
      <button onClick={() => setEditing(true)}>Edit</button>
    </div>
  );
};

export default PlayerListItem;
