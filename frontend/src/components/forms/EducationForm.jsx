import React from "react";

const EducationForm = ({ education = [], onAdd, onChange, onRemove }) => {
  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Education</h2>
        <button
          type="button"
          onClick={onAdd}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Education
        </button>
      </div>

      {education.length === 0 && (
        <p className="text-gray-500 text-sm mb-2">No education added yet.</p>
      )}

      {education.map((edu, index) => (
        <div key={index} className="border p-3 mb-2 rounded-lg bg-gray-50">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Level (e.g., B.Tech)"
              value={edu.level || ""}
              onChange={(e) => onChange(index, "level", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution || ""}
              onChange={(e) => onChange(index, "institution", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Board / University"
              value={edu.boardOrUniversity || ""}
              onChange={(e) => onChange(index, "boardOrUniversity", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Specialization"
              value={edu.specialization || ""}
              onChange={(e) => onChange(index, "specialization", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Start Year"
              value={edu.startYear || ""}
              onChange={(e) => onChange(index, "startYear", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="End Year"
              value={edu.endYear || ""}
              onChange={(e) => onChange(index, "endYear", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Grade / CGPA"
              value={edu.grade || ""}
              onChange={(e) => onChange(index, "grade", e.target.value)}
              className="border p-2 rounded col-span-2"
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

export default React.memo(EducationForm);
