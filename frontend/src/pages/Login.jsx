import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./Auth.css"; // ✅ same CSS animation file as Signup

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
   <div className="flex flex-col justify-center items-center min-h-screen bg-gray-950 space-y-6">
  <h1 className="text-4xl font-extrabold flex space-x-1 resume-title cursor-pointer text-white">
    {"Resume Builder".split("").map((char, i) => (
      <span key={i} className="title-letter inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </h1>

  <div className="relative p-[2px] rounded-xl overflow-hidden w-80">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-borderMove"></div>
  
        <form
          onSubmit={handleSubmit}
          className="relative bg-gray-900 text-white p-8 rounded-xl space-y-4 z-10"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-600/20 p-2.5 w-full rounded-md outline-none transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-600/20 p-2.5 w-full rounded-md outline-none transition"
          />

          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white font-semibold w-full py-2.5 rounded-md transition">
            Login
          </button>

          {error && <p className="text-center text-red-400 text-sm">{error}</p>}

          <p className="text-sm text-center text-gray-400">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-400 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
