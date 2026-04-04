import React from 'react';

const ArtistSearchBg = () => {
  return (
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-200 via-green-300 to-emerald-500">

          <div className="absolute floatSlowReverse w-[500px] h-[700px] bg-linear-to-br from-emerald-300 to-emerald-400 rounded-full blur-[140px] top-[-100px] left-[-100px]" />

          <div className="absolute floatSlowReverse w-[500px] h-[500px] bg-green-400 rounded-full blur-[140px] top-[100px] right-[-150px]" />

          <div
              className="absolute floatSlowReverse w-[400px] h-[400px] bg-linear-to-br from-green-400 to-emerald-700 rounded-full blur-[160px] top-[50px] left-[200px]"
              style={{ animationDuration: "18s" }}
          />
      </div>
  );
};

export default ArtistSearchBg;
