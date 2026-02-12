const User = require("../models/User");

/* ================= PROFILE COMPLETION ================= */

const calculateCompletion = (user) => {
  const fields = [
    user.phone && user.phone.trim() !== "",
    user.location && user.location.trim() !== "",
    user.bio && user.bio.trim() !== "",
    user.skills && user.skills.length > 0,
    user.experience && user.experience.length > 0,
    user.education && user.education.length > 0,
    user.linkedin && user.linkedin.trim() !== "",
    user.portfolio && user.portfolio.trim() !== "",
    user.resumeFileId ? true : false
  ];

  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
};

/* ================= GET PROFILE ================= */

exports.getProfile = async (req, res) => {
  try {
    // 🔥 ALWAYS fetch fresh user from DB
    const user = await User.findById(req.user._id).select("-password");

    const completion = calculateCompletion(user);

    res.json({ user, completion });

  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE PROFILE ================= */

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
      phone,
      location,
      bio,
      skills,
      experience,
      education,
      linkedin,
      portfolio
    } = req.body;

    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;
    if (bio !== undefined) user.bio = bio;
    if (skills !== undefined) user.skills = skills;
    if (experience !== undefined) user.experience = experience;
    if (education !== undefined) user.education = education;
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (portfolio !== undefined) user.portfolio = portfolio;

    await user.save();

    const completion = calculateCompletion(user);

    res.json({
      message: "Profile updated successfully",
      user,
      completion
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
