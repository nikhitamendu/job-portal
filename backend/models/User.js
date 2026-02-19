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

    /* ================= ROLE ================= */
    role: {
      type: String,
      enum: ["user", "recruiter", "admin"],
      default: "user"
    },

    /* ================= AUTH FIELDS ================= */
    isVerified: {
      type: Boolean,
      default: false
    },

    verificationToken: {
      type: String
    },

    resetOtp: Number,
    resetOtpExpires: Date,

    /* ================= PROFILE FIELDS ================= */

    phone: {
      type: String,
      trim: true
    },

    location: {
      type: String,
      trim: true
    },

    bio: {
      type: String,
      maxlength: 500
    },

    skills: [
      {
        type: String,
        trim: true
      }
    ],

    /* ================= EXPERIENCE ================= */

    experience: [
      {
        role: { type: String, trim: true },
        company: { type: String, trim: true },
        duration: { type: String, trim: true },
        desc: { type: String, trim: true }
      }
    ],

    /* ================= EDUCATION ================= */

    education: [
      {
        degree: { type: String, trim: true },
        institute: { type: String, trim: true },
        year: { type: String, trim: true }
      }
    ],

    linkedin: {
      type: String,
      trim: true
    },

    portfolio: {
      type: String,
      trim: true
    },

    /* ================= GRIDFS FILE IDS ================= */

    resumeFileId: {
      type: mongoose.Schema.Types.ObjectId
    },

    gender: {
  type: String,
  enum: ["Male", "Female", "Other"]
},

dob: {
  type: Date
},

jobTitle: {
  type: String,
  trim: true
},

city: {
  type: String,
  trim: true
},

country: {
  type: String,
  trim: true
},
profilePicFileId: {
  type: mongoose.Schema.Types.ObjectId,
  default: null
},

    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
