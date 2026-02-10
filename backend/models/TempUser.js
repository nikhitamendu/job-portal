const mongoose = require("mongoose");   

const tempUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  token: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // auto delete after 10 minutes
  }
});

module.exports = mongoose.model("TempUser", tempUserSchema);
