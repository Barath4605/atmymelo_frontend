import React, {useState} from 'react';
import FavoriteBg from "../components/Favorites/FavoriteBg.jsx";
import Tabs from "../components/Tabs.jsx";

const name = localStorage.getItem("name");

const genres = [
    {
        name: "Hip-Hop"
    } ,
    {
        name: "R&B"
    } ,
    {
        name: "Pop"
    } ,
    {
        name: "Rock"
    } ,
    {
        name: "Dream Pop"
    }
]


const FavoritesPage = () => {
    const [activeTab, setActiveTab] = useState("")
  return (
      <main className="relative min-h-screen overflow-hidden montserrat-300">
          <FavoriteBg />

          <header className="lg:p-5 p-2 lg:mx-10 text-white text-5xl lg:text-6xl border-b border-neutral-50/60 poppins-semibold tracking-tight">
              <h1>{name}'s <br/><span className="lg:text-7xl text-6xl tracking-tighter"> FAVORITES</span></h1>
          </header>

          <div className="p-5 flex flex-wrap gap-2 lg:mx-4">
              {genres.map((genre) => (
                  <Tabs name={genre.name}
                        isActive={activeTab === genre.name}
                        onClick={() => setActiveTab(genre.name)}
                  />

              ))}
          </div>

      </main>
  );
};

export default FavoritesPage;
