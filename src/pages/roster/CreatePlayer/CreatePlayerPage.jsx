import React from "react";
import PlayerForm from "./PlayerForm";
import PageHeader from "../../../components/ui/PageHeader";

const CreatePlayerPage = () => {
  return (
    <div className="main-content">
      <PageHeader content="Add Players" />
      <PlayerForm />
    </div>
  );
};

export default CreatePlayerPage;
