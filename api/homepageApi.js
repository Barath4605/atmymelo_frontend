const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const HOMEPAGE_BASE = `${API_URL}/api/homepage`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getRelistenAlbums = async () => {
  return fetch(`${HOMEPAGE_BASE}/suggest-relisten`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
};

export const getAlbumsFromUserTopGenre = async () => {
  return fetch(`${HOMEPAGE_BASE}/suggest-albums-topgenre`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
};
