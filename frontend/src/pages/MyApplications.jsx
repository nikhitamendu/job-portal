// import { useEffect, useState } from "react";
// import api from "../services/api"
// import { Link } from "react-router-dom";

// const MyApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchApplications = async () => {
//     try {
//       const { data } = await api.get(
//         "/applications/my-applications"
//       );
//       setApplications(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   if (loading) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6">
//           My Applications
//         </h1>

//         {applications.length === 0 ? (
//           <p>No applications yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {applications.map((app) => (
            
//               <div
//                 key={app._id}
//                 className="bg-white shadow rounded-lg p-6"
//               >
//                 <h2 className="text-xl font-semibold">
//                   {app.job?.title}
//                 </h2>

//                 <p className="text-gray-600">
//                   {app.job?.postedBy?.name}
//                 </p>

//                 <p className="text-sm text-gray-500 mt-2">
//                   Applied on{" "}
//                   {new Date(app.createdAt).toLocaleDateString()}
//                 </p>
//  <span
//       className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
//         app.status === "Shortlisted"
//           ? "bg-green-100 text-green-600"
//           : app.status === "Rejected"
//           ? "bg-red-100 text-red-600"
//           : app.status === "Reviewed"
//           ? "bg-yellow-100 text-yellow-600"
//           : "bg-blue-100 text-blue-600"
//       }`}
//     >
//       {app.status}
//     </span>
//                 <Link
//                   to={`/jobs/${app.job?._id}`}
//                   className="text-blue-600 mt-3 inline-block"
//                 >
//                   View Job →
//                 </Link>
//               </div>
//             ))}
            
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyApplications;
import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const statusConfig = {
  Shortlisted: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500", icon: "✓" },
  Rejected:    { bg: "bg-red-50",     border: "border-red-200",     text: "text-red-700",     dot: "bg-red-500",     icon: "✕" },
  Reviewed:    { bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-700",   dot: "bg-amber-400",   icon: "◎" },
  Applied:     { bg: "bg-blue-50",    border: "border-blue-200",    text: "text-blue-700",    dot: "bg-blue-500",    icon: "→" },
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const { data } = await api.get("/applications/my-applications");
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

  /* ── Loading ── */
  if (loading)
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading applications…</span>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ── Hero Banner ── */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                My Applications
              </h1>
              <p className="text-sm text-white/50 mt-1">
                Track all your job applications in one place
              </p>
            </div>

            {/* Stats pill */}
            <div className="flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl px-4 py-2.5">
              <span className="text-2xl font-extrabold text-white tracking-tight">
                {applications.length}
              </span>
              <span className="text-xs text-white/50 font-medium leading-tight">
                Total<br />Applied
              </span>
            </div>
          </div>

          {/* Status summary bar */}
          {applications.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-5">
              {Object.entries(
                applications.reduce((acc, app) => {
                  acc[app.status] = (acc[app.status] || 0) + 1;
                  return acc;
                }, {})
              ).map(([status, count]) => {
                const cfg = statusConfig[status] || statusConfig.Applied;
                return (
                  <div
                    key={status}
                    className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-3 py-1"
                  >
                    <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                    <span className="text-xs font-semibold text-white/65">
                      {status}: {count}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Empty state */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              No applications yet
            </h3>
            <p className="text-sm text-slate-400 mb-5">
              Start applying to jobs and track your progress here.
            </p>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-sm shadow-blue-200"
            >
              Browse Jobs →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => {
              const cfg = statusConfig[app.status] || statusConfig.Applied;
              return (
                <div
                  key={app._id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-4 hover:border-slate-300 hover:shadow-md transition-all duration-200"
                >
                  {/* Company initial avatar */}
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-base flex-shrink-0">
                    {app.job?.postedBy?.name?.[0]?.toUpperCase() || "?"}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-bold text-slate-900 truncate">
                      {app.job?.title || "—"}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      {app.job?.postedBy?.name || "—"}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Applied on{" "}
                      <span className="font-medium text-slate-500">
                        {new Date(app.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                  </div>

                  {/* Status badge */}
                  <div
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border flex-shrink-0
                      ${cfg.bg} ${cfg.border} ${cfg.text}`}
                  >
                    <span>{cfg.icon}</span>
                    {app.status}
                  </div>

                  {/* View Job */}
                  <Link
                    to={`/jobs/${app.job?._id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 px-3 py-1.5 rounded-lg transition flex-shrink-0"
                  >
                    View Job →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
