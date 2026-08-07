const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const TRACK_BASE = `${API_URL}/api/tracks`;

const getAuthHeader = () => ({
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
});

// GET TRACKLIST
export const getTracklist = (mbid) =>
    fetch(`${TRACK_BASE}/${mbid}`, {
        headers: getAuthHeader()
    }).then(res => {
        if (!res.ok) throw new Error("Failed to fetch tracklist");
        return res.json();
});

// USER POST TRACK RATING
export async function postUserTrackRating(tadbId, rating, favorite) {

    const response = await fetch(
        `${TRACK_BASE}/rate-track/${tadbId}`,
        {
            method: "POST",
            headers: getAuthHeader(),
            body: JSON.stringify({
                rating,
                favorite
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to save track rating");
    }

    return await response.json();
}

// GET THE USER'S TRACK RATING AND GLOBAL AVG RATING
export const getUserTrackRating = async (tadbId) => {

    const response = await fetch(
        `${TRACK_BASE}/get-track-rating/${tadbId}`,
        {
            method: "GET",
            headers: getAuthHeader()
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch track rating");
    }

    return await response.json();
};

// GET THE TOP RATED TRACK FROM THE ALBUM
export const getTopRatedTrack = async (albumId) => {

    const response = await fetch(
        `${TRACK_BASE}/get-highest-avg-song/${albumId}`,
        {
            headers: getAuthHeader()
        }
    );

    if(!response.ok){
        throw new Error("Failed to fetch top rated track");
    }

    return await response.text();
};