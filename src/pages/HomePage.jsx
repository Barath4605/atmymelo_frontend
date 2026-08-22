import React from "react";
import Header from "../components/HomePage/Header.jsx";
import HomepageNavbar from "../components/HomePage/HomepageNavbar.jsx";
import RelistenAlbums from "../components/HomePage/RelistenAlbums.jsx";
import FriendActivities from "../components/HomePage/FriendActivities.jsx";

const HomePage = () => {
  return (
    <main className="w-full">
      <HomepageNavbar />
      <Header />
      <FriendActivities />
      <RelistenAlbums />
    </main>
  );
};

export default HomePage;
