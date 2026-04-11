const BASE = "http://localhost:8080/api/favorites";

const getAuthHeader = () => ({
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
});

export const getUserGenres = () => {
    return fetch(`${BASE}/genre`, {
        method: "GET",
        headers: getAuthHeader(),
    } )
}

export const getFavoriteAlbumOnGenre = (genre) => {
    return fetch(`${BASE}/albums-in-genre?genre=${encodeURIComponent(genre)}`, {
        method: "GET",
        headers: getAuthHeader()
    });
};