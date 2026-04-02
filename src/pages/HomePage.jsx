import React from 'react';
import Header from "../components/HomePage/Header.jsx";
import bg from "../assets/homepage.png";
import HomeLinks from "../components/HomePage/Links.jsx";
import SignUpBtn from "../components/HomePage/UserSingupBtn.jsx";

const HomePage = () => {
    return (
        <main
            style={{backgroundImage: `url(${bg})`,}}
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat">

            <Header />
            <HomeLinks></HomeLinks>
            <SignUpBtn></SignUpBtn>
        </main>
    );
};

export default HomePage;