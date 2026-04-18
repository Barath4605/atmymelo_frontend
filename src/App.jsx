import './App.css'
import HomePage from "./pages/HomePage.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from "./components/UserLogin/Register.jsx";
import Login from "./components/UserLogin/Login.jsx";
import AlbumSearch from "./pages/Album/AlbumSearch.jsx";
import { Toaster } from "react-hot-toast";
import ArtistSearch from "./pages/Artist/ArtistSearch.jsx";
import ArtistPage from "./pages/Artist/ArtistPage.jsx";
import AlbumPage from "./pages/Album/AlbumPage.jsx";
import Profile from "./pages/Profile/profile.jsx";
import DisplayAllReviews from "./pages/Album/DisplayAllReviews.jsx";
import FavoritePage from "./pages/FavoritePage.jsx";
import QueuePage from "./pages/QueuePage.jsx";
import GlobalPage from "./pages/GlobalPage.jsx";

function App() {
  return (
    <BrowserRouter>
        <Toaster position="top-left" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/albums" element={<AlbumSearch />} />
        <Route path="/albums/:id" element={<AlbumPage />} />
        <Route path="/albums/:mbid/all-reviews" element={<DisplayAllReviews />} />
        <Route path="/artists/:id" element={<ArtistPage />} />
        <Route path="/artists" element={<ArtistSearch />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/deck" element={<QueuePage />} />
        <Route path="/global" element={<GlobalPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
