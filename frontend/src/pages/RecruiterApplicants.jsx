// import { useEffect, useState } from "react";
// import api from "../services/api";

// export default function RecruiterApplicants() {

//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedResume, setSelectedResume] = useState(null);

//   /* ================= FETCH APPLICANTS ================= */

//   const fetchApplicants = async () => {
//     try {
//       const { data } = await api.get("/applications/recruiter/all");
//       setApplications(data);
//     } catch (err) {
//       console.error("Fetch applicants error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApplicants();
//   }, []);

//   /* ================= UPDATE STATUS ================= */

//   const updateStatus = async (applicationId, status) => {
//     try {
//       await api.put(`/applications/${applicationId}/status`, { status });
//       fetchApplicants();
//     } catch (err) {
//       console.error("Status update error:", err);
//     }
//   };

//   if (loading) return <p className="p-6">Loading...</p>;

//   return (
//     <>
//       <div className="min-h-screen bg-gray-100 p-6">

//         <div className="max-w-5xl mx-auto">

//           <h1 className="text-3xl font-bold mb-6">
//             All Applicants
//           </h1>

//           {applications.length === 0 ? (
//             <p>No applications yet.</p>
//           ) : (

//             applications.map((app) => (

//               <div
//                 key={app._id}
//                 className="bg-white p-6 rounded-xl shadow mb-6"
//               >

//                 {/* ================= JOB TITLE ================= */}

//                 <h2 className="text-xl font-semibold mb-3">
//                   {app.job?.title}
//                 </h2>

//                 {/* ================= APPLICANT DETAILS ================= */}

//                 <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">

//                   <p>
//                     <strong>Name:</strong> {app.applicant?.name}
//                   </p>

//                   <p>
//                     <strong>Email:</strong> {app.applicant?.email}
//                   </p>

//                   <p>
//                     <strong>Phone:</strong>{" "}
//                     {app.applicant?.phone || "Not Provided"}
//                   </p>

//                   <p>
//                     <strong>Experience:</strong>{" "}
//                     {app.applicant?.experience?.length
//                       ? app.applicant.experience.map(e => e.role).join(", ")
//                       : "Not Provided"}
//                   </p>

//                   <p>
//                     <strong>Education:</strong>{" "}
//                     {app.applicant?.education?.length
//                       ? app.applicant.education.map(e => e.degree).join(", ")
//                       : "Not Provided"}
//                   </p>

//                 </div>

//                 {/* ================= RESUME ================= */}

//                 <div className="mt-4">

//                   {app.applicant?.resumeFileId ? (

//                     <button
//                       onClick={() =>
//                         setSelectedResume(
//                           `http://localhost:5000/api/users/file/${app.applicant.resumeFileId}`
//                         )
//                       }
//                       className="text-blue-600 font-medium hover:underline"
//                     >
//                       📄 View Resume
//                     </button>

//                   ) : (

//                     <p className="text-gray-500">
//                       No Resume Uploaded
//                     </p>

//                   )}

//                 </div>

//                 {/* ================= STATUS BADGE ================= */}

//                 <div className="mt-4">

//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium
//                     ${app.status === "Shortlisted"
//                         ? "bg-green-100 text-green-600"
//                         : app.status === "Rejected"
//                         ? "bg-red-100 text-red-600"
//                         : app.status === "Reviewed"
//                         ? "bg-yellow-100 text-yellow-600"
//                         : "bg-blue-100 text-blue-600"
//                       }`}
//                   >
//                     {app.status}
//                   </span>

//                 </div>

//                 {/* ================= STATUS ACTIONS ================= */}

//                 <div className="mt-4 flex gap-3 flex-wrap">

//                   {app.status === "Applied" && (
//                     <>
//                       <button
//                         onClick={() => updateStatus(app._id, "Reviewed")}
//                         className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
//                       >
//                         Review
//                       </button>

//                       <button
//                         onClick={() => updateStatus(app._id, "Rejected")}
//                         className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}

//                   {app.status === "Reviewed" && (
//                     <>
//                       <button
//                         onClick={() => updateStatus(app._id, "Shortlisted")}
//                         className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                       >
//                         Shortlist
//                       </button>

//                       <button
//                         onClick={() => updateStatus(app._id, "Rejected")}
//                         className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}

//                   {app.status === "Shortlisted" && (
//                     <p className="text-green-600 font-medium">
//                       Candidate Shortlisted ✔
//                     </p>
//                   )}

//                   {app.status === "Rejected" && (
//                     <p className="text-red-600 font-medium">
//                       Candidate Rejected ✖
//                     </p>
//                   )}

//                 </div>

//               </div>

//             ))

//           )}

//         </div>

//       </div>

//       {/* ================= RESUME PREVIEW MODAL ================= */}

//       {selectedResume && (

//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">

//           <div className="bg-white rounded-lg w-[80%] h-[85%] relative shadow-lg">

//             {/* Close Button */}

//             <button
//               onClick={() => setSelectedResume(null)}
//               className="absolute top-3 right-4 text-red-600 text-xl font-bold"
//             >
//               ✕
//             </button>

//             {/* Resume Viewer */}

//             <iframe
//               src={selectedResume}
//               title="Resume Preview"
//               className="w-full h-full rounded-lg"
//             />

//           </div>

//         </div>

//       )}

//     </>
//   );
// }
import { useEffect, useState } from "react";
import api from "../services/api";

const statusConfig = {
  Applied:     { bg: "bg-blue-50",    border: "border-blue-200",    text: "text-blue-700",    dot: "bg-blue-500"    },
  Reviewed:    { bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-700",   dot: "bg-amber-400"   },
  Shortlisted: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500" },
  Rejected:    { bg: "bg-red-50",     border: "border-red-200",     text: "text-red-700",     dot: "bg-red-500"     },
};

export default function RecruiterApplicants() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ── FETCH ── */
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

  /* ── UPDATE STATUS ── */
  const updateStatus = async (applicationId, status) => {
    try {
      await api.put(`/applications/${applicationId}/status`, { status });
      fetchApplicants();
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  /* ── Loading ── */
  if (loading)
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading applicants…</span>
        </div>
      </div>
    );

  /* ── Status counts ── */
  const counts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <div className="min-h-screen bg-slate-100">

        {/* ── Hero Banner ── */}
        <div className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 py-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/35 rounded-full px-3.5 py-1.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">Recruiter</span>
                </div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight">All Applicants</h1>
                <p className="text-sm text-white/50 mt-1">Review and manage all job applications</p>
              </div>

              {/* Total count */}
              <div className="flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl px-4 py-2.5 flex-shrink-0">
                <span className="text-2xl font-extrabold text-white tracking-tight">{applications.length}</span>
                <span className="text-xs text-white/50 font-medium leading-tight">Total<br />Applicants</span>
              </div>
            </div>

            {/* Status summary */}
            {applications.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-5">
                {Object.entries(counts).map(([status, count]) => {
                  const cfg = statusConfig[status] || statusConfig.Applied;
                  return (
                    <div key={status} className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-3 py-1">
                      <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                      <span className="text-xs font-semibold text-white/65">{status}: {count}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="max-w-5xl mx-auto px-6 py-8">

          {/* Empty state */}
          {applications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-base font-bold text-slate-800 mb-1">No applications yet</h3>
              <p className="text-sm text-slate-400">Applications will appear here once candidates apply to your jobs.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => {
                const cfg = statusConfig[app.status] || statusConfig.Applied;
                return (
                  <div key={app._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-200">

                    {/* Card header */}
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xs flex-shrink-0">
                          {app.job?.title?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{app.job?.title || "—"}</p>
                          <p className="text-xs text-slate-400">
                            Applied {new Date(app.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                      {/* Status badge */}
                      <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {app.status}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="px-5 py-4">
                      <div className="flex items-start gap-4">

                        {/* Applicant avatar */}
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-base flex-shrink-0">
                          {app.applicant?.name?.[0]?.toUpperCase() || "?"}
                        </div>

                        {/* Applicant info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900">{app.applicant?.name || "—"}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{app.applicant?.email || "—"}</p>

                          <div className="grid sm:grid-cols-3 gap-2 mt-3">
                            <InfoChip icon="📞" label="Phone" value={app.applicant?.phone || "Not provided"} />
                            <InfoChip
                              icon="💼"
                              label="Experience"
                              value={
                                app.applicant?.experience?.length
                                  ? app.applicant.experience.map((e) => e.role).join(", ")
                                  : "Not provided"
                              }
                            />
                            <InfoChip
                              icon="🎓"
                              label="Education"
                              value={
                                app.applicant?.education?.length
                                  ? app.applicant.education.map((e) => e.degree).join(", ")
                                  : "Not provided"
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Actions row */}
                      <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-slate-100 flex-wrap">

                        {/* Resume button */}
                        {app.applicant?.resumeFileId ? (
                          <a
                            href={`http://localhost:5000/api/users/file/${app.applicant.resumeFileId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
                          >
                            📄 View Resume
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400 italic">No resume uploaded</span>
                        )}

                        <div className="ml-auto flex items-center gap-2 flex-wrap">
                          {app.status === "Applied" && (
                            <>
                              <button
                                onClick={() => updateStatus(app._id, "Reviewed")}
                                className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
                              >
                                👁 Mark Reviewed
                              </button>
                              <button
                                onClick={() => updateStatus(app._id, "Rejected")}
                                className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
                              >
                                ✕ Reject
                              </button>
                            </>
                          )}

                          {app.status === "Reviewed" && (
                            <>
                              <button
                                onClick={() => updateStatus(app._id, "Shortlisted")}
                                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
                              >
                                ✓ Shortlist
                              </button>
                              <button
                                onClick={() => updateStatus(app._id, "Rejected")}
                                className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
                              >
                                ✕ Reject
                              </button>
                            </>
                          )}

                          {app.status === "Shortlisted" && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                              ✓ Candidate Shortlisted
                            </span>
                          )}

                          {app.status === "Rejected" && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg">
                              ✕ Candidate Rejected
                            </span>
                          )}
                        </div>

                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

    </>
  );
}

function InfoChip({ icon, label, value }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
      <p className="text-xs text-slate-400 font-medium mb-0.5">{icon} {label}</p>
      <p className="text-xs font-semibold text-slate-700 truncate">{value}</p>
    </div>
  );
}
