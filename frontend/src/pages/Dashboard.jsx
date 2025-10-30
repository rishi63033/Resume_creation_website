import React from "react";
import { useNavigate } from "react-router-dom";
import { templates } from "../components/templates";
import TemplateCard from "../components/TemplateCard";


const Dashboard = () => {
  const navigate = useNavigate();

  const handleSelect = (template) => {
    navigate(`/editor/${template.id}`);
  };

  return (
    <>
      
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Resume Templates</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
