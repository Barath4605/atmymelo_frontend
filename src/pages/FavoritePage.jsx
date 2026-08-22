import React, { useEffect, useState } from "react";
import Tabs from "../components/Tabs.jsx";
import {
  getFavoriteAlbumOnGenre,
  getUserGenres,
} from "../../api/favoriteApi.js";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";

const name = localStorage.getItem("name");

const Star = ({ rating, star }) => {
  const isFull = rating >= star;
  const isHalf = rating >= star - 0.5 && rating < star;

  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5"
      style={{
        filter:
          isFull || isHalf
            ? "drop-shadow(0 0 6px rgba(255,255,255,0.6))"
            : "none",
        transition: "all 0.2s ease",
      }}
    >
      {/* Empty star */}
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill="rgba(255,255,255,0.15)"
      />

      {/* Full star */}
      {isFull && (
        <polygon
          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          fill="rgba(255,255,255,0.95)"
        />
      )}

      {/* Half star */}
      {isHalf && (
        <>
          <defs>
            <clipPath id={`half-${star}`}>
              <rect x="0" y="0" width="12" height="24" />
            </clipPath>
          </defs>

          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill="rgba(255,255,255,0.95)"
            clipPath={`url(#half-${star})`}
          />
        </>
      )}
    </svg>
  );
};

const FavoritesPage = () => {
  const [genres, setGenres] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await getUserGenres();
        const data = await res.json();

        if (!res.ok) throw new Error();

        setGenres(data);

        if (data.length > 0) {
          setActiveTab(data[0]);
        }
      } catch {
        toast.error("Failed to load genres");
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    if (!activeTab) return;

    const fetchAlbums = async () => {
      try {
        const res = await getFavoriteAlbumOnGenre(activeTab);
        const data = await res.json();

        if (!res.ok) throw new Error();

        setAlbums(data);
      } catch {
        toast.error("Failed to load albums", { id: toastId });
      }
    };

    fetchAlbums();
  }, [activeTab]);

  return (
    <main className="relative min-h-screen overflow-hidden montserrat-300 text-white">
      <Navbar />

      <header className="lg:p-5 p-3 pt-20 lg:mx-10 border-b border-neutral-50/40">
        <h1 className="text-4xl lg:text-6xl poppins-semibold tracking-tight">
          {name}'s <br />
          <span className="lg:text-7xl text-5xl tracking-tighter">
            FAVORITES
          </span>
        </h1>
      </header>

      <div className="lg:w-[85%] w-[92%] flex flex-wrap gap-2 my-3 mx-auto">
        {genres.map((genre) => (
          <Tabs
            key={genre}
            name={genre === null ? "Other" : genre}
            isActive={activeTab === genre}
            onClick={() => setActiveTab(genre)}
          />
        ))}
      </div>

      <section className="lg:w-[85%] w-[92%] mx-auto mt-6 grid grid-cols-2 lg:grid-cols-5 gap-5 pb-15">
        {albums.length === 0 && (
          <p className="text-white/40 col-span-full text-center">
            No favorites yet
          </p>
        )}

        {albums.map((album) => (
          <div
            key={album.albumId}
            className="group cursor-pointer"
            onClick={() => (window.location.href = `/albums/${album.albumId}`)}
          >
            {/* image */}
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={album.imageUrl}
                alt={album.title}
                className="w-full h-full object-cover transition duration-500"
              />
            </div>

            {/* text */}
            <div className="mt-2">
              <h2 className="text-xl font-medium line-clamp-1">
                {album.title}
              </h2>
              <p className="text-sm text-white line-clamp-1">
                {album.artist} <span> · {album.releaseDate}</span>
              </p>
            </div>

            {album.rating > 0 && (
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} rating={album.rating} star={star} />
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
};

export default FavoritesPage;
