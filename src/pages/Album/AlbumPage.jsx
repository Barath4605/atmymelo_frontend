import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import AlbumBackdrop from "../../components/Album/AlbumBackdrop.jsx";
import AlbumHeader from "../../components/Album/AlbumHeader.jsx";
import Navbar from "../../components/Navbar.jsx";
import ErrorPage from "../ErrorPage.jsx";
import TrackList from "../../components/Tracklist/Tracklist.jsx";
import Top3SongsUser from "../../components/Album/Top3SongsUser.jsx";

const AlbumPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const token = localStorage.getItem("token");
                const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

                const res = await fetch(`${API_URL}/api/albums/${id}`, {
                    headers: { Authorization: "Bearer " + token },
                });
                const json = await res.json();
                if (!res.ok) {
                    setFailed(true);
                }
                setData(json);
            } catch {
                toast.error("Server error");
            }
        };
        fetchAlbum();
    }, [id]);

    if (!data) return null;

    const { album, rating, favorite, queue } = data;

    return (
        <>
            {failed ?
                (
                    <ErrorPage msg="This album does not exist in our Data Base yet " />
                )
                :
                (
                    <main
                        className="relative min-h-screen pb-16"
                        style={{ backgroundColor: "#0e0e0e" }}
                    >
                        <Navbar />
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

                        <TrackList mbid={id} />

                    </main>

                )
            }
        </>
    );
};

export default AlbumPage;