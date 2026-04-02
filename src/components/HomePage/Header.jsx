import React from 'react';
import "../../index.css"
import { loggedIn, username, logout } from "../../auth.js"

const Header = () => {
  return (
      <header className=" w-[75%] text-center lg:text-left mx-auto pt-30 cinzel-400">

        <h1 className="lg:text-8xl text-6xl
        lg:tracking-[-10px] tracking-[-1px] text-white font-light">
          At My Melo
        </h1>
        <p className="tracking-wide text-white text-md lg:text-lg">Your personalized Music Diary</p>

      </header>
  );
};

export default Header;
