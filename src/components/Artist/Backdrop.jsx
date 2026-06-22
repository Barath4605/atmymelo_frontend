import React, { useEffect, useState } from "react";

export default function Backdrop({ artistBackdrop, artistLogo, artistName }) {
    const [loaded, setLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 80);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                // Aspect ratio — cinematic, bleeds to full width
                aspectRatio: "21/9",
                overflow: "hidden",
            }}
        >
            {artistBackdrop && (
                <>
                    {/* ── Image with parallax ── */}
                    <img
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
                            transform: `translateY(${scrollY * 0.18}px)`,
                            willChange: "transform",
                            filter: "brightness(0.75) saturate(1.05)",
                            pointerEvents: "none",
                            userSelect: "none",
                        }}
                    />

                    {/* ── Left fade into page bg ── */}
                    <div style={{
                        position: "absolute",
                        inset: "0 auto 0 0",
                        width: "18%",
                        pointerEvents: "none",
                        background: "linear-gradient(to right, var(--page-bg, #0e0d0d) 0%, transparent 100%)",
                    }} />

                    {/* ── Right fade into page bg ── */}
                    <div style={{
                        position: "absolute",
                        inset: "0 0 0 auto",
                        width: "18%",
                        pointerEvents: "none",
                        background: "linear-gradient(to left, var(--page-bg, #0e0d0d) 0%, transparent 100%)",
                    }} />

                    {/* ── Top fade ── */}
                    <div style={{
                        position: "absolute",
                        inset: "0 0 auto 0",
                        height: "22%",
                        pointerEvents: "none",
                        background: "linear-gradient(to bottom, var(--page-bg, #0e0d0d) 0%, transparent 100%)",
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
                    transitionDelay: "0.1s",
                    pointerEvents: "none",
                    zIndex: 10,
                }}
            >
                {artistLogo ? (
                    <img
                        src={artistLogo}
                        alt={artistName ?? "Artist"}
                        style={{
                            maxHeight: "clamp(40px, 9vw, 110px)",
                            maxWidth: "50%",
                            width: "auto",
                            objectFit: "contain",
                            filter: "drop-shadow(0 1px 12px rgba(0,0,0,0.7)) drop-shadow(0 4px 28px rgba(0,0,0,0.4))",
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