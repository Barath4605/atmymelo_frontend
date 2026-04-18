import React from "react";

const GlobalBg = () => {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">

            {/* 🔥 animated gradient layer */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(120deg, #ff5a1f, #ff3d00, #ff8a00, #ff3d00)",
                    backgroundSize: "200% 200%",
                    animation: "gradientFlow 12s ease infinite"
                }}
            />

            {/* 🔥 main glow */}
            <div
                className="absolute w-[650px] h-[650px] bg-[#ff6a00] rounded-full blur-[180px] opacity-55"
                style={{
                    top: "-150px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    animation: "floatDrift 14s ease-in-out infinite"
                }}
            />

            {/* 🔥 amber layer (slower) */}
            <div
                className="absolute w-[700px] h-[500px] bg-[#ff8c00] rounded-full blur-[160px] opacity-45"
                style={{
                    bottom: "-120px",
                    left: "-80px",
                    animation: "floatDriftSlow 20s ease-in-out infinite"
                }}
            />

            {/* 🔥 red depth (faster) */}
            <div
                className="absolute w-[550px] h-[550px] bg-[#ff3d00] rounded-full blur-[160px] opacity-40"
                style={{
                    right: "-120px",
                    top: "100px",
                    animation: "floatDriftFast 10s ease-in-out infinite"
                }}
            />

            {/* 🔥 highlight shimmer */}
            <div
                className="absolute w-[300px] h-[200px] bg-[#fff7ed] rounded-full blur-[120px] opacity-10"
                style={{
                    top: "200px",
                    left: "30%",
                    animation: "pulseGlow 6s ease-in-out infinite"
                }}
            />

        </div>
    );
};

export default GlobalBg;