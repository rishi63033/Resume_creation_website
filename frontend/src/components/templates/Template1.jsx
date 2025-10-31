import React from "react";
import sampleData from "../../data/sampleData";

const Template1 = ({ data = {}, demoMode = false }) => {
  const finalData =
    demoMode && (!data || Object.keys(data).length === 0)
      ? sampleData
      : data;

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
    <div
      className="
        bg-white shadow-md mx-auto
        w-[210mm] min-h-[297mm]  /* A4 paper */
        p-10 text-gray-800 flex flex-col
        border border-gray-300
        origin-top scale-[0.9]
      "
      style={{ boxSizing: "border-box" }}
    >
      {/* ===== HEADER ===== */}
      <header className="mb-6 border-b-2 border-gray-300 pb-3 text-center">
        <h1 className="text-3xl font-bold tracking-wide">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-gray-600 mt-1">
          {personalInfo.email && <>{personalInfo.email} </>}
          {personalInfo.phone && <>| {personalInfo.phone} </>}
          {personalInfo.address && <>| {personalInfo.address}</>}
        </p>

        {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio) && (
          <p className="text-gray-500 text-sm mt-1">
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            )}
            {personalInfo.github && (
              <>
                {" "} |{" "}
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  GitHub
                </a>
              </>
            )}
            {personalInfo.portfolio && (
              <>
                {" "} |{" "}
                <a
                  href={personalInfo.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  Portfolio
                </a>
              </>
            )}
          </p>
        )}
      </header>

      {/* ===== CAREER OBJECTIVE ===== */}
      {personalInfo.careerObjective && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-3 tracking-wider">
            Career Objective
          </h2>

          {/* Preserve user spaces and line breaks */}
          <p
            className="text-gray-700 text-sm leading-relaxed"
            style={{
              whiteSpace: "pre-wrap", // ✅ keeps all spaces, tabs, and newlines
              wordBreak: "break-word", // prevents overflow issues
            }}
          >
            {personalInfo.careerObjective}
          </p>
        </section>
      )}

      {/* ===== EDUCATION ===== */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-3 tracking-wider">
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-3">
              <p className="font-medium text-gray-900">
                {(edu.degree || edu.level) && `${edu.degree || edu.level}`}
                {edu.institute && ` — ${edu.institute}`}
              </p>
              {(edu.startYear || edu.endYear) && (
                <p className="text-sm text-gray-600">
                  {edu.startYear} - {edu.endYear}
                </p>
              )}
              {(edu.grade || edu.cgpa) && (
                <p className="text-sm text-gray-700">
                  <strong>CGPA / Grade:</strong> {edu.grade || edu.cgpa}
                </p>
              )}
              {edu.location && (
                <p className="text-sm text-gray-600">{edu.location}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ===== EXPERIENCE ===== */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-3 tracking-wider">
            Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <p className="font-medium">
                {exp.title} {exp.company && `— ${exp.company}`}
              </p>
              {(exp.startDate || exp.endDate) && (
                <p className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </p>
              )}
              {exp.location && (
                <p className="text-sm text-gray-600">{exp.location}</p>
              )}
              {exp.description && (
                <p
                  className="text-gray-700 text-sm mt-1"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ===== PROJECTS ===== */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-3 tracking-wider">
            Projects
          </h2>
          {projects.map((proj, i) => (
            <div key={i} className="mb-3">
              <p className="font-medium">{proj.title}</p>
              {proj.timeline && (
                <p className="text-sm text-gray-600">{proj.timeline}</p>
              )}
              {proj.techStack && (
                <p className="text-sm text-gray-700">
                  <strong>Tech Stack:</strong> {proj.techStack}
                </p>
              )}
              {proj.description && (
                <p
                  className="text-gray-700 text-sm"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {proj.description}
                </p>
              )}
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ===== SKILLS ===== */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-3 tracking-wider">
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

      {/* ===== CERTIFICATIONS ===== */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-3 tracking-wider">
            Certifications
          </h2>
          {certifications.map((cert, i) => (
            <div key={i} className="mb-3">
              <p className="font-medium">{cert.title}</p>
              {cert.organization && (
                <p className="text-sm text-gray-600">{cert.organization}</p>
              )}
              {cert.year && (
                <p className="text-sm text-gray-600">Year: {cert.year}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ===== CUSTOM SECTIONS ===== */}
      {customSections.length > 0 && (
        <section>
          {customSections.map((sec, i) => (
            <div key={i} className="mb-6">
              <h2 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-3 tracking-wider">
                {sec.heading}
              </h2>
              {sec.fields.map(
                (field, j) =>
                  field.value && (
                    <p
                      key={j}
                      className="text-sm"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      <strong>{field.label}:</strong> {field.value}
                    </p>
                  )
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Template1;
