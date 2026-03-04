import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const JobApplicants = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    try {
      const { data } = await api.get(
        `/applications/job/${jobId}`
      );
      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = async (applicationId, newStatus) => {
  try {
    await api.put(
      `/applications/${applicationId}/status`,
      { status: newStatus }
    );

    // Refresh applicants list
    fetchApplicants();
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Applicants
        </h1>

        {applications.length === 0 ? (
          <p>No applicants yet.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white shadow rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold">
                  {app.applicant?.name}
                </h2>

                <p className="text-gray-600">
                  {app.applicant?.email}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Applied on{" "}
                  {new Date(app.createdAt).toLocaleDateString()}
                </p>

                <select
  value={app.status}
  onChange={(e) =>
    handleStatusChange(app._id, e.target.value)
  }
  className="mt-2 border rounded px-2 py-1 text-sm"
>
  <option value="Applied">Applied</option>
  <option value="Reviewed">Reviewed</option>
  <option value="Shortlisted">Shortlisted</option>
  <option value="Rejected">Rejected</option>
</select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicants;