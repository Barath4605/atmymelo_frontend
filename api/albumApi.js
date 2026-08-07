const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const ALBUM_BASE = `${API_URL}/api/albums`;

const getAuthHeader = () => ({
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
});

// RATE ALBUM
export const rateAlbum = (mbid, rating) =>
    fetch(`${ALBUM_BASE}/${mbid}/rate`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ rating })
    });

// TOGGLE FAV
export const  toggleFavorite = (mbid, favorite) =>
    fetch(`${ALBUM_BASE}/${mbid}/favorite`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ favorite })
    });

// TOGGLE QUEUE
export const toggleQueue = (mbid, queue) =>
    fetch(`${ALBUM_BASE}/${mbid}/queue`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ queue })
    });

// SUBMIT A REVIEW
export const submitReview = (mbid, review, date) =>
    fetch(`${ALBUM_BASE}/${mbid}/review`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ review, date })
    });

// GET USER'S REVIEW
export const getUserReviews = (mbid) =>
    fetch(`${ALBUM_BASE}/${mbid}/all-user-reviews`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });

// GET LAST 3 USER REVIEWS
export const getLast3UserReviews = (mbid) =>
    fetch(`${ALBUM_BASE}/${mbid}/last-3`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });

// DELETE A USER'S REVIEW
export const deleteUserReview = (reviewid) => {
    return fetch(`${ALBUM_BASE}/delete-review/${reviewid}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
}

// GET GLOBAL REVIEWS SORTED BY POPULARITY (likes)
export const getAllReview = (mbid) =>
    fetch(`${ALBUM_BASE}/${mbid}/all-reviews`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })