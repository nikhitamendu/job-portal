const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();
  };
};

/* ================= GET ALL JOBS (Public) ================= */
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true })   //job-- mongodb model   fetches only jobs where isActive  is true :inactive/expires jobs are hidden from users
      .populate("postedBy", "name email")  //populate:replaces the id with actual user data 
      .sort({ createdAt: -1 });   //latest jobs first

    res.json({
      count: jobs.length,
      jobs
    });

  } catch (error) {
    console.error("GET JOBS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = authorizeRoles;
