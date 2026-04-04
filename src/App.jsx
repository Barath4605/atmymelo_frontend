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

function App() {
  return (
    <BrowserRouter>
        <Toaster position="top-left" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/albums" element={<AlbumSearch />} />
        <Route path="/albums/:id" element={<AlbumPage />} />
        <Route path="/artists/:id" element={<ArtistPage />} />
        <Route path="/artists" element={<ArtistSearch />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
