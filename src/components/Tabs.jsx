import React from "react";

const Tabs = ({ name, isActive, onClick }) => {
  return (
    <div onClick={onClick}>
      <h1
        className={` p-1 space-grotesk-300 whitespace-nowrap m-1 cursor-pointer transition-all ease-in-out duration-400 text-[15px]
                    ${
                      isActive
                        ? `backdrop-saturate-250 lg:text-[16px] backdrop-blur-5xl
                        bg-linear-to-tl from-zinc-900/80 via-black/60 to-zinc-800/50 border-b-[1.5px] border-white/20
                        text-white rounded-lg px-4`
                        : `backdrop-saturate-50 lg:text-[16px] px-4 rounded-lg
                         backdrop-blur-3xl bg-linear-to-t from-black/15 to-black/35 border-b-[0.5px] border-white/5 text-white/50`
                    }   
                `}
      >
        {name}
      </h1>
    </div>
  );
};

export default Tabs;
