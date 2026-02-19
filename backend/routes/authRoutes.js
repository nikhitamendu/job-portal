const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/authorizeRoles");

const {
  register,
  verifyEmail,
  resendVerification,
  login,
  refreshToken,
  logout,
  forgotPassword,
  verifyOtp,
  resetPassword,
  resendOtp,
  me
} = require("../controllers/authController");

/* ================= AUTH ================= */
router.post("/register", register);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

/* ================= PASSWORD RESET ================= */
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOtp);

/* ================= SESSION ================= */
router.get("/me", auth, me); // ✅ protected route
/* ================= TEST ROLE PROTECTION ================= */
router.get(
  "/recruiter-only",
  auth,
  authorizeRoles("recruiter"),
  (req, res) => {
    res.json({ message: "Welcome Recruiter!" });
  }
);



module.exports = router;
