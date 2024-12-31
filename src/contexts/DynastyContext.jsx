// File: src/contexts/DynastyContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api";
import { useAuth } from "./AuthContext";

const DynastyContext = createContext(null);

export const DynastyProvider = ({ children }) => {
  const [currentDynasty, setCurrentDynasty] = useState(null);
  const [dynasties, setDynasties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [advancingYear, setAdvancingYear] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log("DynastyContext: useEffect");
    if (!isAuthenticated) {
      setLoading(true);
      setCurrentDynasty(null);
      setDynasties([]);
      return;
    }

    const initializeDynastyData = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const [currentDynastyResponse, dynastiesResponse] = await Promise.all([
          api.getCurrentDynasty(),
          api.getDynasties(),
        ]);

        const [currentDynastyData, dynastiesData] = await Promise.all([
          currentDynastyResponse.json(),
          dynastiesResponse.json(),
        ]);

        console.log("Current dynasty data");
        console.log(currentDynastyData);

        // Check if the current dynasty data is valid before setting the state
        if (currentDynastyData && currentDynastyData.id) {
          setCurrentDynasty(currentDynastyData);
        } else {
          setCurrentDynasty(null); // No active dynasty, so set to null
        }

        setDynasties(dynastiesData);
      } catch (error) {
        console.error("Error loading dynasty data:", error);
        setCurrentDynasty(null);
        setDynasties([]);
      } finally {
        setLoading(false);
      }
    };

    initializeDynastyData();
  }, [isAuthenticated]);

  const loadDynasties = async () => {
    console.log("DynastyContext: loadDynasties");
    try {
      const response = await api.getDynasties();
      const data = await response.json();
      setDynasties(data);
    } catch (error) {
      console.error("Error loading dynasties:", error);
      setCurrentDynasty(null);
      setDynasties([]);
      throw error;
    }
  };

  const setActive = async (id) => {
    console.log("DynastyContext: setActive");
    try {
      await api.setCurrentDynasty(id);
      const response = await api.getCurrentDynasty();
      console.log(response);
      const dynasty = await response.json();
      console.log(dynasty);
      setCurrentDynasty(dynasty);
    } catch (error) {
      console.error("Error setting active dynasty:", error);
      throw error;
    }
  };

  const createDynasty = async (data) => {
    try {
      const response = await api.createDynasty(data);

      if (!response.ok) throw new Error("Failed to create dynasty");

      await loadDynasties();
      return await response.json();
    } catch (error) {
      console.error("Error creating dynasty:", error);
      throw error;
    }
  };

  const editDynasty = async (id, updates) => {
    try {
      const response = await api.editDynasty(id, updates);

      if (!response.ok) throw new Error("Failed to update dynasty");

      const updatedDynasty = await response.json();

      // Update local state
      setDynasties((current) =>
        current.map((d) => (d.id === id ? updatedDynasty : d))
      );

      // Update current dynasty if it was the one edited
      if (currentDynasty?.id === id) {
        setCurrentDynasty(updatedDynasty);
      }

      return updatedDynasty;
    } catch (error) {
      console.error("Error updating dynasty:", error);
      throw error;
    }
  };

  const deleteDynasty = async (id) => {
    try {
      const response = await fetch(`/api/dynasties/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete dynasty");

      // Update local state
      setDynasties((current) => current.filter((d) => d.id !== id));

      // Clear current dynasty if it was the one deleted
      if (currentDynasty?.id === id) {
        setCurrentDynasty(null);
      }
    } catch (error) {
      console.error("Error deleting dynasty:", error);
      throw error;
    }
  };

  const advanceYear = async () => {
    if (!currentDynasty) {
      throw new Error("No dynasty selected");
    }

    setAdvancingYear(true);
    try {
      const response = await api.advanceClassYears();
      if (!response.ok) {
        throw new Error("Failed to advance year");
      }

      // Get the updated dynasty data after advancing year
      const updatedDynastyResponse = await api.getCurrentDynasty();
      const updatedDynasty = await updatedDynastyResponse.json();

      // Update both the current dynasty and the dynasty in the list
      setCurrentDynasty(updatedDynasty);
      setDynasties((current) =>
        current.map((d) => (d.id === updatedDynasty.id ? updatedDynasty : d))
      );

      return updatedDynasty;
    } catch (error) {
      console.error("Error advancing year:", error);
      throw error;
    } finally {
      setAdvancingYear(false);
    }
  };

  return (
    <DynastyContext.Provider
      value={{
        currentDynasty,
        dynasties,
        loading,
        advancingYear,
        loadDynasties,
        setActive,
        createDynasty,
        editDynasty,
        deleteDynasty,
        advanceYear,
      }}
    >
      {children}
    </DynastyContext.Provider>
  );
};

export const useDynasty = () => useContext(DynastyContext);
