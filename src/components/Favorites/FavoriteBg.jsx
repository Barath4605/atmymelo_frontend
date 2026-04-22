import React from "react";

const FavoriteBg = () => {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">

            <div className="absolute inset-0 bg-linear-to-b from-yellow-500 via-[#FF9A00] to-[#7A1E00]" />

            <div className="absolute floatSlow w-[700px] h-[700px] bg-yellow-500 rounded-full blur-[180px] top-[-200px] left-1/2 -translate-x-1/2 opacity-80" />

            <div
                className="absolute floatSlowReverse w-[800px] h-[500px] bg-orange-400 rounded-full blur-[160px] bottom-[-150px] left-[-100px] opacity-70"
                style={{ animationDuration: "10s" }}
            />

            <div
                className="absolute floatSlowReverse w-[600px] h-[600px] bg-red-700 rounded-full blur-[160px] right-[-150px] top-[100px] opacity-60"
                style={{ animationDuration: "12s" }}
            />

            <div
                className="absolute floatSlowReverse w-[400px] h-[200px] bg-red-600 rounded-full blur-[120px] top-[150px] left-[20%] opacity-50"
                style={{ animationDuration: "19s" }}
            />


        </div>
    );
};

export default FavoriteBg;