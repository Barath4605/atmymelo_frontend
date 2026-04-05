import React, { useState } from 'react';
import ReadMore from "../ReadMorePage.jsx";

const ArtistHeader = ({ artistImg, imgAlt, artistBio, artistLabel, artistDebut, artistBorn }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <section className="lg:w-[70%] w-[90%] mx-auto text-white">
            <div className="lg:flex items-end gap-8">

                <img
                    className="lg:size-64 pointer-events-none size-48 lg:mx-0 mx-auto flex-shrink-0 object-cover"
                    style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }}
                    src={artistImg}
                    alt={imgAlt}
                    draggable={false}
                />

                <div className="flex flex-col gap-1 mt-6 lg:mt-0">

                    {/* Bio */}
                    <p className="montserrat-400 uppercase tracking-[0.2em] text-[10px] mb-1"
                       style={{ color: "rgba(255,255,255,0.3)" }}>
                        Bio
                    </p>
                    <p
                        className={`montserrat-400 text-sm leading-7 transition-all duration-300 ${expanded ? "" : "line-clamp-4"}`}
                        style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                        {artistBio}
                    </p>
                    {artistBio?.length > 200 && (
                        <ReadMore customText="ARTIST BIO" bio={artistBio} />
                    )}

                    <div className="mt-5 mb-4 h-px"
                         style={{ background: "linear-gradient(to right, rgba(255,255,255,0.12), transparent)" }} />

                    {/* Meta tags */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-6 montserrat-200">
                        {[
                            { label: "Label", value: artistLabel },
                            { label: "Debut", value: artistDebut },
                            { label: "Born", value: artistBorn },
                        ].map(({ label, value }) => (
                            <div key={label}>
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