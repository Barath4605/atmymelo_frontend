import React, {useEffect, useState} from 'react';
import {deleteUserReview} from "../../../api/albumApi.js"
import {getTotalLikes, toggleLike} from "../../../api/reviewApi.js"
import ReadMore from "../ReadMorePage.jsx";
import {Heart, Trash2} from "lucide-react";
import toast from "react-hot-toast";

const StarIcon = ({ active }) => (
    <svg viewBox="0 0 24 24" width="20" height="20"
         style={{
             fill: active ? "rgb(251,191,36)" : "rgba(255,255,255,0.15)",
             filter: active ? "drop-shadow(0 0 3px rgba(251,191,36,0.6))" : "none",
         }}
    >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
);

const DisplayReview = ({ username, review, rating, date, reviewId, onDelete, onLike }) => {

    const[totalLike, setTotalLikes] = useState(null);
    const[liked, setLiked] = useState(false);

    // DATE FORMATTING
    const formattedDate = date
        ? (() => {
            const d = new Date(date);

            const datePart = d.toLocaleDateString("en-US", {
                weekday: "short",
                month: "long",
                day: "numeric",
                year: "numeric",
            });

            const timePart = d.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });

            return `${datePart} • ${timePart}`.toUpperCase();
        })()
        : null;

    // DELETE REVIEW
    const handleDeleteReview = async () => {
        try {
            const res = await deleteUserReview(reviewId);
            onDelete();

            if (!res.ok) throw new Error();

            toast.success("Review deleted successfully.");

        } catch {
            toast.error("Unable to delete review. Try again!");
        }
    };

    // GET THE TOTAL LIKE FOR A REVIEW
    const handleTotalLikes = async () => {
        try {
            const resp = await getTotalLikes(reviewId);
            setTotalLikes(resp.totalLikes);
            setLiked(resp.isLiked);
        } catch (err) {
            console.error(err);
        }
    }

    // TOGGLE LIKES FOR REVIEW
    const handleLike = async (reviewId) => {
        try {
            await toggleLike(reviewId);

            const resp = await getTotalLikes(reviewId);
            setTotalLikes(resp.totalLikes);
            setLiked(resp.isLiked)

            onLike();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        handleTotalLikes();
    }, [reviewId]);

    return (
        <article
            className="rounded-lg"
            style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.75)",
                lineHeight: "1.8",
            }}
        >
            <div className="lg:flex items-center lg:justify-start justify-between gap-5 px-3 pt-2 ">
                {/*USERNAME*/}
                <h1 className="poppins-light text-sm">Review by <span className="montserrat-200 border-b border-b-white/25 cursor-pointer">{username}</span></h1>
            </div>

            <div className="m-3">

                {/*REVIEW TEXT*/}
                <p className="text-white/80 line-clamp-3 lg:text-md text-[16.5px] poppins-light">
                    {review}
                </p>
                {
                    review.length > 100 && <ReadMore customText="FULL REVIEW" bio={review} title={username} />
                }

                {/*REVIEW RATING*/}
                {rating > 0 && (
                    <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon width={24} height={24} key={star} active={star <= rating} />
                        ))}
                    </div>
                )}

                {/*LIKES*/}
                <div className="flex mt-5 items-end gap-1.5 montserrat-300 text-xs">
                    <button onClick={() => handleLike(reviewId)}>
                        <Heart size={16}
                               className={
                                    liked ?
                                        `text-red-400 fill-red-400 cursor-pointer`
                                        :
                                        `text-gray-400 cursor-pointer`
                               }
                        />
                    </button>
                    <p className="text-[12px] text-white/45">
                        {totalLike === 0 ? `No Likes Yet` : `${totalLike} Likes`}
                    </p>
                </div>

                {/*LINE DIVIDER*/}
                <p className="border-t border-t-white/10 mt-3"></p>

                {/*DATE*/}
                {formattedDate && (
                    <div className="flex items-center justify-between mt-1">
                        <p className="text-[10px] poppins-light mx-1 text-white/60 tracking-wide">
                            {formattedDate}
                        </p>
                        <button
                            onClick={handleDeleteReview}
                            className="p-1.5 cursor-pointer text-red-500 hover:bg-red-700/20 rounded-full">
                            <Trash2 size={14} />
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
};

export default DisplayReview;