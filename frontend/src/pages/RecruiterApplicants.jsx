import { useEffect, useState } from "react";
import api from "../services/api";

export default function RecruiterApplicants() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    try {
      const { data } = await api.get(
        "/applications/recruiter/all"
      );
      setApplications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const updateStatus = async (applicationId, status) => {
    try {
      await api.put(`/applications/${applicationId}/status`, {
        status,
      });
      fetchApplicants();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          All Applicants
        </h1>

        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          applications.map((app) => (
            <div
              key={app._id}
              className="bg-white p-6 rounded-xl shadow mb-6"
            >
              {/* Job Title */}
              <h2 className="text-xl font-semibold mb-3">
                {app.job?.title}
              </h2>

              {/* Applicant Details */}
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <p>
                  <strong>Name:</strong> {app.applicant?.name}
                </p>

                <p>
                  <strong>Email:</strong> {app.applicant?.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {app.applicant?.phone || "Not Provided"}
                </p>

                <p>
                  <strong>Experience:</strong>{" "}
                  {app.applicant?.experience || "Not Provided"}
                </p>

                <p>
                  <strong>Education:</strong>{" "}
                  {app.applicant?.education || "Not Provided"}
                </p>
              </div>

              {/* Resume */}
              {app.applicant?.resume && (
                <div className="mt-4">
                  <a
                    href={`http://localhost:5000/api/resume/${app.applicant.resumeFileId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View Resume
                  </a>
                  
                </div>
              )}
              

              {/* Status Badge */}
              <div className="mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
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
              </div>

              {/* Strict Workflow Buttons */}
              <div className="mt-4 flex gap-3 flex-wrap">
                {app.status === "Applied" && (
                  <>
                    <button
                      onClick={() =>
                        updateStatus(app._id, "Reviewed")
                      }
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Review
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(app._id, "Rejected")
                      }
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </>
                )}

                {app.status === "Reviewed" && (
                  <>
                    <button
                      onClick={() =>
                        updateStatus(app._id, "Shortlisted")
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Shortlist
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(app._id, "Rejected")
                      }
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </>
                )}

                {app.status === "Shortlisted" && (
                  <p className="text-green-600 font-medium">
                    Candidate Shortlisted ✔
                  </p>
                )}

                {app.status === "Rejected" && (
                  <p className="text-red-600 font-medium">
                    Candidate Rejected ✖
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}