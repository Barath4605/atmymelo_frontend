import React from 'react';

const Tabs = ({ name, isActive, onClick }) => {
    return (
        <div onClick={onClick}>
            <h1
                className={` p-1 whitespace-nowrap m-1 cursor-pointer transition-all ease-in-out duration-400 text-[15px]
                    ${isActive ? 
                        `backdrop-saturate-250 lg:text-[16px] border-t-2 rounded-lg  
                        border-white/75 backdrop-blur-3xl px-4
                         bg-linear-to-br from-white/20 via-neutral-100/25 to-white/30 
                        text-white` 
                        :
                        `backdrop-saturate-50 lg:text-[16px] px-2 border-t-2 rounded-lg border-black/15 backdrop-blur-3xl bg-black/15 text-white/50`
                    }   
                `}>
                {name}
            </h1>
        </div>
    );
};

export default Tabs;