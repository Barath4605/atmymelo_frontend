import React from "react";
import "../../App.css";
import {getName, getUsername, isLoggedIn} from "../../auth.js";
import {useNavigate} from "react-router-dom";
import Walkthrough from "./WalkthroughImages.jsx";

const Header = () => {
  const nav = useNavigate();
  const name = (getName() || "").replace(/^"|"$/g, "").trim();
  const username = (getUsername() || "").replace(/^"|"$/g, "").trim();

  return (
    <>
      <header className={`mx-auto text-center`}>
        {isLoggedIn() ? (
          <h1
            className={`lg:text-4xl text-2xl my-10 montserrat-300 text-white`}
          >
            Welcome Back,{" "}
            <span
              onClick={() => nav(`profile/${username}`)}
              className={`text-white/75 cursor-pointer hover:text-white 
                        transition-all ease-in-out duration-500 border-b border- hover:border-white`}
            >
              {name}
            </span>
          </h1>
        ) : (
          <div className="min-h-screen">
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-5">
              <h1 className="text-2xl lg:text-4xl poppins-light text-white max-w-3xl">
                Welcome to AtMyMelo.
                <br />
                Log In or Register to get started...
              </h1>

              <a
                href={`#walkthrough`}
                className="mt-16 text-4xl text-white/90 animate-bounce"
              >
                ↓
              </a>
            </section>

            <section
              id={`walkthrough`}
              className="w-full lg:w-[72%] mx-auto px-5 pb-20"
            >
              <Walkthrough />
            </section>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
