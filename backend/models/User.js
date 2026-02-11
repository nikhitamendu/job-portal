const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"]
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      default: "user"
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String  //  Token for email verification . It will be removed after verification
    },
    resetOtp: Number,
    resetOtpExpires: Date,

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
