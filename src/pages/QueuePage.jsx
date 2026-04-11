import React, { useEffect, useState } from 'react';
import QueueBg from "../components/Queue/QueueBg.jsx";
import Tabs from "../components/Tabs.jsx";
import { getQueueGenres, getQueueAlbumsByGenre } from "../../api/queueApi.js";
import toast from "react-hot-toast";

const name = localStorage.getItem("name");

const Star = ({ active }) => (
    <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        style={{
            fill: active ? "#60a5fa" : "rgba(255,255,255,0.15)", // 🔥 bluish stars (fits bg)
            filter: active ? "drop-shadow(0 0 6px rgba(96,165,250,0.7))" : "none",
            transition: "all 0.2s ease"
        }}
    >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
);

const QueuePage = () => {
    const [genres, setGenres] = useState([]);
    const [activeTab, setActiveTab] = useState("");
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await getQueueGenres();
                const data = await res.json();

                if (!res.ok) throw new Error();

                setGenres(data);
                if (data.length > 0) setActiveTab(data[0]);

            } catch {
                toast.error("Failed to load queue genres");
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        if (!activeTab) return;

        const fetchAlbums = async () => {
            const toastId = toast.loading("Loading queue...");
            try {
                const res = await getQueueAlbumsByGenre(activeTab);
                const data = await res.json();

                if (!res.ok) throw new Error();

                setAlbums(data);
                toast.success("Loaded", { id: toastId });

            } catch {
                toast.error("Failed to load queue", { id: toastId });
            }
        };

        fetchAlbums();
    }, [activeTab]);

    return (
        <main className="relative min-h-screen overflow-hidden montserrat-300 text-white">
            <QueueBg />

            <header className="lg:p-5 p-3 lg:mx-10 border-b border-white/20">
                <h1 className="text-4xl lg:text-6xl poppins-semibold tracking-tight">
                    {name}'s <br />
                    <span className="lg:text-7xl text-5xl tracking-tighter">QUEUE</span>
                </h1>
            </header>

            <div className="lg:w-[85%] w-[92%] flex flex-wrap gap-2 my-3 mx-auto">
                {genres.map((genre) => (
                    <Tabs
                        key={genre}
                        name={genre === null ? "Other" : genre}
                        isActive={activeTab === genre}
                        onClick={() => setActiveTab(genre)}
                    />
                ))}
            </div>

            <section className="lg:w-[85%] w-[92%] mx-auto mt-6 grid grid-cols-1 lg:grid-cols-4 gap-5 pb-15">

                {albums.length === 0 && (
                    <p className="text-white/40 col-span-full text-center">
                        No albums in queue
                    </p>
                )}

                {albums.map((album) => (
                    <div
                        key={album.albumId}
                        className="group cursor-pointer"
                        onClick={() => window.location.href = `/albums/${album.albumId}`}
                    >
                        <div className="relative overflow-hidden rounded-lg">
                            <img
                                src={album.imageUrl}
                                alt={album.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="mt-2">
                            <h2 className="text-xl font-medium line-clamp-1">
                                {album.title}
                            </h2>
                            <p className="text-sm text-white line-clamp-1">
                                {album.artist} <span> · {album.releaseDate}</span>
                            </p>
                        </div>

                        {album.rating > 0 && (
                            <div className="flex items-center gap-1 mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} active={star <= album.rating} />
                                ))}
                            </div>
                        )}
                    </div>
                ))}

            </section>
        </main>
    );
};

export default QueuePage;