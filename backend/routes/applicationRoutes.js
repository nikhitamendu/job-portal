const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { applyToJob } = require("../controllers/applicationController");

/* ================= APPLY ================= */
router.post("/apply/:jobId", auth, applyToJob);

module.exports = router;
