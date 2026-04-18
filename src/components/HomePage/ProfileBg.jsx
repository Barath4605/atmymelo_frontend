import React from "react";
import "../../App.css"

const ProfileBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">

            {/* base gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(135deg, #022c22, #065f46, #10b981, #065f46)",
                    backgroundSize: "200% 200%",
                    animation: "gradientFlow 18s ease infinite"
                }}
            />

            {/* glow 1 */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full blur-[180px] opacity-50"
                style={{
                    background: "#34d399",
                    top: "-150px",
                    left: "10%",
                    animation: "glowDrift 20s ease-in-out infinite"
                }}
            />

            {/* glow 2 */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full blur-[160px] opacity-40"
                style={{
                    background: "#059669",
                    bottom: "-150px",
                    right: "10%",
                    animation: "glowDrift 25s ease-in-out infinite"
                }}
            />

            {/* center glow */}
            <div
                className="absolute w-[300px] h-[300px] rounded-full blur-[140px] opacity-30"
                style={{
                    background: "#6ee7b7",
                    top: "30%",
                    left: "40%",
                    animation: "glowDrift 30s ease-in-out infinite"
                }}
            />
        </div>
    );
};

export default ProfileBackground;