const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const BASE = `${API_URL}/api/queue`;

const getAuthHeader = () => ({
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
});

export const getQueueGenres = () => {
    return fetch(`${BASE}/genres`, {
        method: "GET",
        headers: getAuthHeader(),
    });
};

export const getQueueAlbumsByGenre = (genre) => {
    return fetch(`${BASE}/albums?genre=${encodeURIComponent(genre)}`, {
        method: "GET",
        headers: getAuthHeader()
    });
};