import React from "react";
import { getRecentSearches } from "../utils/recentSearch.js";

const RecentSearches = ({ type }) => {
    const recent = getRecentSearches(type);
    if (recent.length === 0) return null;
    const isArtist = type === "artists";

    const goTo = (id) => {
        window.location.href = isArtist ? `/artists/${id}` : `/albums/${id}`;
    };

    return (
        <section className="col-span-full mt-12">
            <h2 className="text-white/45 text-[13px] montserrat-500 tracking-wide mb-3">
                Recent searches
            </h2>

            <div className="border-t border-white/8">
                {recent.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => goTo(item.id)}
                        className="group w-full flex cursor-pointer items-center gap-3.5 py-3 p-2  border-b border-white/[0.08] text-left transition-colors duration-200 hover:bg-white/[0.05]"
                    >
                        {isArtist && (
                            <div className="w-9 h-9 shrink-0 rounded-full overflow-hidden bg-white/[0.06]">
                                {item.imageUrl ? (
                                    <img
                                        src={item.imageUrl}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/30 text-xs montserrat-500">
                                        {item.name?.charAt(0)}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="min-w-0 flex-1">
                            <p className="text-white/80 text-[14px] montserrat-500 truncate leading-tight transition-colors duration-200 group-hover:text-white">
                                {isArtist ? item.name : item.title}
                            </p>
                            <p className="text-white/35 text-[12px] truncate mt-0.5 transition-colors duration-200 group-hover:text-white/50">
                                {isArtist
                                    ? item.country || "Artist"
                                    : `${item.artist || "Unknown artist"}${
                                        item.year ? ` · ${item.year}` : ""
                                    }`}
                            </p>
                        </div>

                        <svg
                            width="8"
                            height="14"
                            viewBox="0 0 8 14"
                            fill="none"
                            className="text-white/20 shrink-0 transition-all duration-200 group-hover:text-white/55 group-hover:translate-x-0.5"
                        >
                            <path
                                d="M1 1L7 7L1 13"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default RecentSearches;