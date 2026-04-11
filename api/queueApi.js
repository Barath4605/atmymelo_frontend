const BASE = "http://localhost:8080/api/queue";

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