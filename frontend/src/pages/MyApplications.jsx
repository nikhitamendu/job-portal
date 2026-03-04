import { useEffect, useState } from "react";
import api from "../services/api"
import { Link } from "react-router-dom";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const { data } = await api.get(
        "/applications/my-applications"
      );
      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white shadow rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold">
                  {app.job?.title}
                </h2>

                <p className="text-gray-600">
                  {app.job?.postedBy?.name}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Applied on{" "}
                  {new Date(app.createdAt).toLocaleDateString()}
                </p>
 <span
      className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
        app.status === "Shortlisted"
          ? "bg-green-100 text-green-600"
          : app.status === "Rejected"
          ? "bg-red-100 text-red-600"
          : app.status === "Reviewed"
          ? "bg-yellow-100 text-yellow-600"
          : "bg-blue-100 text-blue-600"
      }`}
    >
      {app.status}
    </span>
                <Link
                  to={`/jobs/${app.job?._id}`}
                  className="text-blue-600 mt-3 inline-block"
                >
                  View Job →
                </Link>
              </div>
            ))}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;