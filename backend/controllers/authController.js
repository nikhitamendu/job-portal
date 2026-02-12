const User = require("../models/User");
const TempUser = require("../models/TempUser");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken"); // ✅ FIXED
const sendEmail = require("../utils/sendEmail");

/* =====================================================
   REGISTER (SEND EMAIL, DO NOT CREATE USER YET)
===================================================== */
exports.register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    name = name.trim();
    email = email.toLowerCase().trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const strongPassword =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (!strongPassword.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least 1 uppercase letter, 1 number, and 1 special character"
      });
    }

    await TempUser.deleteOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");


    await TempUser.create({
      name,
      email,
      password: hashedPassword,
      token
    });

    const verifyLink = `http://localhost:5000/api/auth/verify-email/${token}`;



    await sendEmail(
      email,
      "Verify your email - Job Portal",
      `
        <h2>Email Verification</h2>
        <p>Click the link below to complete your registration:</p>
        <a href="${verifyLink}">Verify Email</a>
      `
    );

    return res.status(200).json({
      message: "Verification email sent. Please verify to complete registration."
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   VERIFY EMAIL  for register
===================================================== */
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const tempUser = await TempUser.findOne({ token });
    if (!tempUser) {
      return res.status(400).json({
        message: "Invalid or expired verification link"
      });
    }

    await User.create({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
      role: "user",
      isVerified: true
    });

    await TempUser.deleteOne({ _id: tempUser._id });

    return res.redirect("http://localhost:5173/verify-success");
  } catch (error) {
    console.error("VERIFY ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   RESEND EMAIL VERIFICATION  for register
===================================================== */
exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const tempUser = await TempUser.findOne({ email: normalizedEmail });

    if (!tempUser) {
      return res.status(400).json({
        message: "No pending verification found for this email"
      });
    }

    // Generate new token
    const newToken = crypto.randomBytes(32).toString("hex");
    tempUser.token = newToken;
    await tempUser.save();

    const verifyLink = `http://localhost:5000/api/auth/verify-email/${newToken}`;

    await sendEmail(
      normalizedEmail,
      "Resend Email Verification - Job Portal",
      `
        <h2>Email Verification</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${verifyLink}">Verify Email</a>
      `
    );

    return res.status(200).json({
      message: "Verification email resent successfully"
    });
  } catch (error) {
    console.error("RESEND VERIFICATION ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


///Login

/* =====================================================
   TOKEN GENERATOR
===================================================== */
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET, // ✅ MUST exist in .env
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

/* =====================================================
   LOGIN
===================================================== */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    const tempUser = await TempUser.findOne({ email: normalizedEmail });

    if (!user && tempUser) {
      return res.status(401).json({
        message: "Please verify your email to complete registration"
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please register first"
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify your email before login"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      path: "/"
    });

    return res.status(200).json({
      message: "Login successful",
      token: accessToken
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   REFRESH TOKEN
===================================================== */
exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;  //we stored refresh token in cookies during login

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);  // if all are valid it returns the decoded payload 
    const user = await User.findById(decoded.id);//just token is valid doesnt mean teh user still exists ,may be user was deleted //with out db check deleted user would still ger access token   //

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
//after checking
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "15m" }
    );

    return res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};


/* =====================================================
   LOGOUT
===================================================== */
exports.logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });

  return res.status(200).json({ message: "Logged out successfully" });
};


//forgot password

/* =====================================================
   FORGOT PASSWORD - SEND OTP
===================================================== */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(Math.random() * 90000 + 10000);

    user.resetOtp = otp;
    user.resetOtpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail(
      normalizedEmail,
      "Your OTP for password reset",
      `
        <h2>Password Reset</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
      `
    );

    return res.status(200).json({
      message: "OTP sent successfully"
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

//verify otp
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({
    email: email.toLowerCase().trim()
  });

  if (!user || !user.resetOtp) {
    return res.status(400).json({ message: "Invalid request" });
  }

  if (
    user.resetOtp !== Number(otp) ||
    user.resetOtpExpires < Date.now()
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  return res.status(200).json({ message: "OTP verified" });
};

// reset password
exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!password || password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters"
    });
  }

  const strongPasswordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!strongPasswordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be at least 6 characters long"
    });
  }

  const user = await User.findOne({
    email: email.toLowerCase().trim()
  });

  if (!user || !user.resetOtp) {
    return res.status(400).json({ message: "Invalid request" });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetOtp = undefined;
  user.resetOtpExpires = undefined;

  await user.save();

  return res.status(200).json({
    message: "Password updated successfully"
  });
};

//resend otp for change password in login

exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.resetOtp = otp;
    user.resetOtpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail(
      user.email,
      "Resend OTP - Password Reset",
      `
        <h3>Password Reset</h3>
        <p>Your new OTP is:</p>
        <h2>${otp}</h2>
        <p>This OTP is valid for 10 minutes.</p>
      `
    );

    return res.status(200).json({
      message: "OTP resent successfully"
    });
  } catch (error) {
    console.error("RESEND OTP ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");  //you fetch the logged in user from databse using tge id from token and excludes tg=he passwird field from the response  // req.user comes from suyh middle ware
    return res.json({ user });
  } catch (err) {
    return res.status(401).json({ message: "Not authenticated" });
  }
};




