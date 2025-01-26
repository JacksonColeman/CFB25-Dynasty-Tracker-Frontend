import React from "react";
import { FaEdit } from "react-icons/fa";
import "./EditButton.css";

const EditButton = ({ onClick }) => {
  return (
    <button className="icon-button" onClick={onClick}>
      <FaEdit />
    </button>
  );
};

export default EditButton;
