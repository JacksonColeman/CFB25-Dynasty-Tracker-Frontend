import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDynasty } from "../../../services/contexts/DynastyContext";
import DynastyListItem from "./DynastyListItem";

const DynastyList = () => {
  const [newDynastyName, setNewDynastyName] = useState("");
  const {
    dynasties,
    currentDynasty,
    loading,
    loadDynasties,
    setActive,
    editDynasty,
    deleteDynasty,
  } = useDynasty();
  const navigate = useNavigate();

  useEffect(() => {
    loadDynasties();
    console.log("Dynasties:", dynasties);
  }, []);

  const handleDynastySelect = async (dynastyId) => {
    try {
      await setActive(dynastyId);
      navigate("/roster"); // Navigate to roster page after selection
    } catch (error) {
      console.error("Error selecting dynasty:", error);
    }
  };

  const handleCreateDynasty = async (e) => {
    e.preventDefault();
    if (!newDynastyName.trim()) return;

    try {
      const response = await fetch("/api/dynasties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newDynastyName }),
      });

      if (!response.ok) {
        throw new Error("Failed to create dynasty");
      }

      setNewDynastyName("");
      await loadDynasties(); // Refresh the dynasty list
    } catch (error) {
      console.error("Error creating dynasty:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Dynasties
        </h2>

        {/* Dynasty List */}
        {dynasties.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No dynasties yet. Create one to get started!
          </div>
        ) : (
          <div className="grid gap-4">
            {dynasties.map((dynasty) => (
              <DynastyListItem dynasty={dynasty} key={dynasty.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DynastyList;
