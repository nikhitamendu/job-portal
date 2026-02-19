const Job = require("../models/Job");

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
      postedBy: req.user._id   // 🔥 recruiter id from auth middleware  //you do not trust frontend to send recruiter id //you take it from backend and secure
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
    { title: { $regex: search, $options: "i" } },
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
    const skip = (page - 1) * limit;

    // 🔃 Sorting
    let sortOption = { createdAt: -1 }; // default newest
    if (sort === "oldest") sortOption = { createdAt: 1 };
    if (sort === "salaryHigh") sortOption = { "salary.min": -1 };
    if (sort === "salaryLow") sortOption = { "salary.min": 1 };

    const jobs = await Job.find(query) //filter data
      .populate("postedBy", "name email") //show reecruiter name and email in job listing
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

/* ================= GET SINGLE JOB ================= */
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

module.exports = { createJob, getJobs, getJobById };






