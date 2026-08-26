const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const submitAlbumReport = async (albumId, complaint) => {
  const response = await fetch(`${API_URL}/api/report/album`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      id: albumId,
      complaint: complaint,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit album report");
  }
};

export const submitArtistReport = async (artistId, complaint) => {
  const response = await fetch(`${API_URL}/api/report/artist`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      id: artistId,
      complaint: complaint,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit artist report");
  }
};
