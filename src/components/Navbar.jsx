import React from "react";
import {
    Home,
    Disc3,
    User,
    ListMusic,
    Heart
} from "lucide-react";
import {useNavigate} from "react-router-dom";

const Navbar = () => {

    const nav = useNavigate();

    const links = [
        {
            name: "Home",
            route: "/",
            icon: Home,
        },
        {
            name: "Albums",
            route: "/albums",
            icon: Disc3,
        },
        {
            name: "Artists",
            route: "/artists",
            icon: User,
        },
        {
            name: "Favorites",
            route: "/favorites",
            icon: Heart,
        },
        {
            name: "Deck",
            route: "/deck",
            icon: ListMusic ,
        },

    ];

    return (
        <div className="sticky montserrat-200 w-fit mx-auto px-6 backdrop-blur-3xl backdrop-saturate-120 border-t border-white/30
                shadow-black/5 shadow-md
                rounded-full text-md top-4 z-50 bg-linear-to-br from-black/20  via-black/30 to-black/40  text-white">
            <div className="flex space-x-4 transition-colors ease-in-out duration-500">
                {links.map((link) => {
                    const Icon = link.icon;

                    return (
                        <button
                            onClick={() => nav(link.route)}
                            key={link.name}
                            className="my-2 py-1 px-3 sm:px-4 rounded-full
                                     hover:bg-linear-to-br hover:from-black/10 hover:to-black/20
                                     flex items-center gap-2 cursor-pointer"
                        >
                            <Icon size={18} strokeWidth={1.2} />

                            <span className="hidden sm:inline">
                                {link.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Navbar;