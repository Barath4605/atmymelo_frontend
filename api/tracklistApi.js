const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const TRACK_BASE = `${API_URL}/api/tracks`;

const getAuthHeader = () => ({
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
});

export const getTracklist = (mbid) =>
    fetch(`${TRACK_BASE}/${mbid}`, {
        headers: getAuthHeader()
    }).then(res => {
        if (!res.ok) throw new Error("Failed to fetch tracklist");
        return res.json();
    });