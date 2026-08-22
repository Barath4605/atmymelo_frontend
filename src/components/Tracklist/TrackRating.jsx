import React from "react";
import { IoStar } from "react-icons/io5";

import {
  getUserTrackRating,
  postUserTrackRating,
} from "../../../api/tracklistApi.js";

const TrackRating = ({ tadb, topTrackId }) => {
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [favorite, setFavorite] = React.useState(false);
  const [average, setAverage] = React.useState(0);

  const isTopTrack = tadb === topTrackId;

  // Get user's existing rating
  React.useEffect(() => {
    async function fetchRating() {
      try {
        const data = await getUserTrackRating(tadb);

        setRating(data.userRating ?? 0);
        setAverage(data.avgRating ?? 0);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRating();
  }, [tadb]);

  const handleRating = async (newRating) => {
    const finalRating = newRating === rating ? 0 : newRating;

    setRating(finalRating);

    try {
      // Save the new rating
      await postUserTrackRating(tadb, finalRating, favorite);

      // Fetch the updated average
      const data = await getUserTrackRating(tadb);

      setAverage(data.avgRating ?? 0);
    } catch (error) {
      console.error(error);
    }
  };

  const getRatingFromMouse = (event, star) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const half = rect.width / 2;

    return mouseX <= half ? star - 0.5 : star;
  };

  const activeRating = hoverRating || rating;

  return (
    <div className="flex gap-1 text-[17px] mt-1.5 items-center text-white/60">
      {/* Stars */}
      <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = activeRating >= star;
          const isHalf = activeRating >= star - 0.5 && activeRating < star;

          const starColor = isTopTrack ? "text-yellow-400" : "text-white";

          return (
            <div
              key={star}
              className="relative w-[17px] h-[17px] cursor-pointer"
              onMouseMove={(event) => {
                const newRating = getRatingFromMouse(event, star);
                setHoverRating(newRating);
              }}
              onClick={(event) => {
                const newRating = getRatingFromMouse(event, star);
                handleRating(newRating);
              }}
            >
              {/* Empty star */}
              <IoStar className="absolute inset-0 text-white/35" size={17} />

              {/* Full star */}
              {isFull && (
                <IoStar className={`absolute inset-0 ${starColor}`} size={17} />
              )}

              {/* Half star */}
              {isHalf && (
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <IoStar
                    className={`absolute left-0 top-0 ${starColor}`}
                    size={17}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <span>|</span>

      {/* Average */}
      <span
        key={average}
        className="text-[12px] animate-[ratingUpdate_500ms_ease-in-out]"
      >
        {(average ?? 0).toFixed(1)} ★
      </span>
    </div>
  );
};

export default TrackRating;
