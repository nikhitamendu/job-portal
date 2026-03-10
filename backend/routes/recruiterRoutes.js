const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { searchCandidates, sendEmailToCandidate } = require("../controllers/recruiterController");

// Midleware to ensure only recruiters can access these routes
const recruiterMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "recruiter") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Recruiters only." });
  }
};

router.get("/search", authMiddleware, recruiterMiddleware, searchCandidates);
router.post("/contact", authMiddleware, recruiterMiddleware, sendEmailToCandidate);


module.exports = router;
