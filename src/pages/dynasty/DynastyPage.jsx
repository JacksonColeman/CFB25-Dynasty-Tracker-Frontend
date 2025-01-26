import React from "react";
import DynastyList from "./MyDynasties/DynastyList";
import CreateDynastyForm from "./CreateDynasty/CreateDynastyForm";

const DynastyPage = () => {
  return (
    <div>
      <DynastyList />
      <CreateDynastyForm />
    </div>
  );
};

export default DynastyPage;
