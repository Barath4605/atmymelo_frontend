import React from 'react';

const ArtistHeader = ({ artistImg, imgAlt, artistBio, artistLabel, artistDebut, artistBorn}) => {
  return (
      <section className="lg:w-[70%] w-[90%] mx-auto">
          <div className="lg:flex">
              <img
                  className="lg:size-64 size-48 lg:mx-0 mx-auto"
                  src={artistImg} alt={imgAlt}/>

              <div className="flex flex-col">

                  {/*BIO*/}
                  <h1 className="montserrat-300 text-xl mx-3 lg:text-start text-center tracking-widest text-gray-300">BIO</h1>
                  <p className="text-gray-400 mx-3 text-md montserrat-400 line-clamp-4">
                      {artistBio}
                  </p>
                  <p className="montserrat-300 uppercase mx-3 mt-2 text-[10px] tracking-widest cursor-pointer
                                text-gray-300 pb-px border-b border-white/50 w-fit">read more</p>


                    {/*EXTRA TAGS*/}
                  <div className="text-gray-200 montserrat-200 grid grid-cols-2 space-y-4 lg:grid-cols-3 m-3 mt-5">
                      <div>
                          <h1 className="montserrat-400 text-gray-400 tracking-wide">LABEL</h1>
                          <p>{artistLabel}</p>
                      </div>
                      <div>
                          <h1 className="montserrat-400 text-gray-400 tracking-wide">DEBUT</h1>
                          <p>{artistDebut}</p>
                      </div>
                      <div>
                          <h1 className="montserrat-400 text-gray-400 tracking-wide">BORN</h1>
                          <p>{artistBorn}</p>
                      </div>
                  </div>

              </div>



          </div>
      </section>
  );
};

export default ArtistHeader;
