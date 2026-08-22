import React from "react";
import { getRelistenAlbums } from "../../../api/homepageApi.js";
import { isLoggedIn } from "../../auth.js";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import Walkthrough from "./WalkthroughImages.jsx";

const RelistenAlbums = () => {
  const nav = useNavigate();
  const [albums, setAlbums] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const formatDate = (dateTime) => {
    if (!dateTime) return "";

    const [date] = dateTime.split("T");
    const [year, month, day] = date.split("-");

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${day} ${months[Number(month) - 1]}, ${year}`;
  };

  React.useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await getRelistenAlbums();

        if (!res.ok) {
          throw new Error("Failed to fetch relisten albums");
        }

        const data = await res.json();
        setAlbums(data);
      } catch (error) {
        console.error("Failed to load relisten albums:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) {
    return (
      <section className="text-white/80  w-full mx-auto text-center animate-breathe transition-all ease-in-out duration-200 ">
        <h1 className={`montserrat-300`}>Fetching ...</h1>
      </section>
    );
  }

  if (albums.length === 0 && isLoggedIn()) {
    return (
      <>
        <section className="w-1/2 mx-auto p-5 py-10 border border-white/20 mt-30 poppins-bold text-white/80 text-center">
          <h1 className={`poppins-light text-xl lg:text-3xl`}>
            Log and Review to personalize your Home Page
          </h1>
          <div className={`poppins-light mt-2`}>
            <h1 className="my-2 text-xl">Get Started</h1>
            <button
              onClick={() => nav("/albums")}
              className="p-1 px-3 cursor-pointer ml-2 hover:shadow-xl transition-all ease-in-out duration-400 shadow-black/5
                             bg-white/20 backdrop-saturate-200 border-b rounded-md border-white/30 backdrop-blur-xl"
            >
              ALBUMS
            </button>
            <button
              onClick={() => nav("/artists")}
              className="p-1 px-3 cursor-pointer ml-2 hover:shadow-xl transition-all ease-in-out duration-400 shadow-black/5
                             bg-white/20 backdrop-saturate-200 border-b rounded-md border-white/30 backdrop-blur-xl"
            >
              ARTISTS
            </button>
          </div>
        </section>
        <div className={`lg:w-[75%] w-[90%] mx-auto mt-40`}>
          <Walkthrough />
        </div>
      </>
    );
  }

  return (
    <>
      {isLoggedIn() && (
        <section className="text-white mt-40 lg:w-[72%] w-[90%] mx-auto">
          <h2 className="text-2xl lg:text-4xl montserrat-400 lg:ing-tight">
            Maybe a re-listen ?
          </h2>
          <p
            className={`lg:leading-3 leading-4 pb-3 border-b text-md montserrat-200 tracking-tight border-white/50 text-white/85`}
          >
            It has been a while since you first listened to these albums...
          </p>

          <div className="flex gap-5 p-5 montserrat-300 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {albums.map((album) => (
              <div
                key={album.albumId}
                className="group cursor-pointer shrink-0 w-40 h-60 lg:w-60 lg:h-80 snap-start"
              >
                <div className="relative overflow-hidden size-40 lg:size-60">
                  <img
                    src={album.albumImg}
                    alt={album.albumName}
                    onClick={() => {
                      window.location.href = `/albums/${album.albumId}`;
                    }}
                    className="w-full aspect-square object-cover transition duration-500"
                  />
                </div>

                <div
                  onClick={() => {
                    window.location.href = `/albums/${album.albumId}`;
                  }}
                  className="mt-2 w-fit"
                >
                  <h3 className="text-md font-medium poppins-light line-clamp-1">
                    {album.albumName}
                  </h3>

                  <p
                    onClick={() => {
                      window.location.href = `/artists/${album.artistId}`;
                    }}
                    className="text-sm w-fit text-white/60 line-clamp-1
                                border-b border-white/50 hover:border-white/75
                                transition-all ease-in-out duration-200
                                "
                  >
                    {album.artistName}
                  </p>
                  <p className={`lg:text-xs text-[10px] mt-2 text-white/60`}>
                    Last Listen {formatDate(album.updatedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default RelistenAlbums;
