// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import { toast } from "react-toastify";

// export default function RecruiterDashboard() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchMyJobs();
//   }, []);

//   const fetchMyJobs = async () => {
//     try {
//       const { data } = await api.get("/jobs/my-jobs");
//       setJobs(data.jobs);
//     } catch (err) {
//       console.error("Error fetching jobs");
//       toast.error("Failed to load jobs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/jobs/${id}`);
//       toast.success("Job deleted successfully");
//       fetchMyJobs();
//     } catch (err) {
//       toast.error("Failed to delete job");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10">
//       <div className="max-w-6xl mx-auto px-6 space-y-6">

//         {/* Welcome Section */}
//         <div className="bg-white border rounded-xl p-6 flex justify-between items-center">
//           <div>
//             <h2 className="text-2xl font-bold">
//               Welcome, {user?.name} 👋
//             </h2>
//             <p className="text-gray-500 text-sm">
//               Manage your posted jobs
//             </p>
//           </div>

//           <button
//             onClick={() => navigate("/recruiter/create-job")}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
//           >
//             + Create Job
//           </button>
//         </div>

//         {/* Job List */}
//         <div className="bg-white border rounded-xl p-6">
//           <h3 className="text-lg font-semibold mb-4">
//             My Jobs ({jobs.length})
//           </h3>

//           {loading ? (
//             <p className="text-gray-500">Loading jobs...</p>
//           ) : jobs.length === 0 ? (
//             <p className="text-gray-400">No jobs posted yet.</p>
//           ) : (
//             <div className="space-y-4">
//               {jobs.map((job) => (
//                 <div
//                   key={job._id}
//                   className="border rounded-lg p-4 flex justify-between items-center hover:shadow-sm transition"
//                 >
//                   <div>
//                     <h4 className="font-semibold">
//                       {job.title}
//                     </h4>
//                     <p className="text-sm text-gray-500">
//                       {job.location?.city || "Remote"}
//                     </p>
//                   </div>

//                <div className="flex gap-4 text-sm">
 

  

//   <button
//     onClick={() => navigate(`/recruiter/edit-job/${job._id}`)}
//     className="text-green-600"
//   >
//     Edit
//   </button>

//   <button
//     onClick={() => handleDelete(job._id)}
//     className="text-red-600"
//   >
//     Delete
//   </button>
// </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }
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
    <div className="min-h-screen bg-slate-100">

      {/* ── Hero Banner ── */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between gap-4">

            {/* Left: welcome */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl flex-shrink-0 border-2 border-white/10">
                {user?.name?.[0]?.toUpperCase() || "R"}
              </div>
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/35 rounded-full px-3 py-1 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">Recruiter</span>
                </div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  Welcome back, {user?.name} 👋
                </h1>
                <p className="text-sm text-white/50 mt-0.5">Manage your job listings and applicants</p>
              </div>
            </div>

            {/* Right: create job button */}
            <button
              onClick={() => navigate("/recruiter/create-job")}
              className="flex-shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-md shadow-blue-900/30 hover:-translate-y-0.5 cursor-pointer"
            >
              + Post a Job
            </button>
          </div>

          {/* Stats row */}
          <div className="flex gap-4 mt-6">
            {[
              { num: jobs.length,                                               lbl: "Total Jobs"    },
              { num: jobs.filter(j => j.isActive !== false).length,            lbl: "Active"        },
              { num: jobs.filter(j => j.applicationCount > 0).length,          lbl: "With Applicants"},
            ].map(({ num, lbl }) => (
              <div key={lbl} className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-2xl px-4 py-2.5">
                <span className="text-xl font-extrabold text-white tracking-tight">{num}</span>
                <span className="text-xs text-white/45 font-medium leading-tight">{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Section header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-bold text-slate-500 tracking-widest uppercase">
            My Job Listings ({jobs.length})
          </h2>
          <button
            onClick={() => navigate("/recruiter/create-job")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition cursor-pointer"
          >
            + Post New Job
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-slate-400">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Loading jobs…</span>
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && jobs.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-base font-bold text-slate-800 mb-1">No jobs posted yet</h3>
            <p className="text-sm text-slate-400 mb-5">
              Create your first job listing to start receiving applications.
            </p>
            <button
              onClick={() => navigate("/recruiter/create-job")}
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-sm shadow-blue-200 cursor-pointer"
            >
              + Post a Job
            </button>
          </div>
        )}

        {/* Job list */}
        {!loading && jobs.length > 0 && (
          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-4 hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                {/* Job avatar */}
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-base flex-shrink-0">
                  {job.title?.[0]?.toUpperCase() || "?"}
                </div>

                {/* Job info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{job.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-xs text-slate-400">
                      📍 {job.location?.city || "Remote"}
                    </span>
                    {job.employmentType && (
                      <span className="text-xs text-slate-400">· {job.employmentType}</span>
                    )}
                    {job.experienceLevel && (
                      <span className="text-xs text-slate-400">· {job.experienceLevel}</span>
                    )}
                  </div>
                </div>

                {/* Applicants count */}
                <div
                  onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                  className="hidden sm:flex flex-col items-center bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 cursor-pointer hover:bg-blue-50 hover:border-blue-100 transition flex-shrink-0"
                >
                  <span className="text-base font-extrabold text-slate-800 leading-none">
                    {job.applicationCount ?? "—"}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5">Applicants</span>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
                  >
                    👥 Applicants
                  </button>
                  <button
                    onClick={() => navigate(`/recruiter/edit-job/${job._id}`)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
