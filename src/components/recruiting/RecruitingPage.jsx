import React, { useState, useEffect } from "react";
import RecruitForm from "./RecruitForm";
import RecruitTable from "./RecruitTable";
import RecruitViewer from "./RecruitViewer";

const RecruitingPage = () => {
  const [recruits, setRecruits] = useState([]);
  useEffect(() => {
    const fetchRecruits = async () => {
      try {
        const response = await fetch("api/dynasties/current/recruits");
        if (response.ok) {
          const data = await response.json();
          setRecruits(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch recruits.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    };

    fetchRecruits();
  }, []);

  const deleteRecruit = async (id) => {
    try {
      const response = await fetch(`/api/recruits/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete recruit: ${response.statusText}`);
      }

      // Assuming the delete is successful, update the recruits state
      setRecruits((prevRecruits) =>
        prevRecruits.filter((recruit) => recruit.id !== id)
      );
    } catch (error) {
      console.error("Error deleting recruit:", error);
    }
  };

  return (
    <div>
      <RecruitForm />
      <RecruitViewer recruits={recruits} onDeleteRecruit={deleteRecruit} />
    </div>
  );
};

export default RecruitingPage;
