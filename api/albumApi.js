const BASE = "http://localhost:8080/api/albums";

const getAuthHeader = () => ({
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json"
});

export const rateAlbum = (mbid, rating) =>
    fetch(`${BASE}/${mbid}/rate`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ rating })
    });

export const toggleFavorite = (mbid, favorite) =>
    fetch(`${BASE}/${mbid}/favorite`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ favorite })
    });

export const toggleQueue = (mbid, queue) =>
    fetch(`${BASE}/${mbid}/queue`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ queue })
    });

export const submitReview = (mbid, review) =>
    fetch(`${BASE}/${mbid}/review`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify({ review })
    });

export const getUserReviews = (mbid) =>
    fetch(`http://localhost:8080/api/albums/${mbid}/all-reviews`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });

export const getLast3UserReviews = (mbid) =>
    fetch(`http://localhost:8080/api/albums/${mbid}/last-3`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });

export const deleteUserReview = (reviewid) => {
    return fetch(`${BASE}/delete-review/${reviewid}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
}

