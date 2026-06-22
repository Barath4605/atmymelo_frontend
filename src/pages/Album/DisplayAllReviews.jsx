import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getUserReviews } from "../../../api/albumApi.js"
import DisplayReview from "../../components/Album/DisplayReview";
import AlbumMiniHeader from "../../components/Album/AlbumMiniHeader";

const DisplayAllReviews = () => {
    const { mbid } = useParams();

    const [reviews, setReviews] = useState([]);
    const [album, setAlbum] = useState(null);

    const fetchReviews = async () => {
        try {
            const res = await getUserReviews(mbid);
            const data = await res.json();

            if (!res.ok) throw new Error();

            setReviews(data);

        } catch {
            toast.error("Failed to load reviews", { id: toastId });
        }
    };

    const fetchAlbum = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

            const res = await fetch(`${API_URL}/api/albums/${mbid}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            const data = await res.json();

            if (!res.ok) throw new Error();

            setAlbum(data.album);
        } catch {
            console.log("album load failed");
        }
    };

    useEffect(() => {
        fetchAlbum();
        fetchReviews();
    }, [mbid]);

    if (!album) return null;

    return (
        <main className="min-h-screen text-white">

            <AlbumMiniHeader
                albumImg={album.imageUrl}
                title={album.title}
                artist={album.artist?.name}
                year={album.releaseYear}
            />

            <section className="lg:w-[70%] w-[90%] mx-auto mt-10 space-y-4">

                <h2 className="text-sm tracking-widest uppercase text-white/40">
                    All Reviews
                </h2>

                {reviews.length === 0 && (
                    <p className="text-white/30 text-sm">No reviews yet</p>
                )}

                <div className="flex flex-col gap-4">
                    {reviews.map((r) => (
                        <DisplayReview
                            key={r.reviewId}
                            username={r.username}
                            review={r.content}
                            rating={r.rating}
                            date={r.createdAt}
                            reviewId={r.reviewId}
                            onDelete={fetchReviews}
                        />
                    ))}
                </div>

            </section>
        </main>
    );
};

export default DisplayAllReviews;