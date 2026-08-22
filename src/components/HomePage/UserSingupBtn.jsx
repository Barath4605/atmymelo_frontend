import React from "react";
import "../../index.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../../auth.js";

const SignUpBtn = () => {
  const nav = useNavigate();

  return (
    <>
      {!isLoggedIn() ? (
        <div className="mx-auto space-x-2 lg:text-md poppins-light">
          <button
            onClick={() => nav("/register")}
            className="
                      px-5 py-1.5 rounded-full
                      text-sm text-white/70
                      space-grotesk-300
                      bg-linear-to-br from-white/3 via-white/5 to-white/6 border-x hover:border-x-1.5 border-white/10
                      backdrop-blur-md
                      transition-colors duration-300 ease-out
                       hover:text-white hover:border-white/20
                      cursor-pointer
                    "
          >
            REGISTER
          </button>
          <button
            onClick={() => nav("/login")}
            className="
                      px-5 py-1.5 rounded-full
                      text-sm text-white/70
                      space-grotesk-300
                      bg-linear-to-br from-white/3 via-white/5 to-white/6 border-x hover:border-x-1.5 border-white/10
                      backdrop-blur-md
                      transition-colors duration-300 ease-out
                       hover:text-white hover:border-white/20
                      cursor-pointer
                    "
          >
            LOG IN
          </button>
        </div>
      ) : (
        <div className="mx-auto space-x-6 lg:text-md poppins-light">
          <button
            onClick={logout}
            className="
                      px-5 py-1.5 rounded-full
                      text-sm text-white/70
                      space-grotesk-300
                      bg-linear-to-br from-white/3 via-white/5 to-white/6 border-x hover:border-x-1.5 border-white/10
                      backdrop-blur-md
                      transition-colors duration-300 ease-out
                       hover:text-white hover:border-white/20
                      cursor-pointer
                    "
          >
            LOGOUT
          </button>
        </div>
      )}
    </>
  );
};

export default SignUpBtn;
