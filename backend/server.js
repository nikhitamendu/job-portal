const express = require("express");  //to create server and handle the roots //handles http requests 
const mongoose = require("mongoose"); //odm to interact with database using schemas
const cors = require("cors");//connect frontend //allows react different port to access baqckend
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();  //this line creates backend server object //everu request from frontend first enters app
app.set("trust proxy", 1); //for deployment for cookies
const userRoutes = require("./routes/userRoutes");  //require means import the file use means register the routes in express
const { GridFSBucket } = require("mongodb");


/* =======================
   GLOBAL MIDDLEWARE
======================= */
app.use(express.json());  //converts frontend json req in js object
//supoose frontend sends email:nikjbnjmk backend recieves req.body.email

app.use(
  cors({
   origin: ["http://localhost:5173","https://job-portal-frontend-latest.onrender.com"],
    credentials: true,
  })//react localhost:5173backend:local host 5000
  //since frontend and backend run on different ports,browser blocks request due to some origing policy.so i enabled cors to all react to communicare with bACJEND
);

app.use(cookieParser());  //used for authentication systems

/* =======================
   ROUTES
======================= */    //attach all routes inside userRoutes to thr 
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
    await mongoose.connect(process.env.MONGO_URI)   //we used async await because to connect with database it may take some time and we want to start the server only after the database is connected successfully.
    
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

  app.locals.bucket = bucket;   //stores files (resume )  using gridfs mongodb document =16mb,resume pfd are bigger so we store them as chunks
});

startServer();
