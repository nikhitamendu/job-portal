const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");

const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const { getProfile, updateProfile } = require("../controllers/userController");

const router = express.Router();

/* ================= MULTER (Memory Storage for GridFS) ================= */

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

/* ================= PROFILE ROUTES ================= */

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

/* =====================================================
   UPLOAD RESUME
===================================================== */
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

      const oldResumeId = user.resumeFileId;

      const uploadStream = bucket.openUploadStream(
        req.file.originalname,
        { contentType: req.file.mimetype }
      );

      uploadStream.end(req.file.buffer);

      uploadStream.on("finish", async () => {
        try {
          // Save new resume ID
          user.resumeFileId = uploadStream.id;
          await user.save();

          // Delete old resume AFTER successful save
          if (oldResumeId) {
            try {
              await bucket.delete(oldResumeId);
              console.log("Old resume deleted");
            } catch {
              console.log("Old resume not found");
            }
          }

          res.json({
            message: "Resume uploaded successfully",
            resumeFileId: uploadStream.id
          });
        } catch (err) {
          console.error("SAVE ERROR:", err);
          res.status(500).json({ message: "Error saving resume" });
        }
      });

    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

 //User uploads resume>>Multer stores file in memory>>GridFS upload stream created
//>>File written into MongoDB chunks>>Mongo generates fileId>>fileId saved in User document
//>>Success response sent
/* =====================================================
   DELETE RESUME
===================================================== */

router.delete("/delete-resume", authMiddleware, async (req, res) => {
  try {
    const bucket = req.app.locals.bucket;
    const user = await User.findById(req.user._id);//fetch the user from database

    if (!user || !user.resumeFileId) {
      return res.status(400).json({ message: "No resume to delete" });
    }

    await bucket.delete(
      new mongoose.Types.ObjectId(user.resumeFileId)  //remove files from mongodb
    );

    user.resumeFileId = null;
    await user.save();

    res.json({ message: "Resume deleted successfully" });

  } catch (err) {
    console.error("DELETE RESUME ERROR:", err);
    res.status(500).json({ message: "Error deleting resume" });
  }
});

/* =====================================================
   UPLOAD PROFILE PICTURE
===================================================== */

router.post(
  "/upload-profile-pic",
  authMiddleware,  //user must be logged in
  upload.single("profilePic"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const bucket = req.app.locals.bucket;  //bucket gridfs storage
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Delete old profile picture
      if (user.profilePicFileId) {
        try {
          await bucket.delete(
            new mongoose.Types.ObjectId(user.profilePicFileId)  //user replacing the picture
          );
        } catch (err) {
          console.log("Old profile picture not found");
        }
      }

      const uploadStream = bucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype
      });

      uploadStream.end(req.file.buffer);

      uploadStream.on("finish", async () => {
        user.profilePicFileId = uploadStream.id;
        await user.save();

        res.json({
          message: "Profile picture uploaded successfully",
          profilePicFileId: uploadStream.id
        });
      });

      uploadStream.on("error", () => {
        res.status(500).json({ message: "Error uploading profile picture" });
      });

    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

/* =====================================================
   DELETE PROFILE PICTURE
===================================================== */

router.delete("/delete-profile-pic", authMiddleware, async (req, res) => {
  try {
    const bucket = req.app.locals.bucket;
    const user = await User.findById(req.user._id);

    if (!user || !user.profilePicFileId) {
      return res.status(400).json({ message: "No profile picture to delete" });
    }

    await bucket.delete(
      new mongoose.Types.ObjectId(user.profilePicFileId)
    );

    user.profilePicFileId = null;
    await user.save();

    res.json({ message: "Profile picture deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error deleting profile picture" });
  }
});

/* =====================================================
   DOWNLOAD ANY FILE (Resume or Profile Pic)
===================================================== */

router.get("/file/:id", async (req, res) => {
  try {
    const bucket = req.app.locals.bucket;
    const fileId = new mongoose.Types.ObjectId(req.params.id);  //url gives string 
    //but mongodb needs objectid (4132) so conversion is required

    const files = await bucket.find({ _id: fileId }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    res.set("Content-Type", files[0].contentType);//it tells browser how to handle file
//img/png>>show img, appli/pdf>>open pdf without this browser downloads garbage data
    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res);  //

  } catch (err) {
    res.status(500).json({ message: "Error retrieving file" });
  }
});


module.exports = router;
//Take data coming from one stream and directly send it into another stream”:pipe
