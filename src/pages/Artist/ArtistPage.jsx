import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Backdrop from "../../components/Artist/Backdrop.jsx";
import toast from "react-hot-toast";
import ArtistHeader from "../../components/Artist/ArtistHeader.jsx";
import ArtistAlbums from "../Album/ArtistAlbums.jsx";
import Navbar from "../../components/Navbar.jsx";

const ArtistPage = () => {

    const [artist, setArtist] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchArtist = async () => {
            const toastId = toast.loading("Loading artist...");

            try {
                const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

                const res = await fetch(`${API_URL}/api/artist/${id}`);
                const data = await res.json();

                if (!res.ok) {
                    toast.error("Failed to load artist", { id: toastId });
                    return;
                }

                setArtist(data);
                toast.success("Loaded", { id: toastId });

            } catch (err) {
                toast.error("Server error", { id: toastId });
            }
        };

        fetchArtist();
    }, [id]);

    if (!artist) return null;

  return (

      <main className="bg-linear-to-b from-black to-black pb-10 min-h-screen">
          <Navbar />

          <Backdrop artistBackdrop={artist.backdropUrl} artistName={artist.name} artistLogo={artist.logoUrl} />


          <ArtistHeader artistImg={artist.photoUrl}
                        imgAlt={artist.name}
                        artistBio={artist.bio}
                        artistBorn={artist.born}
                        artistDebut={artist.formed === null ? "-" : artist.formed}
                        artistLabel={artist.label === null ? "Independent" : artist.label}
          />

          <ArtistAlbums artistId={id} />

      </main>

  );
};

export default ArtistPage;
