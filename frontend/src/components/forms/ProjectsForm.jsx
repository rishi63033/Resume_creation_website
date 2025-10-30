import React from "react";

const ProjectsForm = ({ projects = [], onAdd, onChange, onRemove }) => {
  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Projects</h2>
        <button
          type="button"
          onClick={onAdd}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <p className="text-gray-500 text-sm mb-2">No projects added yet.</p>
      )}

      {projects.map((proj, index) => (
        <div key={index} className="border p-3 mb-2 rounded-lg bg-gray-50">
          <input
            type="text"
            placeholder="Project Title"
            value={proj.title || ""}
            onChange={(e) => onChange(index, "title", e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Timeline"
            value={proj.timeline || ""}
            onChange={(e) => onChange(index, "timeline", e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <textarea
            placeholder="Description"
            value={proj.description || ""}
            onChange={(e) => onChange(index, "description", e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Technologies (comma-separated)"
            value={proj.technologies?.join(", ") || ""}
            onChange={(e) =>
              onChange(index, "technologies", e.target.value.split(",").map(t => t.trim()))
            }
            className="border p-2 rounded w-full mb-2"
          />
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Frontend Repo URL"
              value={proj.githubFrontend || ""}
              onChange={(e) => onChange(index, "githubFrontend", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Backend Repo URL"
              value={proj.githubBackend || ""}
              onChange={(e) => onChange(index, "githubBackend", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Live Link"
              value={proj.liveLink || ""}
              onChange={(e) => onChange(index, "liveLink", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-600 text-sm hover:text-red-800"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default React.memo(ProjectsForm);
