const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: true
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  title: {
    type: String,
    required: true,
    default: "Job Interview"
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    default: 45
  },
  type: {
    type: String,
    enum: ["Online", "In-person", "Phone"],
    default: "Online"
  },
  location: {
    type: String, // Link for online, address for in-person
    required: true
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled", "Rescheduled"],
    default: "Scheduled"
  }
}, { timestamps: true });

module.exports = mongoose.model("Interview", interviewSchema);
