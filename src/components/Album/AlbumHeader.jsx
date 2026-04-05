import React, { useState } from "react";
import InteractionBtn from "./InteractionBtn.jsx";
import ReadMore from "../ReadMorePage.jsx";
import {useNavigate} from "react-router-dom";

export default function AlbumHeader({
                                        albumImg, title, artist, year, genre, description,
                                        rating, favorite, queue, artistId, albumId
                                    }) {
    const [expanded, setExpanded] = useState(false);

    const nav = useNavigate();

    return (
        <section className="relative z-10 lg:w-[72%] w-[92%] mx-auto text-white pt-52 lg:pt-64 pb-16">

            <div className="flex items-center flex-col lg:flex-row gap-6 lg:gap-10">

                <div className="relative flex-shrink-0 items-center">
                    <img
                        src={albumImg}
                        alt={title}
                        draggable={false}
                        className="w-40 h-40 lg:w-60 lg:h-60 rounded-md object-cover select-none"
                        style={{
                            boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.6)",
                        }}
                    />
                    <div
                        className="absolute -bottom-3 left-2 right-2 h-6 rounded-full blur-md opacity-40"
                        style={{ background: "rgba(0,0,0,0.9)" }}
                    />
                </div>

                <div className="flex-col gap-2 pb-1 text-center lg:text-left">
                    <p
                        className="uppercase tracking-[0.25em] text-[10px] font-medium"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                        Album
                    </p>
                    <h1
                        className="text-4xl lg:text-6xl font-bold leading-none tracking-tight poppins-medium-italic"
                    >
                        {title}
                    </h1>
                    <p
                        className="text-sm mt-2 lg:text-base font-medium montserrat-300"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                        <span><button onClick={() => nav(`/artists/${artistId}`)}
                                      className="pb-0.5 border-b cursor-pointer border-white/40">
                            {artist}
                        </button></span>
                        <span style={{ color: "rgba(255,255,255,0.25)" }}> · </span>
                        {year}
                        <span style={{ color: "rgba(255,255,255,0.25)" }}> · </span>
                        {genre}
                    </p>
                </div>
            </div>

            <div
                className="mt-8 mb-6 h-px w-full"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,0.15), transparent)" }}
            />

            <div className="max-w-2xl">
                <p
                    className={`text-sm leading-7 montserrat-300 transition-all duration-300 ${expanded ? "" : "line-clamp-3"}`}
                >
                    {description}
                </p>
                {description?.length > 200 && (
                    <ReadMore customText="ALBUM BIO" title={title} artist={artist} bio={description} subtitle={genre} />
                )}
            </div>

            <div className="mt-10">
                <p
                    className="uppercase tracking-[0.2em] text-[14px] mb-4 font-medium"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                >
                    Your Interaction
                </p>
                <InteractionBtn rating={rating} mbid={albumId} favorite={favorite} queue={queue} />
            </div>

        </section>
    );
}