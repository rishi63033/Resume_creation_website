const sampleData = {
  personalInfo: {
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    address: "123 Main St, Cityville",
  },
  education: [
    {
      degree: "B.Tech in Computer Science",
      institute: "ABC University",
      startYear: "2020",
      endYear: "2024",
    },
  ],
  experience: [
    {
      title: "Software Engineer",
      company: "TechCorp",
      startDate: "2023",
      endDate: "2024",
      description: "Developed full-stack web applications using MERN stack.",
    },
  ],
  projects: [
    {
      title: "Portfolio Website",
      timeline: "2024",
      description: "Built a personal portfolio using React and TailwindCSS.",
    },
  ],
  skills: ["React", "Node.js", "MongoDB", "TailwindCSS"],
  certifications: [
    {
      title: "AWS Certified Developer",
      organization: "Amazon Web Services",
      year: "2024",
    },
  ],
  customSections: [
    {
      heading: "Achievements",
      fields: [
        { label: "Hackathon Winner", value: "Won CodeSprint 2024" },
        { label: "Open Source", value: "Contributed to React projects" },
      ],
    },
  ],
};

export default sampleData;
