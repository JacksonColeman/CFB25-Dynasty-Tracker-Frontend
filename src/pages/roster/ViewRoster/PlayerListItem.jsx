import React, { useState } from "react";
import "./playerlistitem.css";
import { FaTshirt } from "react-icons/fa";
import DevTraitRibbon from "./DevTraitRibbon";

import PlayerActions from "./PlayerActions";

const PlayerListItem = ({ player }) => {
  console.log("rendering player list item");
  const {
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

  return (
    <div className="player-list-item">
      <div className="player-list-item__top-row">
        <span className="player-list-item__position">{position}</span>
        <span className="player-list-item__archetype"> / {archetype}</span>
        <span className="player-list-item__class-year"> / {class_year}</span>
        {redshirted ? (
          <span className="player-list-item__redshirted"> (RS)</span>
        ) : null}
      </div>
      <div className="player-list-item__middle-row">
        <span className="player-list-item__overall">{overall}</span>
        <h3 className="player-list-item__name">
          {first_name} {last_name}
        </h3>
        {current_redshirt ? (
          <span className="player-list-item__redshirt-icon">
            <FaTshirt color="red" fontSize={25} />
          </span>
        ) : null}
      </div>
      <DevTraitRibbon devTrait={dev_trait} />
      <PlayerActions player={player} />
    </div>
  );
};

export default PlayerListItem;
