const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const getArtistAlbums = (artistId) => {
    return fetch(`${API_URL}/api/artist/${artistId}/albums`);
};