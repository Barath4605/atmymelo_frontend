import React from "react";
import "../../index.css"

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
        path: "/profile",
        desc: "Take a look at all your favorite tracks and albums",
    },
    {
        name: "On Deck",
        path: "/deck",
        desc: "Music waiting for you to be listened",
    },
    {
        name: "Library",
        path: "/library",
        desc: "View all your favorites albums, songs and much more",
    },
];

const HomeLinks = () => {
    return (
        <nav className="w-[75%] mx-auto mt-10 flex flex-col gap-4 montserrat  font-light">
            {links.map((link) => (
                <a
                    key={link.name}
                    href={link.path}
                    className="relative lg:mb-2 group text-[33px] lg:w-[40%] w-[60%] leading-tight text-white"
                >
                    <span className="transition">
                        {link.name}
                    </span>

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
                                  max-sm:text-white/90
                                  max-sm:-mt-1
                                "
                    >
            {link.desc}
          </span>
                </a>
            ))}
        </nav>
    );
};

export default HomeLinks;