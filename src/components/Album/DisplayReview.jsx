import React, {useEffect, useState} from 'react';
import {deleteUserReview} from "../../../api/albumApi.js"
import {getTotalLikes, toggleLike} from "../../../api/reviewApi.js"
import ReadMore from "../ReadMorePage.jsx";
import {Heart, Trash2, Repeat } from "lucide-react";
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

const DisplayReview = ({ username, review, rating, date, reviewId, onDelete, onLike, relisten }) => {

    const[totalLike, setTotalLikes] = useState(null);
    const[liked, setLiked] = useState(false);

    console.log(relisten)

    // DATE FORMATTING
    const formattedDate = date
        ? (() => {
            const d = new Date(date);

            const datePart = d.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });

            return `${datePart}`.toUpperCase();
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

    // UPDATE LIKES
    useEffect(() => {
        handleTotalLikes();
    }, [reviewId]);

    return (
        <article
            className="border-b border-zinc-500"
        >
            <div className="flex items-center lg:justify-start justify-between gap-5 pt-2 ">
                <div className={`flex justify-between gap-2 w-full`}>
                    <div className={`flex items-center justify-between gap-4`}>
                        {/*USERNAME*/}
                        <h1 className="poppins-light text-sm"><span className="montserrat-200 border-b border-b-white/25 cursor-pointer">{username}</span></h1>

                        {/*REVIEW RATING*/}
                        {rating > 0 && (
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon width={24} height={24} key={star} active={star <= rating} />
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        {/*RELISTEN INDICATOR*/}
                        {relisten && (
                            <span className="flex items-center gap-2 text-xs text-white/85"><Repeat size={15} className="text-gray-400/75 text-sm font-light" /> Re-Listened</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="m-1">

                {/*REVIEW TEXT*/}
                <p className="text-white/80 my-2 line-clamp-3 lg:text-md text-[16.5px] poppins-light">
                    {review}
                </p>
                {
                    review.length > 100 && <ReadMore customText="FULL REVIEW" bio={review} title={username} />
                }

                {/*LIKES*/}
                <div className="flex items-center gap-1.5 montserrat-300 text-xs">
                    <button onClick={() => handleLike(reviewId)}>
                        <Heart size={14}
                               className={
                                    liked ?
                                        `text-red-400 fill-red-400 cursor-pointer`
                                        :
                                        `text-gray-400 cursor-pointer`
                               }
                        />
                    </button>
                    <p className="text-[11px] text-white/45">
                        {totalLike === 0 ? `No Likes Yet` : `${totalLike} Likes`}
                    </p>
                </div>

                {/*DATE*/}
                <div className="flex items-center justify-between">
                    {formattedDate && (
                        <div>
                            <p className="text-[9px] mx-0.5 poppins-light text-white/60 tracking-wide">
                                {formattedDate}
                            </p>
                        </div>
                    )}
                    {/*DELETE*/}
                    <button
                        onClick={handleDeleteReview}
                        className="p-1.5 cursor-pointer text-red-500 hover:bg-red-700/20 rounded-full">
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default DisplayReview;