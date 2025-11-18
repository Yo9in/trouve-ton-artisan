// src/services/api.js
const API_URL = "http://localhost:3001/api";

export async function fetchArtisans() {
  const res = await fetch(`${API_URL}/artisans`);
  if (!res.ok) {
    throw new Error("Erreur lors du chargement des artisans");
  }
  return res.json();
}
