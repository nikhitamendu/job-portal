//this file defines all job-related API endpoints such as creating jobs, fetching all jobs, getting a single job, and fetching recruiter-specific jobs.

const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

const { createJob, getJobs, getJobById, getMyJobs, deleteJob, toggleJobStatus } = require("../controllers/jobController");
/* ================= GET ALL JOBS ================= */
router.get("/", getJobs);   //any one access no login required  //used for home pages and job listing pages

const { updateJob } = require("../controllers/jobController");

// Toggle job open/closed status
router.patch(
  "/:id/toggle",
  auth,
  authorizeRoles("recruiter"),
  toggleJobStatus
);

//recruiter dashboard  protected
router.get(
  "/my-jobs",  //get/api/jobs/my-jobs
  auth,  //authentication reads jwt from header verifies token extracts user id attaches user to request
  authorizeRoles("recruiter"),
  getMyJobs   //shows only jobs posted by recruiter
  
);

//updating
router.put(
  "/:id",
  auth,
  authorizeRoles("recruiter"),
  updateJob
);
/* ================= GET SINGLE JOB ================= */
router.get("/:id", getJobById);

//for deleting job
router.delete(
  "/:id",
  auth,
  authorizeRoles("recruiter"),
  deleteJob
);

/* ================= CREATE JOB ================= */
router.post(  //middleware pipeline ...it does not go directly to controller it passes security layers 
  "/", // / means base //requestok  //only logged in recruiter can create a job
  auth,  //authentication
  authorizeRoles("recruiter"),   //authorization
  createJob  ,  //business logic to create job
  
);



module.exports = router;













