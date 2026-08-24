import React from "react";
import { isLoggedIn } from "../../auth.js";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const SuggestedAlbums = ({
  fetchAlbums,
  title,
  subtitle,
  metadata,
  TITLE_CUSTOM_CLASS,
  onDataLoaded,
}) => {
  const nav = useNavigate();

  const [albums, setAlbums] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // LOAD ALBUMS FROM THE PROVIDED FETCHER
  React.useEffect(() => {
    const loadAlbums = async () => {
      try {
        if (typeof fetchAlbums !== "function") {
          throw new Error(
            `fetchAlbums is not a function for "${title}". Received: ${typeof fetchAlbums}`,
          );
        }

        const res = await fetchAlbums();

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();

        setAlbums(data);

        // Tell parent whether this section has albums
        onDataLoaded?.(data.length > 0);
      } catch (error) {
        console.error(
          `Failed to load "${title ?? "suggested albums"}":`,
          error,
        );

        // Treat failed/empty section as having no data
        onDataLoaded?.(false);
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, [fetchAlbums, title, onDataLoaded]);

  if (!isLoggedIn()) {
    return null;
  }

  // QUIET LOADING STATE
  if (loading) {
    return (
      <section className="w-full mx-auto py-16 text-center">
        <p className="montserrat-300 text-sm tracking-[0.2em] uppercase text-white/30 animate-pulse">
          Loading
        </p>
      </section>
    );
  }

  // EMPTY STATE
  // HomePage handles the global walkthrough.
  if (albums.length === 0) {
    return null;
  }

  let genre = albums[0]?.genre ?? "";

  if (genre.toLowerCase() === "other") {
    genre = "Alternative";
  }

  // RENDER A SINGLE ALBUM CARD
  const renderAlbum = (album) => (
    <div
      key={album.albumId}
      className="group cursor-pointer shrink-0 w-36 lg:w-52 snap-start"
    >
      <div className="relative overflow-hidden aspect-square bg-white/2 border border-white/10">
        <img
          src={album.albumImg}
          alt={album.albumName}
          onClick={() => nav(`/albums/${album.albumId}`)}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
        />
      </div>

      <div className="mt-2.5 w-fit">
        <h3
          onClick={() => nav(`/albums/${album.albumId}`)}
          className="text-sm poppins-light text-white/85 line-clamp-1"
        >
          {album.albumName}
        </h3>

        <p
          onClick={() => nav(`/artists/${album.artistId}`)}
          className="text-xs montserrat-300 w-fit text-white/45 line-clamp-1 hover:text-white/70 transition-colors duration-500"
        >
          {album.artistName}
        </p>

        {metadata && (
          <p className="text-[10px] montserrat-300 mt-1.5 text-white/30">
            {metadata(album)}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <section className="text-white mt-10 lg:w-[72%] w-[90%] mx-auto">
      <h2
        className={`text-xl lg:text-2xl montserrat-400 tracking-tight text-white/80 ${TITLE_CUSTOM_CLASS}`}
      >
        {title || (
          <>
            More from{" "}
            <span
              className="poppins-semibold text-2xl lg:text-3xl mx-1 tracking-wide
                         bg-linear-to-tr from-white/75 via-white/90 to-white/50
                         bg-clip-text text-transparent"
            >
              {genre}
            </span>
          </>
        )}
      </h2>

      <p className="leading-4 pb-3 border-b border-white/10 text-sm montserrat-300 text-white/40">
        {subtitle}
      </p>

      <div className="flex gap-4 pt-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {albums.map(renderAlbum)}
      </div>
    </section>
  );
};

export default SuggestedAlbums;
