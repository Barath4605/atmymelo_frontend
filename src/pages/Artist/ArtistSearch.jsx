import React, {useState} from 'react';
import "../../App.css"
import ArtistSearchBg from "../../components/Artist/ArtistSearchBg.jsx";
import {Search} from "lucide-react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";

const ArtistSearch = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!search.trim()) {
            toast("Type something");
            return;
        }

        const toastId = toast.loading("Searching artists...");

        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

            const res = await fetch(
                `${API_URL}/api/search?query=${encodeURIComponent(search)}`
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error("Search failed", { id: toastId });
                return;
            }

            setResults(data);

            if (data.length === 0) {
                toast("No artists found", { id: toastId });
            } else {
                toast.success("Artists loaded", { id: toastId });
            }

        } catch (err) {
            toast.error("Server error", { id: toastId });
        }
    };

  return (
      <main className="relative min-h-screen overflow-hidden montserrat-300" >
        <ArtistSearchBg />

          <Navbar />

          <section className="lg:w-[75%] w-[90%] m-auto pt-20 min-h-screen">
              <h1 className="lg:text-6xl text-3xl text-white/85 poppins-semibold">
                  Search for your <br/> <span className="lg:text-7xl text-4xl">favorite artists</span>
              </h1>

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <input
                      type="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className={`p-2 my-5 px-4 bg-white/95 backdrop-saturate-150 backdrop-blur-4xl rounded-full text-black 
                        ${search.length > 0 ? "lg:w-1/3 w-full" : "lg:w-1/5 w-1/2"}
                        focus:outline-0 lg:focus:w-1/3 focus:w-2/3 transition-all duration-500 tracking-wide`}
                      placeholder="Search here"
                  />
                  <button type="submit">
                      <Search size={40} className="bg-white p-2 text-pink-800 cursor-pointer rounded-full" />
                  </button>
              </form>

              <div className="mt-6 mb-3 grid lg:grid-cols-3 gap-4 text-white">
                  {results.map((artist) => (
                      <div
                          key={artist.id}
                          onClick={() => nav(`${artist.id}`)}
                          className="cursor-pointer"
                      >
                          {/* image */}
                          <div className="w-full aspect-square bg-neutral-800 rounded-md overflow-hidden">
                              {artist.imageUrl ? (
                                  <img
                                      src={artist.imageUrl}
                                      alt={artist.name}
                                      className="w-full h-full object-cover"
                                  />
                              ) : (
                                  <div className="flex items-center justify-center h-full text-3xl text-neutral-500">
                                      {artist.name?.[0]}
                                  </div>
                              )}
                          </div>

                          {/* text */}
                          <div className="mt-2">
                              <p className="text-sm truncate">{artist.name}</p>
                              <p className="text-xs text-neutral-400">
                                  {artist.country || "artist"}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>
          </section>
      </main>
  );
};

export default ArtistSearch;
