import React, { useEffect, useState } from "react";
import { getTracklist } from "../../../api/tracklistApi.js";
import {Loader2} from "lucide-react";
import TrackRating from "./TrackRating.jsx";

const TrackList = ({ mbid}) => {
    const [tracklist, setTracklist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!mbid) return;

        setLoading(true);
        setError(null);

        getTracklist(mbid)
            .then(data => setTracklist(data.track ?? []))  // "track" not "tracklist"
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [mbid]);

    // CONVERT MILLISECOND -> MIN:SEC
    const formatDuration = (ms) => {
        const s = Math.floor(Number(ms) / 1000);
        return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
    };

    // LOADING SCREEN
    if (loading) return (
        <div className="flex items-center montserrat-200 justify-center py-12">
            <span className="text-sm text-zinc-400">Loading tracks</span>
            <span className="text-sm animate-spin text-zinc-400"><Loader2 className="animate-spin"/></span>
        </div>
    );

    // ERROR SCREEN
    if (error) return (
        <div className="flex items-center justify-center py-12">
            <span className="text-sm text-red-400">{error}</span>
        </div>
    );

    // EMPTY TRACKLIST
    if (!tracklist.length) return (
        <div className="flex items-center justify-center py-12">
            <span className="text-sm text-zinc-400">No tracks found.</span>
        </div>
    );

    return (
        <div className="lg:w-[72%] w-full mx-auto px-4 py-6">
            <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-md montserrat-400
                          uppercase tracking-[0.2em] text-[14px] lg:mb-2 font-medium
                        text-zinc-900 dark:text-zinc-100">
                    TRACKLIST
                </h2>
                <span className="text-xs text-zinc-400">{tracklist.length} tracks</span>
            </div>

            <ul className="grid lg:grid-flow-col lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-1"
                style={{ gridTemplateRows: `repeat(${Math.ceil(tracklist.length / 2)}, auto)` }}>
                {tracklist.map((track, index) => (
                    <li
                        key={track.strMusicBrainzAlbumID + index}
                        className="flex montserrat-400 items-center gap-3 p-2.5 border-b
                        border-zinc-100 rounded-sm cursor-pointer
                        hover:bg-zinc-100 dark:hover:bg-zinc-800
                        transition-colors duration-300
                        dark:border-zinc-800 last:border-none"
                    >
                        <span className="w-5 text-right text-xs flex items-start text-zinc-400 shrink-0">
                            {index + 1}.
                        </span>

                        <div className="flex-1 flex-col lg:flex-row lg:items-center lg:gap-0 items-start gap-1">
                            <div className="flex-1 min-w-0">
                                <div>
                                    <p className="lg:text-sm text-md text-zinc-900 dark:text-zinc-100 lg:w-[60%]
                                                 transition-all ease-in-out duration-100">
                                        {track.strTrack}
                                    </p>
                                    <p>

                                    </p>
                                </div>
                                <p className="text-xs text-zinc-400 mt-0.5 lg:w-[40%] lg:hover:w-full transition-all ease-in-out duration-100">{track.strArtist}</p>
                            </div>

                            <span className="text-xs space-grotesk-300 text-zinc-400 shrink-0">
                                {formatDuration(track.intDuration)}
                            </span>

                            <TrackRating tadb={track.idTrack} />

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrackList;