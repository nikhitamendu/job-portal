const express = require("express");
const router = express.Router(); // ✅ Fixed: express.Namespace does not exist
const {
  scheduleInterview,
  getMyInterviews,
  getRecruiterInterviews,
  updateInterviewStatus
} = require("../controllers/interviewController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

// All routes require authentication
router.use(authMiddleware);

// Recruiter routes
router.post("/schedule", authorizeRoles("recruiter"), scheduleInterview);
router.get("/recruiter", authorizeRoles("recruiter"), getRecruiterInterviews);

// Candidate / Global routes
router.get("/my-interviews", getMyInterviews);
router.put("/:id/status", updateInterviewStatus);

module.exports = router;