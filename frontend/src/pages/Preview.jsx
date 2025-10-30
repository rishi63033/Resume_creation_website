import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { templates } from "../components/templates/index";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Preview = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const resumeRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/data/my");
        setResumeData(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Error loading data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const removeUnsupportedColors = (element) => {
    const all = element.querySelectorAll("*");
    all.forEach((el) => {
      const style = window.getComputedStyle(el);
      const bg = style.backgroundColor;
      const color = style.color;
      const border = style.borderColor;

      if (bg?.includes("oklch")) el.style.backgroundColor = "#ffffff";
      if (color?.includes("oklch")) el.style.color = "#000000";
      if (border?.includes("oklch")) el.style.borderColor = "#000000";

      // Remove OKLCH from pseudo-elements too
      const before = window.getComputedStyle(el, "::before");
      const after = window.getComputedStyle(el, "::after");
      if (before.backgroundColor?.includes("oklch"))
        el.style.setProperty("--tw-before-bg", "#ffffff");
      if (after.backgroundColor?.includes("oklch"))
        el.style.setProperty("--tw-after-bg", "#ffffff");
    });
  };

  const handleDownload = async () => {
    const resume = resumeRef.current;
    if (!resume) {
      console.error("Resume element not found!");
      return;
    }

    // 🧼 Clean up any OKLCH colors before snapshot
    removeUnsupportedColors(resume);

    try {
      const canvas = await html2canvas(resume, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
          // extra safety: clean cloned tree too
          const clonedResume = clonedDoc.getElementById("resume-preview");
          if (clonedResume) removeUnsupportedColors(clonedResume);
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Download failed:", error);
      alert(
        "PDF generation failed because of unsupported colors. Try again — they’ve been cleaned now."
      );
    }
  };

  if (loading) return <p className="text-center mt-10">Loading preview...</p>;
  if (!resumeData) return <p className="text-center mt-10">No data found.</p>;

  const selectedTemplate = templates.find((t) => t.id === templateId);

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 overflow-visible">
        <h1 className="text-2xl font-bold text-center mb-6">
          Resume Preview — {selectedTemplate?.name || "Unknown Template"}
        </h1>

        <div
          id="resume-preview"
          ref={resumeRef}
          className="bg-white p-6 shadow-md rounded-lg"
        >
          {selectedTemplate ? (
            React.createElement(selectedTemplate.component, { data: resumeData })
          ) : (
            <p className="text-center text-red-500">
              No such template found.
            </p>
          )}
        </div>

        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Download PDF
          </button>
          <button
            onClick={() => navigate(`/editor/${templateId}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
