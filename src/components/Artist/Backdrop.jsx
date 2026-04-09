import React from "react";

export default function Backdrop({ artistBackdrop, artistLogo, artistName }) {
    return (
        <div className="relative lg:w-[90%] mx-auto rounded-xl overflow-hidden">
            {artistBackdrop && (
                <>
                    <img
                        src={artistBackdrop}
                        alt="Artist backdrop"
                        className="w-full pointer-events-none h-auto block"
                        style={{ filter: "brightness(0.75) saturate(0.85)" }}
                        draggable={false}
                    />

                    {/* Left fade */}
                    <div
                        className="absolute inset-y-0 left-0 w-1/4 pointer-events-none"
                        style={{
                            background: "linear-gradient(to right, #000000 0%, transparent 100%)",
                        }}
                    />

                    {/* Right fade */}
                    <div
                        className="absolute inset-y-0 right-0 w-1/4 pointer-events-none"
                        style={{
                            background: "linear-gradient(to left, #000000 0%, transparent 100%)",
                        }}
                    />

                    {/* Bottom fade */}
                    <div
                        className="absolute inset-x-0 bottom-0 pointer-events-none"
                        style={{
                            height: "50%",
                            background:
                                "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.2) 70%, transparent 100%)",
                        }}
                    />

                    {/* Top fade */}
                    <div
                        className="absolute inset-x-0 top-0 h-16 pointer-events-none"
                        style={{
                            background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)",
                        }}
                    />
                </>
            )}

            {/* Artist logo or name fallback */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none whitespace-nowrap">
                {artistLogo ? (
                    <img
                        src={artistLogo}
                        alt="Artist logo"
                        className="lg:max-h-40 max-h-20 max-w-xs w-auto object-contain"
                        style={{ filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.9))" }}
                    />
                ) : (
                    <span
                        className="text-white text-4xl font-bold tracking-widest uppercase"
                        style={{ textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}
                    >
                        {artistName}
                    </span>
                )}
            </div>
        </div>
    );
}