const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    requirements: [
      {
        type: String,
        trim: true
      }
    ],

    skillsRequired: [
      {
        type: String,
        trim: true
      }
    ],

    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Freelance"],
      required: true
    },

    workplaceType: {
      type: String,
      enum: ["On-site", "Remote", "Hybrid"],
      required: true
    },

    location: {
      city: { type: String, trim: true },
      country: { type: String, trim: true }
    },

    salary: {
      min: { type: Number },
      max: { type: Number },
      currency: {
        type: String,
        default: "USD"
      }
    },

    experienceLevel: {
      type: String,
      enum: ["Entry", "Mid", "Senior", "Lead"]
    },

    applicationDeadline: Date,

    isActive: {
      type: Boolean,
      default: true
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
