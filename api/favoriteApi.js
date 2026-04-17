const API_URL = "https://atmymelo-backend.onrender.com";
const FAVORITES_BASE = `${API_URL}/api/favorites`;

const getAuthHeader = () => ({
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
});

export const getUserGenres = () => {
    return fetch(`${FAVORITES_BASE}/genre`, {
        method: "GET",
        headers: getAuthHeader(),
    } )
}

export const getFavoriteAlbumOnGenre = (genre) => {
    return fetch(`${FAVORITES_BASE}/albums-in-genre?genre=${encodeURIComponent(genre)}`, {
        method: "GET",
        headers: getAuthHeader()
    });
};