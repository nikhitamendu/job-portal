const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },//connects the application to a specific job

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["Applied", "Reviewed", "Shortlisted", "Rejected"],
      default: "Applied"
    }

  },
  { timestamps: true }
);

// 🚫 Prevent duplicate applications
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });  //the same user cannot apply to the same

module.exports = mongoose.model("Application", applicationSchema);
