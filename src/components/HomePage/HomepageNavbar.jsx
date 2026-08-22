import React from "react";
import {isLoggedIn} from "../../auth.js";
import {useNavigate} from "react-router-dom";
import "../../App.css";
import SignUpBtn from "./UserSingupBtn.jsx";
import {Menu, X} from "lucide-react";

const HomepageNavbar = () => {
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

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

  const handleNav = (path) => {
    setMenuOpen(false);
    if (isLoggedIn()) {
      nav(path);
    } else {
      nav("/register");
    }
  };

  return (
    <nav className="relative flex justify-between px-5 py-3 w-full items-center bg-zinc-900 border-b-[1.5px] border-zinc-800">
      {/*TITLE*/}
      <h1 className="cursor-default lg:text-5xl cinzel-400 text-3xl lg:tracking-[-5px] tracking-[-1px] text-white font-light">
        At My Melo
      </h1>

      {/*LINKS - DESKTOP*/}
      <div className={`hidden lg:block mr-10`}>
        {links.map((link) => (
          <button
            className={`text-[18px] mx-4 py-0.5 text-white montserrat-300 cursor-pointer
           border-b-[0.01px] border-transparent hover:border-white/80 
           transition-all ease-in-out duration-500`}
            key={link.name}
            onClick={() => handleNav(link.path)}
          >
            {link.name}
          </button>
        ))}
      </div>

      {/*LOGIN AND REGISTER - DESKTOP*/}
      <div className={`hidden lg:block shrink-0`}>
        <SignUpBtn />
      </div>

      {/*HAMBURGER TOGGLE - MOBILE*/}
      <button
        className="lg:hidden text-white cursor-pointer shrink-0"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/*MOBILE MENU DROPDOWN*/}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-900 border-b-[1.5px] border-zinc-800 flex flex-col lg:hidden z-50">
          {links.map((link) => (
            <button
              className={`text-[18px] py-3 px-5 text-white montserrat-300 cursor-pointer
             text-left border-b-[0.25px] border-transparent hover:border-white/80 
             transition-all ease-in-out duration-500`}
              key={link.name}
              onClick={() => handleNav(link.path)}
            >
              {link.name}
            </button>
          ))}

          <div className="px-5 py-3">
            <SignUpBtn />
          </div>
        </div>
      )}
    </nav>
  );
};

export default HomepageNavbar;
