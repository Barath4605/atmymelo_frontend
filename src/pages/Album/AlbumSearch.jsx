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
            const res = await fetch(
                `http://localhost:8080/api/albums/search?query=${encodeURIComponent(search)}`
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
                <div className="mt-6 grid lg:grid-cols-3 gap-4 text-white">
                    {results.map((album) => (
                        <div
                            onClick={() => window.location.href = `/albums/${album.id}`}
                            key={album.id}
                            className="bg-linear-to-br from-red-800 via-red-800 to-red-900 p-5
                                       transition-all ease-in-out duration-500
                                       rounded-lg hover:scale-105 cursor-pointer backdrop-blur-md"
                        >
                            <h2 className="text-lg w-fit font-semibold cursor-pointer
                                           ">
                                 <span className="lg:hover:underline underline underline-offset-4 lg:hover:underline-offset-3">{album.title}</span>
                                 <span className="text-xs no-underline hover:no-underline">  by</span>
                            </h2>
                            <p className="text-sm w-fit opacity-70 underline lg:no-underline cursor-pointer
                                          lg:hover:underline underline-offset-4 lg:hover:underline-offset-3">{album.artist}</p>
                            <p className="text-sm opacity-50">{album.year}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default AlbumSearch;
