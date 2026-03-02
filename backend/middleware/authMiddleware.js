const jwt = require("jsonwebtoken");   //I used JWT authentication. When user logs in, backend generates a signed token. This token is stored in frontend and sent in Authorization header for protected routes. Backend verifies the token using middleware before allowing access.
const User = require("../models/User");//this checks whether the token is sent from the frontend or not if the token is valid it continues if not access denied
//jsonwebtoken verifies to verify jwt token
const authMiddleware = async (req, res, next) => {   //req>>authmiddleware>>contoller
  try {  //middleware is a function that runs b/w req and res //middle ware runs before the protected routes
    //req--contains everything that client sends headers,body,params , cookie and token
    //res--used to send replyto client
    //if auth successful then go to next function
    //a security guard function that checks if the user is logged in before allowing acces to protected routes
    // 1️⃣ Get token from header
    const authHeader = req.headers.authorization;  //frontend sends token like headers:{authorization bearer$token}

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided, authorization denied"
      });
    }

    const token = authHeader.split(" ")[1];//jwt token if  index 0 bearer  ["Bearer abc123"]===it makes ["bearer","abc123"]

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);   //jwt.verify() checks if a jwt is valid and trustworthy
//it checks if token signature matches secret
    // 3️⃣ Get user from DB
    const user = await User.findById(decoded.id).select("-password");//decoded id means id,iat,exp eliminates password 

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    // 4️⃣ Attach user to request
    req.user = user;   //now controller can access req.user.name,req.user.email,req.user.role

    // 5️⃣ Allow request
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Token is invalid or expired"
    });
  }
};

module.exports = authMiddleware;
//react>>servr.js>>auth route>>contoller me>>response
