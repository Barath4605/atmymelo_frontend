import React from 'react';

const ArtistSearchBg = () => {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">

            {/* base gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1c0f14] via-[#4a1f2d] to-[#9f4b63]" />

            {/* bloom 1 */}
            <div className="absolute floatSlowReverse w-[500px] h-[700px] rounded-full blur-[140px] top-[-100px] left-[-100px]"
                 style={{ background: "#9f4b63", opacity: 0.5 }} />

            {/* bloom 2 */}
            <div className="absolute floatSlowReverse w-[500px] h-[500px] rounded-full blur-[140px] top-[100px] right-[-150px]"
                 style={{ background: "#4a1f2d", opacity: 0.6 }} />

            {/* bloom 3 */}
            <div
                className="absolute floatSlowReverse w-[400px] h-[400px] rounded-full blur-[160px] top-[50px] left-[200px]"
                style={{
                    background: "#f1a7b5",
                    opacity: 0.3,
                    animationDuration: "18s"
                }}
            />
        </div>
    );
};

export default ArtistSearchBg;