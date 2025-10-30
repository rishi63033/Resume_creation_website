import React from "react";

const ExperienceForm = ({ experience = [], onAdd, onChange, onRemove }) => {
  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Work Experience</h2>
        <button
          type="button"
          onClick={onAdd}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Experience
        </button>
      </div>

      {experience.length === 0 && (
        <p className="text-gray-500 text-sm mb-2">No experience added yet.</p>
      )}

      {experience.map((exp, index) => (
        <div key={index} className="border p-3 mb-2 rounded-lg bg-gray-50">
          <input
            type="text"
            placeholder="Title (e.g., Software Engineer)"
            value={exp.title || ""}
            onChange={(e) => onChange(index, "title", e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Company"
            value={exp.company || ""}
            onChange={(e) => onChange(index, "company", e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Location"
            value={exp.location || ""}
            onChange={(e) => onChange(index, "location", e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Start Date"
              value={exp.startDate || ""}
              onChange={(e) => onChange(index, "startDate", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="End Date"
              value={exp.endDate || ""}
              onChange={(e) => onChange(index, "endDate", e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <textarea
            placeholder="Description / Responsibilities"
            value={exp.description || ""}
            onChange={(e) => onChange(index, "description", e.target.value)}
            className="border p-2 rounded w-full mt-2"
          />
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

export default React.memo(ExperienceForm);
