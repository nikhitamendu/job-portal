const express = require("express");
const router = express.Router();
const {
  getNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getNotifications);
router.put("/mark-read/:id", authMiddleware, markAsRead);
router.delete("/:id", authMiddleware, deleteNotification);

module.exports = router;
