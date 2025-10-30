import React from "react";

const PersonalInfoForm = ({ personalInfo = {}, onChange }) => {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Personal Information</h2>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Full Name"
          value={personalInfo.fullName || ""}
          onChange={(e) => onChange("fullName", e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={personalInfo.email || ""}
          onChange={(e) => onChange("email", e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Phone"
          value={personalInfo.phone || ""}
          onChange={(e) => onChange("phone", e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={personalInfo.address || ""}
          onChange={(e) => onChange("address", e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <textarea
        placeholder="Career Objective"
        value={personalInfo.careerObjective || ""}
        onChange={(e) => onChange("careerObjective", e.target.value)}
        className="border p-2 rounded w-full mt-3"
      />
    </section>
  );
};

export default React.memo(PersonalInfoForm);
