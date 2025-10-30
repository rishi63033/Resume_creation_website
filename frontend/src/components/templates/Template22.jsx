import React from "react";

const Template1 = ({ data }) => {
  const { personalInfo, education, experience, projects, skills, certifications, customSections } = data;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">{personalInfo?.name}</h2>
      <p className="text-gray-700 mb-4">{personalInfo?.email} | {personalInfo?.phone}</p>

      {/* Education */}
      {education?.length > 0 && (
        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Education</h3>
          {education.map((edu, i) => (
            <div key={i} className="border-l-4 border-blue-500 pl-3 mb-2">
              <p className="font-semibold">{edu.level} — {edu.institution}</p>
              <p className="text-sm text-gray-600">
                {edu.startYear} - {edu.endYear} | {edu.specialization}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Experience</h3>
          {experience.map((exp, i) => (
            <div key={i} className="border-l-4 border-green-500 pl-3 mb-2">
              <p className="font-semibold">{exp.title} — {exp.company}</p>
              <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Projects</h3>
          {projects.map((proj, i) => (
            <div key={i} className="border-l-4 border-purple-500 pl-3 mb-2">
              <p className="font-semibold">{proj.title}</p>
              <p className="text-sm text-gray-600">{proj.timeline}</p>
              <p className="text-gray-700">{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <li key={i} className="bg-gray-200 px-3 py-1 rounded">{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && (
        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Certifications</h3>
          {certifications.map((cert, i) => (
            <div key={i} className="border-l-4 border-yellow-500 pl-3 mb-2">
              <p className="font-semibold">{cert.title}</p>
              <p className="text-sm text-gray-600">{cert.organization} — {cert.year}</p>
            </div>
          ))}
        </section>
      )}

      {/* Custom Sections */}
      {customSections?.length > 0 && (
        <section>
          {customSections.map((sec, i) => (
            <div key={i} className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{sec.heading}</h3>
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
