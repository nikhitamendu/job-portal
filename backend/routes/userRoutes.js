const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");

const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const {
  getProfile,
  updateProfile
} = require("../controllers/userController");

const router = express.Router();

/* ================= MULTER (Memory Storage for GridFS) ================= */

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

/* ================= PROFILE ROUTES ================= */

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

/* ================= UPLOAD RESUME ================= */

router.post(
  "/upload-resume",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const bucket = req.app.locals.bucket;

      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // 🔥 Delete old resume if exists
      if (user.resumeFileId) {
        try {
          await bucket.delete(user.resumeFileId);
        } catch (err) {
          console.log("Old resume not found in GridFS");
        }
      }

      // Upload new resume
      const uploadStream = bucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype
      });

      uploadStream.end(req.file.buffer);

      uploadStream.on("finish", async () => {
        user.resumeFileId = uploadStream.id;
        await user.save();

        res.status(200).json({
          message: "Resume uploaded successfully",
          resumeFileId: uploadStream.id
        });
      });

      uploadStream.on("error", () => {
        res.status(500).json({ message: "Error uploading resume" });
      });

    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//delete resume
/* ================= DELETE RESUME ================= */

router.delete("/delete-resume", authMiddleware, async (req, res) => {
  try {
    const bucket = req.app.locals.bucket;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.resumeFileId) {
      return res.status(400).json({ message: "No resume to delete" });
    }

    // ⚠️ IMPORTANT: Convert to ObjectId
    await bucket.delete(
      new mongoose.Types.ObjectId(user.resumeFileId)
    );

    user.resumeFileId = null;
    await user.save();

    res.status(200).json({ message: "Resume deleted successfully" });

  } catch (err) {
    console.error("DELETE RESUME ERROR:", err);
    res.status(500).json({ message: "Error deleting resume" });
  }
});


/* ================= DOWNLOAD RESUME ================= */

router.get("/resume/:id", async (req, res) => {
  try {
    const bucket = req.app.locals.bucket;
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    const downloadStream = bucket.openDownloadStream(fileId);

    downloadStream.on("error", () => {
      res.status(404).json({ message: "File not found" });
    });

    downloadStream.pipe(res);

  } catch {
    res.status(500).json({ message: "Error retrieving file" });
  }
});

module.exports = router;
