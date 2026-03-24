const express = require("express");  //This file defines the API endpoint that allows a logged-in user to apply for a job.
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { 
  applyToJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
  getAllApplicantsForRecruiter,
  checkIfApplied,
  withdrawApplication,
} = require("../controllers/applicationController");

router.post("/apply/:jobId", auth, applyToJob);//used in jobdetails

/* ── CHECK IF ALREADY APPLIED (Job Seeker) ── */
router.get("/check/:jobId", auth, checkIfApplied);   // ← ADD THIS
//used in job details
/* JOB SEEKER */
router.get("/my-applications", auth, getMyApplications);
//my appliaction.jsx
/* RECRUITER (PER JOB) */
router.get("/job/:jobId", auth, getApplicantsForJob);
//recruiter sees applicants
/* RECRUITER (ALL JOBS) */
router.get("/recruiter/all", auth, getAllApplicantsForRecruiter);
//dashboard view
/* UPDATE STATUS */
router.patch("/:applicationId/status", auth, updateApplicationStatus);

/* WITHDRAW APPLICATION (Job Seeker) */
router.delete("/withdraw/:jobId", auth, withdrawApplication);


module.exports = router;