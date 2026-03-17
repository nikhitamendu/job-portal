
import { useEffect, useState, useMemo } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const STATUS = {
  Applied: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", dot: "bg-blue-500", label: "Applied" },
  Reviewed: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", dot: "bg-amber-400", label: "Reviewed" },
  Shortlisted: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500", label: "Shortlisted" },
  Interview: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", dot: "bg-purple-500", label: "Interview" },
  Offer: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", dot: "bg-green-500", label: "Offer 🏆" },
  Rejected: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", dot: "bg-red-500", label: "Rejected" },
};

const STEPS = ["Applied", "Reviewed", "Shortlisted", "Interview", "Offer"];

const stepIndex = (status) => {
  if (status === "Rejected") return -1;
  return STEPS.indexOf(status);
};

const STEP_ACTIVE_CLASS = {
  Applied: "bg-blue-500 border-blue-500 text-white",
  Reviewed: "bg-amber-400 border-amber-400 text-white",
  Shortlisted: "bg-emerald-500 border-emerald-500 text-white",
  Interview: "bg-purple-500 border-purple-500 text-white",
  Offer: "bg-green-500 border-green-500 text-white",
};
const STEP_LINE_ACTIVE = {
  Applied: "bg-blue-400",
  Reviewed: "bg-amber-400",
  Shortlisted: "bg-emerald-400",
  Interview: "bg-purple-400",
  Offer: "bg-green-400",
};

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [withdrawing, setWithdrawing] = useState(null);

  const fetchApplications = () => {
    api.get("/applications/my-applications")
      .then(({ data }) => setApplications(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchApplications(); }, []);

  const handleWithdraw = async (jobId) => {
    if (!window.confirm("Withdraw this application? This cannot be undone.")) return;
    setWithdrawing(jobId);
    try {
      await api.delete(`/applications/withdraw/${jobId}`);
      toast.success("Application withdrawn");
      fetchApplications();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to withdraw");
    }
    setWithdrawing(null);
  };

  const counts = useMemo(() => {
    const c = { All: applications.length, Applied: 0, Reviewed: 0, Shortlisted: 0, Interview: 0, Offer: 0, Rejected: 0 };
    applications.forEach(a => { if (c[a.status] !== undefined) c[a.status]++; });
    return c;
  }, [applications]);

  const filtered = useMemo(() => {
    return applications.filter(app => {
      const matchTab = activeTab === "All" || app.status === activeTab;
      const q = search.toLowerCase();
      const matchSearch = !q ||
        app.job?.title?.toLowerCase().includes(q) ||
        app.job?.postedBy?.name?.toLowerCase().includes(q) ||
        app.job?.location?.city?.toLowerCase().includes(q);
      return matchTab && matchSearch;
    });
  }, [applications, activeTab, search]);

  /* ── Loading ── */
  if (loading) return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium text-slate-500">Loading applications…</span>
      </div>
    </div>
  );

  const offered = counts.Offer;
  const rejected = counts.Rejected;
  const total = applications.length;
  const successRate = total > 0 ? Math.round((offered / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ══ HERO ══ */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0c1a2e 0%, #0f2d52 60%, #1a3a6e 100%)" }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
          <div className="flex items-start justify-between gap-5 flex-wrap">

            {/* Title */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 border"
                style={{ background: "rgba(37,99,235,0.2)", borderColor: "rgba(37,99,235,0.35)" }}
              >
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">Job Seeker</span>
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">My Applications</h1>
              <p className="text-sm mt-1 text-white/45">Track every application and your hiring pipeline</p>
            </div>

            {/* Stat boxes */}
            <div className="flex gap-2.5 flex-wrap">
              {[
                { label: "Total", count: counts.All, color: "text-blue-300" },
                { label: "Interview", count: counts.Interview, color: "text-purple-300" },
                { label: "Offer", count: counts.Offer, color: "text-green-300" },
                { label: "Rejected", count: counts.Rejected, color: "text-red-300" },
              ].map(({ label, count, color }) => (
                <div
                  key={label}
                  className="rounded-xl px-4 py-2.5 text-center min-w-16 border"
                  style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}
                >
                  <p className={`text-xl font-extrabold ${color}`}>{count}</p>
                  <p className="text-xs font-semibold mt-0.5 text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shortlist rate bar */}
          {total > 0 && (
            <div className="mt-5 max-w-xs">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-semibold text-white/45">Shortlist Rate</span>
                <span className="text-xs font-extrabold text-white">{successRate}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${successRate}%`, background: "linear-gradient(90deg, #34d399, #6ee7b7)" }}
                />
              </div>
              <p className="text-xs mt-1.5 text-white/30">
                {offered} offers · {rejected} rejected · {counts.Applied + counts.Reviewed + counts.Shortlisted + counts.Interview} in progress
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ══ TABS ══ */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 flex overflow-x-auto">
          {["All", "Applied", "Reviewed", "Shortlisted", "Interview", "Offer", "Rejected"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${activeTab === tab
                  ? "text-blue-600 border-blue-600"
                  : "text-slate-500 border-transparent hover:text-slate-800"
                }`}
            >
              {tab}
              <span className={`text-xs font-extrabold px-1.5 py-0.5 rounded-full border ${activeTab === tab
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "bg-slate-100 text-slate-400 border-slate-200"
                }`}>
                {counts[tab] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Search bar */}
        {applications.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-3 mb-5 flex items-center gap-3 flex-wrap shadow-sm">
            <div className="relative flex-1 min-w-48">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">🔍</span>
              <input
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition"
                placeholder="Search by job title, company or location…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
              >
                ✕ Clear
              </button>
            )}
            <span className="text-xs font-semibold text-slate-400 ml-auto">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* Empty — no applications */}
        {applications.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm py-20 px-8 text-center">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-base font-bold text-slate-800 mb-2">No applications yet</p>
            <p className="text-sm text-slate-400 mb-6">Start applying to jobs and track your progress here.</p>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-sm"
            >
              Browse Jobs →
            </Link>
          </div>
        )}

        {/* Empty — filtered */}
        {applications.length > 0 && filtered.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm font-bold text-slate-800 mb-1">No results found</p>
            <p className="text-sm text-slate-400">Try a different search term or tab.</p>
          </div>
        )}

        {/* Cards */}
        {filtered.length > 0 && (
          <div className="flex flex-col gap-3">
            {filtered.map((app) => {
              const cfg = STATUS[app.status] || STATUS.Applied;
              const isOpen = expandedId === app._id;
              const sIdx = stepIndex(app.status);
              const isRej = app.status === "Rejected";

              const avatarBg =
                isRej ? "from-red-500 to-red-600" :
                  app.status === "Offer" ? "from-green-500 to-emerald-600" :
                    app.status === "Interview" ? "from-purple-500 to-purple-700" :
                      app.status === "Shortlisted" ? "from-emerald-500 to-emerald-600" :
                        "from-blue-600 to-indigo-600";

              const leftBorder =
                isRej ? "border-l-4 border-l-red-500" :
                  app.status === "Offer" ? "border-l-4 border-l-green-500" :
                    app.status === "Interview" ? "border-l-4 border-l-purple-500" :
                      app.status === "Shortlisted" ? "border-l-4 border-l-emerald-500" :
                        app.status === "Reviewed" ? "border-l-4 border-l-amber-400" :
                          "border-l-4 border-l-blue-500";

              return (
                <div
                  key={app._id}
                  className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${leftBorder}`}
                >
                  {/* Main row */}
                  <div className="p-5 flex items-start gap-4 flex-wrap">

                    {/* Avatar */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${avatarBg} flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0`}>
                      {app.job?.postedBy?.name?.[0]?.toUpperCase() || "?"}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-44">
                      <p className="text-sm font-bold text-slate-900">{app.job?.title || "—"}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {app.job?.postedBy?.name || "—"}
                        {app.job?.location?.city && ` · 📍 ${app.job.location.city}`}
                        {app.job?.employmentType && ` · ${app.job.employmentType}`}
                      </p>
                      {app.job?.salary?.min && (
                        <p className="text-xs text-blue-600 font-semibold mt-0.5">
                          💰 ₹{Number(app.job.salary.min).toLocaleString()} – ₹{Number(app.job.salary.max).toLocaleString()}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 mt-1">
                        Applied {new Date(app.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>

                      {/* Timeline stepper */}
                      {!isRej ? (
                        <div className="flex items-center mt-3">
                          {STEPS.map((step, i) => {
                            const done = sIdx > i;
                            const current = sIdx === i;
                            return (
                              <div key={step} className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
                                <div className="flex flex-col items-center">
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-extrabold flex-shrink-0 transition-all ${done || current
                                      ? `${STEP_ACTIVE_CLASS[step]} ${current ? "ring-2 ring-offset-1" : ""}`
                                      : "bg-white border-slate-200 text-slate-300"
                                    }`}>
                                    {done ? "✓" : current ? "●" : "○"}
                                  </div>
                                  <span className={`text-xs font-semibold mt-1 ${done || current ? cfg.text : "text-slate-300"}`}>
                                    {step}
                                  </span>
                                </div>
                                {i < STEPS.length - 1 && (
                                  <div className={`flex-1 h-0.5 mx-1 mb-4 transition-all ${done ? STEP_LINE_ACTIVE[STEPS[i + 1]] : "bg-slate-200"}`} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700">
                          ✕ Application Rejected
                        </span>
                      )}
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col gap-2 items-end flex-shrink-0">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>

                      <Link
                        to={`/jobs/${app.job?._id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
                      >
                        View Job →
                      </Link>

                      <button
                        onClick={() => setExpandedId(isOpen ? null : app._id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition"
                      >
                        {isOpen ? "▲ Less" : "▼ Details"}
                      </button>

                      {/* Withdraw — only when still Applied */}
                      {app.status === "Applied" && (
                        <button
                          disabled={withdrawing === app.job?._id}
                          onClick={() => handleWithdraw(app.job?._id)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                        >
                          {withdrawing === app.job?._id ? "…" : "✕ Withdraw"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded panel */}
                  <div className={`overflow-y-auto transition-all duration-300 ${isOpen ? "max-h-[480px]" : "max-h-0 overflow-hidden"}`}>
                    <div className="px-5 pb-5 border-t border-slate-100 pt-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        <DetailField icon="🏢" label="Workplace" value={app.job?.workplaceType || "—"} />
                        <DetailField icon="📊" label="Exp. Level" value={app.job?.experienceLevel || "—"} />
                        <DetailField icon="📍" label="Location" value={[app.job?.location?.city, app.job?.location?.country].filter(Boolean).join(", ") || "—"} />
                        <DetailField icon="⏳" label="Deadline" value={app.job?.applicationDeadline ? new Date(app.job.applicationDeadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Not specified"} />
                        <DetailField icon="📧" label="Posted By" value={app.job?.postedBy?.email || "—"} />
                        <DetailField icon="🔖" label="Application ID" value={app._id?.slice(-8).toUpperCase()} mono />
                      </div>

                      {/* Skills */}
                      {app.job?.skillsRequired?.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Skills Required</p>
                          <div className="flex flex-wrap gap-1.5">
                            {(Array.isArray(app.job.skillsRequired) ? app.job.skillsRequired : app.job.skillsRequired.split(","))
                              .map((s, i) => (
                                <span key={i} className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                                  {s.trim()}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Status message */}
                      <div className={`mt-3 px-4 py-2.5 rounded-xl border ${cfg.bg} ${cfg.border}`}>
                        <p className={`text-xs font-bold ${cfg.text}`}>
                          {app.status === "Applied" && "⏳ Your application is under review. Hang tight!"}
                          {app.status === "Reviewed" && "👁 A recruiter has reviewed your profile. You may hear back soon."}
                          {app.status === "Shortlisted" && "🎉 Congratulations! You've been shortlisted. Expect to be contacted."}
                          {app.status === "Interview" && "📅 You've been invited to an interview! Check your notifications for details."}
                          {app.status === "Offer" && "🏆 You've received a job offer! Congratulations — this is a big moment!"}
                          {app.status === "Rejected" && "Unfortunately, your application was not selected this time. Keep applying!"}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        {applications.length > 0 && (
          <div className="mt-6 text-center">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 px-6 py-2.5 rounded-xl transition"
            >
              + Browse More Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

function DetailField({ icon, label, value, mono }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{icon} {label}</p>
      <p className={`text-xs font-semibold text-slate-700 mt-0.5 truncate ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}

export default MyApplications;
