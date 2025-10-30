import React from "react";

const SkillsForm = ({ skills = [], onAdd, onChange, onRemove }) => {
  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Skills</h2>
        <button
          type="button"
          onClick={onAdd}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Skill
        </button>
      </div>

      {skills.length === 0 && (
        <p className="text-gray-500 text-sm mb-2">No skills added yet.</p>
      )}

      {skills.map((skill, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Skill name"
            value={skill || ""}
            onChange={(e) => onChange(index, e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-600 text-sm hover:text-red-800"
          >
            ✕
          </button>
        </div>
      ))}
    </section>
  );
};

export default React.memo(SkillsForm);
