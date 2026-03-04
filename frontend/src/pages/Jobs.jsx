import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    city: "",
    employmentType: "",
    sort: "newest",
    page: 1,
  });

 const fetchJobs = async () => {
  try {
    setLoading(true);

    const { data } = await axios.get("/api/jobs", {
      params: filters,
    });

    console.log("API Response:", data);

    // Handle both possible structures safely
    if (Array.isArray(data)) {
      setJobs(data);
    } else if (Array.isArray(data.jobs)) {
      setJobs(data.jobs);
    } else {
      setJobs([]);
    }

  } catch (error) {
    console.error(error);
    setJobs([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Find Your Dream Job</h1>

      {/* 🔍 SEARCH + SORT SECTION */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          className="border p-2 rounded w-full"
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value, page: 1 })
          }
        />

        <select
          className="border p-2 rounded"
          value={filters.sort}
          onChange={(e) =>
            setFilters({ ...filters, sort: e.target.value })
          }
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="salaryHigh">Salary High</option>
          <option value="salaryLow">Salary Low</option>
        </select>
      </div>

      {/* 🧾 JOB LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;