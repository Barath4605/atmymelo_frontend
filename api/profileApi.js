const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const BASE = `${API_URL}/api/profile`;

const getAuthHeader = () => ({
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
});

export const getProfile = async (username) => {
    const resp = await fetch(`${BASE}/${username}`, {
        method: "GET",
        headers: getAuthHeader(),
    })

    if(!resp.ok) {
        throw new Error(`${username} not found`);
    }

    return resp.json();
}