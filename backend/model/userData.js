// models/UserData.js
const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // each user has only one data document
  },

  // ====== Personal Information ======
  personalInfo: {
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    careerObjective: { type: String },
  },

  // ====== Education ======
  education: [
    {
      level: { type: String }, // e.g., "10th", "12th", "B.Tech", "M.Tech", "Ph.D"
      institution: { type: String },
      boardOrUniversity: { type: String },
      specialization: { type: String },
      startYear: { type: String },
      endYear: { type: String },
      grade: { type: String }, // CGPA, %, etc.
    },
  ],

  // ====== Work Experience ======
  experience: [
    {
      title: { type: String }, // e.g., Software Engineer Intern
      company: { type: String },
      location: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      description: { type: String },
    },
  ],

  // ====== Projects ======
  projects: [
    {
      title: { type: String },
      timeline: { type: String },
      description: { type: String },
      technologies: [{ type: String }],
      githubFrontend: { type: String },
      githubBackend: { type: String },
      liveLink: { type: String },
    },
  ],

  // ====== Skills ======
  skills: [{ type: String }],

  // ====== Certifications or Achievements ======
  certifications: [
    {
      title: { type: String },
      organization: { type: String },
      year: { type: String },
      description: { type: String },
    },
  ],

  // ====== Custom Sections ======
  customSections: [
    {
      heading: { type: String },
      fields: [
        {
          label: { type: String },
          value: { type: String },
        },
      ],
    },
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userDataSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const UserData = mongoose.model("UserData", userDataSchema);
module.exports = UserData;
