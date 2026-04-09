import React from "react";

const AlbumMiniHeader = ({ albumImg, title, artist, year }) => {
    return (
        <section className="lg:w-[70%] w-[90%] mx-auto pt-12 border-b border-white/10 pb-6">

            <div className="flex items-center gap-5">

                <img
                    src={albumImg}
                    alt={title}
                    className="w-24 h-24 rounded-md object-cover"
                    style={{
                        boxShadow: "0 10px 30px rgba(0,0,0,0.7)"
                    }}
                />

                <div>
                    <h1 className="text-3xl font-semibold poppins-medium-italic">
                        {title}
                    </h1>

                    <p className="text-sm text-white/50 mt-1">
                        {artist} · {year}
                    </p>
                </div>

            </div>
        </section>
    );
};

export default AlbumMiniHeader;