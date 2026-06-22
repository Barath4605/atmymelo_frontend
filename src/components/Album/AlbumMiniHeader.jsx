import React from "react";

const AlbumMiniHeader = ({ albumImg, title, artist, year }) => {
    return (
        <section className="lg:w-[70%] w-[90%] mx-auto pt-20 border-b border-white/10 pb-6">

            <div className="flex items-center gap-5">

                <img
                    src={albumImg}
                    alt={title}
                    className="lg:w-40 w-28 lg:h-40 h-28 rounded-md object-cover"
                />

                <div>
                    <h1 className="text-4xl font-semibold space-grotesk-300">
                        {title}
                    </h1>

                    <p className="text-sm montserrat-300 text-white/50 mt-1">
                        {artist} · {year}
                    </p>
                </div>

            </div>
        </section>
    );
};

export default AlbumMiniHeader;