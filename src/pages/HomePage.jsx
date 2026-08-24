import React from "react";
import Header from "../components/HomePage/Header.jsx";
import HomepageNavbar from "../components/HomePage/HomepageNavbar.jsx";
import TopGenreAlbums from "../components/HomePage/TopGenreAlbums.jsx";
import RelistenAlbums from "../components/HomePage/RelistenAlbums.jsx";
import Walkthrough from "../components/HomePage/WalkthroughImages.jsx";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const nav = useNavigate();

  // null = still loading
  // false = loaded but empty
  // true = has albums
  const [relistenHasData, setRelistenHasData] = React.useState(null);
  const [genreHasData, setGenreHasData] = React.useState(null);

  const allSectionsLoaded = relistenHasData !== null && genreHasData !== null;

  const hasAnyActivity = relistenHasData || genreHasData;

  const showWalkthrough = allSectionsLoaded && !hasAnyActivity;

  return (
    <main className="w-full">
      <HomepageNavbar />
      <Header />

      <div className="my-2">
        <RelistenAlbums onDataLoaded={setRelistenHasData} />

        <TopGenreAlbums onDataLoaded={setGenreHasData} />

        {showWalkthrough && (
          <>
            <section className="w-full p-5 border-[0.5px] border-white/40 max-w-md mx-auto mt-32 text-center">
              <p className="montserrat-300 text-xs tracking-[0.25em] uppercase text-white/35 mb-3">
                Get started
              </p>

              <h1 className="poppins-light text-xl lg:text-2xl text-white/85">
                Log and review to personalize your home
              </h1>

              <div className="mt-6 w-fit mx-auto p-4  flex items-center justify-center gap-3 montserrat-300 text-sm">
                <button
                  onClick={() => nav("/albums")}
                  className="py-1.5 cursor-pointer text-white/70 border-b-3 border-white/20 hover:border-white/50 hover:text-white/90 transition-all duration-500"
                >
                  Albums
                </button>

                <span className="text-white/20">·</span>

                <button
                  onClick={() => nav("/artists")}
                  className="py-1.5 cursor-pointer text-white/70 border-b-3 border-white/20 hover:border-white/50 hover:text-white/90 transition-all duration-500"
                >
                  Artists
                </button>
              </div>
            </section>

            <div className="lg:w-[75%] w-[90%] mx-auto mt-40">
              <Walkthrough />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;
