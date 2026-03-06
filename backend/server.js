const express = require("express");  //to create server and handle the roots //handles http requests 
const mongoose = require("mongoose"); //odm to interact with database using schemas
const cors = require("cors");//connect frontend //allows react different port to access baqckend
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();  //this line creates backend server object //everu request from frontend first enters app
app.set("trust proxy", 1); //for deployment for cookies
const userRoutes = require("./routes/userRoutes");  //require means import the file use means register the routes in express
const { GridFSBucket } = require("mongodb");
app.use(express.json());  //converts frontend json req in js object
const allowedOrigins = [
  "http://localhost:5173",
  // "https://job-portal-frontend-latest.onrender.com"
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);
app.use(cookieParser());  
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/protected", require("./routes/protectedRoutes"));
app.use("/api/users", userRoutes);
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
  }
}
mongoose.connection.once("open", () => {
  const bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads"
  });
  app.locals.bucket = bucket;
});
startServer();