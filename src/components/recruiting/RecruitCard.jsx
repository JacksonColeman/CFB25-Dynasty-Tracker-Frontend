import React, { useState } from "react";
import { FaStar, FaGem, FaRegTimesCircle, FaEllipsisV } from "react-icons/fa"; // Import the star icon
import "./recruitcard.css";
import RecruitCardDetail from "./RecruitCardDetail";

const RecruitCard = ({ recruit, onDeleteRecruit }) => {
  const [formData, setFormData] = useState({
    first_name: recruit.first_name,
    last_name: recruit.last_name,
    recruit_class: recruit.recruit_class,
    star_rating: recruit.star_rating,
    position: recruit.position,
    archetype: recruit.archetype,
    athlete: recruit.athlete,
    scouted: recruit.scouted,
    gem: recruit.gem,
    bust: recruit.bust,
    recruiting_stage: recruit.recruiting_stage,
    notes: recruit.notes,
  });

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${recruit.first_name} ${recruit.last_name}?`
      )
    ) {
      onDeleteRecruit(recruit.id);
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

  return (
    <div className="recruit-card-container">
      <div>
        <div className="recruit-card-c1-r1">
          <span className="recruit-card-name">
            {recruit.first_name} {recruit.last_name.toUpperCase()}
          </span>
        </div>
        <div className="recruit-card-c1-r2">
          <span className="star-rating">
            {renderStarRating(formData.star_rating)}
          </span>
          <span>{recruit.gem ? <FaGem color="green" /> : null}</span>
          <span>{recruit.bust ? <FaRegTimesCircle color="red" /> : null}</span>
        </div>
      </div>
      <div className="recruit-card-c2-r1">
        <RecruitCardDetail
          header="Position"
          content={`${recruit.position}${recruit.athlete ? "/ATH" : ""}`}
        />
      </div>
      <div className="recruit-card-c2-r2">
        {/* <span>{recruit.archetype}</span> */}
        <RecruitCardDetail header={"Archetype"} content={recruit.archetype} />
      </div>
      <div className="recruit-card-c3-r1">
        <RecruitCardDetail header={"Class"} content={recruit.recruit_class} />
      </div>
      <div className="recruit-card-c3-r2">
        <RecruitCardDetail
          header={"Recruiting Stage"}
          content={recruit.recruiting_stage}
        />
      </div>
      <div className="options-ellipsis">
        <FaEllipsisV fontSize={25} />
      </div>
      {/* <div className="recruit-card-c4-r1">
        <button>Edit</button>
      </div> */}
      <div className="recruit-card-c4-r2">
        <button onClick={handleDelete}>Delete</button>
      </div>
      {/* <div className="recruit-card-c5-r1">
        <button>Add to Roster</button>
      </div>
      <div className="recruit-card-c5-r2">
        <button>Show More</button>
      </div> */}
    </div>
  );
};

export default RecruitCard;
