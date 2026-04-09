import React from "react";
import "../../App.css"

const ProfileBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 bg-linear-to-tr from-taupe-400 via-taupe-300 to-zinc-200">

            <div className="absolute floatSlowReverse  w-[500px] h-[700px] bg-taupe-400 rounded-full blur-[120px] top-[-100px] left-[-100px]" />

            <div className="absolute floatSlowReverse w-[500px] h-[500px] bg-stone-700 rounded-full blur-[120px] top-[100px] right-[-150px]" />

            <div
                className="absolute floatSlowReverse w-[400px] h-[400px] bg-mauve-200 rounded-full blur-[150px] top-[50px] left-[200px]"
                style={{ animationDuration: "18s" }}
            />
        </div>
    );
};

export default ProfileBackground;