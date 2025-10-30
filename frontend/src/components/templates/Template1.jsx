import React from "react";
import sampleData from "../../data/sampleData";

const Template1 = ({ data, demoMode = false }) => {
  const safeData = data && typeof data === "object" ? data : {};
  const finalData = demoMode ? sampleData : safeData;

  const {
    personalInfo = {},
    education = [],
    experience = [],
    projects = [],
    skills = [],
    certifications = [],
    customSections = [],
  } = finalData;

  return (
    <div className="p-6 bg-white shadow rounded-lg w-full max-w-3xl mx-auto text-gray-800">
      {/* ===== Header ===== */}
      <header className="mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-bold">{personalInfo.fullName}</h1>
        <p className="text-gray-600">
          {personalInfo.email} | {personalInfo.phone}
        </p>
      </header>

      {/* ===== Education ===== */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">
                {edu.degree || edu.level} — {edu.institute || edu.institution}
              </p>
              <p className="text-sm text-gray-600">
                {edu.startYear || ""} - {edu.endYear || edu.year || ""}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* ===== Experience ===== */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">
                {exp.title} — {exp.company}
              </p>
              <p className="text-sm text-gray-600">
                {exp.startDate || ""} - {exp.endDate || exp.years || ""}
              </p>
              <p className="text-gray-700 text-sm">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* ===== Projects ===== */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Projects
          </h2>
          {projects.map((proj, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">{proj.title}</p>
              {proj.timeline && (
                <p className="text-sm text-gray-600">{proj.timeline}</p>
              )}
              <p className="text-gray-700 text-sm">{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* ===== Skills ===== */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Skills
          </h2>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <li
                key={i}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ===== Certifications ===== */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
            Certifications
          </h2>
          {certifications.map((cert, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">{cert.title}</p>
              <p className="text-sm text-gray-600">
                {cert.organization} — {cert.year}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* ===== Custom Sections ===== */}
      {customSections.length > 0 && (
        <section>
          {customSections.map((sec, i) => (
            <div key={i} className="mb-4">
              <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">
                {sec.heading}
              </h2>
              {sec.fields.map((field, j) => (
                <p key={j}>
                  <strong>{field.label}:</strong> {field.value}
                </p>
              ))}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Template1;
