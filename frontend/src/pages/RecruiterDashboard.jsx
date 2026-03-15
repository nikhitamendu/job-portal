import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

/* ── Employment type badge colours ── */
const EMP_COLORS = {
  "Full-time":  "text-blue-700 bg-blue-50 border-blue-200",
  "Part-time":  "text-violet-700 bg-violet-50 border-violet-200",
  "Contract":   "text-amber-700 bg-amber-50 border-amber-200",
  "Internship": "text-emerald-700 bg-emerald-50 border-emerald-200",
  "Freelance":  "text-orange-700 bg-orange-50 border-orange-200",
};
const WP_COLORS = {
  "Remote":  "text-emerald-700 bg-emerald-50 border-emerald-200",
  "On-site": "text-slate-700 bg-slate-100 border-slate-200",
  "Hybrid":  "text-indigo-700 bg-indigo-50 border-indigo-200",
};

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs]               = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [filter, setFilter]           = useState("All");
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting]       = useState(false);
  const [toggling, setToggling]       = useState(null); // jobId being toggled

  /* ── Data ── */
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

  /* ── Delete ── */
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

  /* ── Toggle open / closed ── */
  const handleToggleStatus = async (job) => {
    setToggling(job._id);
    try {
      const { data } = await api.patch(`/jobs/${job._id}/toggle`);
      toast.success(data.message);
      // Optimistically update local state
      setJobs(prev =>
        prev.map(j => j._id === job._id ? { ...j, isActive: data.isActive } : j)
      );
    } catch {
      toast.error("Failed to update job status.");
    } finally {
      setToggling(null);
    }
  };

  /* ── Derived stats ── */
  const totalApplicants = useMemo(() =>
    jobs.reduce((s, j) => s + (j.applicationCount ?? 0), 0), [jobs]);
  const activeJobs = jobs.filter(j => j.isActive !== false);
  const closedJobs = jobs.filter(j => j.isActive === false);

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
    if (days < 0)  return { label: "Expired",      cls: "text-red-500 bg-red-50 border-red-200" };
    if (days <= 3) return { label: `${days}d left`, cls: "text-amber-600 bg-amber-50 border-amber-200" };
    return               { label: `${days}d left`, cls: "text-slate-500 bg-slate-50 border-slate-200" };
  };

  /* ════════════════════════════════════ RENDER ════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">

      {/* ── HERO HEADER ── */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0a1f3d] to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

          {/* Top row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl flex-shrink-0">
                {user?.name?.[0]?.toUpperCase() || "R"}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-widest">
                    Recruiter Dashboard
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  Welcome back, {user?.name} 👋
                </h1>
                <p className="text-sm text-white/40 mt-0.5 hidden sm:block">
                  {user?.companyName || user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/recruiter/create-job")}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition-all hover:-translate-y-0.5 self-start sm:self-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M12 4v16m8-8H4" />
              </svg>
              Post a Job
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Listings",   value: jobs.length,       color: "text-white",        sub: "all time" },
              { label: "Active",           value: activeJobs.length, color: "text-emerald-400",  sub: "accepting applications" },
              { label: "Closed",           value: closedJobs.length, color: "text-slate-400",    sub: "no longer accepting" },
              { label: "Total Applicants", value: totalApplicants,   color: "text-blue-300",     sub: "across all listings" },
            ].map(({ label, value, color, sub }) => (
              <div key={label} className="bg-white/[0.07] border border-white/10 rounded-2xl px-4 py-3.5">
                <p className={`text-2xl font-extrabold ${color} leading-none`}>{value}</p>
                <p className="text-[11px] font-semibold text-white/60 mt-1">{label}</p>
                <p className="text-[10px] text-white/25 mt-0.5 hidden sm:block">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">

          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              placeholder="Search by title, location…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl self-start sm:self-auto">
            {["All", "Active", "Closed"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all ${
                  filter === f
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-medium self-center hidden sm:block">
            {filtered.length} of {jobs.length} listing{jobs.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Empty — no jobs at all */}
        {!loading && jobs.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 sm:p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.193.163-.43.295-.69.41m-8.25-5.91a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z" />
              </svg>
            </div>
            <p className="text-base font-bold text-slate-800 mb-1.5">No listings yet</p>
            <p className="text-sm text-slate-400 mb-6 max-w-xs mx-auto">
              Post your first job to start receiving applications from qualified candidates.
            </p>
            <button
              onClick={() => navigate("/recruiter/create-job")}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-blue-100 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M12 4v16m8-8H4" />
              </svg>
              Post a Job
            </button>
          </div>
        )}

        {/* No search/filter results */}
        {!loading && jobs.length > 0 && filtered.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-700 mb-1">No results found</p>
            <p className="text-xs text-slate-400">Try adjusting your search or filter.</p>
          </div>
        )}

        {/* ── Job cards ── */}
        {!loading && filtered.length > 0 && (
          <div className="flex flex-col gap-4">
            {filtered.map((job) => {
              const empCls   = EMP_COLORS[job.employmentType] || "text-slate-600 bg-slate-100 border-slate-200";
              const wpCls    = WP_COLORS[job.workplaceType]   || "text-slate-600 bg-slate-100 border-slate-200";
              const dl       = deadlineInfo(job.applicationDeadline);
              const appCount = job.applicationCount ?? 0;
              const isActive = job.isActive !== false;
              const isToggling = toggling === job._id;

              return (
                <article
                  key={job._id}
                  className={`bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 ${
                    isActive ? "border-slate-200 hover:border-slate-300" : "border-slate-200 opacity-80"
                  }`}
                >
                  {/* Status bar */}
                  <div className={`h-1 w-full ${isActive ? "bg-emerald-400" : "bg-slate-300"}`} />

                  <div className="p-5 sm:p-6">
                    {/* Top row: icon + info + stats */}
                    <div className="flex items-start gap-4">

                      {/* Avatar */}
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-base font-extrabold flex-shrink-0 ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}>
                        {job.title?.[0]?.toUpperCase() || "?"}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-sm font-bold text-slate-900">{job.title}</h3>
                          {!isActive && (
                            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                              Closed
                            </span>
                          )}
                        </div>

                        {/* Meta chips */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {job.location?.city && (
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                              </svg>
                              {job.location.city}
                            </span>
                          )}
                          {job.employmentType && (
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${empCls}`}>
                              {job.employmentType}
                            </span>
                          )}
                          {job.workplaceType && (
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${wpCls}`}>
                              {job.workplaceType}
                            </span>
                          )}
                          {job.experienceLevel && (
                            <span className="text-[11px] text-slate-400">{job.experienceLevel}</span>
                          )}
                        </div>

                        {/* Skills */}
                        {job.skillsRequired?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {job.skillsRequired.slice(0, 5).map((s, i) => (
                              <span key={i} className="text-[10px] font-medium text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                                {s}
                              </span>
                            ))}
                            {job.skillsRequired.length > 5 && (
                              <span className="text-[10px] text-slate-400">+{job.skillsRequired.length - 5}</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Right side: applicants + dates */}
                      <div className="flex-shrink-0 hidden sm:flex flex-col items-end gap-2">
                        <button
                          onClick={() => navigate(`/recruiter/job/${job._id}/applicants`)}
                          className="flex items-center gap-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl px-3.5 py-2 transition group"
                        >
                          <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors"
                            fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                          </svg>
                          <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700 transition-colors">{appCount}</span>
                          <span className="text-[11px] text-slate-400 group-hover:text-blue-500 transition-colors">applicants</span>
                        </button>

                        <div className="text-right space-y-0.5">
                          {job.createdAt && (
                            <p className="text-[10px] text-slate-400">{daysSince(job.createdAt)}</p>
                          )}
                          {dl && (
                            <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${dl.cls}`}>
                              {dl.label}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-slate-100 mt-4 mb-3.5" />

                    {/* Footer: salary + actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                      {/* Salary */}
                      <div>
                        {job.salary?.min || job.salary?.max ? (
                          <span className="text-sm font-semibold text-slate-700">
                            {job.salary.currency || "₹"}
                            {job.salary.min ? `${(job.salary.min / 100000).toFixed(1)}L` : "—"}
                            {job.salary.max ? ` – ${(job.salary.max / 100000).toFixed(1)}L` : ""}
                            <span className="text-xs text-slate-400 font-normal ml-1">
                              / {job.salary.period || "yr"}
                            </span>
                          </span>
                        ) : (
                          <span className="text-xs text-slate-300 italic">Salary not specified</span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 flex-wrap">

                        {/* View Applicants (mobile-only shortcut) */}
                        <button
                          onClick={() => navigate(`/recruiter/job/${job._id}/applicants`)}
                          className="sm:hidden flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition"
                        >
                          👥 {appCount} Applicants
                        </button>

                        <button
                          onClick={() => navigate(`/recruiter/job/${job._id}/applicants`)}
                          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition"
                        >
                          View Applicants
                        </button>

                        <button
                          onClick={() => navigate(`/recruiter/edit-job/${job._id}`)}
                          className="text-xs font-semibold text-blue-700 hover:text-blue-900 px-3 py-2 rounded-xl border border-blue-200 hover:border-blue-300 bg-blue-50 hover:bg-blue-100 transition"
                        >
                          Edit
                        </button>

                        {/* Close / Reopen Toggle */}
                        <button
                          onClick={() => handleToggleStatus(job)}
                          disabled={isToggling}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition disabled:opacity-60 disabled:cursor-not-allowed ${
                            isActive
                              ? "text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-100 hover:border-amber-300"
                              : "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300"
                          }`}
                        >
                          {isToggling ? (
                            <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                          ) : isActive ? (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
                              </svg>
                              Close Job
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                              Reopen
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => setDeleteModal(job)}
                          className="text-xs font-semibold text-red-600 hover:text-red-800 px-3 py-2 rounded-xl border border-red-200 hover:border-red-300 bg-red-50 hover:bg-red-100 transition"
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

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setDeleteModal(null)}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-900">Delete Listing</p>
              <button
                onClick={() => setDeleteModal(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5">
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-900">"{deleteModal.title}"</span>?
              </p>
              <div className="p-3.5 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-xs text-red-600 leading-relaxed">
                  This will permanently remove the listing and all associated application data. This cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => setDeleteModal(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl border border-slate-200 hover:bg-white bg-white transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="text-xs font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
              >
                {deleting && <span className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
