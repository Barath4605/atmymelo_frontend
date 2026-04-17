import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import AlbumBackdrop from "../../components/Album/AlbumBackdrop.jsx";
import AlbumHeader from "../../components/Album/AlbumHeader.jsx";

const AlbumPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            const toastId = toast.loading("Loading album...");
            try {
                const token = localStorage.getItem("token");
                const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

                const res = await fetch(`${API_URL}/api/albums/${id}`, {
                    headers: { Authorization: "Bearer " + token },
                });
                const json = await res.json();
                if (!res.ok) { toast.error("Failed to load album", { id: toastId }); return; }
                setData(json);
                toast.success("Loaded", { id: toastId });
            } catch {
                toast.error("Server error");
            }
        };
        fetchAlbum();
    }, [id]);

    if (!data) return null;

    const { album, rating, favorite, queue } = data;

    return (
        <main
            className="relative min-h-screen pb-16"
            style={{ backgroundColor: "#0e0e0e" }}
        >
            <AlbumBackdrop
                backdrop={album.artist?.backdropUrl}
                title={album.title}
            />

            <AlbumHeader
                albumImg={album.imageUrl}
                title={album.title}
                artist={album.artist?.name}
                year={album.releaseYear}
                genre={album.genre}
                description={album.description}
                rating={rating}
                favorite={favorite}
                queue={queue}
                artistId={album.artist.id}
                albumId={id}
            />
        </main>
    );
};

export default AlbumPage;