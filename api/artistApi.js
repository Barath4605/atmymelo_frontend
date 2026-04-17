const API_URL = "https://atmymelo-backend.onrender.com";
export const getArtistAlbums = (artistId) => {
    return fetch(`${API_URL}/api/artist/${artistId}/albums`);
};