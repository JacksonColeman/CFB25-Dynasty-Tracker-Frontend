import { createContext, useContext, useState, useEffect } from "react";
import { useDynasty } from "./DynastyContext";
import { api } from "../api";

const RosterContext = createContext(null);

export const RosterProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [recruits, setRecruits] = useState([]);
  const { currentDynasty } = useDynasty();

  useEffect(() => {
    if (!currentDynasty) {
      setPlayers([]);
      return;
    }

    const initializeRoster = async () => {
      const response = await api.getPlayers();
      const players = await response.json();
      setPlayers(players);
    };

    const initializeRecruits = async () => {
      const response = await api.getRecruits();
      const recruits = await response.json();
      setRecruits(recruits);
    };

    initializeRoster();
    initializeRecruits();
  }, [currentDynasty]);

  const loadPlayers = async () => {
    const response = await api.getPlayers();
    const players = await response.json();
    setPlayers(players);
  };

  const loadRecruits = async () => {
    const response = await api.getRecruits();
    const recruits = await response.json();
    setRecruits(recruits);
  };

  const deletePlayer = async (playerId) => {
    try {
      await api.deletePlayer(playerId);
      setPlayers((current) =>
        current.filter((player) => player.id !== playerId)
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const deleteRecruit = async (recruitId) => {
    try {
      await api.deleteRecruit(recruitId);
      setRecruits((current) =>
        current.filter((recruit) => recruit.id !== recruitId)
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const createPlayer = async (data) => {
    try {
      const response = await api.createPlayer(data);
      const newPlayer = await response.json();
      console.log("creating player in context");
      console.log(newPlayer);
      setPlayers((current) => [...current, newPlayer]);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const createRecruit = async (data) => {
    try {
      const response = await api.createRecruit(data);
      const newRecruit = await response.json();
      console.log("creating player in context");
      console.log(newRecruit);
      setRecruits((current) => [...current, newRecruit]);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const updatePlayer = async (id, data) => {
    try {
      const response = await api.updatePlayer(id, data);
      const updatedPlayer = await response.json();
      console.log("updating player in context");
      console.log(updatedPlayer);

      // Update the players state with the updated player
      setPlayers((current) =>
        current.map((player) => (player.id === id ? updatedPlayer : player))
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const updateRecruit = async (id, data) => {
    console.log("calling updateRecruit in rosterContext");
    try {
      const response = await api.updateRecruit(id, data);
      const updatedRecruit = await response.json();
      console.log(updatedRecruit);

      // Update the players state with the updated player
      setRecruits((current) =>
        current.map((recruit) => (recruit.id === id ? updatedRecruit : recruit))
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const clearGraduates = async () => {
    try {
      // Call the API to clear graduates
      const response = await api.clearGraduates();

      if (response.ok) {
        console.log("Graduates cleared successfully.");
        await loadPlayers(); // Reload the updated players using the loadPlayers function
      } else {
        const errorData = await response.json();
        console.error("Failed to clear graduates:", errorData.error);
        throw new Error(errorData.error);
      }
    } catch (err) {
      console.error("An error occurred:", err);
      alert("An error occurred while clearing graduates. Please try again.");
      throw err;
    }
  };

  const clearRoster = async () => {
    try {
      // Call the API to clear graduates
      const response = await api.clearRoster();
      setPlayers([]);
    } catch (err) {
      console.error("An error occurred:", err);
      alert("An error occurred while clearing the roster. Please try again.");
      throw err;
    }
  };

  const clearRecruits = async () => {
    try {
      await api.clearRecruits();
      setRecruits([]);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const bulkUpdatePlayers = async (data) => {
    try {
      const response = await api.bulkUpdatePlayers(data);
      if (!response.ok) {
        throw new Error("Failed to bulk update players");
      }
      await loadPlayers();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const bulkUpdateRedshirt = async (data) => {
    try {
      const response = await api.bulkUpdateRedshirt(data);
      if (!response.ok) {
        throw new Error("Failed to bulk update redshirts");
      }
      await loadPlayers();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const addRecruitToRoster = async (id, data) => {
    try {
      const response = await api.addRecruitToRoster(id, data);
      await loadPlayers();
      await loadRecruits();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const bulkAddRecruitsToRoster = async (data) => {
    try {
      await api.bulkAddRecruitsToRoster(data);
      await loadPlayers();
      await loadRecruits();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <RosterContext.Provider
      value={{
        players,
        createPlayer,
        updatePlayer,
        deletePlayer,
        clearGraduates,
        clearRoster,
        bulkUpdatePlayers,
        bulkUpdateRedshirt,

        recruits,
        loadRecruits,
        deleteRecruit,
        createRecruit,
        updateRecruit,
        clearRecruits,
        addRecruitToRoster,
        bulkAddRecruitsToRoster,
      }}
    >
      {children}
    </RosterContext.Provider>
  );
};

export const useRoster = () => useContext(RosterContext);
