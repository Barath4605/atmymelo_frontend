import React from "react";
import "../../app.css"
import {useNavigate} from "react-router-dom";

const links = [
    {
        name: "Albums",
        path: "/albums",
        desc: "Browse and Log your favorite albums",
    },
    {
        name: "Artists",
        path: "/artists",
        desc: "Lookup your favorite artists",
    },
    {
        name: "Favorites",
        path: "/favorites",
        desc: "Take a look at all your favorite tracks and albums",
    },
    {
        name: "On Deck",
        path: "/deck",
        desc: "Music waiting for you to be listened",
    },
    {
        name: "Global Top",
        path: "/global",
        desc: "View the Top Music around the Globe",
    },
];

const HomeLinks = () => {
    const nav = useNavigate();
    return (
        <nav className="w-[75%] mx-auto mt-10 flex flex-col gap-4 montserrat-200 font-light">
            {links.map((link) => (
                <button
                    key={link.name}
                    onClick={() => nav(link.path)}
                    className="relative lg:mb-2 text-start cursor-pointer group text-[28px] lg:w-[40%] w-[60%] leading-tight text-white"
                >{link.name}

                    <span
                        className="
                                  absolute left-0 top-full translate-y-[-25%]
                                   opacity-0 w-fit
                                  transition-all duration-300 ease-out text-base

                                  group-hover:opacity-100
                                  group-hover:translate-y-[0%]

                                  /* mobile */
                                  max-sm:static
                                  max-sm:translate-y-0
                                  max-sm:opacity-100
                                  max-sm:block
                                  max-sm:text-sm
                                  text-white/80
                                  max-sm:text-white
                                  max-sm:-mt-1
                                "
                    >
            {link.desc}
          </span>
                </button>
            ))}
        </nav>
    );
};

export default HomeLinks;