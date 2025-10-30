import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { templates } from "../components/templates";
import api from "../api/axios";

// Form components
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

  // ===== Fetch existing data =====
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/data/my");
        if (res.data?.data) {
          const d = res.data.data;
          setPersonalInfo(d.personalInfo || {});
          setEducation(Array.isArray(d.education) ? d.education : []);
          setExperience(Array.isArray(d.experience) ? d.experience : []);
          setProjects(Array.isArray(d.projects) ? d.projects : []);
          setSkills(Array.isArray(d.skills) ? d.skills : []);
          setCertifications(Array.isArray(d.certifications) ? d.certifications : []);
          setCustomSections(Array.isArray(d.customSections) ? d.customSections : []);
        }
      } catch (err) {
        console.log("No existing data found");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ====== Handlers with useCallback (to prevent re-renders) ======

  // Education
  const handleAddEducation = useCallback(() => {
    setEducation((prev) => [
      ...prev,
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

  const handleChangeEducation = useCallback((index, field, value) => {
    setEducation((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const handleRemoveEducation = useCallback((index) => {
    setEducation((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Experience
  const handleAddExperience = useCallback(() => {
    setExperience((prev) => [
      ...prev,
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  }, []);

  const handleChangeExperience = useCallback((index, field, value) => {
    setExperience((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const handleRemoveExperience = useCallback((index) => {
    setExperience((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Projects
  const handleAddProject = useCallback(() => {
    setProjects((prev) => [
      ...prev,
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

  const handleChangeProject = useCallback((index, field, value) => {
    setProjects((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const handleRemoveProject = useCallback((index) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Skills
  const handleAddSkill = useCallback(() => {
    setSkills((prev) => [...prev, ""]);
  }, []);

  const handleChangeSkill = useCallback((index, value) => {
    setSkills((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }, []);

  const handleRemoveSkill = useCallback((index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Certifications
  const handleAddCert = useCallback(() => {
    setCertifications((prev) => [
      ...prev,
      { title: "", organization: "", year: "", description: "" },
    ]);
  }, []);

  const handleChangeCert = useCallback((index, field, value) => {
    setCertifications((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const handleRemoveCert = useCallback((index) => {
    setCertifications((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Custom Sections
  const handleAddCustom = useCallback(() => {
    setCustomSections((prev) => [
      ...prev,
      { heading: "", fields: [{ label: "", value: "" }] },
    ]);
  }, []);

  const handleChangeCustom = useCallback((index, updatedSection) => {
    setCustomSections((prev) => {
      const updated = [...prev];
      updated[index] = updatedSection;
      return updated;
    });
  }, []);

  const handleRemoveCustom = useCallback((index) => {
    setCustomSections((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // ===== Save Handler =====
  const handleSave = async () => {
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
  };

  // ===== UI =====
  if (!selectedTemplate)
    return (
      <div className="p-8 text-red-600 text-center">
        Invalid template selected. Please go back to dashboard.
      </div>
    );

  if (loading) return <p className="text-center mt-10">Loading data...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Resume Editor — {selectedTemplate.name}
        </h1>

        {/* ===== Personal Info ===== */}
        <PersonalInfoForm
          personalInfo={personalInfo}
          onChange={(field, value) =>
            setPersonalInfo((prev) => ({ ...prev, [field]: value }))
          }
        />

        {/* ===== Education ===== */}
        <EducationForm
          education={education}
          onAdd={handleAddEducation}
          onChange={handleChangeEducation}
          onRemove={handleRemoveEducation}
        />

        {/* ===== Experience ===== */}
        <ExperienceForm
          experience={experience}
          onAdd={handleAddExperience}
          onChange={handleChangeExperience}
          onRemove={handleRemoveExperience}
        />

        {/* ===== Projects ===== */}
        <ProjectsForm
          projects={projects}
          onAdd={handleAddProject}
          onChange={handleChangeProject}
          onRemove={handleRemoveProject}
        />

        {/* ===== Skills ===== */}
        <SkillsForm
          skills={skills}
          onAdd={handleAddSkill}
          onChange={handleChangeSkill}
          onRemove={handleRemoveSkill}
        />

        {/* ===== Certifications ===== */}
        <CertificationsForm
          certifications={certifications}
          onAdd={handleAddCert}
          onChange={handleChangeCert}
          onRemove={handleRemoveCert}
        />

        {/* ===== Custom Sections ===== */}
        <CustomSectionForm
          customSections={customSections}
          onAdd={handleAddCustom}
          onChange={handleChangeCustom}
          onRemove={handleRemoveCustom}
        />

        {/* ===== Save Button ===== */}
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

export default Editor;
