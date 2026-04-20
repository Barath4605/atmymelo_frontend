import React, { useState } from "react";
import "../../index.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const nav = useNavigate();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setSuccess(false);

        if (!form.email || !form.password) {
            setMessage("Fill all Details");
            return;
        }

        try {
            setLoading(true);

            const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

            const res = await fetch(`${API_URL}/api/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Invalid credentials");
                setSuccess(false);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("name", data.name);

            setSuccess(true);
            setMessage("Login successful. Redirecting...");

            setTimeout(() => {
                window.location.href = "/";
            }, 1000);

        } catch {
            setMessage("Server not Reachable");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">

            <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-600 via-purple-700/80 to-indigo-500">

                <div className="absolute floatSlow w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px] top-[-100px] left-[-100px]" />

                <div className="absolute floatSlowReverse w-[500px] h-[500px] bg-blue-700 rounded-full blur-[120px] top-[100px] right-[-150px]" />

                <div
                    className="absolute floatSlow w-[400px] h-[400px] bg-violet-400 rounded-full blur-[150px] top-[50px] left-[200px]"
                    style={{ animationDuration: "18s" }}
                />
            </div>

            <div className="w-full p-3 max-w-md text-white space-y-6">

                <h1 className="text-5xl text-center cinzel-400">
                    Welcome Back
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="p-3 rounded bg-white/10 backdrop-blur-md outline-none border border-white/10 focus:border-white/40 transition-all"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="p-3 rounded bg-white/10 backdrop-blur-md outline-none border border-white/10 focus:border-white/40 transition-all"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-white w-[80%] mx-auto text-gray-900 py-2 rounded-full
                        font-bold text-[13px] hover:scale-105 ease-in-out duration-500
                        transition-all cursor-pointer poppins-semibold tracking-widest disabled:opacity-50"
                    >
                        {loading ? "LOGGING IN..." : "LOGIN"}
                    </button>

                </form>

                {message && (
                    <div className={`p-3 border-l-4 mx-auto w-fit text-sm transition-all duration-300 ${
                        success
                            ? "bg-green-500/30 border-green-500 text-green-100"
                            : "bg-red-500/30 border-red-500 text-red-100"
                    }`}>
                        <p className="poppins-light">{message}</p>
                    </div>
                )}

                <p className="text-center montserrat-300 text-sm">
                    New User?
                    <button
                        onClick={() => nav("/register")}
                        className="pb-px border-b cursor-pointer ml-2">
                        REGISTER
                    </button>
                </p>

            </div>
        </div>
    );
};

export default Login;