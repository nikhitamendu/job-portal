const Interview = require("../models/Interview");
const Application = require("../models/Application");
const { createNotification } = require("./notificationController");
const User = require("../models/User");

/* ================= SCHEDULE INTERVIEW ================= */
const scheduleInterview = async (req, res) => {
  try {
    const { applicationId, date, duration, type, location, notes, title } = req.body;

    if (!applicationId || !date || !location) {
      return res.status(400).json({ message: "Application ID, date, and location are required" });
    }

    const application = await Application.findById(applicationId).populate("job applicant");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Ensure only the recruiter of the job can schedule
    if (application.job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to schedule for this job" });
    }

    const interview = await Interview.create({
      application: applicationId,
      candidate: application.applicant._id,
      recruiter: req.user._id,
      job: application.job._id,
      title: title || `Interview for ${application.job.title}`,
      date,
      duration,
      type,
      location,
      notes
    });

    res.status(201).json({
      message: "Interview scheduled successfully",
      interview
    });
    
    // Notify Candidate AFTER sending response (non-blocking)
    try {
        const recruiter = await User.findById(req.user._id);
        await createNotification({
          recipient: application.applicant._id,
          sender: req.user._id,
          type: "interview_scheduled",
          message: `New Interview Scheduled! ${recruiter.companyName || recruiter.name} invited you for the "${application.job.title}" position on ${new Date(date).toLocaleString()}.`,
          link: "/interviews",
        });
    } catch (notifErr) {
        console.error("Failed to send notification:", notifErr);
    }

  } catch (error) {
    console.error("SCHEDULE INTERVIEW ERROR:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Server error" });
    }
  }
};

/* ================= GET CANDIDATE INTERVIEWS ================= */
const getMyInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ candidate: req.user._id })
      .populate("job", "title companyName location")
      .populate("recruiter", "name email companyName")
      .sort({ date: 1 });

    res.json(interviews);
  } catch (error) {
    console.error("GET MY INTERVIEWS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET RECRUITER INTERVIEWS ================= */
const getRecruiterInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ recruiter: req.user._id })
      .populate("job", "title")
      .populate("candidate", "name email")
      .sort({ date: 1 });

    res.json(interviews);
  } catch (error) {
    console.error("GET RECRUITER INTERVIEWS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE INTERVIEW STATUS ================= */
const updateInterviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    // Ensure authorized (recruiter or candidate can cancel, only recruiter can complete)
    const isRecruiter = interview.recruiter.toString() === req.user._id.toString();
    const isCandidate = interview.candidate.toString() === req.user._id.toString();

    if (!isRecruiter && !isCandidate) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (status) {
      interview.status = status;
      await interview.save();
      
      res.json({ message: "Interview updated", interview });

      // Notify the other party AFTER sending response
      try {
          const recipient = isRecruiter ? interview.candidate : interview.recruiter;
          await createNotification({
            recipient,
            sender: req.user._id,
            type: "interview_update",
            message: `Interview Status Update: The interview for "${interview.title}" is now marked as ${status}.`,
            link: "/interviews",
          });
      } catch (notifErr) {
          console.error("Failed to send notification:", notifErr);
      }
      return;
    }

    res.json({ message: "Interview updated", interview });
  } catch (error) {
    console.error("UPDATE INTERVIEW ERROR:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = {
  scheduleInterview,
  getMyInterviews,
  getRecruiterInterviews,
  updateInterviewStatus
};
