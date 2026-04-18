import React from 'react';
import GlobalBg from "../components/Global/GlobalBg.jsx";
import {useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const GlobalPage = () => {

    const nav = useNavigate();

  return (
      <main className="relative min-h-screen overflow-hidden montserrat-300 text-white">
          <GlobalBg />

          <Navbar />

          <div className="min-h-screen text-center flex flex-col justify-center items-center">
              <h1 className="text-xl">[ GLOBAL TOP MUSIC WILL BE AVAILABLE SOON ]</h1>
              <div>
                <h1 className="mt-10">meanwhile explore</h1>
                  <button
                      onClick={() => nav("/albums")}
                      className="p-1 px-3 cursor-pointer ml-2 hover:shadow-xl transition-all ease-in-out duration-400 shadow-black/5
                             bg-white/20 backdrop-saturate-200 border-t rounded-md border-white/30 backdrop-blur-xl">
                      ALBUMS
                  </button>
                  <button
                      onClick={() => nav("/artists")}
                      className="p-1 px-3 cursor-pointer ml-2 hover:shadow-xl transition-all ease-in-out duration-400 shadow-black/5
                             bg-white/20 backdrop-saturate-200 border-t rounded-md border-white/30 backdrop-blur-xl">
                      ARTISTS
                  </button>
              </div>
          </div>
      </main>
  );
};

export default GlobalPage;
