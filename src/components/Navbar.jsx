import React, { useState } from "react";
import { Home, Disc3, User, ListMusic, Heart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const nav = useNavigate();
    const location = useLocation();
    const [hovered, setHovered] = useState(null);

    const links = [
        { name: "Home",      route: "/",         icon: Home      },
        { name: "Albums",    route: "/albums",    icon: Disc3     },
        { name: "Artists",   route: "/artists",   icon: User      },
        { name: "Favorites", route: "/favorites", icon: Heart     },
        { name: "Deck",      route: "/deck",      icon: ListMusic },
    ];

    const activeRoute = location.pathname;

    return (
        <div className="sticky montserrat-200 w-fit mx-auto px-6 backdrop-blur-3xl backdrop-saturate-120 border-t border-white/30
                shadow-black/5 shadow-md rounded-full text-md top-4 z-50
                bg-linear-to-br from-black/20 via-black/30 to-black/40 text-white">
            <div className="flex space-x-4">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = activeRoute === link.route;
                    const isHovered = hovered === link.name;

                    return (
                        <button
                            key={link.name}
                            onClick={() => nav(link.route)}
                            onMouseEnter={() => setHovered(link.name)}
                            onMouseLeave={() => setHovered(null)}
                            className={`
                                my-2 py-1 px-3 sm:px-4 rounded-full
                                flex items-center gap-2 cursor-pointer
                                transition-all duration-300 ease-in-out
                                ${isActive
                                ? "bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                                : isHovered
                                    ? "bg-black/20 text-white/80"
                                    : "text-white/60"
                            }
                            `}
                        >
                            <Icon
                                size={18}
                                strokeWidth={isActive ? 1.6 : 1.2}
                                className="transition-all duration-300"
                            />
                            <span className="hidden sm:inline transition-all duration-300">
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