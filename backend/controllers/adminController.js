const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

/* ================= GET PLATFORM STATS ================= */
exports.getStats = async (req, res) => {
  try {
    const [totalUsers, totalRecruiters, totalJobs, totalApplications, activeJobs] =
      await Promise.all([
        User.countDocuments({ role: "user" }),
        User.countDocuments({ role: "recruiter" }),
        Job.countDocuments(),
        Application.countDocuments(),
        Job.countDocuments({ isActive: true }),
      ]);

    res.json({
      totalUsers,
      totalRecruiters,
      totalJobs,
      totalApplications,
      activeJobs,
      inactiveJobs: totalJobs - activeJobs,
    });
  } catch (error) {
    console.error("ADMIN GET STATS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ALL USERS ================= */
exports.getAllUsers = async (req, res) => {
  try {
    const { search, role, page = 1, limit = 20 } = req.query;
    const query = {};

    if (role && role !== "all") query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      User.find(query)
        .select("-password -verificationToken -resetOtp -resetOtpExpires")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      User.countDocuments(query),
    ]);

    res.json({ users, total, totalPages: Math.ceil(total / limit), currentPage: Number(page) });
  } catch (error) {
    console.error("ADMIN GET USERS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE USER ROLE ================= */
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!["user", "recruiter", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Prevent admin from demoting themselves
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot change your own role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, select: "-password" }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Role updated successfully", user });
  } catch (error) {
    console.error("ADMIN UPDATE ROLE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE USER ================= */
exports.deleteUser = async (req, res) => {
  try {
    // Prevent admin from deleting themselves
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot delete your own account" });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Clean up their jobs and applications
    await Job.deleteMany({ postedBy: req.params.id });
    await Application.deleteMany({ applicant: req.params.id });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("ADMIN DELETE USER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET ALL JOBS (ADMIN) ================= */
exports.getAllJobs = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status === "active") query.isActive = true;
    if (status === "inactive") query.isActive = false;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { "location.city": { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const [jobs, total] = await Promise.all([
      Job.find(query)
        .populate("postedBy", "name email companyName")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Job.countDocuments(query),
    ]);

    // Attach application count to each job
    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const appCount = await Application.countDocuments({ job: job._id });
        return { ...job.toObject(), applicationCount: appCount };
      })
    );

    res.json({ jobs: jobsWithCounts, total, totalPages: Math.ceil(total / limit), currentPage: Number(page) });
  } catch (error) {
    console.error("ADMIN GET JOBS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE JOB (ADMIN) ================= */
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Remove related applications
    await Application.deleteMany({ job: req.params.id });

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("ADMIN DELETE JOB ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= TOGGLE JOB STATUS ================= */
exports.toggleJobStatus = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.isActive = !job.isActive;
    await job.save();

    res.json({ message: `Job ${job.isActive ? "activated" : "deactivated"} successfully`, job });
  } catch (error) {
    console.error("ADMIN TOGGLE JOB ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
