import React from 'react';

const LoadingTracklist = () => {
  return (
      <ul className="grid lg:grid-flow-col lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-1"
          style={{ gridTemplateRows: `repeat(3, auto)` }}>
          {Array.from({ length: 6}).map((index) => (
              <li
                  key={index}
                  className={`relative flex pt-3 montserrat-400 items-center gap-3 p-2.5 rounded-sm overflow-hidden
                               bg-linear-to-tr from-zinc-900/60 via-zinc-900/75 to-zinc-900/60  
                                border-b border-white/10 dark:border-zinc-800"
                              transition-colors duration-300 last:border-none`}>
                      <div className="flex-1 flex-col lg:flex-row lg:items-center lg:gap-0 items-start gap-1">
                          <div className="flex-1 min-w-0">
                              <div>
                                  <p className={`bg-linear-to-tr from-black/20 via-black/40 to-black/20 px-5 py-2 rounded-full lg:text-sm text-md text-zinc-100 lg:w-[60%]
                                                transition-all ease-in-out duration-100`}>
                                  </p>
                              </div>
                              <p className={`text-xs text-zinc-200 mt-0.5 w-1/3 transition-all ease-in-out duration-100
                                              bg-linear-to-tr from-black/20 via-black/40 to-black/20 px-5 py-2 rounded-full
                                            `}>
                              </p>
                      </div>

                              <span className={`text-xs space-grotesk-300 text-zinc-200 shrink-0
                                                bg-linear-to-tr from-black/20 via-black/40 to-black/20 px-6 py-0.5 rounded-full
                                            `}>
                              </span>

                      </div>
              </li>
          ))}
      </ul>
  );
};

export default LoadingTracklist;
