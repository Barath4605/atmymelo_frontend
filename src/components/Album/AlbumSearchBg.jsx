import React from "react";
import "../../App.css"

const Background = () => {
    return (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-400 via-rose-400 to-red-700">

            <div className="absolute floatSlowReverse  w-[500px] h-[700px] bg-rose-500 rounded-full blur-[120px] top-[-100px] left-[-100px]" />

            <div className="absolute floatSlowReverse w-[500px] h-[500px] bg-red-400 rounded-full blur-[120px] top-[100px] right-[-150px]" />
t
            <div
                className="absolute floatSlowReverse w-[400px] h-[400px] bg-rose-400 rounded-full blur-[150px] top-[50px] left-[200px]"
                style={{ animationDuration: "18s" }}
            />
        </div>
    );
};

export default Background;