const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");
const { createNotification } = require("./notificationController");

/* ================= APPLY TO JOB ================= */
const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      return res.status(404).json({ message: "job notfound" });
    }

    if (req.user.role === "recruiter") {
      return res.status(403).json({ message: "Recruiters cannot apply to jobs" });
    }

    const user = await User.findById(req.user._id);
    if (!user.resumeFileId) {
      return res.status(400).json({ message: "Please upload resume before applying" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });

    // Notify recruiter
    await createNotification({
      recipient: job.postedBy,
      sender: req.user._id,
      type: "application",
      message: `${user.name} applied for your job: ${job.title}`,
      link: `/recruiter/job/${jobId}/applicants`,
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "You have already applied to this job" });
    }
    console.error("APPLY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= CHECK IF ALREADY APPLIED ================= */
const checkIfApplied = async (req, res) => {
  try {
    const existing = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user._id,
    });

    res.json({ applied: !!existing });

  } catch (error) {
    console.error("CHECK APPLIED ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
}; //used in job details application.findIne({job,applicant})

/* ================= GET MY APPLICATIONS ================= */
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate({
        path: "job",
        select: "title employmentType workplaceType experienceLevel location salary skillsRequired applicationDeadline",
        populate: { path: "postedBy", select: "name email" },
      })
      .sort({ createdAt: -1 });

    res.json(applications);

  } catch (error) {
    console.error("GET MY APPLICATIONS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET APPLICANTS FOR A JOB  for specific================= */
const getApplicantsForJob = async (req, res) => {  //recruiter
  try {
    const { jobId } = req.params;

    const job = await Job.findOne({ _id: jobId, postedBy: req.user._id });
    if (!job) {
      return res.status(403).json({ message: "Access denied" });
    }

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email phone bio jobTitle city country skills experience education resumeFileId linkedin portfolio")
      .populate("job", "title")  //recruiter can view full details of user
      .sort({ createdAt: -1 });

    res.json(applications);

  } catch (error) {
    console.error("GET APPLICANTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE APPLICATION STATUS ================= */
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId).populate("job");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.job.postedBy.toString() !== req.user._id.toString()) {
      //👉 Only the recruiter who posted the job can update status
      return res.status(403).json({ message: "Access denied" });
    }

    const allowedTransitions = {
      Applied:     ["Reviewed", "Rejected"],
      Reviewed:    ["Shortlisted", "Rejected"],
      Shortlisted: ["Interview", "Rejected"],
      Interview:   ["Offer", "Rejected"],
      Offer:       [],
      Rejected:    [],
    };

    if (!allowedTransitions[application.status]?.includes(status)) {
      return res.status(400).json({
        message: `Cannot change status from ${application.status} to ${status}`,
      });
    } //Cannot change status from Applied to Offer

    application.statusHistory.push({ status, changedAt: new Date() });
    application.status = status;
    await application.save();

    res.json({ message: "Status updated successfully", application });

    // Notify applicant
    const statusMessages = {
      Reviewed:    "👁 A recruiter has reviewed your application!",
      Shortlisted: "🎉 Great news! You've been shortlisted!",
      Interview:   "📅 You've been invited to an interview!",
      Offer:       "🏆 Congratulations! You've received a job offer!",
      Rejected:    "Your application was not selected this time.",
    };
    await createNotification({
      recipient: application.applicant,
      sender: req.user._id,
      type: "status_update",
      message: `${statusMessages[status] || `Status updated to ${status}`} — ${application.job.title}`,
      link: "/my-applications",
    });

  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ALL APPLICANTS FOR RECRUITER ================= */
const getAllApplicantsForRecruiter = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate({
        path: "job",
        match: { postedBy: req.user._id },
        select: "title employmentType location"
      })
      .populate(
        "applicant",
        "name email phone bio city country skills experience education resumeFileId linkedin portfolio"
      )
      .sort({ createdAt: -1 });

    // Remove applications where job didn't match this recruiter
    const filtered = applications.filter((app) => app.job !== null);
    res.json(filtered);

  } catch (error) {
    console.error("GET ALL APPLICANTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= WITHDRAW APPLICATION ================= */
const withdrawApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user._id,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.status !== "Applied") {
      return res.status(400).json({ message: "You can only withdraw applications that are still in Applied status" });
    }

    await application.deleteOne();
    res.json({ message: "Application withdrawn successfully" });
  } catch (error) {
    console.error("WITHDRAW ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  applyToJob,
  checkIfApplied,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
  getAllApplicantsForRecruiter,
  withdrawApplication,
};