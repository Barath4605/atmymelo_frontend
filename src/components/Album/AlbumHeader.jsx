import React from "react";
import InteractionBtn from "./InteractionBtn.jsx";

const AlbumHeader = ({
                         albumImg,
                         title,
                         artist,
                         year,
                         genre,
                         description,
                     }) => {
    return (
        <section className="lg:w-[70%] w-[90%] mx-auto text-white mt-6 montserrat-200">

            <div className="lg:flex gap-6">

                <img
                    src={albumImg}
                    alt={title}
                    className="lg:size-64 size-48 mx-auto lg:mx-0 rounded-sm lg:rounded-lg shadow-lg"
                />

                <div className="flex flex-col  lg:justify-start justify-center items-center lg:items-start mt-2">

                    <h1 className="text-3xl lg:text-5xl font-semibold">
                        {title}
                    </h1>

                    <p className="opacity-70">
                        {artist} • {year} • {genre}
                    </p>

                </div>
            </div>

            <div>
                <p className="mt-8 max-w-3xl line-clamp-4 text-gray-300 leading-relaxed">
                    {description}
                </p>
                <p className="montserrat-300 uppercase mt-2 text-[10px] tracking-widest cursor-pointer
                                text-gray-300 pb-px border-b border-white/50 w-fit">read more</p>
            </div>

            <hr className="mt-3"/>

            <h1 className="mt-2 poppins-semibold lg:text-4xl text-2xl">Your Interaction</h1>

            <InteractionBtn />

        </section>
    );
};

export default AlbumHeader;