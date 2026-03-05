const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");
/* ================= APPLY TO JOB ================= */
const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;//if req is /api/applications/apply/12345 then req.params.jobId will be 12345

    // Ensure job exists
    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      return res.status(404).json({ message: "job notfound" });
    }

    // Prevent recruiters from applying
    if (req.user.role === "recruiter") {
      return res.status(403).json({ message: "Recruiters cannot apply to jobs" });
    }

     const user = await User.findById(req.user._id);

    if (!user.resumeFileId) {
      return res.status(400).json({
        message: "Please upload resume before applying"
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id  //you do not take applicant id from frontend
    });  //req.user._id is the logged in user database comes from auth middleware

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
//get applocations
/* ================= GET MY APPLICATIONS ================= */
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id
    })
      .populate({
        path: "job",
        populate: {
          path: "postedBy",
          select: "name email"
        }
      })
      .sort({ createdAt: -1 });

    res.json(applications);

  } catch (error) {
    console.error("GET MY APPLICATIONS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
//for recruiter to view aoolied jobs
/* ================= GET APPLICANTS FOR A JOB ================= */
const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Ensure job belongs to logged-in recruiter
    const job = await Job.findOne({
      _id: jobId,
      postedBy: req.user._id
    });

    if (!job) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    res.json(applications);

  } catch (error) {
    console.error("GET APPLICANTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//for status updating
/* ================= UPDATE APPLICATION STATUS ================= */
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId)
      .populate("job");

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    // Ensure recruiter owns job
    if (application.job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const currentStatus = application.status;

    // 🔒 Strict Workflow Rules
    const allowedTransitions = {
      Applied: ["Reviewed", "Rejected"],
      Reviewed: ["Shortlisted", "Rejected"],
      Shortlisted: [], // Cannot change after shortlist
      Rejected: []     // Cannot change after reject
    };

    if (!allowedTransitions[currentStatus].includes(status)) {
      return res.status(400).json({
        message: `Cannot change status from ${currentStatus} to ${status}`
      });
    }

    application.status = status;
    await application.save();

    res.json({
      message: "Status updated successfully",
      application
    });

  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
//for all applications
/* ================= GET ALL APPLICANTS FOR RECRUITER ================= */
const getAllApplicantsForRecruiter = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate({
        path: "job",
        match: { postedBy: req.user._id }
      })
      .populate("applicant")
      .sort({ createdAt: -1 });

    // Remove applications where job didn't match recruiter
    const filtered = applications.filter(app => app.job !== null);

    res.json(filtered);

  } catch (error) {
    console.error("GET ALL APPLICANTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { applyToJob , getMyApplications,getApplicantsForJob,updateApplicationStatus,getAllApplicantsForRecruiter};
//User clicks Apply
// ↓
// Frontend sends jobId
// ↓
// authMiddleware verifies login
// ↓
// Controller checks job exists
// ↓
// Checks user role
// ↓
// Creates application
// ↓
// MongoDB stores relation
// ↓
// res shown to user