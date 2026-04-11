import React from "react";

const QueueBg = () => {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">

            {/* 🔥 flowing gradient layer */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(120deg, #1e3a5f, #2f6f73, #6bbec2, #2f6f73)",
                    backgroundSize: "200% 200%",
                    animation: "gradientFlow 18s ease infinite"
                }}
            />

            {/* 🔥 soft bloom 1 */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full blur-[180px] opacity-60"
                style={{
                    background: "#7fd1d6",
                    top: "-150px",
                    left: "20%",
                    animation: "glowDrift 20s ease-in-out infinite"
                }}
            />

            {/* 🔥 soft bloom 2 */}


            {/* 🔥 subtle green accent */}
            <div
                className="absolute w-[300px] h-[300px] rounded-full blur-[140px] opacity-40"
                style={{
                    background: "#6ecf8e",
                    top: "30%",
                    left: "40%",
                    animation: "glowDrift 26s ease-in-out infinite"
                }}
            />
        </div>
    );
};

export default QueueBg;