import './App.css'
import HomePage from "./pages/HomePage.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from "./components/UserLogin/Register.jsx";
import Login from "./components/UserLogin/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
