import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { templates } from "../components/templates";
import api from "../api/axios";

// Form components (memoized)
import PersonalInfoForm from "../components/forms/PersonalInfoForm";
import EducationForm from "../components/forms/EducationForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import SkillsForm from "../components/forms/SkillsForm";
import CertificationsForm from "../components/forms/CertificationsForm";
import CustomSectionForm from "../components/forms/CustomSectionsForm";

const Editor = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const selectedTemplate = templates.find((t) => t.id === templateId);

  // ===== State =====
  const [personalInfo, setPersonalInfo] = useState({});
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [customSections, setCustomSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== Fetch existing data once =====
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/data/my");
        if (res.data?.data) {
          const d = res.data.data;
          setPersonalInfo(d.personalInfo || {});
          setEducation(d.education || []);
          setExperience(d.experience || []);
          setProjects(d.projects || []);
          setSkills(d.skills || []);
          setCertifications(d.certifications || []);
          setCustomSections(d.customSections || []);
        }
      } catch {
        console.log("No existing data found");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ===== Handlers (memoized with useCallback so they don't trigger re-renders) =====
  const handleChangePersonal = useCallback((field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleAddEducation = useCallback(() => {
    setEducation((p) => [
      ...p,
      {
        level: "",
        institution: "",
        boardOrUniversity: "",
        specialization: "",
        startYear: "",
        endYear: "",
        grade: "",
      },
    ]);
  }, []);

  const handleChangeEducation = useCallback((i, f, v) => {
    setEducation((p) => {
      const u = [...p];
      u[i][f] = v;
      return u;
    });
  }, []);

  const handleRemoveEducation = useCallback((i) => {
    setEducation((p) => p.filter((_, x) => x !== i));
  }, []);

  const handleAddExperience = useCallback(() => {
    setExperience((p) => [
      ...p,
      { title: "", company: "", location: "", startDate: "", endDate: "", description: "" },
    ]);
  }, []);

  const handleChangeExperience = useCallback((i, f, v) => {
    setExperience((p) => {
      const u = [...p];
      u[i][f] = v;
      return u;
    });
  }, []);

  const handleRemoveExperience = useCallback((i) => {
    setExperience((p) => p.filter((_, x) => x !== i));
  }, []);

  const handleAddProject = useCallback(() => {
    setProjects((p) => [
      ...p,
      {
        title: "",
        timeline: "",
        description: "",
        technologies: [],
        githubFrontend: "",
        githubBackend: "",
        liveLink: "",
      },
    ]);
  }, []);

  const handleChangeProject = useCallback((i, f, v) => {
    setProjects((p) => {
      const u = [...p];
      u[i][f] = v;
      return u;
    });
  }, []);

  const handleRemoveProject = useCallback((i) => {
    setProjects((p) => p.filter((_, x) => x !== i));
  }, []);

  const handleAddSkill = useCallback(() => setSkills((p) => [...p, ""]), []);
  const handleChangeSkill = useCallback((i, v) => {
    setSkills((p) => {
      const u = [...p];
      u[i] = v;
      return u;
    });
  }, []);
  const handleRemoveSkill = useCallback((i) => {
    setSkills((p) => p.filter((_, x) => x !== i));
  }, []);

  const handleAddCert = useCallback(() => {
    setCertifications((p) => [...p, { title: "", organization: "", year: "", description: "" }]);
  }, []);

  const handleChangeCert = useCallback((i, f, v) => {
    setCertifications((p) => {
      const u = [...p];
      u[i][f] = v;
      return u;
    });
  }, []);

  const handleRemoveCert = useCallback((i) => {
    setCertifications((p) => p.filter((_, x) => x !== i));
  }, []);

  const handleAddCustomSection = useCallback(() => {
    setCustomSections((p) => [...p, { heading: "", fields: [{ label: "", value: "" }] }]);
  }, []);

  const handleChangeCustomSection = useCallback((sIndex, fieldType, value, fIndex = null) => {
    setCustomSections((p) => {
      const u = [...p];
      if (fieldType === "heading") u[sIndex].heading = value;
      else if (fieldType === "label") u[sIndex].fields[fIndex].label = value;
      else if (fieldType === "value") u[sIndex].fields[fIndex].value = value;
      return u;
    });
  }, []);

  const handleAddCustomField = useCallback((sIndex) => {
    setCustomSections((p) => {
      const u = [...p];
      u[sIndex].fields.push({ label: "", value: "" });
      return u;
    });
  }, []);

  const handleRemoveCustomSection = useCallback((sIndex) => {
    setCustomSections((p) => p.filter((_, i) => i !== sIndex));
  }, []);

  const handleRemoveCustomField = useCallback((sIndex, fIndex) => {
    setCustomSections((p) => {
      const u = [...p];
      u[sIndex].fields = u[sIndex].fields.filter((_, i) => i !== fIndex);
      return u;
    });
  }, []);

  // ===== Save =====
  const handleSave = useCallback(async () => {
    const payload = {
      personalInfo,
      education,
      experience,
      projects,
      skills,
      certifications,
      customSections,
    };
    try {
      const res = await api.post("/data/save", payload);
      alert(res.data.message || "Data saved successfully!");
      navigate(`/preview/${templateId}`);
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  }, [personalInfo, education, experience, projects, skills, certifications, customSections, navigate, templateId]);

  if (!selectedTemplate)
    return <div className="p-8 text-red-600 text-center">Invalid template selected.</div>;

  if (loading) return <p className="text-center mt-10">Loading data...</p>;

  // ===== UI =====
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-6 p-6">
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-[90vh]">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Resume Editor — {selectedTemplate.name}
        </h1>

        <PersonalInfoForm personalInfo={personalInfo} onChange={handleChangePersonal} />

        <EducationForm education={education} onAdd={handleAddEducation} onChange={handleChangeEducation} onRemove={handleRemoveEducation} />

        <ExperienceForm experience={experience} onAdd={handleAddExperience} onChange={handleChangeExperience} onRemove={handleRemoveExperience} />

        <ProjectsForm projects={projects} onAdd={handleAddProject} onChange={handleChangeProject} onRemove={handleRemoveProject} />

        <SkillsForm skills={skills} onAdd={handleAddSkill} onChange={handleChangeSkill} onRemove={handleRemoveSkill} />

        <CertificationsForm certifications={certifications} onAdd={handleAddCert} onChange={handleChangeCert} onRemove={handleRemoveCert} />

        <CustomSectionForm
          customSections={customSections}
          onAddSection={handleAddCustomSection}
          onChangeField={handleChangeCustomSection}
          onAddField={handleAddCustomField}
          onRemoveSection={handleRemoveCustomSection}
          onRemoveField={handleRemoveCustomField}
        />

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save & Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Editor);
