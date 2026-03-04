import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

 const fetchJob = async () => {
  try {
    const { data } = await api.get(`/jobs/${id}`);
    setJob(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const handleApply = async () => {
  try {
    setApplying(true);

    const { data } = await api.post(
      `/applications/apply/${job._id}`
    );

    toast.success(data.message);
    setApplied(true);
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Application failed"
    );
  } finally {
    setApplying(false);
  }
};

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!job) return <p className="p-6">Job not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>

        <p className="text-gray-600 mb-4">
          Posted by {job.postedBy?.name} ({job.postedBy?.email})
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
          <p><strong>Employment:</strong> {job.employmentType}</p>
          <p><strong>Workplace:</strong> {job.workplaceType}</p>
          <p><strong>Experience:</strong> {job.experienceLevel}</p>
          <p>
            <strong>Location:</strong> {job.location?.city}, {job.location?.country}
          </p>
          <p>
            <strong>Salary:</strong> ₹{job.salary?.min} - ₹{job.salary?.max}
          </p>
          <p>
            <strong>Deadline:</strong>{" "}
            {job.applicationDeadline
              ? new Date(job.applicationDeadline).toLocaleDateString()
              : "Not specified"}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{job.description}</p>
        </div>

        {job.requirements && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Requirements</h2>
            <p className="text-gray-700">{job.requirements}</p>
          </div>
        )}

        {job.skillsRequired && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Skills Required</h2>
            <p className="text-gray-700">{job.skillsRequired}</p>
          </div>
        )}

        {/* APPLY BUTTON */}
        {user?.role !== "recruiter" && (
          <button
            onClick={handleApply}
            disabled={applying || applied}
            className={`px-6 py-2 rounded-lg text-white transition ${
              applied
                ? "bg-green-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {applied ? "Applied ✔" : applying ? "Applying..." : "Apply Now"}
          </button>
        )}

      </div>
    </div>
  );
};

export default JobDetails;