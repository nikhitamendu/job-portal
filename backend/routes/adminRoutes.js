const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");
const admin = require("../controllers/adminController");

// All admin routes require: logged in + admin role
router.use(authMiddleware);
router.use(authorizeRoles("admin"));

/* ── Stats ── */
router.get("/stats", admin.getStats);

/* ── Users ── */
router.get("/users", admin.getAllUsers);
router.patch("/users/:id/role", admin.updateUserRole);
router.delete("/users/:id", admin.deleteUser);

/* ── Jobs ── */
router.get("/jobs", admin.getAllJobs);
router.delete("/jobs/:id", admin.deleteJob);
router.patch("/jobs/:id/toggle", admin.toggleJobStatus);

module.exports = router;
