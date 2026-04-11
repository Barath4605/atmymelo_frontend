import React from 'react';

const Tabs = ({ name, isActive, onClick }) => {
    return (
        <div onClick={onClick}>
            <h1
                className={` p-1 whitespace-nowrap m-1 cursor-pointer transition-all ease-in-out duration-400 text-[15px]
                    ${isActive ? 
                        `backdrop-saturate-250 lg:text-[16px] backdrop-blur-5xl
                        bg-linear-to-br from-yellow-500/35 via-orange-700/35 to-orange-600/35 
                        text-white rounded-lg px-4` 
                        :
                        `backdrop-saturate-50 lg:text-[16px] px-4 rounded-lg
                         backdrop-blur-3xl bg-black/15 text-white/50`
                    }   
                `}>
                {name}
            </h1>
        </div>
    );
};

export default Tabs;