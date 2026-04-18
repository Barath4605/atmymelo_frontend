import React from 'react';
import {useNavigate} from "react-router-dom";

const ErrorPage = ( {msg} ) => {

    const nav = useNavigate();

  return (
      <section style={{ backgroundColor: "#0e0e0e" }}
               className="flex min-h-screen items-center  text-zinc-400 space-grotesk-300 justify-center text-center ">

          <div className="flex flex-col m-8">
              <button
                  onClick={() => nav(-1)}
                  className="p-1 text-start underline">
                  ← go back
              </button>
              <h1 className="text-start">
                  {msg}
              </h1>
          </div>
      </section>
  );
};

export default ErrorPage;
