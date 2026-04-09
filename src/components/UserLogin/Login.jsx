import React, { useState } from "react";
import "../../index.css";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({
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

        if (!form.email || !form.password) {
            setMessage("Fill all Details");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            const res = await fetch("http://localhost:8080/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Login failed");
                return;
            }

            // TOKEN STORAGE
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("name", data.name);

            setMessage("Login successful");

            window.location.href = "/";

        } catch {
            setMessage("Server not Reachable");
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
                        className="p-3 rounded bg-white/10 backdrop-blur-md outline-none"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="p-3 rounded bg-white/10 backdrop-blur-md outline-none"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-white w-[80%] mx-auto text-gray-900 py-2 rounded-full
                        font-bold text-[13px] hover:w-[83%] ease-in-out duration-500
                        transition-all cursor-pointer poppins-semibold tracking-widest disabled:opacity-50"
                    >
                        {loading ? "LOGGING IN..." : "LOGIN"}
                    </button>

                </form>

                {message && (
                    <div className="justify-center space-x-2 text-sm">
                        <p className="text-center opacity-80">
                            {message}
                        </p>
                        <p className="text-center">
                            New User?
                            <button
                                onClick={() => nav("/register")}
                                className="pb-px border-b  ml-2">
                                REGISTER
                            </button>
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Login;