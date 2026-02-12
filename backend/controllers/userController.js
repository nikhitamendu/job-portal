const User = require("../models/User");

/* =====================================================
   PROFILE COMPLETION CALCULATION
===================================================== */

const calculateCompletion = (user) => {
  const fields = [
    user.phone && user.phone.trim() !== "",
    user.city && user.city.trim() !== "",
    user.country && user.country.trim() !== "",
    user.gender,
    user.jobTitle && user.jobTitle.trim() !== "",
    user.bio && user.bio.trim() !== "",
    user.skills && user.skills.length > 0,
    user.experience && user.experience.length > 0,
    user.education && user.education.length > 0,
    user.linkedin && user.linkedin.trim() !== "",
    user.portfolio && user.portfolio.trim() !== "",
    user.resumeFileId ? true : false,
    user.profilePicFileId ? true : false
  ];

  const filledFields = fields.filter(Boolean).length;
  const totalFields = fields.length;

  return Math.round((filledFields / totalFields) * 100);
};


/* =====================================================
   GET PROFILE
===================================================== */

exports.getProfile = async (req, res) => {
  try {
    // Always fetch fresh user from DB
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const completion = calculateCompletion(user);

    res.json({
      user,
      completion
    });

  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/* =====================================================
   UPDATE PROFILE
===================================================== */

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
      phone,
      bio,
      skills,
      experience,
      education,
      linkedin,
      portfolio,
      gender,
      jobTitle,
      city,
      country
    } = req.body;

    // Basic Fields
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;

    // Professional Fields
    if (skills !== undefined) user.skills = skills;
    if (experience !== undefined) user.experience = experience;
    if (education !== undefined) user.education = education;

    // Links
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (portfolio !== undefined) user.portfolio = portfolio;

    // New Identity Fields
    if (gender !== undefined) user.gender = gender;
    if (jobTitle !== undefined) user.jobTitle = jobTitle;
    if (city !== undefined) user.city = city;
    if (country !== undefined) user.country = country;

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
