import { createContext, useContext, useState, useEffect } from "react";
import { useDynasty } from "./DynastyContext";
import { api } from "../api";

const RosterContext = createContext(null);

export const RosterProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
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

    initializeRoster();
  }, [currentDynasty]);

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

  return (
    <RosterContext.Provider
      value={{ players, createPlayer, updatePlayer, deletePlayer }}
    >
      {children}
    </RosterContext.Provider>
  );
};

export const useRoster = () => useContext(RosterContext);
