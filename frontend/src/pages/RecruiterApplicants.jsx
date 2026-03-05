import { useEffect, useState } from "react";
import api from "../services/api";

export default function RecruiterApplicants() {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResume, setSelectedResume] = useState(null);

  /* ================= FETCH APPLICANTS ================= */

  const fetchApplicants = async () => {
    try {
      const { data } = await api.get("/applications/recruiter/all");
      setApplications(data);
    } catch (err) {
      console.error("Fetch applicants error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (applicationId, status) => {
    try {
      await api.put(`/applications/${applicationId}/status`, { status });
      fetchApplicants();
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <>
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

                {/* ================= JOB TITLE ================= */}

                <h2 className="text-xl font-semibold mb-3">
                  {app.job?.title}
                </h2>

                {/* ================= APPLICANT DETAILS ================= */}

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
                    {app.applicant?.experience?.length
                      ? app.applicant.experience.map(e => e.role).join(", ")
                      : "Not Provided"}
                  </p>

                  <p>
                    <strong>Education:</strong>{" "}
                    {app.applicant?.education?.length
                      ? app.applicant.education.map(e => e.degree).join(", ")
                      : "Not Provided"}
                  </p>

                </div>

                {/* ================= RESUME ================= */}

                <div className="mt-4">

                  {app.applicant?.resumeFileId ? (

                    <button
                      onClick={() =>
                        setSelectedResume(
                          `http://localhost:5000/api/users/file/${app.applicant.resumeFileId}`
                        )
                      }
                      className="text-blue-600 font-medium hover:underline"
                    >
                      📄 View Resume
                    </button>

                  ) : (

                    <p className="text-gray-500">
                      No Resume Uploaded
                    </p>

                  )}

                </div>

                {/* ================= STATUS BADGE ================= */}

                <div className="mt-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${app.status === "Shortlisted"
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

                {/* ================= STATUS ACTIONS ================= */}

                <div className="mt-4 flex gap-3 flex-wrap">

                  {app.status === "Applied" && (
                    <>
                      <button
                        onClick={() => updateStatus(app._id, "Reviewed")}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      >
                        Review
                      </button>

                      <button
                        onClick={() => updateStatus(app._id, "Rejected")}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {app.status === "Reviewed" && (
                    <>
                      <button
                        onClick={() => updateStatus(app._id, "Shortlisted")}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Shortlist
                      </button>

                      <button
                        onClick={() => updateStatus(app._id, "Rejected")}
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

      {/* ================= RESUME PREVIEW MODAL ================= */}

      {selectedResume && (

        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">

          <div className="bg-white rounded-lg w-[80%] h-[85%] relative shadow-lg">

            {/* Close Button */}

            <button
              onClick={() => setSelectedResume(null)}
              className="absolute top-3 right-4 text-red-600 text-xl font-bold"
            >
              ✕
            </button>

            {/* Resume Viewer */}

            <iframe
              src={selectedResume}
              title="Resume Preview"
              className="w-full h-full rounded-lg"
            />

          </div>

        </div>

      )}

    </>
  );
}