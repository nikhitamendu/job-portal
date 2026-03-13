const Interview = require("../models/Interview");
const Application = require("../models/Application");
const { createNotification } = require("./notificationController");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

/* ---- helpers ---- */
const fmt = (d) =>
  new Date(d).toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

const interviewEmailHtml = ({ candidateName, jobTitle, company, date, duration, type, location, notes }) => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Interview Scheduled</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%);padding:36px 40px;text-align:center;">
          <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:10px 18px;margin-bottom:12px;">
            <span style="font-size:28px;">📅</span>
          </div>
          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.5px;">Interview Scheduled!</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">You have been invited for an interview</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:36px 40px;">
          <p style="margin:0 0 24px;color:#334155;font-size:16px;">Hi <strong>${candidateName}</strong>,</p>
          <p style="margin:0 0 28px;color:#475569;font-size:15px;line-height:1.6;">
            Great news! <strong>${company}</strong> has scheduled an interview with you for the <strong>${jobTitle}</strong> position. Here are your interview details:
          </p>
          <!-- Details card -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:28px;">
            <tr><td style="padding:20px 24px;border-bottom:1px solid #e2e8f0;">
              <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Date & Time</p>
              <p style="margin:0;color:#0f172a;font-size:16px;font-weight:700;">${fmt(date)}</p>
            </td></tr>
            <tr><td style="padding:20px 24px;border-bottom:1px solid #e2e8f0;">
              <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Duration</p>
              <p style="margin:0;color:#0f172a;font-size:15px;font-weight:600;">${duration} minutes</p>
            </td></tr>
            <tr><td style="padding:20px 24px;border-bottom:1px solid #e2e8f0;">
              <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Interview Type</p>
              <p style="margin:0;color:#0f172a;font-size:15px;font-weight:600;">${type === "Online" ? "🌐" : type === "Phone" ? "📞" : "📍"} ${type}</p>
            </td></tr>
            <tr><td style="padding:20px 24px;${notes ? "border-bottom:1px solid #e2e8f0;" : ""}">
              <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${type === "Online" ? "Meeting Link" : "Location / Phone"}</p>
              ${type === "Online"
                ? `<a href="${location}" style="color:#2563eb;font-size:15px;font-weight:600;word-break:break-all;">${location}</a>`
                : `<p style="margin:0;color:#0f172a;font-size:15px;font-weight:600;">${location}</p>`}
            </td></tr>
            ${notes ? `<tr><td style="padding:20px 24px;">
              <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Notes from Recruiter</p>
              <p style="margin:0;color:#475569;font-size:14px;line-height:1.6;font-style:italic;">"${notes}"</p>
            </td></tr>` : ""}
          </table>
          ${type === "Online" ? `
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td align="center">
              <a href="${location}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 32px;border-radius:10px;letter-spacing:0.3px;">🚀 Join Interview</a>
            </td></tr>
          </table>` : ""}
          <p style="margin:0 0 8px;color:#64748b;font-size:13px;line-height:1.6;">
            You can also view and manage your interviews in your <strong>HireHub</strong> dashboard under <em>My Interviews</em>.
          </p>
          <p style="margin:0;color:#64748b;font-size:13px;">Best of luck — the HireHub Team 🌟</p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
          <p style="margin:0;color:#94a3b8;font-size:12px;">This is an automated email from HireHub. Please do not reply.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const statusUpdateEmailHtml = ({ candidateName, jobTitle, status }) => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Interview Update</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:560px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%);padding:30px 36px;text-align:center;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;">Interview Status Update</h1>
        </td></tr>
        <tr><td style="padding:32px 36px;">
          <p style="margin:0 0 16px;color:#334155;font-size:15px;">Hi <strong>${candidateName}</strong>,</p>
          <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;">
            Your interview for the <strong>${jobTitle}</strong> position has been updated to:
          </p>
          <div style="text-align:center;margin-bottom:28px;">
            <span style="display:inline-block;padding:10px 28px;border-radius:999px;font-size:16px;font-weight:800;letter-spacing:0.5px;
              background:${status === "Completed" ? "#dcfce7" : status === "Cancelled" ? "#fee2e2" : "#dbeafe"};
              color:${status === "Completed" ? "#16a34a" : status === "Cancelled" ? "#dc2626" : "#1d4ed8"};">
              ${status}
            </span>
          </div>
          <p style="margin:0;color:#64748b;font-size:13px;">Visit your <strong>My Interviews</strong> page on HireHub for more details.</p>
        </td></tr>
        <tr><td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 36px;text-align:center;">
          <p style="margin:0;color:#94a3b8;font-size:12px;">Automated email from HireHub — do not reply.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

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

    // Sync Application status to "Interview"
    const updatedApp = await Application.findByIdAndUpdate(
      applicationId,
      { status: "Interview" },
      { new: true }
    );
    console.log("Updated Application status to Interview:", updatedApp?.status);

    res.status(201).json({
      message: "Interview scheduled successfully",
      interview
    });
    
    // Notify Candidate + send email AFTER sending response (non-blocking)
    try {
        const recruiter = await User.findById(req.user._id);
        const absoluteLocation = location?.startsWith("http") ? location : `https://${location}`;
        
        await createNotification({
          recipient: application.applicant._id,
          sender: req.user._id,
          type: "interview_scheduled",
          message: `New Interview Scheduled! ${recruiter.companyName || recruiter.name} invited you for the "${application.job.title}" position on ${new Date(date).toLocaleString()}.`,
          link: "/interviews",
        });
        // Send confirmation email to candidate
        await sendEmail(
          application.applicant.email,
          `Interview Scheduled: ${application.job.title} at ${recruiter.companyName || recruiter.name}`,
          interviewEmailHtml({
            candidateName: application.applicant.name,
            jobTitle: application.job.title,
            company: recruiter.companyName || recruiter.name,
            date,
            duration: duration || 45,
            type: type || "Online",
            location: absoluteLocation,
            notes,
          })
        );
    } catch (notifErr) {
        console.error("Failed to send notification/email:", notifErr);
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

      // Notify the other party + send email to candidate AFTER sending response
      try {
          const recipient = isRecruiter ? interview.candidate : interview.recruiter;
          await createNotification({
            recipient,
            sender: req.user._id,
            type: "interview_update",
            message: `Interview Status Update: The interview for "${interview.title}" is now marked as ${status}.`,
            link: "/interviews",
          });
          // Email the candidate about the status change
          const populatedInterview = await Interview.findById(interview._id)
            .populate("candidate", "name email")
            .populate("job", "title");
          if (populatedInterview?.candidate?.email) {
            await sendEmail(
              populatedInterview.candidate.email,
              `Interview Update: ${populatedInterview.job?.title || "Your Interview"} — ${status}`,
              statusUpdateEmailHtml({
                candidateName: populatedInterview.candidate.name,
                jobTitle: populatedInterview.job?.title || "your position",
                status,
              })
            );
          }
      } catch (notifErr) {
          console.error("Failed to send notification/email:", notifErr);
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
