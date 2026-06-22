import React from 'react';
import {deleteUserReview } from "../../../api/albumApi.js"
import ReadMore from "../ReadMorePage.jsx";
import { Trash2 } from "lucide-react";
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

const DisplayReview = ({ username, review, rating, date, reviewId, onDelete }) => {

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
            <div className="lg:flex items-start lg:justify-start justify-between gap-5 px-3 py-2 border-b border-white/10">
                <h1 className="poppins-light text-sm">Review by <span className="montserrat-200 border-b border-b-white/25 cursor-pointer">{username}</span></h1>
                {rating > 0 && (
                    <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon width={24} height={24} key={star} active={star <= rating} />
                        ))}
                    </div>
                )}
            </div>

            <div className="m-3">
                <p className="text-white/80 line-clamp-3 lg:text-md text-[16.5px] poppins-light">
                    {review}
                </p>
                {
                    review.length > 100 && <ReadMore customText="FULL REVIEW" bio={review} title={username} />
                }
                {formattedDate && (
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] poppins-light mt-3 text-white/60 tracking-wide">
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