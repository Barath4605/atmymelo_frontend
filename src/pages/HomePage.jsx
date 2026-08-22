import React from "react";
import Header from "../components/HomePage/Header.jsx";
import HomeLinks from "../components/HomePage/Links.jsx";
import SignUpBtn from "../components/HomePage/UserSingupBtn.jsx";

const HomePage = () => {
  return (
    <main className="min-h-screen w-full bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col min-h-screen m-auto items-center justify-center">
        <Header />
        <HomeLinks></HomeLinks>
        <SignUpBtn></SignUpBtn>
      </div>
    </main>
  );
};

export default HomePage;
