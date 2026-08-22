import React from "react";
import Header from "../components/HomePage/Header.jsx";
import HomepageNavbar from "../components/HomePage/HomepageNavbar.jsx";

const HomePage = () => {
  return (
    <main className="w-full">
      <HomepageNavbar />
      <Header />
    </main>
  );
};

export default HomePage;
