import React from 'react';

const Top3SongsUser = () => {
  return (
      <section className="w-[70%] m-auto mt-10">

          <p className="montserrat-400 text-xl text-white tracking-wide">Your Favorite Songs from the album</p>

          <div className="flex items-center text-center justify-between mt-4">
              {
                  [...Array(3)].map((_, i) => (
                      <div
                          key={i}
                          className="bg-linear-to-t poppins-light from-gray-900 border-t-2 border-gray-800 to-gray-950/90
                                    cursor-pointer rounded-lg p-5 px-8 w-fit text-gray-700 text-3xl ">
                          +
                      </div>
                  ))
              }
          </div>
      </section>
  );
};

export default Top3SongsUser;
