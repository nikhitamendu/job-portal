const Job = require("../models/Job");
const User = require("../models/User");
const nodemailer = require("nodemailer");

/* ================= CREATE JOB ================= */
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      skillsRequired,
      employmentType,
      workplaceType,
      location,
      salary,
      experienceLevel,
      applicationDeadline
    } = req.body;//data comes from frontend form submission 

    if (!title || !description || !employmentType || !workplaceType) {
      return res.status(400).json({
        message: "Title, description, employment type and workplace type are required"
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements,
      skillsRequired,
      employmentType,
      workplaceType,
      location,
      salary,
      experienceLevel,
      applicationDeadline,
      postedBy: req.user._id   //  recruiter id from auth middleware  //you do not trust frontend to send recruiter id //you take it from backend and secure
    //
    });

    return res.status(201).json({
      message: "Job created successfully",
      job
    });

  } catch (error) {
    console.error("CREATE JOB ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
/* ================= GET ALL JOBS WITH FILTERING ================= */
const getJobs = async (req, res) => {
  try {
    const {
      search,
      city,
      minSalary,
      maxSalary,
      experienceLevel,
      employmentType,
      page = 1,
      limit = 10,
      sort = "newest"
    } = req.query;

    const query = { isActive: true };  //only show jobs that are available and not expired

    // 🔍 Search by title (case-insensitive)
   if (search) {
  query.$or = [
    { title: { $regex: search, $options: "i" } },   //case insensitive search
    { description: { $regex: search, $options: "i" } },
    { "location.city": { $regex: search, $options: "i" } },
    { "location.country": { $regex: search, $options: "i" } },
    { skillsRequired: { $regex: search, $options: "i" } }
  ];
}  //multi field search for better user experience


    // 📍 Filter by city
    if (city) {
      query["location.city"] = { $regex: city, $options: "i" };
    }

    // 💰 Salary range filter
    if (minSalary || maxSalary) {
      query["salary.min"] = {};
      if (minSalary) query["salary.min"].$gte = Number(minSalary);
      if (maxSalary) query["salary.min"].$lte = Number(maxSalary);
    }

    // 🎯 Experience filter
    if (experienceLevel) {
      query.experienceLevel = experienceLevel; 
    }

    // 💼 Employment type filter
    if (employmentType) {
      query.employmentType = employmentType;
    }

    // 📄 Pagination
    const skip = (page - 1) * limit;  //10 per page

    // 🔃 Sorting
    let sortOption = { createdAt: -1 }; // default newest
    if (sort === "oldest") sortOption = { createdAt: 1 };
    if (sort === "salaryHigh") sortOption = { "salary.min": -1 };
    if (sort === "salaryLow") sortOption = { "salary.min": 1 };

    const jobs = await Job.find(query) //filter data
      .populate("postedBy", "name email") //show reecruiter name and email in job listing instead of id
      .sort(sortOption)  //sort data
      .skip(skip)//page start 
      .limit(Number(limit)); //page size number of data per page

    const totalJobs = await Job.countDocuments(query);  //needed for pagination to calculate total pages and show total jobs count in frontend

    res.json({
      totalJobs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalJobs / limit),
      jobs
    });  //page 1234 next--> ,showing 10 of 245 jobs

  } catch (error) {
    console.error("GET JOBS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET SINGLE JOB ================= */  //get/api/jobs/:id
const getJobById = async (req, res) => {  //another backend controller function to get single job details by id when usee clicks on job listing to see details 
  try {  //asyn calls because database call takes time
    const job = await Job.findById(req.params.id)  //req.params.id /api/jobs/:id 
      .populate("postedBy", "name email");

    if (!job || !job.isActive) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.json(job);

  } catch (error) {
    console.error("GET JOB BY ID ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
/* ================= GET RECRUITER JOBS ================= */
const getMyJobs = async (req, res) => {
  try {
    console.log("User:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "User missing in request" });
    }

    if (req.user.role !== "recruiter") {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const jobs = await Job.find({
      postedBy: req.user._id
    }).sort({ createdAt: -1 });  //shows recruiter only the jobs they posted

    res.json({
      count: jobs.length,
      jobs
    });

  } catch (error) {
    console.error("GET MY JOBS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//for deleting
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,  //by thsi only find the job
      postedBy: req.user._id //must belong to logged in user
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("DELETE JOB ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE JOB ================= */
const updateJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      postedBy: req.user._id   // ensure only owner recruiter can edit
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const {
      title,
      description,
      requirements,
      skillsRequired,
      employmentType,
      workplaceType,
      location,
      salary,
      experienceLevel,
      applicationDeadline
    } = req.body;

    if (title !== undefined) job.title = title;
    if (description !== undefined) job.description = description;
    if (requirements !== undefined) job.requirements = requirements;
    if (skillsRequired !== undefined) job.skillsRequired = skillsRequired;
    if (employmentType !== undefined) job.employmentType = employmentType;
    if (workplaceType !== undefined) job.workplaceType = workplaceType;
    if (location !== undefined) job.location = location;
    if (salary !== undefined) job.salary = salary;
    if (experienceLevel !== undefined) job.experienceLevel = experienceLevel;
    if (applicationDeadline !== undefined) job.applicationDeadline = applicationDeadline;

    await job.save();

    res.json({
      message: "Job updated successfully",
      job
    });

  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createJob, getJobs, getJobById,getMyJobs,deleteJob,updateJob };






