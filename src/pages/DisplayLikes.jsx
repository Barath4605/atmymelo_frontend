import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, LoaderCircle } from "lucide-react";
import { getLikedUsers } from "../../api/reviewApi.js";

const StarRating = ({ rating }) => {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    viewBox="0 0 24 24"
                    className={`w-4 h-4 ${
                        star <= rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-white/10 text-white/10"
                    }`}
                >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
            ))}
        </div>
    );
};

const DisplayLikes = () => {
    const { reviewId } = useParams();
    const nav = useNavigate();
    const location = useLocation();

    const { username, review } = location.state || {};

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fullReview, setFullReview] = useState(false);

    useEffect(() => {
        const loadLikedUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getLikedUsers(reviewId);

                setData(response);
            } catch (err) {
                console.error(err);
                setError("Unable to load likes.");
            } finally {
                setLoading(false);
            }
        };

        if (reviewId) {
            loadLikedUsers();
        }
    }, [reviewId]);

    if (loading) {
        return (
            <main className="w-[90%] lg:w-[75%] max-w-5xl mx-auto my-12 text-white">
                <div className="flex justify-center items-center py-20">
                    <LoaderCircle
                        size={24}
                        className="animate-spin text-white/50"
                    />
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="w-[90%] lg:w-[75%] max-w-5xl mx-auto my-12 text-white">
                <button
                    onClick={() => nav(-1)}
                    className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm mb-8"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>

                <div className="border border-red-400/20 bg-red-400/5 rounded-xl p-6 text-center">
                    <p className="text-red-300/80 text-sm">
                        {error}
                    </p>
                </div>
            </main>
        );
    }

    const album = data?.album;
    const likedUsers = data?.likedUsers ?? [];

    return (
        <main className="w-[90%] lg:w-[75%] max-w-5xl mx-auto my-8 lg:my-12 text-white">

            {album && (
                <section className="flex flex-col sm:flex-row items-center sm:items-end gap-5 pb-7 border-b border-white/10">

                    <img
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover shadow-xl"
                        src={album.imageUrl}
                        alt={album.name}
                    />

                    <div className="text-center sm:text-left">

                        <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-2">
                            Album
                        </p>

                        <h1 className="text-3xl sm:text-5xl tracking-tighter montserrat-400">
                            {album.name}
                        </h1>

                        <p className="text-lg montserrat-200 sm:text-xl text-white/50 mt-1">
                            {album.artist?.name}
                        </p>

                    </div>
                </section>
            )}

            <section className="mt-8 mb-6">

                <h2 className="text-xl montserrat-200 sm:text-2xl">
                    People who liked{" "}
                    <span className="text-white/70">
                        {username}'s
                    </span>{" "}
                    review of{" "}
                    <span className="text-white">
                        {album?.name}
                    </span>
                </h2>

            </section>


            {/*DISPLAY THE REVIEW*/}
            <section className={`lg:w-[85%] w-[95%] m-auto my-5`}>
                <p className={`montserrat-300 ${fullReview ? "h-fit" : "max-h-15"}  overflow-hidden text-white/80 pl-2 py-0.5 border-l-2 border-gray-400`}>
                    {review}
                </p>
                <p className={`w-fit mx-auto text-white text-2xl p-2 text-center`} onClick={() => setFullReview(!fullReview)}>...</p>
            </section>

            {likedUsers.length === 0 && (
                <div className="border-t border-white/10 py-14 text-center">
                    <Heart
                        size={28}
                        className="mx-auto text-white/20 mb-3"
                    />

                    <p className="text-white/50 text-sm">
                        No one has liked this review yet.
                    </p>
                </div>
            )}

            {likedUsers.length > 0 && (
                <section className="border-t border-white/10">

                    {likedUsers.map((user) => (
                        <div
                            key={user.userId}
                            className="group flex items-center justify-between gap-4 py-5 px-3 border-b border-white/10 hover:bg-white/2.5 transition-colors"
                        >

                            <div className="flex items-center gap-4 min-w-0">

                                <div className>

                                    <p className=" text-sm cursor-pointer w-fit border-b border-white/20 hover:border-white/70UI
                                                  lg:text-white/80 hover:text-white/95
                                                   sm:text-base montserrat-400"
                                    >
                                        {user.username}
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-5 shrink-0">

                                {user.rating > 0 || user.isFavorite ? (
                                    user.rating > 0 && (
                                        <div className="">
                                            <StarRating rating={user.rating} />
                                        </div>
                                    )
                                ) : (
                                    <h1 className="lg:text-sm text-xs tracking-widest montserrat-500 text-gray-500">
                                        No Activity
                                    </h1>
                                )}

                                {user.isFavorite &&
                                    <div className="flex items-center justify-center p-1.5 bg-red-300/20 rounded-full">
                                        <Heart
                                            size={14}
                                            className="fill-red-400 text-red-400"
                                        />
                                    </div>
                                }

                            </div>

                        </div>
                    ))}

                </section>
            )}

        </main>
    );
};

export default DisplayLikes;