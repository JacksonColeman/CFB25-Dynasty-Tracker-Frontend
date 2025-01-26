import React, { useState } from "react";
import { FaStar, FaGem, FaRegTimesCircle, FaEllipsisV } from "react-icons/fa"; // Import the star icon
import "./recruitcard.css";
import RecruitCardDetail from "./RecruitCardDetail";
import EditRecruitForm from "./EditRecruitForm";
import { useRoster } from "../../../services/contexts/RosterContext";
import AddToRosterForm from "./AddToRosterForm";

const RecruitCard = ({ recruit }) => {
  // const [formData, setFormData] = useState({
  //   first_name: recruit.first_name,
  //   last_name: recruit.last_name,
  //   recruit_class: recruit.recruit_class,
  //   star_rating: recruit.star_rating,
  //   position: recruit.position,
  //   archetype: recruit.archetype,
  //   athlete: recruit.athlete,
  //   scouted: recruit.scouted,
  //   gem: recruit.gem,
  //   bust: recruit.bust,
  //   recruiting_stage: recruit.recruiting_stage,
  //   notes: recruit.notes,
  // });

  const {
    first_name,
    last_name,
    recruit_class,
    star_rating,
    position,
    archetype,
    athlete,
    scouted,
    gem,
    bust,
    recruiting_stage,
    notes,
  } = recruit;

  const [showNotes, setShowNotes] = useState(false);
  const [editing, setEditing] = useState(false);
  const [addingToRoster, setAddingToRoster] = useState(false);

  const { deleteRecruit } = useRoster();

  const handleDelete = async () => {
    try {
      await deleteRecruit(recruit.id);
    } catch (err) {
      console.log(err);
    }
  };
  // Handle updating an individual field (PATCH request)

  // Render the star rating as black filled stars
  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(<FaStar key={i} />);
    }
    return <div className="stars">{stars}</div>;
  };

  const saveEdit = () => {
    setEditing(false);
  };

  const closeAddToRoster = () => {
    setAddingToRoster(false);
  };

  if (addingToRoster) {
    return <AddToRosterForm recruit={recruit} closeForm={closeAddToRoster} />;
  }

  if (editing) {
    return (
      <div>
        <EditRecruitForm recruit={recruit} saveEdit={saveEdit} />
        {/* <button onClick={() => saveEdit()}>save</button> */}
      </div>
    );
  }

  return (
    // <div className="recruit-card-container">
    //   <div>
    //     <div className="recruit-card-c1-r1">
    //       <span className="recruit-card-name">
    //         {recruit.first_name} {recruit.last_name.toUpperCase()}
    //       </span>
    //     </div>
    //     <div className="recruit-card-c1-r2">
    //       <span className="star-rating">
    //         {renderStarRating(recruit.star_rating)}
    //       </span>
    //       <span>{recruit.gem ? <FaGem color="green" /> : null}</span>
    //       <span>{recruit.bust ? <FaRegTimesCircle color="red" /> : null}</span>
    //     </div>
    //   </div>
    //   <div className="recruit-card-c2-r1">
    //     <RecruitCardDetail
    //       header="Position"
    //       content={`${recruit.position}${recruit.athlete ? "/ATH" : ""}`}
    //     />
    //   </div>
    //   <div className="recruit-card-c2-r2">
    //     {/* <span>{recruit.archetype}</span> */}
    //     <RecruitCardDetail header={"Archetype"} content={recruit.archetype} />
    //   </div>
    //   <div className="recruit-card-c3-r1">
    //     <RecruitCardDetail header={"Class"} content={recruit.recruit_class} />
    //   </div>
    //   <div className="recruit-card-c3-r2">
    //     <RecruitCardDetail
    //       header={"Recruiting Stage"}
    //       content={recruit.recruiting_stage}
    //     />
    //   </div>
    //   <div className="options-ellipsis">
    //     <FaEllipsisV fontSize={25} />
    //   </div>
    //   <div className="recruit-card-c4-r1">
    //     <button onClick={() => setEditing(true)}>Edit</button>
    //   </div>
    //   <div className="recruit-card-c4-r2">
    //     <button onClick={handleDelete}>Delete</button>
    //   </div>
    //   <div className="recruit-card-c5-r1">
    //     <button onClick={() => setAddingToRoster(!addingToRoster)}>
    //       Add to Roster
    //     </button>
    //   </div>
    //   {recruit.notes ? (
    //     <button onClick={() => setShowNotes(!showNotes)}>Toggle Notes</button>
    //   ) : null}
    //   {showNotes && recruit.notes ? <div>{recruit.notes}</div> : null}
    // </div>
    // );
    <div
      className={`player-list-item recruit-list-item ${
        recruiting_stage === "Committed" ? "committed" : ""
      }`}
    >
      <div className="player-list-item-top-row recruit-list-item-top-row flex">
        <div>
          <span className="player-list-item-position bold">{position}</span>
          {athlete ? <span className="bold"> (ATH)</span> : null}
          <span className="player-list-item-archetype"> / {archetype}</span>
          <span className="player-list-item-classyear"> / {recruit_class}</span>
        </div>
        <div>
          <span className="recruit-list-item-recruiting-stage bold">
            {recruiting_stage}
          </span>
        </div>
      </div>
      <div>
        <h3 className="recruit-list-item-name">
          {first_name} {last_name}
        </h3>
      </div>
      <div>
        <span className="star-rating">{renderStarRating(star_rating)} </span>
        <span>{recruit.gem ? <FaGem color="green" /> : null}</span>
        <span>{recruit.bust ? <FaRegTimesCircle color="red" /> : null}</span>
      </div>
    </div>
  );
};

export default RecruitCard;
