import React from "react";

const CertificationsForm = ({ certifications = [], onAdd, onChange, onRemove }) => {
  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Certifications / Achievements</h2>
        <button
          type="button"
          onClick={onAdd}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Certification
        </button>
      </div>

      {certifications.length === 0 && (
        <p className="text-gray-500 text-sm mb-2">No certifications yet.</p>
      )}

      {certifications.map((cert, index) => (
        <div key={index} className="border p-3 mb-2 rounded-lg bg-gray-50">
          <input
            type="text"
            placeholder="Title"
            value={cert.title || ""}
            onChange={(e) => onChange(index, "title", e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Organization"
            value={cert.organization || ""}
            onChange={(e) => onChange(index, "organization", e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Year"
            value={cert.year || ""}
            onChange={(e) => onChange(index, "year", e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <textarea
            placeholder="Description"
            value={cert.description || ""}
            onChange={(e) => onChange(index, "description", e.target.value)}
            className="border p-2 rounded w-full"
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

export default React.memo(CertificationsForm);
