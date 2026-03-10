
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

/* ── Status config ── */
const STATUS = {
  Applied:     { bg: "bg-blue-50",    border: "border-blue-200",    text: "text-blue-700",    dot: "bg-blue-500",    hex: "#3b82f6" },
  Reviewed:    { bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-800",   dot: "bg-amber-400",   hex: "#f59e0b" },
  Shortlisted: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-800", dot: "bg-emerald-500", hex: "#10b981" },
  Rejected:    { bg: "bg-red-50",     border: "border-red-200",     text: "text-red-800",     dot: "bg-red-500",     hex: "#ef4444" },
};

const WORKFLOW = {
  Applied:     ["Reviewed", "Rejected"],
  Reviewed:    ["Shortlisted", "Rejected"],
  Shortlisted: [],
  Rejected:    [],
};

const BTN_NEXT = {
  Reviewed:    "text-amber-800   bg-amber-50   border-amber-200   hover:bg-amber-100",
  Shortlisted: "text-emerald-800 bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
  Rejected:    "text-red-800     bg-red-50     border-red-200     hover:bg-red-100",
};

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
const JobApplicants = () => {
  const { jobId }  = useParams();
  const navigate   = useNavigate();

  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle]         = useState("");
  const [loading, setLoading]           = useState(true);
  const [updatingId, setUpdatingId]     = useState(null);

  const [search,    setSearch]    = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const [profileModal, setProfileModal] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);

  /* ── Fetch ── */
  const fetchApplicants = async () => {
    try {
      const { data } = await api.get(`/applications/job/${jobId}`);
      setApplications(data);
      if (data[0]?.job?.title) setJobTitle(data[0].job.title);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load applicants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplicants(); }, [jobId]);

  /* ── Status update ── */
  const requestStatusChange = (appId, status, name) =>
    setConfirmModal({ appId, status, name });

  const confirmStatusUpdate = async () => {
    const { appId, status } = confirmModal;
    setUpdatingId(appId);
    setConfirmModal(null);
    try {
      await api.put(`/applications/${appId}/status`, { status });
      toast.success(`Marked as "${status}"`);
      await fetchApplicants();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed.");
    } finally {
      setUpdatingId(null);
    }
  };

  /* ── Derived ── */
  const counts = useMemo(() => {
    const c = { All: applications.length, Applied: 0, Reviewed: 0, Shortlisted: 0, Rejected: 0 };
    applications.forEach(a => { if (c[a.status] !== undefined) c[a.status]++; });
    return c;
  }, [applications]);

  const filtered = useMemo(() => {
    return applications.filter(app => {
      const matchTab    = activeTab === "All" || app.status === activeTab;
      const q           = search.toLowerCase();
      const matchSearch = !q ||
        app.applicant?.name?.toLowerCase().includes(q) ||
        app.applicant?.email?.toLowerCase().includes(q);
      return matchTab && matchSearch;
    });
  }, [applications, activeTab, search]);

  /* ── Loading ── */
  if (loading) return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium text-slate-500">Loading applicants…</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ══ HERO ══ */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0c1a2e 0%, #0f2d52 60%, #1a3a6e 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border mb-5 transition"
            style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
          >
            ← Back
          </button>

          <div className="flex items-start justify-between gap-5 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 border"
                style={{ background: "rgba(37,99,235,0.2)", borderColor: "rgba(37,99,235,0.35)" }}>
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">Job Applicants</span>
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">{jobTitle || "Applicants"}</h1>
              <p className="text-sm mt-1.5 text-white/45">Review and manage candidates for this position</p>
            </div>

            {/* Stat boxes */}
            <div className="flex gap-2.5 flex-wrap">
              {[
                { label: "Total",       count: counts.All,         color: "text-blue-300"    },
                { label: "Applied",     count: counts.Applied,     color: "text-blue-300"    },
                { label: "Reviewed",    count: counts.Reviewed,    color: "text-yellow-300"  },
                { label: "Shortlisted", count: counts.Shortlisted, color: "text-emerald-300" },
                { label: "Rejected",    count: counts.Rejected,    color: "text-red-300"     },
              ].map(({ label, count, color }) => (
                <div key={label} className="rounded-xl px-4 py-2.5 text-center min-w-14 border"
                  style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}>
                  <p className={`text-lg font-extrabold ${color}`}>{count}</p>
                  <p className="text-xs font-semibold mt-0.5 text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline progress bars */}
          {applications.length > 0 && (
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Applied", "Reviewed", "Shortlisted", "Rejected"].map(s => {
                const pct = Math.round((counts[s] / applications.length) * 100);
                return (
                  <div key={s} className="rounded-xl px-3.5 py-2.5"
                    style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs font-semibold text-white/50">{s}</span>
                      <span className="text-xs font-bold text-white">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden bg-white/10">
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: STATUS[s].hex }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ══ TABS ══ */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 flex overflow-x-auto">
          {["All", "Applied", "Reviewed", "Shortlisted", "Rejected"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "text-blue-600 border-blue-600"
                  : "text-slate-500 border-transparent hover:text-slate-800"
              }`}
            >
              {tab}
              <span className={`text-xs font-extrabold px-1.5 py-0.5 rounded-full border ${
                activeTab === tab
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "bg-slate-100 text-slate-400 border-slate-200"
              }`}>
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Filter bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 mb-5 flex items-center gap-3 flex-wrap shadow-sm">
          <div className="relative flex-1 min-w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">🔍</span>
            <input
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition"
              placeholder="Search by name or email…"
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

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center">
            <div className="text-5xl mb-3">👥</div>
            <p className="text-sm font-bold text-slate-800 mb-1">
              {applications.length === 0 ? "No applicants yet" : "No results found"}
            </p>
            <p className="text-sm text-slate-400">
              {applications.length === 0
                ? "Applications will appear here once candidates apply."
                : "Try adjusting your search or tab filter."}
            </p>
          </div>
        )}

        {/* Applicant cards */}
        {filtered.length > 0 && (
          <div className="flex flex-col gap-3">
            {filtered.map((app) => {
              const cfg        = STATUS[app.status] || STATUS.Applied;
              const nextSteps  = WORKFLOW[app.status] || [];
              const isUpdating = updatingId === app._id;

              return (
                <div key={app._id}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

                  {/* Card header */}
                  <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-400">
                      Applied {new Date(app.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {app.status}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <div className="flex items-start gap-4 flex-wrap">

                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0">
                        {app.applicant?.name?.[0]?.toUpperCase() || "?"}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-44">
                        <p className="text-sm font-bold text-slate-900">{app.applicant?.name || "—"}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{app.applicant?.email || "—"}</p>
                        {app.applicant?.phone && (
                          <p className="text-xs text-slate-400 mt-0.5">📞 {app.applicant.phone}</p>
                        )}
                        {app.applicant?.jobTitle && (
                          <p className="text-xs font-semibold text-blue-600 mt-1">{app.applicant.jobTitle}</p>
                        )}

                        {/* Skills */}
                        {app.applicant?.skills?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {app.applicant.skills.slice(0, 5).map((s, i) => (
                              <span key={i} className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                                {s}
                              </span>
                            ))}
                            {app.applicant.skills.length > 5 && (
                              <span className="text-xs text-slate-400 px-1.5 py-0.5">
                                +{app.applicant.skills.length - 5} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Exp / Edu chips */}
                        <div className="flex flex-wrap gap-2 mt-2.5">
                          {app.applicant?.experience?.length > 0 && (
                            <InfoChip icon="💼" label="Experience"
                              value={app.applicant.experience.slice(0, 2).map(e => e.role).join(", ")} />
                          )}
                          {app.applicant?.education?.length > 0 && (
                            <InfoChip icon="🎓" label="Education"
                              value={app.applicant.education[0]?.degree} />
                          )}
                        </div>
                      </div>

                      {/* Action column */}
                      <div className="flex flex-col gap-2 items-end flex-shrink-0">
                        {app.applicant?.resumeFileId ? (
                          <a
                            href={`${import.meta.env.VITE_API_URL}/users/file/${app.applicant.resumeFileId}`}
                            download
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition no-underline"
                          >
                            ⬇ Download Resume
                          </a>
                        ) : (
                          <span className="text-xs italic text-slate-400">No resume</span>
                        )}
                        <button
                          onClick={() => setProfileModal(app)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition"
                        >
                          👤 Profile
                        </button>
                      </div>
                    </div>

                    {/* Workflow buttons */}
                    {nextSteps.length > 0 && (
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 flex-wrap">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Move to:</span>
                        {nextSteps.map(next => (
                          <button
                            key={next}
                            disabled={isUpdating}
                            onClick={() => requestStatusChange(app._id, next, app.applicant?.name)}
                            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition disabled:opacity-50 disabled:cursor-not-allowed ${BTN_NEXT[next]}`}
                          >
                            {isUpdating
                              ? <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              : next === "Shortlisted" ? "✓" : next === "Rejected" ? "✕" : "👁"
                            }
                            {next}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Terminal state */}
                    {nextSteps.length === 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                          {app.status === "Shortlisted"
                            ? "✓ Candidate Shortlisted — No further action needed"
                            : "✕ Candidate Rejected"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ══ FULL PROFILE MODAL ══ */}
      {profileModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setProfileModal(null)}
        >
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0">
                  {profileModal.applicant?.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">{profileModal.applicant?.name}</h2>
                  <p className="text-xs text-slate-500">
                    {profileModal.applicant?.jobTitle || "Candidate"} · Applied for {jobTitle}
                  </p>
                </div>
              </div>
              <button onClick={() => setProfileModal(null)}
                className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

              <ProfileSection title="Contact Info">
                <ModalRow label="Email"    value={profileModal.applicant?.email || "—"} />
                <ModalRow label="Phone"    value={profileModal.applicant?.phone || "—"} />
                <ModalRow label="Location" value={[profileModal.applicant?.city, profileModal.applicant?.country].filter(Boolean).join(", ") || "—"} />
              </ProfileSection>

              {profileModal.applicant?.bio && (
                <ProfileSection title="About">
                  <p className="text-sm text-slate-600 leading-relaxed">{profileModal.applicant.bio}</p>
                </ProfileSection>
              )}

              {profileModal.applicant?.skills?.length > 0 && (
                <ProfileSection title="Skills">
                  <div className="flex flex-wrap gap-1.5">
                    {profileModal.applicant.skills.map((s, i) => (
                      <span key={i} className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </ProfileSection>
              )}

              {profileModal.applicant?.experience?.length > 0 && (
                <ProfileSection title="Experience">
                  <div className="space-y-3">
                    {profileModal.applicant.experience.map((e, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-sm flex-shrink-0">💼</div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{e.role}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{e.company}</p>
                          <span className="inline-block mt-1 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full font-mono">
                            {e.duration}
                          </span>
                          {e.desc && <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{e.desc}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </ProfileSection>
              )}

              {profileModal.applicant?.education?.length > 0 && (
                <ProfileSection title="Education">
                  <div className="space-y-3">
                    {profileModal.applicant.education.map((e, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-sm flex-shrink-0">🎓</div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{e.degree}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{e.institute}</p>
                          <span className="inline-block mt-1 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full font-mono">
                            {e.year}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ProfileSection>
              )}

              {(profileModal.applicant?.linkedin || profileModal.applicant?.portfolio) && (
                <ProfileSection title="Links">
                  <div className="flex gap-2 flex-wrap">
                    {profileModal.applicant.linkedin && (
                      <a href={profileModal.applicant.linkedin} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">
                        🔗 LinkedIn
                      </a>
                    )}
                    {profileModal.applicant.portfolio && (
                      <a href={profileModal.applicant.portfolio} target="_blank" rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition">
                        🌐 Portfolio
                      </a>
                    )}
                  </div>
                </ProfileSection>
              )}
            </div>

            <div className="flex justify-end gap-2 px-6 py-4 border-t border-slate-200 bg-slate-50 flex-shrink-0">
              {profileModal.applicant?.resumeFileId && (
                <a
                  href={`${import.meta.env.VITE_API_URL}/users/file/${profileModal.applicant.resumeFileId}`}
                  download
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded-lg transition no-underline"
                >
                  ⬇ Download Resume
                </a>
              )}
              <button onClick={() => setProfileModal(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 px-4 py-2 rounded-lg transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ CONFIRM MODAL ══ */}
      {confirmModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setConfirmModal(null)}
        >
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-sm font-bold text-slate-900">Confirm Status Change</h2>
              <button onClick={() => setConfirmModal(null)}
                className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition">
                ✕
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-slate-600 leading-relaxed">
                Mark <strong className="text-slate-900">{confirmModal.name}</strong> as{" "}
                <strong className={STATUS[confirmModal.status]?.text}>{confirmModal.status}</strong>?
              </p>
              {confirmModal.status === "Rejected" && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-xs text-red-700">⚠️ This action cannot be undone.</p>
                </div>
              )}
              {confirmModal.status === "Shortlisted" && (
                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <p className="text-xs text-emerald-700">✓ Once shortlisted, status cannot be changed further.</p>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-slate-200 bg-slate-50">
              <button onClick={() => setConfirmModal(null)}
                className="text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 px-4 py-2 rounded-lg transition">
                Cancel
              </button>
              <button
                onClick={confirmStatusUpdate}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg border transition ${BTN_NEXT[confirmModal.status] || "bg-slate-100 border-slate-200 text-slate-700"}`}
              >
                Confirm → {confirmModal.status}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Sub-components ── */
function InfoChip({ icon, label, value }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 max-w-52">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{icon} {label}</p>
      <p className="text-xs font-semibold text-slate-700 mt-0.5 truncate">{value}</p>
    </div>
  );
}

function ProfileSection({ title, children }) {
  return (
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">{title}</p>
      {children}
    </div>
  );
}

function ModalRow({ label, value }) {
  return (
    <div className="flex gap-3 mb-2">
      <span className="text-xs font-semibold text-slate-400 min-w-16">{label}</span>
      <span className="text-xs font-medium text-slate-700">{value}</span>
    </div>
  );
}

export default JobApplicants;
