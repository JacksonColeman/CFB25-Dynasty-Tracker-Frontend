import React from "react";
import PageHeader from "../../../../components/ui/PageHeader";
import BulkUpdatePlayersModal from "./BulkUpdatePlayersModal";

const PositionChangesPage = () => {
  return (
    <div className="main-content">
      <PageHeader content={"Position Changes"} />
      <p>Make sure to promote your recruits!</p>
      <BulkUpdatePlayersModal />
    </div>
  );
};

export default PositionChangesPage;
