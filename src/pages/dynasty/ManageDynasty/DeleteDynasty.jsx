import React from "react";
import { useDynasty } from "../../../services/contexts/DynastyContext";
import { useNavigate } from "react-router-dom";

const DeleteDynasty = ({ dynasty }) => {
  const { deleteDynasty } = useDynasty();
  const navigate = useNavigate();

  const handleDeleteDynasty = async (id) => {
    try {
      await deleteDynasty(id);
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/");
    }
  };
  return (
    <div>
      <button onClick={() => handleDeleteDynasty(dynasty.id)}>
        {`Are you sure you want to delete ${dynasty.dynasty_name}?`}
      </button>
    </div>
  );
};

export default DeleteDynasty;
