import React, {useState} from 'react';
import "../../App.css"
import AlbumSearchBg from "../../components/Album/AlbumSearchBg.jsx";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

const AlbumSearch = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!search.trim()) {
            toast("Type something first");
            return;
        }

        const toastId = toast.loading("Searching...");

        try {
            const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

            const res = await fetch(
                `${API_URL}/api/albums/search?query=${encodeURIComponent(search)}`
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error("Search failed", { id: toastId });
                return;
            }

            setResults(data);
            console.log(data);

            if (data.length === 0) {
                toast("No results found", { id: toastId });
            } else {
                toast.success("Results loaded", { id: toastId });
            }

        } catch (err) {
            toast.error("Server error", { id: toastId });
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden montserrat-300">

            <AlbumSearchBg />

            <section className="lg:w-[75%] w-[90%] m-auto pt-10 min-h-screen">
                <h1 className="lg:text-7xl text-4xl text-white poppins-semibold">
                    Search for your <br/> favorite albums
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
                        <Search size={40} className="bg-white p-2 text-rose-400 cursor-pointer rounded-full" />
                    </button>
                </form>
                <div className="mt-6 grid lg:grid-cols-3 gap-2">
                    {results.map((album, i) => (
                        <div
                            onClick={() => window.location.href = `/albums/${album.id}`}
                            key={album.id}
                            className="group relative flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer overflow-hidden transition-all duration-500"
                            style={{
                                background: "rgba(80,10,10,0.45)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid rgba(255,100,100,0.15)",
                                boxShadow: "0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,150,150,0.1)",
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = "rgba(80,10,10,0.6)";
                                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,150,150,0.15)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = "rgba(80,10,10,0.45)";
                                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,150,150,0.1)";
                            }}
                        >
                            <div
                                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                                style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)" }}
                            />

                            <span
                                className="montserrat-300 text-[11px] flex-shrink-0 w-4 text-center"
                                style={{ color: "rgba(255,255,255,0.35)" }}>
                                {i + 1}
                            </span>

                            <div className="flex flex-col min-w-0 flex-1">
                                <h2
                                    className="montserrat-500 text-sm truncate"
                                    style={{ color: "rgba(255,255,255,0.92)" }}
                                >
                                    {album.title}
                                </h2>
                                <p
                                    className="montserrat-300 text-[11px] truncate mt-0.5"
                                    style={{ color: "rgba(255,255,255,0.45)" }}
                                >
                                    {album.artist}
                                    <span style={{ color: "rgba(255,255,255,0.2)" }}> · </span>
                                    {album.year}
                                </p>
                            </div>

                            <span
                                className="flex-shrink-0 text-sm transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                                style={{ color: "rgba(255,255,255,0.4)" }}>
                                →
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default AlbumSearch;
