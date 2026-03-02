const express = require("express");  //This file defines the API endpoint that allows a logged-in user to apply for a job.
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { applyToJob } = require("../controllers/applicationController");

/* ================= APPLY ================= */
router.post("/apply/:jobId", auth, applyToJob);  //POST /api/applications/apply/:jobId

module.exports = router;
 //wnen frontend clicks apply
 //API.post(`/applications/apply/${jobId}`, {}, {
  //headers: { Authorization: `Bearer ${token}` }
//});