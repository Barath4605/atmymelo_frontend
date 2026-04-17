import React from "react";

const AlbumCard = ({ album }) => {
    return (
        <div
            className="min-w-40 lg:min-w-50 bg-transparent hover:bg-white/49 rounded-lg p-2 pb-2 transition-all
                        ease-in-out duration-400 cursor-pointer group backdrop-blur-3xl"
            onClick={() => window.location.href = `/albums/${album.id}`}
        >
            <div className="relative overflow-hidden rounded-sm">
                <img
                    src={album.imageUrl}
                    alt={album.title}
                    className="w-full h-40 lg:h-50 object-cover transition duration-500"
                />
            </div>

            <div className="mt-2 montserrat-200">
                <h2 className="text-sm opacity-0 group-hover:opacity-100 -translate-y-3 group-hover:translate-y-0 transition-all ease-in-out duration-400 lg:text-base text-white line-clamp-1">
                    {album.title}
                </h2>
                <p className="text-xs opacity-0 group-hover:opacity-100 -translate-y-3 group-hover:translate-y-0 transition-all ease-in-out duration-400 text-white/60">
                    {album.releaseYear || "—"}
                </p>
            </div>
        </div>
    );
};

export default AlbumCard;