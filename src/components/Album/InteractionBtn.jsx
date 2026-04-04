import React from 'react';
import { Heart } from "lucide-react";
import { List } from "lucide-react";
import toast from "react-hot-toast";

const InteractionBtn = () => {

    const [isLiked, setIsLiked] = React.useState(false);
    const [isQueued, setIsQueued] = React.useState(false);

    const handleQueueClick = () => {
        if (isLiked) {
            toast("Can't queue the music you have listened");
            return;
        }
        if(isQueued) {
            setIsQueued(false);
            toast.success("Removed from your Queue Deck")
        } else {
            setIsQueued(true);
            toast.success("Added to your Queue Deck")
        }

    };

    const handleLike = () => {
        if(isLiked) {
            setIsLiked(false);
            toast.success("Removed from your favorites")
        } else {
            setIsLiked(true);
            toast.success("Added to your favorites")
        }
    }

    React.useEffect(() => {
        isLiked && setIsQueued(false);
    }, [isLiked])

  return (
      <main className="lg:flex space-x-2">
          <div className="mt-4 flex flex-col lg:flex-row items-center gap-3 w-full">
              <button
                  onClick={handleLike}
                  className={`
                      group relative overflow-hidden
                      lg:w-[37.5%] w-[90%] mx-auto
                      flex items-center justify-center gap-2.5
                      px-5 py-2.5
                      border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                      rounded-sm text-xs tracking-[0.2em] uppercase font-light
                      ${isLiked
                                      ? 'border-red-400/60 text-red-300 bg-red-500/10 shadow-[0_0_24px_-4px_rgba(248,113,113,0.3)]'
                                      : 'border-white/20 text-white/70 bg-white/5 hover:border-white/50 hover:text-white hover:bg-white/10 hover:shadow-[0_0_20px_-6px_rgba(255,255,255,0.2)]'
                                  }
                    `}
              >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                  <Heart
                      size={14}
                      strokeWidth={isLiked ? 0 : 1.5}
                      fill={isLiked ? 'rgb(252,165,165)' : 'transparent'}
                      className={`transition-all duration-500 ${isLiked ? 'scale-110' : 'group-hover:scale-105'}`}
                  />
                  <span>{isLiked ? 'Favorited' : 'Add to Favorites'}</span>

              </button>

              {/* Queue Button */}
              <button
                  onClick={handleQueueClick}
                  className={`
                      group relative overflow-hidden
                      lg:w-[37.5%] w-[90%] mx-auto
                      flex items-center justify-center gap-2.5
                      px-5 py-2.5
                      border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                      rounded-sm text-xs tracking-[0.2em] uppercase font-light
                      ${isQueued
                                      ? 'border-emerald-400/60 text-emerald-300 bg-emerald-500/10 shadow-[0_0_24px_-4px_rgba(52,211,153,0.3)]'
                                      : 'border-white/20 text-white/70 bg-white/5 hover:border-white/50 hover:text-white hover:bg-white/10 hover:shadow-[0_0_20px_-6px_rgba(255,255,255,0.2)]'
                                  }
                    `}
              >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                  <List
                      size={14}
                      strokeWidth={1.5}
                      className={`transition-all duration-500 ${isQueued ? 'text-emerald-300 scale-110' : 'group-hover:scale-105'}`}
                  />
                  <span>{isQueued ? 'Queued' : 'Add to Queue'}</span>

              </button>

          </div>
      </main>
  );
};

export default InteractionBtn;
