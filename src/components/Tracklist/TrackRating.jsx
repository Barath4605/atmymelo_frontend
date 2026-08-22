import React from "react";
import { IoStar } from "react-icons/io5";

import {
  getUserTrackRating,
  postUserTrackRating,
} from "../../../api/tracklistApi.js";

const TrackRating = ({ tadb, topTrackId, onRatingChange }) => {
  const [rating, setRating] = React.useState(0);
  const [favorite, setFavorite] = React.useState(false);
  const [average, setAverage] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(null);
  const [averageVisible, setAverageVisible] = React.useState(true);

  const isTopTrack = tadb === topTrackId;

  const isHovering = hoverRating !== null;

  // The rating we visually display
  const displayRating = isHovering ? hoverRating : rating;

  // Get user's existing rating
  React.useEffect(() => {
    async function fetchRating() {
      try {
        const data = await getUserTrackRating(tadb);
        const userRating = Number(data.userRating ?? 0);
        const avgRating = Number(data.avgRating ?? 0);
        setRating(userRating);
        setAverage(avgRating);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRating();
  }, [tadb]);

  const handleRating = async (value) => {
    const newRating = value === rating ? 0 : value;

    // Optimistic user rating update
    setRating(newRating);

    // Clear hover
    setHoverRating(null);

    try {
      // Save rating
      await postUserTrackRating(tadb, newRating, favorite);

      // Fade old average out
      setAverageVisible(false);

      // Wait for fade-out
      setTimeout(async () => {
        const data = await getUserTrackRating(tadb);

        const updatedAverage = Number(data.avgRating ?? 0);

        setAverage(updatedAverage);

        // Fade new average in
        setAverageVisible(true);

        // Update highest-rated track
        onRatingChange?.(tadb);
      }, 180);
    } catch (error) {
      console.error("RATING UPDATE ERROR:", error);

      // Restore previous rating if update failed
      setRating(rating);
    }
  };

  return (
    <div
      className="flex gap-1 text-[17px] mt-1.5 items-center text-white/60"
      onMouseLeave={() => setHoverRating(null)}
    >
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = Math.max(0, Math.min(1, displayRating - star + 1));

          /*
           * When hovering:
           * - filled stars become WHITE
           * - empty stars become WHITE/20
           *
           * This makes the hover preview clearly visible
           * even when this is the highest-rated track.
           */
          const filledClass = isHovering
            ? "text-white fill-white"
            : isTopTrack
              ? "text-yellow-400 fill-yellow-400"
              : "text-white fill-white";

          return (
            <div key={star} className="relative size-4.25">
              {/* EMPTY / BACKGROUND STAR */}
              <IoStar
                className="text-white/35"
                style={{
                  width: "17px",
                  height: "17px",
                }}
              />

              {/* FILLED STAR */}
              {fill > 0 && (
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{
                    width: `${fill * 100}%`,
                  }}
                >
                  <IoStar
                    className={filledClass}
                    style={{
                      width: "17px",
                      height: "17px",
                    }}
                  />
                </div>
              )}

              {/* LEFT HALF = .5 */}
              <button
                type="button"
                onMouseEnter={() => setHoverRating(star - 0.5)}
                onClick={() => handleRating(star - 0.5)}
                className="absolute left-0 top-0 w-1/2 h-full cursor-pointer z-10"
                aria-label={`Rate ${star - 0.5} stars`}
              />

              {/* RIGHT HALF = FULL */}
              <button
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onClick={() => handleRating(star)}
                className="absolute right-0 top-0 w-1/2 h-full cursor-pointer z-10"
                aria-label={`Rate ${star} stars`}
              />
            </div>
          );
        })}
      </div>

      <span>|</span>

      <span
        className={`
                    inline-block
                    text-[12px]
                    transition-all
                    duration-500
                    delay-50
                    ease-out
                        ${
                          averageVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2"
                        }
                    `}
      >
        {(average ?? 0).toFixed(1)} ★
      </span>
    </div>
  );
};

export default TrackRating;
