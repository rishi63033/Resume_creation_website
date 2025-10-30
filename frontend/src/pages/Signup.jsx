import { useState } from "react";
import api from "../api/axios";

const Signup = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg w-80 space-y-3"
      >
        <h2 className="text-xl font-bold text-center">Sign Up</h2>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Sign Up
        </button>
        <p className="text-center text-sm text-gray-500">{message}</p>
        <p className="text-sm text-center mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>

      </form>
    </div>
  );
};

export default Signup;
