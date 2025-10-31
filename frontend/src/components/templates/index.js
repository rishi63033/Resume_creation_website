import React from "react";
import Template1 from "./Template1";
import Template2 from "./Template22"; // ✅ ensure filename matches exactly

// 🧠 Custom comparison function to stop useless re-renders
const areEqual = (prevProps, nextProps) => {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
};

export const templates = [
  {
    id: "1",
    name: "Classic Template",
    component: React.memo(Template1, areEqual),
  },
  {
    id: "2",
    name: "Modern Template",
    component: React.memo(Template2, areEqual),
  },
];
