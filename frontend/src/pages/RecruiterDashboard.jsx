
// // }
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
//     <div className="min-h-screen bg-slate-100">

//       {/* ── Hero Banner ── */}
//       <div className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
//         <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

//         <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
//           <div className="flex items-center justify-between gap-4">

//             {/* Left: welcome */}
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl flex-shrink-0 border-2 border-white/10">
//                 {user?.name?.[0]?.toUpperCase() || "R"}
//               </div>
//               <div>
//                 <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/35 rounded-full px-3 py-1 mb-1">
//                   <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
//                   <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">Recruiter</span>
//                 </div>
//                 <h1 className="text-2xl font-extrabold text-white tracking-tight">
//                   Welcome back, {user?.name} 👋
//                 </h1>
//                 <p className="text-sm text-white/50 mt-0.5">Manage your job listings and applicants</p>
//               </div>
//             </div>

//             {/* Right: create job button */}
//             <button
//               onClick={() => navigate("/recruiter/create-job")}
//               className="flex-shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-md shadow-blue-900/30 hover:-translate-y-0.5 cursor-pointer"
//             >
//               + Post a Job
//             </button>
//           </div>

//           {/* Stats row */}
//           <div className="flex gap-4 mt-6">
//             {[
//               { num: jobs.length,                                               lbl: "Total Jobs"    },
//               { num: jobs.filter(j => j.isActive !== false).length,            lbl: "Active"        },
//               { num: jobs.filter(j => j.applicationCount > 0).length,          lbl: "With Applicants"},
//             ].map(({ num, lbl }) => (
//               <div key={lbl} className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-2xl px-4 py-2.5">
//                 <span className="text-xl font-extrabold text-white tracking-tight">{num}</span>
//                 <span className="text-xs text-white/45 font-medium leading-tight">{lbl}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── Body ── */}
//       <div className="max-w-6xl mx-auto px-6 py-8">

//         {/* Section header */}
//         <div className="flex items-center justify-between mb-5">
//           <h2 className="text-sm font-bold text-slate-500 tracking-widest uppercase">
//             My Job Listings ({jobs.length})
//           </h2>
//           <button
//             onClick={() => navigate("/recruiter/create-job")}
//             className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition cursor-pointer"
//           >
//             + Post New Job
//           </button>
//         </div>

//         {/* Loading */}
//         {loading && (
//           <div className="flex items-center justify-center py-20">
//             <div className="flex items-center gap-3 text-slate-400">
//               <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
//               <span className="text-sm font-medium">Loading jobs…</span>
//             </div>
//           </div>
//         )}

//         {/* Empty */}
//         {!loading && jobs.length === 0 && (
//           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center">
//             <div className="text-5xl mb-4">📋</div>
//             <h3 className="text-base font-bold text-slate-800 mb-1">No jobs posted yet</h3>
//             <p className="text-sm text-slate-400 mb-5">
//               Create your first job listing to start receiving applications.
//             </p>
//             <button
//               onClick={() => navigate("/recruiter/create-job")}
//               className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-sm shadow-blue-200 cursor-pointer"
//             >
//               + Post a Job
//             </button>
//           </div>
//         )}

//         {/* Job list */}
//         {!loading && jobs.length > 0 && (
//           <div className="space-y-3">
//             {jobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-4 flex items-center gap-4 hover:border-slate-300 hover:shadow-md transition-all duration-200"
//               >
//                 {/* Job avatar */}
//                 <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-base flex-shrink-0">
//                   {job.title?.[0]?.toUpperCase() || "?"}
//                 </div>

//                 {/* Job info */}
//                 <div className="flex-1 min-w-0">
//                   <h4 className="text-sm font-bold text-slate-900 truncate">{job.title}</h4>
//                   <div className="flex items-center gap-2 mt-0.5 flex-wrap">
//                     <span className="text-xs text-slate-400">
//                       📍 {job.location?.city || "Remote"}
//                     </span>
//                     {job.employmentType && (
//                       <span className="text-xs text-slate-400">· {job.employmentType}</span>
//                     )}
//                     {job.experienceLevel && (
//                       <span className="text-xs text-slate-400">· {job.experienceLevel}</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Applicants count */}
//                 <div
//                   onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
//                   className="hidden sm:flex flex-col items-center bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 cursor-pointer hover:bg-blue-50 hover:border-blue-100 transition flex-shrink-0"
//                 >
//                   <span className="text-base font-extrabold text-slate-800 leading-none">
//                     {job.applicationCount ?? "—"}
//                   </span>
//                   <span className="text-xs text-slate-400 mt-0.5">Applicants</span>
//                 </div>

//                 {/* Action buttons */}
//                 <div className="flex items-center gap-2 flex-shrink-0">
//                   <button
//                     onClick={() => navigate(`/recruiter/jobs/${job._id}/applicants`)}
//                     className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
//                   >
//                     👥 Applicants
//                   </button>
//                   <button
//                     onClick={() => navigate(`/recruiter/edit-job/${job._id}`)}
//                     className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
//                   >
//                     ✏️ Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(job._id)}
//                     className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
//                   >
//                     🗑 Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

/* ─────────────────────────────────────────────
   Only fonts + keyframes — no layout styles
───────────────────────────────────────────── */
const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');
    *, *::before, *::after { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
    .mono { font-family: 'DM Mono', monospace; }

    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.97); }
      to   { opacity: 1; transform: scale(1); }
    }
    .anim-up  { animation: fadeSlideUp 0.35s cubic-bezier(0.22,1,0.36,1) both; }
    .anim-in  { animation: scaleIn    0.2s  cubic-bezier(0.22,1,0.36,1) both; }
    .d1 { animation-delay: 0.05s; }
    .d2 { animation-delay: 0.10s; }
    .d3 { animation-delay: 0.15s; }
    .d4 { animation-delay: 0.20s; }
  `}</style>
);

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const EMP_COLORS = {
  "Full-time":  "text-blue-700    bg-blue-50    border-blue-200",
  "Part-time":  "text-violet-700  bg-violet-50  border-violet-200",
  "Contract":   "text-amber-700   bg-amber-50   border-amber-200",
  "Internship": "text-emerald-700 bg-emerald-50 border-emerald-200",
  "Freelance":  "text-orange-700  bg-orange-50  border-orange-200",
};
const WP_COLORS = {
  "Remote":  "text-emerald-700 bg-emerald-50 border-emerald-200",
  "On-site": "text-slate-700   bg-slate-100  border-slate-200",
  "Hybrid":  "text-indigo-700  bg-indigo-50  border-indigo-200",
};

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function RecruiterDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs]               = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [filter, setFilter]           = useState("All");
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting]       = useState(false);

  const fetchMyJobs = async () => {
    try {
      const { data } = await api.get("/jobs/my-jobs");
      setJobs(data.jobs);
    } catch {
      toast.error("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchMyJobs(); }, []);

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/jobs/${deleteModal._id}`);
      toast.success("Job removed.");
      setDeleteModal(null);
      fetchMyJobs();
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setDeleting(false);
    }
  };

  /* derived */
  const totalApplicants = useMemo(() =>
    jobs.reduce((s, j) => s + (j.applicationCount ?? 0), 0), [jobs]);
  const activeJobs  = jobs.filter(j => j.isActive !== false);
  const closedJobs  = jobs.filter(j => j.isActive === false);
  const filledJobs  = jobs.filter(j => (j.applicationCount ?? 0) > 0);
  const fillPct     = jobs.length ? Math.min(Math.round((filledJobs.length / jobs.length) * 100), 100) : 0;

  const filtered = useMemo(() => jobs.filter(job => {
    const matchFilter =
      filter === "All"    ? true :
      filter === "Active" ? job.isActive !== false :
      job.isActive === false;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      job.title?.toLowerCase().includes(q) ||
      job.location?.city?.toLowerCase().includes(q) ||
      job.employmentType?.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  }), [jobs, filter, search]);

  const daysSince = (d) => {
    const days = Math.floor((Date.now() - new Date(d)) / 86_400_000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days}d ago`;
  };

  const deadlineInfo = (d) => {
    if (!d) return null;
    const days = Math.ceil((new Date(d) - Date.now()) / 86_400_000);
    if (days < 0)  return { label: "Expired",       cls: "text-red-500"   };
    if (days <= 3) return { label: `${days}d left`,  cls: "text-amber-500" };
    return               { label: `${days}d left`,  cls: "text-slate-400" };
  };

  /* ════════════ RENDER ════════════ */
  return (
    <div className="min-h-screen bg-slate-50">
      <Fonts />

      {/* ══════════════════════════════
          HEADER
      ══════════════════════════════ */}
      <header className="bg-gradient-to-br from-[#050d1a] via-[#0a1f3d] to-[#0d2a50] relative overflow-hidden">
        {/* Glow blobs — Tailwind can't do radial-gradient, kept as inline only for decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        {/* Grid texture overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
            backgroundSize: "48px 48px"
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 py-8">

          {/* Top row: identity + CTA */}
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mono text-lg font-medium text-white flex-shrink-0">
                {user?.name?.[0]?.toUpperCase() || "R"}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="mono text-[10px] font-medium text-emerald-400 tracking-widest uppercase">
                    Recruiter Dashboard
                  </span>
                </div>
                <h1 className="text-xl font-semibold text-white tracking-tight">{user?.name}</h1>
                <p className="mono text-[11px] text-white/35 mt-0.5">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/recruiter/create-job")}
              className="inline-flex items-center gap-2 bg-white text-slate-900 text-sm font-semibold px-5 py-2.5 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all shadow-md flex-shrink-0"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M12 4v16m8-8H4"/>
              </svg>
              Post a Job
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">
            {[
              { label: "Total Listings",   value: jobs.length,       color: "text-white"       },
              { label: "Active",           value: activeJobs.length, color: "text-emerald-400" },
              { label: "Closed",           value: closedJobs.length, color: "text-slate-400"   },
              { label: "Total Applicants", value: totalApplicants,   color: "text-blue-300"    },
            ].map(({ label, value, color }) => (
              <div key={label}
                className="rounded-2xl px-4 py-3 bg-white/[0.06] border border-white/10">
                <p className={`mono text-2xl font-medium ${color}`}>{value}</p>
                <p className="mono text-[10px] text-white/30 tracking-wide mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Pipeline fill bar */}
          {jobs.length > 0 && (
            <div className="mt-5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="mono text-[10px] text-white/30 tracking-wider uppercase">Pipeline Fill</span>
                <span className="mono text-[10px] text-white/35">
                  {totalApplicants} applicant{totalApplicants !== 1 ? "s" : ""} across {jobs.length} listing{jobs.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="h-1 rounded-full overflow-hidden bg-white/8">
                {/* dynamic width must stay inline */}
                <div className="h-full rounded-full bg-blue-400 transition-all duration-700"
                  style={{ width: `${fillPct}%` }} />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ══════════════════════════════
          BODY
      ══════════════════════════════ */}
      <main className="max-w-5xl mx-auto px-6 md:px-8 py-8">

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">

          {/* Search */}
          <div className="relative flex-1 min-w-52">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none"
              fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition"
              placeholder="Search title, location…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-0.5 bg-white border border-slate-200 rounded-lg p-0.5">
            {["All", "Active", "Closed"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`mono text-xs font-medium px-3 py-1.5 rounded-md transition-all ${
                  filter === f
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <span className="mono text-xs text-slate-400 ml-auto">
            {filtered.length} of {jobs.length}
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
              <div className="absolute inset-0 rounded-full border-2 border-t-slate-700 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            </div>
          </div>
        )}

        {/* Empty — no jobs at all */}
        {!loading && jobs.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center anim-up">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.193.163-.43.295-.69.41m-8.25-5.91a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/>
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-700 mb-1.5">No listings yet</p>
            <p className="text-xs text-slate-400 mb-6 max-w-xs mx-auto leading-relaxed">
              Post your first job to start receiving applications from qualified candidates.
            </p>
            <button
              onClick={() => navigate("/recruiter/create-job")}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M12 4v16m8-8H4"/>
              </svg>
              Post a Job
            </button>
          </div>
        )}

        {/* No search/filter results */}
        {!loading && jobs.length > 0 && filtered.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center anim-up">
            <p className="text-sm font-semibold text-slate-700 mb-1">No results found</p>
            <p className="text-xs text-slate-400">Try adjusting your search or filter.</p>
          </div>
        )}

        {/* Job cards */}
        {!loading && filtered.length > 0 && (
          <div className="flex flex-col gap-3">
            {filtered.map((job, idx) => {
              const empCls   = EMP_COLORS[job.employmentType] || "text-slate-600 bg-slate-100 border-slate-200";
              const wpCls    = WP_COLORS[job.workplaceType]   || "text-slate-600 bg-slate-100 border-slate-200";
              const dl       = deadlineInfo(job.applicationDeadline);
              const appCount = job.applicationCount ?? 0;
              const isActive = job.isActive !== false;

              return (
                <article
                  key={job._id}
                  className={`group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-[0_6px_24px_-6px_rgba(0,0,0,0.09)] transition-all duration-250 anim-up d${Math.min(idx + 1, 4)}`}
                >
                  {/* Status accent line */}
                  <div className={`h-0.5 w-full ${isActive ? "bg-emerald-400/60" : "bg-slate-300/40"}`} />

                  <div className="p-5 md:p-6">
                    <div className="flex items-start gap-4 flex-wrap">

                      {/* Icon */}
                      <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mono text-base font-semibold text-slate-600 flex-shrink-0 select-none">
                        {job.title?.[0]?.toUpperCase() || "?"}
                      </div>

                      {/* Main info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <h3 className="text-sm font-semibold text-slate-900">{job.title}</h3>
                          {!isActive && (
                            <span className="mono text-[10px] font-medium text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                              Closed
                            </span>
                          )}
                        </div>

                        {/* Meta chips */}
                        <div className="flex items-center gap-x-3 gap-y-1.5 flex-wrap mt-1.5">
                          {job.location?.city && (
                            <span className="mono text-[11px] text-slate-400 flex items-center gap-1">
                              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                              </svg>
                              {job.location.city}
                            </span>
                          )}
                          {job.employmentType && (
                            <span className={`mono text-[10px] font-medium px-2 py-0.5 rounded border ${empCls}`}>
                              {job.employmentType}
                            </span>
                          )}
                          {job.workplaceType && (
                            <span className={`mono text-[10px] font-medium px-2 py-0.5 rounded border ${wpCls}`}>
                              {job.workplaceType}
                            </span>
                          )}
                          {job.experienceLevel && (
                            <span className="mono text-[10px] text-slate-400">{job.experienceLevel}</span>
                          )}
                        </div>

                        {/* Skills */}
                        {job.skillsRequired?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {job.skillsRequired.slice(0, 4).map((s, i) => (
                              <span key={i} className="mono text-[10px] text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                                {s}
                              </span>
                            ))}
                            {job.skillsRequired.length > 4 && (
                              <span className="mono text-[10px] text-slate-400 self-center">
                                +{job.skillsRequired.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Right: applicant count + dates */}
                      <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
                        <button
                          onClick={() => navigate(`/recruiter/job/${job._id}/applicants`)}
                          className="flex items-center gap-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl px-3.5 py-2 transition-all group/ap"
                        >
                          <svg className="w-3.5 h-3.5 text-slate-400 group-hover/ap:text-blue-500 transition-colors"
                            fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/>
                          </svg>
                          <span className="mono text-sm font-medium text-slate-700 group-hover/ap:text-blue-700 transition-colors">
                            {appCount}
                          </span>
                          <span className="mono text-[10px] text-slate-400 group-hover/ap:text-blue-500 transition-colors">
                            applicants
                          </span>
                        </button>

                        <div className="text-right space-y-0.5">
                          {job.createdAt && (
                            <p className="mono text-[10px] text-slate-400">{daysSince(job.createdAt)}</p>
                          )}
                          {dl && (
                            <p className={`mono text-[10px] ${dl.cls}`}>{dl.label}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mt-4 mb-3.5" />

                    {/* Footer row */}
                    <div className="flex items-center justify-between gap-3 flex-wrap">

                      {/* Salary */}
                      <div>
                        {job.salary?.min || job.salary?.max ? (
                          <span className="mono text-[11px] text-slate-500">
                            {job.salary.currency || "₹"}
                            {job.salary.min ? `${(job.salary.min / 100000).toFixed(1)}L` : "—"}
                            {job.salary.max ? ` – ${(job.salary.max / 100000).toFixed(1)}L` : ""}
                            {job.salary.period ? ` / ${job.salary.period}` : " / yr"}
                          </span>
                        ) : (
                          <span className="mono text-[10px] text-slate-300 italic">Salary not specified</span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/recruiter/job/${job._id}/applicants`)}
                          className="mono text-[11px] font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all"
                        >
                          View Applicants
                        </button>
                        <button
                          onClick={() => navigate(`/recruiter/edit-job/${job._id}`)}
                          className="mono text-[11px] font-semibold text-blue-700 hover:text-blue-900 px-3 py-1.5 rounded-lg border border-blue-200 hover:border-blue-300 bg-blue-50 hover:bg-blue-100 transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteModal(job)}
                          className="mono text-[11px] font-semibold text-red-600 hover:text-red-800 px-3 py-1.5 rounded-lg border border-red-200 hover:border-red-300 bg-red-50 hover:bg-red-100 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* ══════════════════════════════
          DELETE MODAL
      ══════════════════════════════ */}
      {deleteModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setDeleteModal(null)}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden anim-in">

            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-900">Delete Listing</p>
              <button
                onClick={() => setDeleteModal(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="px-6 py-5">
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-900">"{deleteModal.title}"</span>?
              </p>
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-xs text-red-600 leading-relaxed">
                  This will permanently remove the listing and all associated application data. This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-slate-100 bg-slate-50/60">
              <button
                onClick={() => setDeleteModal(null)}
                className="mono text-xs font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="mono text-xs font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg border border-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
              >
                {deleting && (
                  <span className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
