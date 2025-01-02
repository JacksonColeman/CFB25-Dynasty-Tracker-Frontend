const API_BASE = "/api";

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    console.log("error caught in api module");
    // console.log(response.json());
    throw new Error(data.error || "An error occurred");
  }

  return data;
};

export const api = {
  // Auth

  signup: (userData) =>
    fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    fetch(`${API_BASE}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    }).then(handleResponse),

  logout: () =>
    fetch(`${API_BASE}/session`, {
      method: "DELETE",
      credentials: "include",
    }).then(handleResponse),

  getCurrentUser: () =>
    fetch(`${API_BASE}/current_user`, {
      credentials: "include",
    }).then((response) => {
      if (!response.ok) {
        return null;
      }
      return response.json();
    }),
  // Dynasties
  getDynasties: () => fetch(`${API_BASE}/dynasties`),
  setCurrentDynasty: (id) =>
    fetch(`${API_BASE}/dynasties/set_current`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id }),
    }),
  getCurrentDynasty: () => fetch(`${API_BASE}/dynasties/current`),

  createDynasty: (data) =>
    fetch(`${API_BASE}/dynasties/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  editDynasty: (id, updates) =>
    fetch(`${API_BASE}/dynasties/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }),

  // Players
  getPlayers: () => fetch(`${API_BASE}/dynasties/current/players`),
  updatePlayer: (id, data) =>
    fetch(`${API_BASE}/players/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  deletePlayer: (id) =>
    fetch(`${API_BASE}/players/${id}`, { method: "DELETE" }),

  createPlayer: (data) =>
    fetch(`${API_BASE}/players/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),

  // Recruits
  getRecruits: () => fetch(`${API_BASE}/dynasties/current/recruits`),
  updateRecruit: (id, data) =>
    fetch(`${API_BASE}/recruits/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteRecruit: (id) =>
    fetch(`${API_BASE}/recruits/${id}`, { method: "DELETE" }),
  convertToPlayer: (id, data) =>
    fetch(`${API_BASE}/recruits/${id}/convert_to_player`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // Dynasty Actions
  advanceClassYears: () =>
    fetch(`${API_BASE}/dynasties/current/advance_class_years`, {
      method: "PUT",
    }),
};
