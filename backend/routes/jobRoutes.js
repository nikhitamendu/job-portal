// const express = require("express");
// const { register } = require("../controllers/authController");
// const router = express.Router();

// router.post("/register", register);

// module.exports = router;
const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

const { createJob,getJobs,getJobById } = require("../controllers/jobController");   //save the job in db
/* ================= GET ALL JOBS ================= */
router.get("/", getJobs);

/* ================= GET SINGLE JOB ================= */
router.get("/:id", getJobById);

/* ================= CREATE JOB ================= */
router.post(  //middleware pipeline ...it does not go directly to controller it passes security layers 
  "/",  //requestok
  auth,  //authentication
  authorizeRoles("recruiter"),   //authorization
  createJob    //business logic to create job
);

module.exports = router;














