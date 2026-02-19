const Application = require("../models/Application");
const Job = require("../models/Job");

/* ================= APPLY TO JOB ================= */
const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;//if req is /api/applications/apply/12345 then req.params.jobId will be 12345

    // Ensure job exists
    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Prevent recruiters from applying
    if (req.user.role === "recruiter") {
      return res.status(403).json({ message: "Recruiters cannot apply to jobs" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id  //you do not take applicant id from frontend
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "You have already applied to this job"
      });
    }

    console.error("APPLY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { applyToJob };
