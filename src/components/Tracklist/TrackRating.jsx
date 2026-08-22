import React from "react";
import { IoStar } from "react-icons/io5";

import {
    postUserTrackRating,
    getUserTrackRating
} from "../../../api/tracklistApi.js";


const TrackRating = ({ tadb, topTrackId }) => {

    const [rating, setRating] = React.useState(0);
    const [favorite, setFavorite] = React.useState(false);
    const [average, setAverage] = React.useState(0);


    const isTopTrack = tadb === topTrackId;

    // get user's existing rating
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

    const handleRating = async (star) => {
        const newRating = star === rating ? 0 : star;
        setRating(newRating);
        try {

            const data = await postUserTrackRating(
                tadb,
                newRating,
                favorite
            );
            setAverage(data.avgRating ?? 0);
        } catch(error) {
            console.error(error);
        }
    };



    return (
        <div className="flex gap-1 text-[17px] mt-1.5 items-center text-white/60">
            <div className="flex gap-1">

                {[1,2,3,4,5].map((star) => (

                    <IoStar

                        key={star}

                        onClick={() => handleRating(star)}

                        className={
                            star <= rating
                                ? isTopTrack
                                    ? "fill-yellow-400 text-yellow-400 cursor-pointer"
                                    : "fill-white text-white cursor-pointer"

                                : isTopTrack
                                    ? "text-red-white cursor-pointer"
                                    : "text-white/35 cursor-pointer"
                        }

                    />

                ))}

            </div>

            <span>|</span>

            <span className="text-[12px]">
                {(average ?? 0).toFixed(1)} ★
            </span>


        </div>

    );
};


export default TrackRating;