import React, { useEffect, useState } from "react";
import { getArtistAlbums } from "../../../api/artistApi.js"
import AlbumCard from "./AlbumCard.jsx";
import toast from "react-hot-toast";
import Loading from "../../components/Loading.jsx";

const ArtistAlbums = ({ artistId }) => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAlbums = async () => {
            setLoading(true);
            try {
                const res = await getArtistAlbums(artistId);
                const data = await res.json();

                if (!res.ok) throw new Error();

                setAlbums(data);
            } catch {
                toast.error("Failed to load albums");
            } finally {
                setLoading(false);
            }
        };

        fetchAlbums();
    }, [artistId]);

    if(loading) return <Loading />;
    if (albums.length === 0) return null;

    return (
        <section className="lg:w-[70%] w-[90%] mx-auto mt-10 ">
            <h2 className="text-md montserrat-400 uppercase tracking-[0.2em] mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-800
                            text-[14px] lg:mb-2 font-medium text-zinc-900 dark:text-zinc-100">
                Artist Albums
            </h2>
            <div className="grid-cols-2 lg:grid-cols-5 grid overflow-x-auto pb-2 scrollbar-hide">
                {albums.map((album) => (
                    <AlbumCard key={album.id} album={album} />
                ))}
            </div>
        </section>
    )
};

export default ArtistAlbums;