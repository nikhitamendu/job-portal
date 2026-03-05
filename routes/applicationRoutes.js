const express = require("express");  //This file defines the API endpoint that allows a logged-in user to apply for a job.
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { applyToJob,getMyApplications,getApplicantsForJob,updateApplicationStatus,getAllApplicantsForRecruiter } = require("../controllers/applicationController");

router.post("/apply/:jobId", auth, applyToJob);

/* JOB SEEKER */
router.get("/my-applications", auth, getMyApplications);

/* RECRUITER (PER JOB) */
router.get("/job/:jobId", auth, getApplicantsForJob);

/* RECRUITER (ALL JOBS) */
router.get("/recruiter/all", auth, getAllApplicantsForRecruiter);

/* UPDATE STATUS */
router.put("/:applicationId/status", auth, updateApplicationStatus);


module.exports = router;
 //wnen frontend clicks apply
 //API.post(`/applications/apply/${jobId}`, {}, {
  //headers: { Authorization: `Bearer ${token}` }
//});