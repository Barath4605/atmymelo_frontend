const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const HOMEPAGE_BASE = `${API_URL}/api/homepage`;

export const getRelistenAlbums = async () => {
  const token = localStorage.getItem("token");

  return fetch(`${HOMEPAGE_BASE}/suggest-relisten`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
