const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user
  });
});

module.exports = router;
//GET /api/protected/profile
//This route checks whether the JWT token sent by frontend is valid and returns the logged-in user data.
//React page loads
// ↓
// Frontend checks login state
// ↓
// Calls /api/protected/profile
// ↓
// authMiddleware verifies token
// ↓
// Returns user info
// ↓
// Frontend keeps user logged in