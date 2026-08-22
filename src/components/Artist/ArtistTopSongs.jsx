import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const ArtistTopSongs = ({ artistId }) => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const nav = useNavigate();

    useEffect(() => {
        if (!artistId) return;

        const fetchTopSongs = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `${API_URL}/api/artist/top-songs/${artistId}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch top songs");
                }

                const data = await response.json();
                setSongs(data);
            } catch (err) {
                console.error(err);
                setError("Unable to load top songs.");
            } finally {
                setLoading(false);
            }
        };

        fetchTopSongs();
    }, [artistId]);

    const formatDuration = (duration) => {
        const seconds = Math.floor(Number(duration) / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <main className="lg:w-[70%] w-[90%] mx-auto mt-10">

            {/* Header */}
            <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <h2
                    className="
                        text-[14px]
                        montserrat-400
                        uppercase
                        tracking-[0.2em]
                        font-medium
                        text-zinc-900
                        dark:text-zinc-100
                    "
                >
                    Artist Top Songs
                </h2>
            </div>

            {/* Loading */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="
                                flex
                                gap-3
                                p-2
                                animate-pulse
                            "
                        >
                            <div className="size-18 shrink-0 rounded bg-zinc-200 dark:bg-zinc-800" />

                            <div className="flex-1 py-1">
                                <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                                <div className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800 mt-3" />
                                <div className="h-3 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800 mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400 py-6">
                    {error}
                </p>
            )}

            {/* Songs */}
            {!loading && !error && songs.length > 0 && (
                <div className="grid
                                lg:grid-cols-2 grid-cols-1
                                grid-rows-5
                                lg:grid-flow-col grid-flow-row
                                gap-x-8
                                gap-y-4
                ">

                    {songs.map((song, index) => (
                        <article
                            key={song.trackId}
                            className="
                                        group
                                        flex
                                        gap-3
                                        p-2
                                        -m-2
                                        border-b lg:border-b-0 border-zinc-200/20
                                        lg:rounded-lg
                                        transition-colors
                                        hover:bg-zinc-100
                                        dark:hover:bg-zinc-900
                                        cursor-pointer
                                    "
                            onClick={() => nav(`/albums/${song.albumId}#tracklist`)}
                        >
                            {/* Album artwork */}
                            <img
                                src={song.albumImg}
                                alt={song.albumName}
                                className="
                                    w-[72px]
                                    h-[72px]
                                    shrink-0
                                    object-cover
                                    rounded-md
                                "
                            />

                            {/* Information */}
                            <div className="min-w-0 flex-1 flex flex-col justify-between py-[2px]">

                                {/* Rank + title */}
                                <div>
                                    <div className="flex items-start gap-2">

                                        <span className="
                                            poppins-light
                                            tracking-wide
                                            text-[11px]
                                            text-zinc-400
                                            dark:text-zinc-500
                                            tabular-nums
                                            pt-0.5
                                        ">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <h3 className="
                                            montserrat-300
                                            tracking-wider
                                            text-[14px]
                                            font-medium
                                            leading-tight
                                            text-zinc-900
                                            dark:text-zinc-100
                                            truncate
                                        ">
                                            {song.trackName}
                                        </h3>

                                    </div>

                                    <p className="
                                        text-[14px]
                                        montserrat-300
                                        text-zinc-500
                                        dark:text-zinc-400
                                        ml-[20px]
                                        truncate
                                    ">
                                        {song.albumName}
                                    </p>
                                </div>

                                {/* Bottom metadata */}
                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    ml-[20px]
                                    mt-2
                                ">
                                    <span className="
                                        text-[11px]
                                        text-zinc-400
                                        poppins-light
                                        dark:text-zinc-500
                                    ">
                                        {formatDuration(song.duration)}
                                    </span>

                                    {/* Rating */}
                                    <div className="flex items-end gap-1">

                                        <span className="
                                            text-[11px]
                                            poppins-light
                                            text-zinc-900
                                            dark:text-zinc-100
                                        ">
                                            {Number(song.rating).toFixed(1)}
                                        </span>

                                        <span className="
                                            text-[14px]
                                            text-zinc-400
                                        ">
                                            ★
                                        </span>

                                    </div>
                                </div>

                            </div>
                        </article>
                    ))}

                </div>
            )}

            {/* Empty */}
            {!loading && !error && songs.length === 0 && (
                <p className="
                    py-8
                    text-sm
                    text-zinc-500
                    dark:text-zinc-400
                    text-center
                ">
                    No rated songs yet.
                </p>
            )}

        </main>
    );
};

export default ArtistTopSongs;