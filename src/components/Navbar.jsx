import React, { useState, useEffect, useRef } from "react";
import { Home, Disc3, User, ListMusic, Heart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const nav = useNavigate();
    const location = useLocation();

    const [hovered, setHovered] = useState(null);
    const [showDock, setShowDock] = useState(true);

    const lastScrollY = useRef(0);

    const links = [
        { name: "Home", route: "/", icon: Home },
        { name: "Albums", route: "/albums", icon: Disc3 },
        { name: "Artists", route: "/artists", icon: User },
        { name: "Favorites", route: "/favorites", icon: Heart },
        { name: "Deck", route: "/deck", icon: ListMusic },
    ];

    useEffect(() => {
        const threshold = 8;

        const handleScroll = () => {
            const currentY = window.scrollY;

            if (
                Math.abs(currentY - lastScrollY.current) <
                threshold
            ) {
                return;
            }

            if (currentY <= 10) {
                setShowDock(true);
            } else if (currentY > lastScrollY.current) {
                setShowDock(false);
            } else {
                setShowDock(true);
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    const activeRoute = location.pathname;

    const pillBase = `
        backdrop-blur-3xl
        backdrop-saturate-110
        backdrop-brightness-105
        border-t border-white/20
        shadow-black/5 shadow-md
        bg-linear-to-br
        from-black/20
        via-black/25
        to-black/30
        text-white
    `;

    return (
        <div
            className="fixed bottom-4 left-1/2 z-50"
            style={{
                transform: showDock
                    ? "translateX(-50%) translateY(0)"
                    : "translateX(-50%) translateY(140px) scale(0.05)",
                opacity: showDock ? 1 : 0,
                transition:
                    "transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease-in-out",
            }}
        >
            <div
                className={`
                    ${pillBase}
                    montserrat-200
                    rounded-full
                    overflow-hidden
                `}
            >
                <div className="flex items-center space-x-1 px-3 py-0">
                    {links.map((link) => {
                        const Icon = link.icon;

                        const isActive =
                            activeRoute === link.route;

                        const isHovered =
                            hovered === link.name;

                        return (
                            <button
                                key={link.name}
                                onClick={() => nav(link.route)}
                                onMouseEnter={() =>
                                    setHovered(link.name)
                                }
                                onMouseLeave={() =>
                                    setHovered(null)
                                }
                                className={`
                                    my-2
                                    py-1.5
                                    px-3
                                    sm:px-4
                                    rounded-full
                                    flex
                                    items-center
                                    gap-2
                                    cursor-pointer
                                    whitespace-nowrap
                                    transition-all
                                    duration-300
                                    ease-in-out

                                    ${
                                    isActive
                                        ? "bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                                        : isHovered
                                            ? "bg-white/10 text-white/70"
                                            : "text-white/50"
                                }
                                `}
                            >
                                <Icon
                                    size={18}
                                    strokeWidth={
                                        isActive ? 1.6 : 1.2
                                    }
                                    className="transition-all duration-300 flex-shrink-0"
                                />

                                {/* desktop only */}
                                <span className="hidden sm:inline transition-all duration-300 text-sm">
                                    {link.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Navbar;