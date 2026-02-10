const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided, authorization denied"
      });
    }

    const token = authHeader.split(" ")[1];//jwt token if  index 0 bearer

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Get user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    // 4️⃣ Attach user to request
    req.user = user;

    // 5️⃣ Allow request
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Token is invalid or expired"
    });
  }
};

module.exports = authMiddleware;
