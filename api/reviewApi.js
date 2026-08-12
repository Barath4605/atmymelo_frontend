const getAuthHeader = () => ({
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
});

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";


// TOGGLE LIKES FOR THE REVIEW
export async function toggleLike(reviewId) {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/api/albums/reviews/${reviewId}/likes`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to toggle like");
    }

    return response.json();
}


// GET THE TOTAL LIKES FOR THE REVIEW & CHECK IF USER HAS LIKED THE REVIEW
export async function getTotalLikes(reviewId) {

    const resp = await fetch(
        `${API_URL}/api/albums/reviews/${reviewId}/likes/total-likes`,
        {
            method: "GET",
            headers: getAuthHeader(),
        }
    );

    if(!resp.ok) {
        throw new Error("Failed to load one or more components");
    }

    return resp.json();
}

// GET USERS WHO LIKED THE REVIEW
export async function getLikedUsers(reviewId) {
    const resp = await fetch(
        `${API_URL}/api/albums/reviews/${reviewId}/likes/liked-users`,
        {
            method: "GET",
            headers: getAuthHeader(),
        }
    );

    if (!resp.ok) {
        const errorText = await resp.text();
        console.error("getLikedUsers failed:", {
            status: resp.status,
            statusText: resp.statusText,
            body: errorText
        });

        throw new Error(
            `Failed to load users who liked the review: ${resp.status}`
        );
    }

    return resp.json();
}