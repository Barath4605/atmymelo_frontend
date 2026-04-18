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

          <section className="lg:w-[75%] w-[90%] m-auto pt-12 min-h-screen">
              <h1 className="lg:text-7xl text-4xl text-white poppins-semibold">
                  Search for your <br/> favorite artists
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
                      <Search size={40} className="bg-white p-2 text-emerald-900 cursor-pointer rounded-full" />
                  </button>
              </form>

              <div className="mt-6 mb-3 grid lg:grid-cols-3 gap-4 text-white">
                  {results.map((artist) => (
                      <div
                          key={artist.id}
                          onClick={() => nav(`${artist.id}`)}
                          className="group relative cursor-pointer"
                      >
                          {/* Image */}
                          <div className="relative overflow-hidden rounded-xl">
                              {artist.imageUrl ? (
                                  <img
                                      src={artist.imageUrl}
                                      alt={artist.name}
                                      draggable={false}
                                      className="w-full aspect-[1] object-cover object-top select-none transition-all duration-700 group-hover:brightness-75"
                                      style={{ display: "block", filter: "brightness(0.9) saturate(0.85)" }}
                                  />
                              ) : (
                                  <div
                                      className="w-full aspect-[1] rounded-xl flex items-center justify-center"
                                      style={{
                                          background: "linear-gradient(145deg, rgba(10,60,30,0.9), rgba(5,30,15,0.95))",
                                          border: "1px solid rgba(150,255,180,0.08)",
                                      }}
                                  >
                                    <span
                                        className="montserrat-200"
                                        style={{ fontSize: "5rem", color: "rgba(255,255,255,0.06)", lineHeight: 1 }}
                                    >
                                        {artist.name?.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                              )}

                              {/* Slide-up name overlay on hover */}
                              <div
                                  className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4 transition-all duration-500 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                                  style={{
                                      background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                                      height: "60%",
                                  }}
                              >
                                  <p className="montserrat-300 text-[9px] uppercase tracking-[0.25em] mb-1"
                                     style={{ color: "rgba(255,255,255,0.8)" }}>
                                      {artist.country || "Artist"}
                                  </p>
                                  <h2 className="montserrat-600 text-sm truncate"
                                      style={{ color: "rgba(255,255,255,0.95)" }}>
                                      {artist.name}
                                  </h2>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </section>
      </main>
  );
};

export default ArtistSearch;
