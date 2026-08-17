import React, { useEffect, useRef, useState } from "react";

export default function Backdrop({ artistBackdrop, artistLogo, artistName }) {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 80);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                if (imgRef.current) {
                    imgRef.current.style.transform = `translate3d(0, ${window.scrollY}px, 0)`;
                }
                ticking = false;
            });
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]"
            style={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
            }}
        >
            {artistBackdrop && (
                <>
                    {/* ── Image with parallax ── */}
                    <img
                        ref={imgRef}
                        src={artistBackdrop}
                        alt=""
                        aria-hidden="true"
                        draggable={false}
                        onLoad={() => setLoaded(true)}
                        style={{
                            position: "absolute",
                            inset: "-5% 0",
                            width: "100%",
                            height: "110%",
                            objectFit: "cover",
                            objectPosition: "center 20%",
                            transform: "translate3d(0, 0, 0)",
                            willChange: "transform",
                            pointerEvents: "none",
                            userSelect: "none",
                        }}
                    />

                    {/* ── Top fade ── */}
                    <div
                        className={`bg-linear-to-b from-black/75  to-transparent h-[5%] hover:h-[12%]`}
                        style={{
                            position: "absolute",
                            inset: "0 0 auto 0",
                            pointerEvents: "none",
                        }} />

                    {/* ── Bottom fade — the deepest, bleeds into page ── */}
                    <div style={{
                        position: "absolute",
                        inset: "auto 0 0 0",
                        height: "70%",
                        pointerEvents: "none",
                        background: "linear-gradient(to top, var(--page-bg, #0e0d0d) 0%, var(--page-bg, #0e0d0d) 5%, rgba(14,13,13,0.88) 22%, rgba(14,13,13,0.55) 42%, rgba(14,13,13,0.18) 65%, transparent 100%)",
                    }} />
                </>
            )}

            {/* ── Artist identity ── */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingBottom: "clamp(14px, 3.5%, 36px)",
                    gap: "8px",
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? "translateY(0)" : "translateY(8px)",
                    transition: "opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
                    pointerEvents: "none",
                    zIndex: 10,
                }}
            >
                {artistLogo ? (
                    <img
                        src={artistLogo}
                        alt={artistName ?? "Artist"}
                        style={{
                            width: "auto",
                            maxWidth: "90%",
                            height: "clamp(65px, 18vw, 110px)",
                            objectFit: "contain",
                            filter:
                                "drop-shadow(0 1px 12px rgba(0,0,0,0.7)) drop-shadow(0 4px 28px rgba(0,0,0,0.4))",
                        }}
                    />
                ) : (
                    <span
                        style={{
                            fontFamily: "'SF Pro Display', 'Helvetica Neue', -apple-system, sans-serif",
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            fontSize: "clamp(24px, 5vw, 60px)",
                            color: "#ffffff",
                            lineHeight: 1.05,
                            textAlign: "center",
                            textShadow: "0 1px 3px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)",
                        }}
                    >
                        {artistName}
                    </span>
                )}
            </div>
        </div>
    );
}