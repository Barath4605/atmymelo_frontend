import React from "react";

const AlbumCard = ({ album }) => {
    return (
        <div
            className="lg:min-w-50 m-2 cursor-pointer"
            onClick={() => window.location.href = `/albums/${album.id}`}
        >
            <div className="relative overflow-hidden rounded-xs">
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