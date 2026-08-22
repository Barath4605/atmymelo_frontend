import React, { useEffect } from "react";
import album from "../../assets/HomePageWalkthrough/album-page.png";
import artist from "../../assets/HomePageWalkthrough/artist-page.png";
import track from "../../assets/HomePageWalkthrough/tracklist.png";
import fav from "../../assets/HomePageWalkthrough/fav.png";
import deck from "../../assets/HomePageWalkthrough/deck.png";
import "../../App.css";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const images = [
  {
    image: album,
    caption: "Listen to your favorite albums, rate, log and discover!",
    label: "Albums",
  },
  {
    image: artist,
    caption: "Discover new artists and follow their music.",
    label: "Artists",
  },
  {
    image: track,
    caption: "Discover tracks and rate them from your favorite albums",
    label: "Tracks",
  },
];

const links = [
  {
    logo: FaGithub,
    name: "GitHub",
    link: "https://github.com/barath4605/",
  },
  {
    logo: FaLinkedin,
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/barath4605/",
  },
  {
    logo: FaInstagram,
    name: "Instagram",
    link: "https://www.instagram.com/itsbarathbtw/",
  },
];
const SLIDE_DURATION = 5000;

const Walkthrough = () => {
  const [imageIndex, setImageIndex] = React.useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [imageIndex]);

  const image = images[imageIndex];
  const others = images
    .map((img, i) => ({ ...img, i }))
    .filter((img) => img.i !== imageIndex);

  return (
    <main>
      <style>{`
        .melo-fade {
          animation: 1400ms ease-in-out both;
        }
      `}</style>

      <h1 className="text-white/75 poppins-semibold lg:text-5xl text-3xl mt-20 m-2 text-start mb-6">
        Get Started with At My Melo
      </h1>

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-[auto_auto] lg:grid-rows-2 gap-4 m-5">
        {/* MAIN HERO TILE */}
        <div className="relative lg:col-span-2 lg:row-span-2 rounded-4xl overflow-hidden border border-white/10 bg-white/2">
          <img
            key={imageIndex}
            className="melo-fade w-full h-full object-"
            src={image.image}
            alt={image.caption}
          />

          <div className="absolute bottom-0 left-0 w-full px-6 py-5 bg-linear-to-t from-black/85 via-black/40 to-transparent">
            <p
              key={`caption-${imageIndex}`}
              className="melo-fade text-white/90 poppins-semibold text-lg"
            >
              {image.caption}
            </p>
          </div>
        </div>

        {/* SIDE TILES - OTHER SLIDES */}
        {others.map((img) => (
          <button
            key={img.i}
            onClick={() => setImageIndex(img.i)}
            className="melo-fade group relative rounded-4xl overflow-hidden border border-white/10
                       bg-white/[0.02] cursor-pointer text-left"
          >
            <img
              src={img.image}
              alt={img.caption}
              className="w-full h-full object-cover opacity-60
                         transition-opacity duration-700 ease-out
                         group-hover:opacity-90"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full px-5 py-4">
              <span className="text-white/50 text-xs tracking-[0.2em] uppercase montserrat-300">
                {img.label}
              </span>
              <p className="text-white/85 poppins-semibold text-sm mt-1 line-clamp-2">
                {img.caption}
              </p>
            </div>
          </button>
        ))}
      </div>

      <section className="flex flex-col lg:flex-row gap-10 lg:gap-6 text-white mt-20 p-1">
        {/* FAVORITES */}
        <div className="flex-1 flex flex-col gap-5">
          <h1 className="poppins-semibold text-xl lg:text-4xl text-start leading-tight">
            Add your favorites and revisit it whenever you want
          </h1>

          <div
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-2
                     transition-transform duration-500 ease-out
                     hover:-translate-y-1"
          >
            <img
              className="rounded-xl w-full aspect-video object-cover"
              src={fav}
              alt="Favorites screen showing saved albums and tracks"
            />
          </div>
        </div>

        {/* QUEUE / ON DECK */}
        <div className="flex-1 flex flex-col gap-5 lg:mt-24">
          <h1 className="poppins-semibold text-xl lg:text-4xl text-end leading-tight">
            Add the music you want to listen to in the future to the Queue
          </h1>

          <div
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-2
                     transition-transform duration-500 ease-out
                     hover:-translate-y-1"
          >
            <img
              className="rounded-xl w-full aspect-video object-cover"
              src={deck}
              alt="On Deck screen showing queued tracks"
            />
          </div>
        </div>
      </section>

      <section className="lg:p-10 p-2 border lg:m-10 m-2 mt-20 border-white/10">
        <h1
          className={`space-grotesk-300 text-2xl text-start text-white p-2 my-2`}
        >
          About Me
        </h1>

        <h1 className="text-white/90 space-grotesk-300 p-2 text-start lg:w-[85%]">
          Hello, I’m Barath P, the developer of AtMyMelo. I started AtMyMelo as
          a small side project, mostly just as something fun to work on, but
          over time it turned into one of my proudest and most personal
          projects. It gave me a way to combine my love for music with my
          interest in building things.
        </h1>

        <h1 className="poppins-light tracking-widest text-white/70 p-2 text-start">
          Keep in touch
        </h1>

        <div className="flex gap-6 p-2 mt-2">
          {links.map((item) => {
            const Logo = item.logo;

            return (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="text-white/50 hover:text-white transition-all duration-300"
              >
                <Logo size={28} />
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Walkthrough;
