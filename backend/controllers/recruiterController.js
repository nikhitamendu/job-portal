const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

/* =====================================================
   SEARCH CANDIDATES BY SKILLS
   Endpoint: GET /api/recruiter/search?skills=react,node
===================================================== */
exports.searchCandidates = async (req, res) => {
  try {
    const { skills } = req.query;

    let query = { role: "user" };

    if (skills) {
      const skillsArray = skills.split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
      if (skillsArray.length > 0) {
        // Find users that have AT LEAST ONE of these skills
        query.skills = { $in: skillsArray };
      }
    }

    const candidates = await User.find(query)
      .select("name email jobTitle skills city country experience education profilePicFileId")
      .limit(50); //"I limit returned fields to improve performance and reduce payload size."

    res.json({
      success: true,
      count: candidates.length,
      candidates
    });
  } catch (error) {
    console.error("SEARCH CANDIDATES ERROR:", error);
    res.status(500).json({ message: "Error searching candidates" });
  }
};

/* =====================================================
   SEND EMAIL TO CANDIDATE
   Endpoint: POST /api/recruiter/contact
===================================================== */
exports.sendEmailToCandidate = async (req, res) => {
  try {
    const { candidateId, subject, message } = req.body;
    const recruiter = req.user;

    if (!candidateId || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const candidate = await User.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const emailHtml = `
      <div style="font-family: sans-serif; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #0f172a; color: white; padding: 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px;">New Message from ${recruiter.companyName || recruiter.name}</h2>
        </div>
        <div style="padding: 32px; background: white;">
          <p style="font-size: 16px; margin-bottom: 24px;">Hi <strong>${candidate.name}</strong>,</p>
          <p style="margin-bottom: 24px;">You have received a new professional inquiry regarding your profile on our Job Portal.</p>
          
          <div style="background: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; margin-bottom: 24px; font-style: italic;">
            "${message}"
          </div>
          
          <p style="margin-bottom: 8px;"><strong>Recruiter Details:</strong></p>
          <ul style="list-style: none; padding: 0; margin-bottom: 24px;">
            <li>👤 ${recruiter.name}</li>
            ${recruiter.jobTitle ? `<li>💼 ${recruiter.jobTitle}</li>` : ""}
            ${recruiter.companyName ? `<li>🏢 ${recruiter.companyName}</li>` : ""}
          </ul>
          
          <p style="font-size: 14px; color: #64748b;">You can reply directly to this email to coordinate with the recruiter.</p>
        </div>
        <div style="background: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
          This email was sent via the Job Portal Talent Discovery platform.
        </div>
      </div>
    `;

    await sendEmail(candidate.email, subject, emailHtml);
    const { createNotification } = require("./notificationController");
    await createNotification({   //for app notifications
      recipient: candidate._id,
      sender: recruiter._id,
      type: "outreach",
      message: `${recruiter.companyName || recruiter.name} sent you a message: "${subject}"`,
      link: "/notifications",
    });

    res.json({
      success: true,
      message: "Email sent successfully to " + candidate.name
    });
  } catch (error) {
    console.error("CONTACT CANDIDATE ERROR:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

