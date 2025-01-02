import React from "react";
import { useDynasty } from "../../contexts/DynastyContext";
import { useNavigate } from "react-router-dom";

const DynastyListItem = ({ dynasty }) => {
  const { editDynasty, deleteDynasty, setActive } = useDynasty();
  const navigate = useNavigate();

  const handleEditDynasty = async (dynastyID, updates) => {
    try {
      await editDynasty(dynastyID, updates);
    } catch (err) {
      throw err;
    }
  };

  const handleDynastySelect = async (dynastyId) => {
    try {
      await setActive(dynastyId);
      navigate("/roster"); // Navigate to roster page after selection
    } catch (error) {
      console.error("Error selecting dynasty:", error);
    }
  };

  const handleDynastyDelete = async (dynastyId) => {
    try {
      await deleteDynasty(dynastyId);
    } catch (error) {
      console.error("Error deleting dynasty:", error);
    }
  };

  return (
    <div>
      <p>{dynasty.dynasty_name}</p>
      <p>{dynasty.school_name}</p>
      <p>{dynasty.year}</p>
      <button>Edit</button>
      <button onClick={() => handleDynastyDelete(dynasty.id)}> Delete</button>
      <button onClick={() => handleDynastySelect(dynasty.id)}>Manage</button>
    </div>
  );
};

export default DynastyListItem;
