import React from 'react';
import { Heart, ListMusic } from "lucide-react";
import toast from "react-hot-toast";
import {
    toggleFavorite,
    rateAlbum,
    toggleQueue,
    submitReview,
    getUserReviews,
    getLast3UserReviews
} from "../../../api/albumApi.js";
import DisplayReview from "./DisplayReview.jsx";
import {useNavigate} from "react-router-dom";

const InteractionBtn = ({ mbid, rating: initialRating, favorite, queue }) => {

    const nav = useNavigate();

    const [isLiked, setIsLiked] = React.useState(favorite);
    const [isQueued, setIsQueued] = React.useState(queue);
    const [rating, setRating] = React.useState(initialRating);
    const [hovered, setHovered] = React.useState(0);
    const [review, setReview] = React.useState("");
    const [last3Reviews, setLast3Reviews] = React.useState([]);
    const [allReviews, setAllReviews] = React.useState([]);

    const StarIcon = ({ active }) => (
        <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            style={{
                fill: active ? "rgb(251,191,36)" : "rgba(255,255,255,0.12)",
                filter: active ? "drop-shadow(0 0 5px rgba(251,191,36,0.65))" : "none",
                transform: active ? "scale(1.15)" : "scale(1)",
                transition: "all 0.2s ease",
            }}
        >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
    );

    const fetchReviews = async () => {
        try {
            const res = await getUserReviews(mbid);
            if (!res.ok) throw new Error();

            const data = await res.json();
            setAllReviews(data);

        } catch {
            console.log();
        }
    };

    // FETCH LAST 3 USER REVIEWS
    const fetchLast3Reviews = async () => {
        try {
            const res = await getLast3UserReviews(mbid);
            if (!res.ok) throw new Error();

            const data = await res.json();
            setLast3Reviews(data);

        } catch {
            console.log();
        }
    };

    // FAVORITE
    const handleLike = async () => {
        try {
            const newVal = !isLiked;

            const res = await toggleFavorite(mbid, newVal);
            if (!res.ok) throw new Error();

            setIsLiked(newVal);

            toast.success(newVal ? "Added to Favorites" : "Removed from Favorites");
            console.log("clicked", mbid);
        } catch {
            toast.error("Failed to update Favorites");
        }
    };

    // QUEUE
    const handleQueueClick = async () => {
        if (isLiked) {
            toast("Can't queue something you've already favorited");
            return;
        }

        try {
            const newVal = !isQueued;

            const res = await toggleQueue(mbid, newVal);
            if (!res.ok) throw new Error();

            setIsQueued(newVal);

            toast.success(newVal ? "Added to Queue" : "Removed from Queue");

        } catch (err) {
            console.log("QUEUE ERROR", err);
            toast.error("Failed to update queue");
        }
    };

    // RATING
    const handleRate = async (val) => {
        try {
            const newVal = rating === val ? 0 : val;

            const res = await rateAlbum(mbid, newVal);
            if (!res.ok) throw new Error();

            setRating(newVal);

            toast.success(
                newVal === 0 ? "Rating removed" : `Rated ${newVal} out of 5`
            );

        } catch {
            toast.error("Failed to rate");
        }
    };

    // REVIEW
    const handleReview = async () => {
        if (!review.trim()) {
            toast.error("Review can't be empty");
            return;
        }

        try {
            const res = await submitReview(mbid, review);
            if (!res.ok) throw new Error();

            toast.success("Review saved");
            setReview("");

            await fetchLast3Reviews();

        } catch {
            toast.error("Failed to submit review");
        }
    };

    // GET ALL REVIEWS FROM THIS USER FOR THIS ALBUM
    React.useEffect(() => {
        fetchLast3Reviews();
    }, [mbid]);

    // KEEP THE LIKES RATES AND REVIEWS TO QUEUES UPDATED TO THE BACKEND
    React.useEffect(() => {
        if (isLiked || rating > 0 || review.trim().length > 0) {
            setIsQueued(false);
        }
    }, [isLiked, rating, review]);

    return (
        <div className="flex flex-col gap-5 w-full max-w-md">

            {/* FAVORITE + QUEUE */}
            <div className="flex flex-col lg:flex-row gap-3">

                <button
                    onClick={handleLike}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs tracking-widest uppercase transition-all duration-300"
                    style={{
                        background: isLiked ? "rgba(248,113,113,0.12)" : "rgba(255,255,255,0.06)",
                        border: isLiked ? "1px solid rgba(248,113,113,0.4)" : "1px solid rgba(255,255,255,0.12)",
                        color: isLiked ? "rgb(252,165,165)" : "rgba(255,255,255,0.6)",
                    }}
                >
                    <Heart
                        size={13}
                        strokeWidth={isLiked ? 0 : 1.5}
                        fill={isLiked ? "rgb(252,165,165)" : "transparent"}
                        style={{ transform: isLiked ? "scale(1.15)" : "scale(1)" }}
                    />
                    <span>{isLiked ? "Favorited" : "Favorite"}</span>
                </button>

                <button
                    onClick={handleQueueClick}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs tracking-widest uppercase transition-all duration-300"
                    style={{
                        background: isQueued ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.06)",
                        border: isQueued ? "1px solid rgba(52,211,153,0.35)" : "1px solid rgba(255,255,255,0.12)",
                        color: isQueued ? "rgb(110,231,183)" : "rgba(255,255,255,0.6)",
                    }}
                >
                    <ListMusic size={13} />
                    <span>{isQueued ? "Queued" : "Add to Queue"}</span>
                </button>
            </div>

            {/*RATING*/}
            <div className="flex flex-col gap-2 lg:w-150">
                <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-center lg:justify-start gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => {
                            const isActive = star <= (hovered || rating);
                            return (
                                <button
                                    key={star}
                                    onClick={() => handleRate(star)}
                                    onMouseEnter={() => setHovered(star)}
                                    onMouseLeave={() => setHovered(0)}
                                    className="transition-all duration-200 p-1 rounded-full"
                                    style={{
                                        background: isActive ? "rgba(251,191,36,0.08)" : "transparent",
                                    }}
                                >
                                    <StarIcon active={isActive} />
                                </button>
                            );
                        })}
                        {rating > 0 && (
                            <span
                                className="ml-2 montserrat-500 text-[12px] p-1 px-3 bg-black/75 rounded-full tracking-widest uppercase"
                                style={{ color: "rgba(251,191,36,0.55" }}
                            >
                                {rating} / 5
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/*TEXT AREA*/}
            <div className="flex flex-col gap-2 lg:w-150">
                <textarea
                    rows={4}
                    value={review}
                    onChange={e => setReview(e.target.value)}
                    maxLength={500}
                    disabled={rating === 0}
                    placeholder={rating > 0 ? `Write your thoughts` : `rate me first :)`}
                    className={`w-full resize-none rounded-lg px-4 py-3 text-sm montserrat-300 outline-none
                                transition-all duration-300 placeholder:opacity-30
                                ${rating > 0 ? `cursor-text h-50` : `cursor-not-allowed h-12`}
                                `}
                    style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.75)",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
                {review.length > 0 && (
                    <p className="text-xs text-right">
                        {review.length} / 500
                    </p>
                )}

                {rating >! 0 ?
                    (
                        <>
                            <button
                                onClick={handleReview}
                                className={`text - xs p-2 text-white/70 
                                        cursor-pointer w-1/2  poppins-light 
                                        tracking-widest 
                                        transition-opacity duration-1000
                                        bg-white/10 rounded`
                                }>
                                Submit Review
                            </button>

                        </>
                    )
                    :
                    (
                        <div className="transition-all ease-in-out duration-1000">
                            <p className={`text-xs transition-opacity duration-500 text-gray-400`}>
                                You have to rate the album before you can review it.
                            </p>
                        </div>

                    )
                }
            </div>



            {/*ALL USER REVIEWS*/}
            <div className="lg:w-250 montserrat-300">
                <div className="lg:flex justify-between mb-2">
                    <h1 className="uppercase tracking-[0.2em] text-[14px] lg:mb-2 font-medium">
                        RECENT REVIEWS
                    </h1>

                    { last3Reviews.length >= 3 &&
                        (
                            <button
                                onClick={() => nav(`/albums/${mbid}/all-reviews`)}
                                className>
                                <h1 className="text-xs pb-px cursor-pointer border-b">OPEN ALL REVIEWS</h1>
                            </button>
                        )
                    }
                </div>

                {last3Reviews.length === 0 && (
                    <p className="text-white/40 tracking-widest text-xs">
                        No reviews yet
                    </p>
                )}


                <div className="flex flex-col gap-3">
                    {last3Reviews.map((r) => (
                        <DisplayReview
                            key={r.id}
                            username={r.username}
                            review={r.content}
                            reviewId={r.reviewId}
                            rating={r.rating}
                            date={r.createdAt}
                            onDelete={fetchLast3Reviews}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default InteractionBtn;