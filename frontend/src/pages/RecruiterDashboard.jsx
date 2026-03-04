import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const { data } = await api.get("/jobs/my-jobs");
      setJobs(data.jobs);
    } catch (err) {
      console.error("Error fetching jobs");
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/jobs/${id}`);
      toast.success("Job deleted successfully");
      fetchMyJobs();
    } catch (err) {
      toast.error("Failed to delete job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6 space-y-6">

        {/* Welcome Section */}
        <div className="bg-white border rounded-xl p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome, {user?.name} 👋
            </h2>
            <p className="text-gray-500 text-sm">
              Manage your posted jobs
            </p>
          </div>

          <button
            onClick={() => navigate("/recruiter/create-job")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            + Create Job
          </button>
        </div>

        {/* Job List */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">
            My Jobs ({jobs.length})
          </h3>

          {loading ? (
            <p className="text-gray-500">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-400">No jobs posted yet.</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="border rounded-lg p-4 flex justify-between items-center hover:shadow-sm transition"
                >
                  <div>
                    <h4 className="font-semibold">
                      {job.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {job.location?.city || "Remote"}
                    </p>
                  </div>

               <div className="flex gap-4 text-sm">
 

  

  <button
    onClick={() => navigate(`/recruiter/edit-job/${job._id}`)}
    className="text-green-600"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(job._id)}
    className="text-red-600"
  >
    Delete
  </button>
</div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}