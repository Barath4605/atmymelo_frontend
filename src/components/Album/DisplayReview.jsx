import React, { useEffect, useState } from 'react';
import { deleteUserReview } from "../../../api/albumApi.js";
import { getTotalLikes, toggleLike } from "../../../api/reviewApi.js";
import ReadMore from "../ReadMorePage.jsx";
import { Heart, Trash2, Repeat } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StarIcon = ({ value = 0 }) => {
    const gradientId = `star-${Math.random().toString(36).slice(2)}`;

    // Clamp value between 0 and 1
    const fill = Math.max(0, Math.min(1, value));

    return (
        <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            aria-hidden="true"
        >
            <defs>
                <linearGradient
                    id={gradientId}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset={`${fill * 100}%`}
                        stopColor="rgb(251,191,36)"
                    />
                    <stop
                        offset={`${fill * 100}%`}
                        stopColor="rgba(255,255,255,0.15)"
                    />
                </linearGradient>
            </defs>

            <polygon
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill={`url(#${gradientId})`}
                style={{
                    filter:
                        fill > 0
                            ? "drop-shadow(0 0 3px rgba(251,191,36,0.6))"
                            : "none",
                }}
            />
        </svg>
    );
};;

const DisplayReview = ({
                           username,
                           review,
                           rating,
                           date,
                           reviewId,
                           onDelete,
                           onLike,
                           relisten
                       }) => {

    const [totalLike, setTotalLikes] = useState(null);
    const [liked, setLiked] = useState(false);

    const USER_NAME = localStorage.getItem("username");

    const nav = useNavigate();

    // DATE FORMATTING
    const formattedDate = date
        ? (() => {
            const d = new Date(date);

            const datePart = d.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });

            return datePart.toUpperCase();
        })()
        : null;

    // NAVIGATE TO LIKE PAGE
    const navigateToLikePage = (totalLike) => {
        if (totalLike === 0) return;

        nav(`/reviews/${reviewId}/liked-by`, {
            state: {
                username: username,
                review: review
            }
        });
    };

    // DELETE REVIEW
    const handleDeleteReview = async () => {
        try {
            const res = await deleteUserReview(reviewId);

            // Make sure the backend actually deleted it
            if (!res.ok) {
                throw new Error();
            }

            toast.success("Review deleted successfully.");

            // If parent supplied a callback, run it
            onDelete?.();

            // Tell PopularReviews that reviews have changed
            window.dispatchEvent(new Event("reviewsChanged"));

        } catch (err) {
            console.error("DELETE REVIEW ERROR:", err);

            toast.error("Unable to delete review. Try again!");
        }
    };

    // GET TOTAL LIKES
    const handleTotalLikes = async () => {
        try {
            const resp = await getTotalLikes(reviewId);

            setTotalLikes(resp.totalLikes);
            setLiked(resp.isLiked);

        } catch (err) {
            console.error("GET LIKES ERROR:", err);
        }
    };

    // TOGGLE LIKE
    const handleLike = async (reviewId) => {
        try {
            await toggleLike(reviewId);

            const resp = await getTotalLikes(reviewId);

            setTotalLikes(resp.totalLikes);
            setLiked(resp.isLiked);

            // Only call callback if one was provided
            onLike?.();

        } catch (err) {
            console.error("LIKE ERROR:", err);
        }
    };

    // UPDATE LIKES WHEN REVIEW CHANGES
    useEffect(() => {
        handleTotalLikes();
    }, [reviewId]);

    return (
        <article className="border-b border-zinc-500">

            {/* HEADER */}
            <div className="flex items-center lg:justify-start justify-between gap-5 pt-2">

                <div className="flex justify-between gap-2 w-full">

                    <div className="flex items-center justify-between gap-4">

                        {/* USERNAME */}
                        <h1 className="poppins-light text-sm">
                            <span className="montserrat-200 border-b ml-1 border-b-white/25 cursor-pointer">
                                {username}
                            </span>
                        </h1>

                        {/* RATING */}
                        {rating > 0 && (
                            <div className="flex items-center gap-0.5">

                                {[1, 2, 3, 4, 5].map((star) => {

                                    const fill = Math.max(
                                        0,
                                        Math.min(1, rating - star + 1)
                                    );

                                    return (
                                        <StarIcon
                                            key={star}
                                            value={fill}
                                        />
                                    );
                                })}

                            </div>
                        )}

                    </div>

                    {/* RELISTEN */}
                    <div>

                        {relisten && (
                            <span className="flex items-center gap-2 text-xs text-white/85">

                                <Repeat
                                    size={15}
                                    className="text-gray-400/75 text-sm font-light"
                                />

                                Re-Listened

                            </span>
                        )}

                    </div>

                </div>

            </div>

            {/* CONTENT */}
            <div className="m-1">

                {/* REVIEW TEXT */}
                <div>

                    <div className="lg:flex items-end justify-between">

                        <p className="text-white/80 my-2 line-clamp-3 lg:text-md text-[14.5px] poppins-light">
                            {review}
                        </p>

                        {review.length > 400 && (
                            <div className="mb-2 text-xs">
                                <ReadMore
                                    customText="FULL REVIEW"
                                    bio={review}
                                    title={username}
                                />
                            </div>
                        )}

                    </div>

                </div>

                {/* LIKES */}
                <div className="flex items-center gap-1.5 mt-5 montserrat-300 text-xs">

                    <button onClick={() => handleLike(reviewId)}>

                        <Heart
                            size={15}
                            className={
                                liked
                                    ? "text-red-400 fill-red-400 cursor-pointer"
                                    : "text-gray-400 cursor-pointer"
                            }
                        />

                    </button>

                    <p
                        className="cursor-pointer text-[12px] text-white/45"
                        onClick={() => navigateToLikePage(totalLike)}
                    >
                        {totalLike === 0
                            ? "No Likes Yet"
                            : totalLike === 1
                                ? `${totalLike} Like`
                                : `${totalLike} Likes`
                        }
                    </p>

                </div>

                {/* DATE + DELETE */}
                <div className="flex items-center justify-between">

                    {formattedDate && (
                        <div>
                            <p className="text-[9px] py-1.5 mx-0.5 poppins-light text-white/60 tracking-wide">
                                {formattedDate}
                            </p>
                        </div>
                    )}

                    {/* DELETE */}
                    {USER_NAME === username && (
                        <button
                            onClick={handleDeleteReview}
                            className="cursor-pointer text-red-500 hover:bg-red-700/20 rounded-full"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}

                </div>

            </div>

        </article>
    );
};

export default DisplayReview;