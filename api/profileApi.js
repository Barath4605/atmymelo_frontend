const API_URL = "https://atmymelo-backend.onrender.com";
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