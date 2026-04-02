import React from 'react';
import "../../index.css"
import { useNavigate } from "react-router-dom";

const SignUpBtn = () => {

    const nav = useNavigate();

  return (
      <div className="w-[75%] mx-auto space-x-6 lg:text-md mt-10 poppins-light">
          <button onClick={() => nav("/register")} className=" lg:text-white/80 text-white px-5 py-1
                               border-t-2 border-white/30
                            bg-linear-to-t from-orange-500/75  to-orange-400/75 backdrop-blur-2xl
                            rounded-sm hover:drop-shadow-xl hover:shadow-2xl transition duration-900 ease-in-out
                            cursor-pointer hover:text-white
                            ">
            REGISTER
          </button>
          <button onClick={() => nav("/login")} className=" lg:text-white/80 text-white px-5 py-1
                            bg-linear-to-t from-orange-500/75  to-orange-400/75 backdrop-blur-2xl
                             border-t-2 border-white/30
                            rounded-sm hover:drop-shadow-xl hover:shadow-2xl transition duration-900 ease-in-out
                            cursor-pointer hover:text-white
                            ">
              LOG IN
          </button>
      </div>
  );
};

export default SignUpBtn;
