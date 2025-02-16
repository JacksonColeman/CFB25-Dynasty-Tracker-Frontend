import { useState } from "react";
import { useDynasty } from "../../../services/contexts/DynastyContext";
import EditDynastyForm from "./EditDynastyForm";
import MyDynastyControlPanel from "./MyDynastyControlPanel";
import DeleteDynasty from "./DeleteDynasty";

const EditDynastyPage = () => {
  const { loading, currentDynasty, advanceYear } = useDynasty();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading & !currentDynasty) {
    return <div>No current dynasty found. Return to homepage? (Add Link)</div>;
  }

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const toggleDelete = () => {
    setConfirmDelete(!confirmDelete);
  };

  const handleAdvanceYear = async () => {
    console.log("advance");
    try {
      await advanceYear();
    } catch {
      console.log("Error advancing year");
    }
  };

  return (
    <div className="dynasty-display">
      <MyDynastyControlPanel
        onClickEdit={toggleEditing}
        onClickDelete={toggleDelete}
      />
      {!editing ? (
        <div>
          <div>{currentDynasty.dynasty_name}</div>
          <div>{currentDynasty.school_name}</div>
          <div>{currentDynasty.year}</div>
        </div>
      ) : (
        <EditDynastyForm dynasty={currentDynasty} onSubmit={toggleEditing} />
      )}
      {confirmDelete ? <DeleteDynasty dynasty={currentDynasty} /> : null}
      <button onClick={handleAdvanceYear}>Advance Year</button>
    </div>
  );
};

export default EditDynastyPage;
