import React, { useState } from "react";
import "../../index.css";

const Register = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

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

            const res = await fetch("http://localhost:8080/api/user/register", {
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

            setMessage("Account created. Please login.");
            window.location.href = "/login";
            setForm({
                username: "",
                email: "",
                password: "",
            });

        } catch (err) {
            setMessage("server not reachable");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">

            {/* BACKGROUND */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-red-500 via-red-600/80 to-red-400">

                <div className="absolute floatSlow w-[500px] h-[500px] bg-pink-500 rounded-full blur-[120px] top-[-100px] left-[-100px]" />

                <div className="absolute floatSlowReverse w-[500px] h-[500px] bg-purple-700 rounded-full blur-[120px] top-[100px] right-[-150px]" />

                <div
                    className="absolute floatSlow w-[400px] h-[400px] bg-orange-300 rounded-full blur-[150px] top-[50px] left-[200px]"
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
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className="p-3 rounded bg-white/10 backdrop-blur-md outline-none"
                    />

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
                        className="bg-white w-[80%] mx-auto text-black py-2 rounded-full
                        font-medium text-[13px] hover:w-[83%] ease-in-out duration-500
                        transition-all cursor-pointer poppins-thin tracking-widest disabled:opacity-50"
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

            </div>
        </div>
    );
};

export default Register;