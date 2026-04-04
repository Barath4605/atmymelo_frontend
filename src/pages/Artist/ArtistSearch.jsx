import React, {useState} from 'react';
import "../../App.css"
import ArtistSearchBg from "../../components/Artist/ArtistSearchBg.jsx";
import {Search} from "lucide-react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

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
            const res = await fetch(
                `http://localhost:8080/api/search?query=${encodeURIComponent(search)}`
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

          <section className="lg:w-[75%] w-[90%] m-auto pt-10 min-h-screen">
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

              <div className="mt-6 grid lg:grid-cols-3 gap-4 text-white">
                  {results.map((artist) => (
                      <div
                          key={artist.id}
                          onClick={() => nav(`${artist.id}`)}
                          className="relative h-48 rounded-xl overflow-hidden cursor-pointer hover:scale-105
                           transition-all ease-in-out duration-500
                           group"
                      >

                          {artist.imageUrl ? (
                              <img
                                  src={artist.imageUrl}
                                  alt={artist.name}
                                  className="absolute inset-0 w-full h-full object-cover transition duration-700"
                              />
                          ) : (
                              <div className="absolute inset-0 bg-emerald-500 flex items-center justify-center">
                                    <span className="text-white tracking-wide montserrat-100 text-sm font-medium opacity-80">
                                        No Image Available
                                    </span>
                              </div>
                          )}

                          {
                              artist.imageUrl ? (

                                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                              ) : (

                                  <div className="absolute inset-0 bg-black/50" />
                              )
                          }
                          <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay" />

                          <div className="relative z-10 p-4 h-full flex flex-col justify-end text-white">
                              <h2 className="text-lg font-semibold">{artist.name}</h2>

                              {artist.country && (
                                  <p className="text-sm opacity-70">{artist.country}</p>
                              )}
                          </div>

                      </div>
                  ))}
              </div>
          </section>
      </main>
  );
};

export default ArtistSearch;
