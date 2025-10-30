import React from "react";

const TemplateCard = ({ template, onSelect }) => {
  // ✅ Destructure safely
  const { name, component: TemplateComponent } = template || {};

  if (!TemplateComponent) {
    return (
      <div className="border rounded-xl p-4 shadow bg-white text-center">
        <p className="text-gray-500">Invalid template data</p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl p-4 shadow-md bg-white flex flex-col items-center hover:shadow-lg transition">
      {/* Template Name */}
      <h2 className="text-lg font-semibold mb-2">{name || "Unnamed Template"}</h2>

      {/* ✅ Safe Preview (with demoMode fallback) */}
      <div className="w-full h-64 overflow-hidden border rounded-md mb-4 bg-gray-50 flex items-center justify-center">
        <TemplateComponent demoMode data={{}} />
      </div>

      <button
        onClick={() => onSelect(template)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Use This Template
      </button>
    </div>
  );
};

export default TemplateCard;
