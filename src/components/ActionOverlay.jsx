import React from 'react';
import { Heart, ListMusic } from "lucide-react";

const ActionOverlay = () => {
  return (
      <div onClick={(e) => e.stopPropagation()}
          className="absolute bottom-2 left-1/2 -translate-x-1/2
           flex gap-2 p-2 px-6 items-center z-10 rounded-full border-t-2 border-white/15
           bg-linear-to-bl from-black/65 via-black/50 to-black/40
           backdrop-blur-3xl">
          <button
              className="p-1 cursor-pointer hover:bg-red-400/20 rounded-full hover:backdrop-blur-3xl"
              onClick={(e) => e.stopPropagation()}>
              <Heart className="text-red-400" strokeWidth={1.5} size={15}/>
          </button>
          <div className="w-px h-2 rounded-full bg-white/30 backdrop-blur-3xl"></div>
          <button
              className="p-1 cursor-pointer hover:bg-green-400/20 rounded-full hover:backdrop-blur-3xl"
              onClick={(e) => e.stopPropagation()}>
              <ListMusic className="text-green-400" strokeWidth={1.5} size={15} />
          </button>
      </div>
  );
};

export default ActionOverlay;
