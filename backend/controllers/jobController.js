
const Job = require("../models/Job");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");
const { createNotification } = require("./notificationController");

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

    res.status(201).json({
      message: "Job created successfully",
      job
    });

    // --- Automatic Matching Logic ---
    try {
      const recruiter = await User.findById(req.user._id); //to know who posted the job
      if (job.skillsRequired && job.skillsRequired.length > 0) {
        // Find users with role "user" who have at least ONE matching skill
        const matchingUsers = await User.find({
          role: "user",
          skills: { $in: job.skillsRequired.map(s => s.toLowerCase()) }
        });
        console.log(`Matching logic: Found ${matchingUsers.length} users with skills: ${job.skillsRequired}`);
//for sending notification~~
        for (const user of matchingUsers) {
          console.log(`Sending match alert to: ${user.email}`);
          // Send In-app Notification
          await createNotification({
            recipient: user._id,
            sender: req.user._id,
            type: "job_match",
            message: `New Match! A job for "${job.title}" matching your skills was posted by ${recruiter.companyName || recruiter.name}`,
            link: `/jobs/${job._id}`,
          });

          // Send Email
          const emailHtml = `
            <div style="font-family: sans-serif; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
              <div style="background: #2563eb; color: white; padding: 24px; text-align: center;">
                <h2 style="margin: 0; font-size: 20px;">New Job Match Detected!</h2>
              </div>
              <div style="padding: 32px; background: white;">
                <p style="font-size: 16px; margin-bottom: 16px;">Hi <strong>${user.name}</strong>,</p>
                <p style="margin-bottom: 24px;">We found a new job opening that perfectly matches your skill set!</p>
                
                <div style="background: #f8fafc; border-radius: 10px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
                  <h3 style="margin: 0 0 8px 0; color: #0f172a;">${job.title}</h3>
                  <p style="margin: 0 0 4px 0; font-weight: 600; color: #475569;">${recruiter.companyName || "Professional Recruiter"}</p>
                  <p style="margin: 0 0 12px 0; color: #64748b; font-size: 14px;">📍 ${job.location?.city || "Remote"}, ${job.location?.country || ""}</p>
                  <p style="margin: 0; color: #334155; font-size: 14px;">${job.description.substring(0, 150)}...</p>
                </div>
                
                <div style="text-align: center;">
                  <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/jobs/${job._id}" 
                     style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px;">
                    View & Apply Now
                  </a>
                </div>
              </div>
              <div style="background: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
                You're receiving this because of your matching skills on HireHub.
              </div>
            </div>
          `;

          await sendEmail(user.email, `New Match: ${job.title} at ${recruiter.companyName || recruiter.name}`, emailHtml);
        }
      }
    } catch (notifErr) {
      console.error("MATCH NOTIFICATION ERROR:", notifErr);
    }

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
      workplaceType,
      page = 1,
      limit = 10,
      sort = "newest"
    } = req.query;

    const query = { isActive: true };

    if (workplaceType) {
      query.workplaceType = workplaceType;
    }

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

    // 📅 Date posted filter
    if (req.query.datePosted) {  ///jobs?datePosted=week
      const now = new Date();
      let dateLimit;
      if (req.query.datePosted === "today") dateLimit = new Date(now.setDate(now.getDate() - 1));
      else if (req.query.datePosted === "3days") dateLimit = new Date(now.setDate(now.getDate() - 3));
      else if (req.query.datePosted === "week") dateLimit = new Date(now.setDate(now.getDate() - 7));
      else if (req.query.datePosted === "month") dateLimit = new Date(now.setMonth(now.getMonth() - 1));

      if (dateLimit) {
        query.createdAt = { $gte: dateLimit };
      }
    }

    // 📄 Pagination
    const skip = (page - 1) * limit;  

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


/* ================= TOGGLE JOB STATUS (Open / Closed) ================= */
const toggleJobStatus = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.id,
      postedBy: req.user._id
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.isActive = !job.isActive;
    await job.save();

    res.json({
      message: `Job ${job.isActive ? "reopened" : "closed"} successfully`,
      isActive: job.isActive
    });
  } catch (error) {
    console.error("TOGGLE JOB STATUS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createJob, getJobs, getJobById, getMyJobs, deleteJob, updateJob, toggleJobStatus };





