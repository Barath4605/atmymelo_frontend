import React, { useState } from 'react';
import ReadMore from "../ReadMorePage.jsx";

const ArtistHeader = ({ artistImg, imgAlt, artistName, artistBio, artistLabel, artistDebut, artistBorn }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <section className="lg:w-[70%] w-[90%] mx-auto text-white">
            <div className="flex flex-col items-center text-center lg:flex-row lg:items-end lg:text-left gap-6 lg:gap-8">

                <img
                    className="size-40 sm:size-48 lg:size-64 pointer-events-none rounded-3xl ring-1 flex-shrink-0 object-cover"
                    style={{
                        boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                        borderColor: "rgba(255,255,255,0.08)",
                    }}
                    src={artistImg}
                    alt={imgAlt}
                    draggable={false}
                />

                <div className="flex flex-col items-center lg:items-start gap-1 mt-2 lg:mt-0 w-full">

                    {/* Bio */}
                    <p className="montserrat-400 uppercase tracking-[0.2em] text-[10px] mb-1"
                       style={{ color: "rgba(255,255,255,0.3)" }}>
                        Bio
                    </p>
                    <p
                        className={`montserrat-400 text-sm leading-7 transition-all duration-300 max-w-md lg:max-w-none ${expanded ? "" : "line-clamp-4"}`}
                        style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                        {artistBio}
                    </p>
                    {artistBio?.length > 200 && (
                        <ReadMore customText="ARTIST BIO" title={artistName} subtitle={artistLabel} bio={artistBio} />
                    )}

                    <div className="mt-5 mb-4 h-px w-24 lg:w-full"/>

                    {/* Meta tags */}
                    <div
                        className="grid grid-cols-3 gap-y-5 gap-x-6 montserrat-200 w-full max-w-sm rounded-2xl p-4 lg:p-0"
                    >
                        {[
                            { label: "Label", value: artistLabel },
                            { label: "Debut", value: artistDebut },
                            { label: "Born", value: artistBorn },
                        ].map(({ label, value }) => (
                            <div key={label} className="text-center lg:text-left">
                                <p className="montserrat-400 uppercase tracking-widest text-[10px] mb-1"
                                   style={{ color: "rgba(255,255,255,0.3)" }}>
                                    {label}
                                </p>
                                <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ArtistHeader;