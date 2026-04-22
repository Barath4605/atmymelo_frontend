import React, { useState, useEffect, useRef } from "react";
import { Home, Disc3, User, ListMusic, Heart, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const nav = useNavigate();
    const location = useLocation();
    const [hovered, setHovered] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const lastScrollY = useRef(window.scrollY);
    const menuRef = useRef(null);

    const links = [
        { name: "Home",      route: "/",          icon: Home      },
        { name: "Albums",    route: "/albums",    icon: Disc3     },
        { name: "Artists",   route: "/artists",   icon: User      },
        { name: "Favorites", route: "/favorites", icon: Heart     },
        { name: "Deck",      route: "/deck",      icon: ListMusic },
    ];

    const activeRoute = location.pathname;

    // Auto-fold on scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            if (Math.abs(currentY - lastScrollY.current) > 8) {
                setIsOpen(false);
            }
            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close on outside click (mobile)
    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const pillBase = `
        backdrop-blur-3xl backdrop-saturate-110 backdrop-brightness-105 border-t border-white/30 shadow-black/5 shadow-md
        bg-linear-to-br from-black/20 via-black/25 to-black/30 text-white
    `;

    return (
        <div
            ref={menuRef}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2"
            style={{ width: "max-content" }}
        >
            {/* ── Menu pill ── */}
            <button
                onClick={() => setIsOpen((v) => !v)}
                onMouseEnter={() => setIsOpen(true)}
                className={`
                    ${pillBase} 
                    montserrat-200 rounded-full
                    flex items-center justify-center
                    w-10 h-10
                    cursor-pointer
                    transition-all duration-300 ease-in-out
                    hover:bg-white/10
                    select-none
                `}
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                <span
                    className="transition-transform duration-300 ease-in-out"
                    style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", display: "flex" }}
                >
                    {isOpen
                        ? <X size={17} strokeWidth={1.4} />
                        : <Menu size={17} strokeWidth={1.4} />
                    }
                </span>
            </button>


            {/* ── Nav links pill ── */}
            <div
                className={`
                            ${pillBase}
                            montserrat-200 rounded-full
                            overflow-hidden
                        `}
                style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "scale(1) translateX(0px)" : "scale(0.1) translateX(-40px)",
                    transformOrigin: "left center",
                    transition: "opacity 250ms ease, transform 350ms cubic-bezier(0.22, 1, 0.36, 1)",
                    pointerEvents: isOpen ? "auto" : "none",
                    willChange: "opacity, transform",
                }}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <div className="flex items-center space-x-1 px-3 py-0">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = activeRoute === link.route;
                        const isHovered = hovered === link.name;

                        return (
                            <button
                                key={link.name}
                                onClick={() => {
                                    nav(link.route);
                                    setIsOpen(false);
                                }}
                                onMouseEnter={() => setHovered(link.name)}
                                onMouseLeave={() => setHovered(null)}
                                className={`
                                    my-2 py-1.5 px-3 sm:px-4 rounded-full
                                    flex items-center text-xl gap-2 cursor-pointer whitespace-nowrap
                                    transition-all duration-300 ease-in-out
                                    ${isActive
                                    ? "bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                                    : isHovered
                                        ? "bg-white/10 text-white/70"
                                        : "text-white/50"
                                }
                                `}
                            >
                                <Icon
                                    size={18}
                                    strokeWidth={isActive ? 1.6 : 1.2}
                                    className="transition-all duration-300 flex-shrink-0"
                                />
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