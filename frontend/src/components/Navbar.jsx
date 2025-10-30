import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth(); // from context

  // Hide navbar on login/signup
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);
  if (hideNavbar) return null;

  const handleLogout = () => {
    logout(); // clears token from context + localStorage
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center sticky top-0 z-50">
      <div
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold text-blue-600 cursor-pointer"
      >
        ResumeBuilder
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="text-red-600 hover:text-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
