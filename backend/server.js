const express = require("express");  //to create server and handle the roots
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const userRoutes = require("./routes/userRoutes");
const { GridFSBucket } = require("mongodb");


/* =======================
   GLOBAL MIDDLEWARE
======================= */
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

/* =======================
   ROUTES
======================= */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/protected", require("./routes/protectedRoutes"));

app.use("/api/users", userRoutes);
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));



/* =======================
   SERVER START
======================= */
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);   //we used async await because to connect with database it may take some time and we want to start the server only after the database is connected successfully.
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
