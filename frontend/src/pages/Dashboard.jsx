import React from "react";
import { useNavigate } from "react-router-dom";
import { templates } from "../components/templates";
import TemplateCard from "../components/TemplateCard";
import "./Auth.css"; // for the "Resume Builder" animation

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSelect = (template) => {
    navigate(`/editor/${template.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10 space-y-10">
      {/* ✨ Animated Title */}
      <h1 className="text-4xl font-extrabold flex space-x-1 resume-title cursor-pointer text-white">
        {"Resume Builder".split("").map((char, i) => (
          <span key={i} className="title-letter inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* 🧱 Templates Section */}
      <div className="w-full max-w-3xl px-4 space-y-8">
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-6">
          Choose a Template
        </h2>

        {/* 🔽 Show templates vertically, one after another */}
        <div className="flex flex-col items-center gap-10">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
