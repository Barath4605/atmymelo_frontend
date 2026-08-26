import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Backdrop from "../../components/Artist/Backdrop.jsx";
import ArtistHeader from "../../components/Artist/ArtistHeader.jsx";
import ArtistAlbums from "../Album/ArtistAlbums.jsx";
import Navbar from "../../components/Navbar.jsx";
import ErrorPage from "../ErrorPage.jsx";
import ArtistTopSongs from "../../components/Artist/ArtistTopSongs.jsx";

const ArtistPage = () => {
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const API_URL =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

        const res = await fetch(`${API_URL}/api/artist/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
        }

        setArtist(data);
      } catch {
        console.log(error);
      }
    };

    fetchArtist();
  }, [id]);

  if (!artist) return null;

  return (
    <>
      {error ? (
        <ErrorPage msg="Artist is not in our Data Base yet" />
      ) : (
        <main className="pb-10 min-h-screen">
          <Navbar />

          <Backdrop
            artistId={artist.id}
            artistBackdrop={artist.backdropUrl}
            artistName={artist.name}
            artistLogo={artist.logoUrl}
          />

          <ArtistHeader
            artistImg={artist.photoUrl}
            imgAlt={artist.name}
            artistBio={artist.bio}
            artistBorn={artist.born}
            artistName={artist.name}
            artistDebut={artist.formed === null ? "-" : artist.formed}
            artistLabel={artist.label === null ? "Independent" : artist.label}
          />

          <ArtistAlbums artistId={id} />

          <ArtistTopSongs artistId={artist.id} />
        </main>
      )}
    </>
  );
};

export default ArtistPage;
