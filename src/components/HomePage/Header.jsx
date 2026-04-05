import React from 'react';
import "../../app.css"
import { isLoggedIn, getUsername } from "../../auth.js"
import {useNavigate} from "react-router-dom";

const Header = () => {

    const nav = useNavigate();

  return (
      <>
          {!isLoggedIn() ? (
              <header className=" w-[75%] text-center lg:text-left mx-auto cinzel-400 ">

                  {/*TITLE*/}
                  <h1 className="lg:text-8xl text-5xl lg:tracking-[-10px] tracking-[-1px] text-white font-light">
                      At My Melo
                  </h1>

                  {/*SUBTITLE*/}
                  <p className="tracking-wide text-white text-md lg:text-lg">Your personalized Music Diary</p>

              </header>
          ) :
              (
                  <header className=" lg:w-[75%] w-[90%] text-center lg:text-left mx-auto">
                      <h1 className="lg:text-4xl lg:p-1 text-center text-3xl text-white font-light montserrat-200">
                          WELCOME,
                          <span >
                                <button
                                    className="lg:border-b-white/70 cursor-pointer pb-1
                                                hover:border-b-white lg:text-white/75 lg:hover:text-white
                                                lg:border-b border-b border-white/80 ml-4"
                                    onClick={() => nav("/profile")}>
                                    {getUsername()}
                                </button>
                          </span>
                      </h1>
                      <div className="mt-20 cinzel-400 text-white">
                          <h1 className="text-5xl lg:text-6xl tracking-tighter">At My Melo</h1>
                          <p className="tracking-wide lg:mt-0 text-md">Your personalized Music Diary</p>
                      </div>

                  </header>
              )
          }
      </>
  );
};

export default Header;
