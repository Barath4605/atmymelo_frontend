import React, { useState } from "react";
import "../../index.css";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const nav = useNavigate();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.username || !form.email || !form.password) {
            setMessage("Fill all Details");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

            const res = await fetch(`${API_URL}/api/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Registration failed");
                return;
            }

            localStorage.setItem("token", JSON.stringify(data.token));
            localStorage.setItem("username", JSON.stringify(data.username));
            localStorage.setItem("name", JSON.stringify(data.name));

            setMessage("Account created. Please login.");
            window.location.href = "/login";
            setForm({
                username: "",
                name: "",
                email: "",
                password: "",
            });

        } catch {
            setMessage("server not reachable");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">

            {/* BACKGROUND */}
            <div className="absolute inset-0 -z-10 bg-red-400">

                <div className="absolute floatSlow w-[500px] h-[500px] bg-pink-500 rounded-full blur-[120px] top-[-100px] left-[-100px]" />

                <div className="absolute floatSlowReverse w-[500px] h-[500px] bg-linear-to-br from-purple-700 via-white to-purple-900 rounded-full blur-[120px] top-[100px] right-[-150px]" />

                <div
                    className="absolute floatSlow w-[400px] h-[400px] bg-linear-to-br from-orange-500 via-orange-500 to-orange-400 rounded-full blur-[150px] top-[50px] left-[200px]"
                    style={{ animationDuration: "18s" }}
                />
            </div>

            {/* CONTENT */}
            <div className="w-full p-3 max-w-md text-white space-y-6">

                <h1 className="text-4xl text-center cinzel-400">
                    Welcome to <br />
                    <span className="text-6xl">AtMyMelo</span>
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={handleChange}
                        className="p-3 rounded bg-white/10 pb-2 border border-white/20 border-t-2 border-t-white/30 backdrop-blur-[20px] outline-none"
                    />

                    <div className="border-b border-gray-200/50 pb-2">

                    </div>

                    <input
                        type="text"
                        name="username"
                        placeholder="Enter a unique username"
                        value={form.username}
                        onChange={handleChange}
                        className="p-3 rounded bg-white/10 pb-2 border border-white/20 border-t-2 border-t-white/30 backdrop-blur-[20px] outline-none"
                    />



                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="p-3 rounded bg-white/10 pb-2 border border-white/20 border-t-2 border-t-white/30 backdrop-blur-[20px] outline-none"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="p-3 rounded bg-white/10 pb-2 border border-white/20 border-t-2 border-t-white/30 backdrop-blur-[20px] outline-none"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-white w-[80%] mx-auto text-black py-2 rounded-full
                        font-medium text-[13px] hover:w-[83%] ease-in-out duration-500
                        transition-all cursor-pointer poppins-semibold tracking-widest disabled:opacity-50"
                    >
                        {loading ? "CREATING..." : "CREATE ACCOUNT"}
                    </button>

                </form>

                {/* MESSAGE */}
                {message && (
                    <p className="text-center text-sm opacity-80">
                        {message}
                    </p>
                )}

                <p className="text-center montserrat-300 text-sm">
                    Existing User?
                    <button
                        onClick={() => nav("/login")}
                        className="pb-px border-b cursor-pointer ml-2">
                        LOGIN
                    </button>
                </p>

            </div>
        </div>
    );
};

export default Register;