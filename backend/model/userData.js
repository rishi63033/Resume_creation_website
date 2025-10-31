const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  // ====== Personal Information ======
  personalInfo: {
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    careerObjective: { type: String }, // ✅ fixed (no space)
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String },
  },

  // ====== Education ======
  education: [
    {
      degree: { type: String }, // ✅ renamed from 'level'
      institute: { type: String }, // ✅ renamed from 'institution'
      boardOrUniversity: { type: String },
      specialization: { type: String },
      startYear: { type: String },
      endYear: { type: String },
      grade: { type: String },
      location: { type: String },
      cgpa: { type: String },
    },
  ],

  // ====== Work Experience ======
  experience: [
    {
      title: { type: String },
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
      techStack: { type: String }, // ✅ renamed from 'technologies'
      githubFrontend: { type: String },
      githubBackend: { type: String },
      link: { type: String }, // ✅ renamed from 'liveLink'
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
