import React, {useState} from "react";
import ActionOverlay from "../../components/ActionOverlay.jsx";

const AlbumCard = ({ album }) => {

    const [showActionOverlay, setShowActionOverlay] = useState(false);

    return (
        <div
            className="lg:min-w-50 m-2 cursor-pointer"
            onClick={() => window.location.href = `/albums/${album.id}`} >
            <div
                onMouseEnter={() => setShowActionOverlay(true)}
                onMouseLeave={() => setShowActionOverlay(false)}
                className={`relative overflow-hidden rounded-xs`}>
                <img
                    src={album.imageUrl}
                    alt={album.title}
                    className="object-cover transition duration-500"
                />
            </div>

            <div className="mt-2 montserrat-200">
                <h2 className="text-sm lg:text-base text-white line-clamp-1">
                    {album.title}
                </h2>
                <p className="text-xs text-white/60">
                    {album.releaseYear || "—"}
                </p>
            </div>
        </div>
    );
};

export default AlbumCard;