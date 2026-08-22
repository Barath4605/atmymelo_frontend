import React, { useEffect, useState } from "react";
import TrackRating from "./TrackRating.jsx";
import { getTopRatedTrack, getTracklist } from "../../../api/tracklistApi.js";
import LoadingTracklist from "../LoadingComponents/LoadingTracklist.jsx";

const TrackList = ({ mbid }) => {
  const [tracklist, setTracklist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topTrackId, setTopTrackId] = useState(null);

  const refreshTopTrack = async () => {
    if (!mbid) return;
    try {
      const id = await getTopRatedTrack(mbid);
      setTopTrackId(id);
    } catch (err) {
      console.error("Failed to refresh top track:", err);
    }
  };

  // GET TOP TRACK USE EFFECT
  useEffect(() => {
    if (!mbid) return;

    getTopRatedTrack(mbid)
      .then((id) => setTopTrackId(id))
      .catch((err) => console.log(err));
  }, [mbid]);

  // GET TRACKLIST USE EFFECT
  useEffect(() => {
    if (!mbid) return;

    setLoading(true);
    setError(null);

    getTracklist(mbid)
      .then((data) => setTracklist(data.track ?? []))
      .catch((err) => setError(err.message))
      .finally(() => setTimeout(() => setLoading(false), 0));
  }, [mbid]);

  // CONVERT MILLISECOND -> MIN:SEC
  const formatDuration = (ms) => {
    const s = Math.floor(Number(ms) / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  // ERROR SCREEN
  if (error)
    return (
      <div className="flex items-center justify-center py-12">
        <span className="text-sm text-red-400">{error}</span>
      </div>
    );

  return (
    <div id="tracklist" className="lg:w-[72%] w-full mx-auto px-4 py-6">
      <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <h2
          className="text-md montserrat-400
                          uppercase tracking-[0.2em] text-[14px] lg:mb-2 font-medium
                        text-zinc-900 dark:text-zinc-100"
        >
          TRACKLIST
        </h2>
        <span className="text-xs text-zinc-400">{tracklist.length} tracks</span>
      </div>

      {!loading ? (
        <ul
          className="grid lg:grid-flow-col lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-1"
          style={{
            gridTemplateRows: `repeat(${Math.ceil(tracklist.length / 2)}, auto)`,
          }}
        >
          {tracklist.map((track, index) => (
            <li
              key={track.strMusicBrainzAlbumID + index}
              className={`relative flex montserrat-400 items-center gap-3 p-2.5 rounded-sm overflow-hidden
                                            transition-all duration-500 ease-in-out
                                                ${
                                                  track.idTrack === topTrackId
                                                    ? "top-track text-black"
                                                    : "dark:hover:bg-zinc-800 border-b dark:border-zinc-800"
                                                }
                                    transition-colors duration-300 last:border-none`}
            >
              <span
                className={`w-5 text-right text-xs flex items-start ${track.idTrack === topTrackId ? `text-white` : `text-zinc-400`} shrink-0`}
              >
                {index + 1}.
              </span>

              <div className="flex-1 flex-col lg:flex-row lg:items-center lg:gap-0 items-start gap-1">
                <div className="flex-1 min-w-0">
                  <div>
                    <p
                      className={`lg:text-sm text-md ${track.idTrack === topTrackId ? `text-white` : `text-zinc-100`} lg:w-[60%]
                                        transition-all ease-in-out duration-100`}
                    >
                      {track.strTrack}
                    </p>
                    <p></p>
                  </div>
                  <p
                    className={`text-xs ${track.idTrack === topTrackId ? `text-white/80` : `text-zinc-400`} mt-0.5 lg:w-[40%] lg:hover:w-full transition-all ease-in-out duration-100`}
                  >
                    {track.strArtist}
                  </p>
                </div>

                <span
                  className={`text-xs space-grotesk-300 ${track.idTrack === topTrackId ? `text-white/75` : `text-zinc-400`} shrink-0`}
                >
                  {formatDuration(track.intDuration)}
                </span>
                <TrackRating
                  tadb={track.idTrack}
                  topTrackId={topTrackId}
                  onRatingChange={refreshTopTrack}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div id={`tracklist`}>
          <LoadingTracklist />
        </div>
      )}
    </div>
  );
};

export default TrackList;
