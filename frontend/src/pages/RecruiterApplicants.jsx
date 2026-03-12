// import { useEffect, useState, useMemo } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";

// /* ── Google Fonts ── */
// const FontStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
//     .ra-root * { font-family: 'Sora', sans-serif; box-sizing: border-box; }
//     .ra-mono { font-family: 'JetBrains Mono', monospace; }

//     @keyframes fadeUp {
//       from { opacity: 0; transform: translateY(14px); }
//       to   { opacity: 1; transform: translateY(0); }
//     }
//     @keyframes modalIn {
//       from { opacity: 0; transform: scale(0.94) translateY(12px); }
//       to   { opacity: 1; transform: scale(1)    translateY(0); }
//     }
//     @keyframes slideIn {
//       from { opacity: 0; transform: translateX(20px); }
//       to   { opacity: 1; transform: translateX(0); }
//     }
//     .fade-up   { animation: fadeUp  0.3s ease both; }
//     .fu-1 { animation-delay: 0.05s; }
//     .fu-2 { animation-delay: 0.10s; }
//     .fu-3 { animation-delay: 0.15s; }
//     .fu-4 { animation-delay: 0.20s; }

//     .ra-card {
//       background: white;
//       border: 1px solid #e2e8f0;
//       border-radius: 16px;
//       box-shadow: 0 1px 4px rgba(0,0,0,0.04);
//       overflow: hidden;
//       transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
//     }
//     .ra-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); border-color: #cbd5e1; transform: translateY(-1px); }

//     .ra-btn {
//       display: inline-flex; align-items: center; gap: 6px;
//       font-size: 12px; font-weight: 700; padding: 6px 14px;
//       border-radius: 8px; border: 1px solid; cursor: pointer;
//       transition: all 0.15s; font-family: 'Sora', sans-serif;
//     }
//     .ra-btn:disabled { opacity: 0.5; cursor: not-allowed; }
//     .ra-btn-blue    { color: #1d4ed8; background: #eff6ff; border-color: #bfdbfe; }
//     .ra-btn-blue:hover:not(:disabled)    { background: #dbeafe; }
//     .ra-btn-amber   { color: #92400e; background: #fffbeb; border-color: #fde68a; }
//     .ra-btn-amber:hover:not(:disabled)   { background: #fef3c7; }
//     .ra-btn-green   { color: #065f46; background: #ecfdf5; border-color: #a7f3d0; }
//     .ra-btn-green:hover:not(:disabled)   { background: #d1fae5; }
//     .ra-btn-red     { color: #991b1b; background: #fef2f2; border-color: #fecaca; }
//     .ra-btn-red:hover:not(:disabled)     { background: #fee2e2; }
//     .ra-btn-slate   { color: #475569; background: #f8fafc; border-color: #e2e8f0; }
//     .ra-btn-slate:hover:not(:disabled)   { background: #f1f5f9; }
//     .ra-btn-primary { color: white; background: #2563eb; border-color: #2563eb; font-size: 13px; padding: 9px 20px; border-radius: 10px; }
//     .ra-btn-primary:hover:not(:disabled) { background: #1d4ed8; transform: translateY(-1px); }

//     .ra-badge {
//       display: inline-flex; align-items: center; gap: 5px;
//       font-size: 11px; font-weight: 700; padding: 4px 10px;
//       border-radius: 20px; border: 1px solid;
//     }
//     .ra-input {
//       width: 100%; padding: 9px 14px; font-size: 13px;
//       border: 1.5px solid #e2e8f0; border-radius: 10px;
//       background: #f8fafc; color: #0f172a; outline: none;
//       transition: all 0.15s; font-family: 'Sora', sans-serif;
//     }
//     .ra-input:focus { border-color: #2563eb; background: white; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }

//     .ra-select {
//       padding: 8px 12px; font-size: 12px; font-weight: 600;
//       border: 1.5px solid #e2e8f0; border-radius: 10px;
//       background: #f8fafc; color: #334155; outline: none; cursor: pointer;
//       transition: all 0.15s; font-family: 'Sora', sans-serif;
//     }
//     .ra-select:focus { border-color: #2563eb; background: white; }

//     /* Modal */
//     .ra-modal-backdrop {
//       position: fixed; inset: 0; background: rgba(0,0,0,0.6);
//       backdrop-filter: blur(6px); z-index: 100;
//       display: flex; align-items: center; justify-content: center; padding: 1rem;
//     }
//     .ra-modal {
//       background: white; border-radius: 20px; width: 100%; max-width: 640px;
//       box-shadow: 0 24px 64px rgba(0,0,0,0.25);
//       animation: modalIn 0.22s cubic-bezier(0.34,1.56,0.64,1);
//       overflow: hidden; max-height: 90vh; display: flex; flex-direction: column;
//     }
//     .ra-modal-header {
//       padding: 20px 24px 16px; border-bottom: 1px solid #e2e8f0;
//       display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
//     }
//     .ra-modal-body { padding: 20px 24px; overflow-y: auto; flex: 1; }
//     .ra-modal-footer {
//       padding: 16px 24px; border-top: 1px solid #e2e8f0;
//       background: #f8fafc; display: flex; justify-content: flex-end; gap: 10px; flex-shrink: 0;
//     }

//     /* Progress bar */
//     .ra-progress-track { height: 6px; background: #e2e8f0; border-radius: 99px; overflow: hidden; }
//     .ra-progress-fill  { height: 100%; border-radius: 99px; transition: width 0.6s ease; }

//     /* Stat card */
//     .ra-stat {
//       background: white; border: 1px solid #e2e8f0; border-radius: 14px;
//       padding: 16px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);
//     }

//     /* Tab */
//     .ra-tab { padding: 10px 16px; font-size: 13px; font-weight: 600; color: #64748b; border: none; background: none; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s; font-family: 'Sora', sans-serif; }
//     .ra-tab:hover { color: #0f172a; }
//     .ra-tab.active { color: #2563eb; border-bottom-color: #2563eb; }

//     /* Applicant row */
//     .ra-applicant-row {
//       display: flex; align-items: center; gap: 14px;
//       padding: 16px 20px; border-bottom: 1px solid #f1f5f9; transition: background 0.15s;
//     }
//     .ra-applicant-row:last-child { border-bottom: none; }
//     .ra-applicant-row:hover { background: #fafbfc; }

//     /* Tooltip */
//     .ra-tooltip { position: relative; }
//     .ra-tooltip-text {
//       visibility: hidden; opacity: 0;
//       position: absolute; bottom: 110%; left: 50%; transform: translateX(-50%);
//       background: #1e293b; color: white; font-size: 11px; padding: 4px 8px;
//       border-radius: 6px; white-space: nowrap; transition: all 0.15s; pointer-events: none;
//     }
//     .ra-tooltip:hover .ra-tooltip-text { visibility: visible; opacity: 1; }
//   `}</style>
// );

// /* ── Status config ── */
// const STATUS = {
//   Applied:     { bg: "#eff6ff", border: "#bfdbfe", text: "#1d4ed8", dot: "#3b82f6", label: "Applied"     },
//   Reviewed:    { bg: "#fffbeb", border: "#fde68a", text: "#92400e", dot: "#f59e0b", label: "Reviewed"    },
//   Shortlisted: { bg: "#ecfdf5", border: "#a7f3d0", text: "#065f46", dot: "#10b981", label: "Shortlisted" },
//   Rejected:    { bg: "#fef2f2", border: "#fecaca", text: "#991b1b", dot: "#ef4444", label: "Rejected"    },
// };

// const WORKFLOW = {
//   Applied:     ["Reviewed", "Rejected"],
//   Reviewed:    ["Shortlisted", "Rejected"],
//   Shortlisted: [],
//   Rejected:    [],
// };

// /* ════════════════════════════════════════════
//    MAIN COMPONENT
// ════════════════════════════════════════════ */
// export default function RecruiterApplicants() {
//   const [applications, setApplications]   = useState([]);
//   const [loading, setLoading]             = useState(true);
//   const [updatingId, setUpdatingId]       = useState(null);

//   /* Filters */
//   const [search, setSearch]               = useState("");
//   const [statusFilter, setStatusFilter]   = useState("All");
//   const [jobFilter, setJobFilter]         = useState("All");
//   const [activeTab, setActiveTab]         = useState("All");

//   /* Modals */
//   const [resumeModal, setResumeModal]     = useState(null); // { url, name }
//   const [profileModal, setProfileModal]   = useState(null); // applicant object
//   const [confirmModal, setConfirmModal]   = useState(null); // { appId, status, name }

//   /* ── FETCH ── */
//   const fetchApplicants = async () => {
//     try {
//       const { data } = await api.get("/applications/recruiter/all");
//       setApplications(data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load applicants.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchApplicants(); }, []);

//   /* ── UPDATE STATUS ── */
//   const updateStatus = async (applicationId, status, applicantName) => {
//     setConfirmModal({ appId: applicationId, status, name: applicantName });
//   };

//   const confirmStatusUpdate = async () => {
//     const { appId, status } = confirmModal;
//     setUpdatingId(appId);
//     setConfirmModal(null);
//     try {
//       await api.put(`/applications/${appId}/status`, { status });
//       toast.success(`Status updated to "${status}"`);
//       await fetchApplicants();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Update failed.");
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   /* ── DERIVED DATA ── */
//   const uniqueJobs = useMemo(() => {
//     const map = {};
//     applications.forEach(a => { if (a.job?._id) map[a.job._id] = a.job.title; });
//     return map;
//   }, [applications]);

//   const counts = useMemo(() => {
//     const c = { All: applications.length, Applied: 0, Reviewed: 0, Shortlisted: 0, Rejected: 0 };
//     applications.forEach(a => { if (c[a.status] !== undefined) c[a.status]++; });
//     return c;
//   }, [applications]);

//   const filtered = useMemo(() => {
//     return applications.filter(app => {
//       const matchTab    = activeTab === "All" || app.status === activeTab;
//       const matchStatus = statusFilter === "All" || app.status === statusFilter;
//       const matchJob    = jobFilter === "All" || app.job?._id === jobFilter;
//       const q = search.toLowerCase();
//       const matchSearch = !q ||
//         app.applicant?.name?.toLowerCase().includes(q) ||
//         app.applicant?.email?.toLowerCase().includes(q) ||
//         app.job?.title?.toLowerCase().includes(q);
//       return matchTab && matchStatus && matchJob && matchSearch;
//     });
//   }, [applications, activeTab, statusFilter, jobFilter, search]);

//   /* ── Loading ── */
//   if (loading) return (
//     <div style={{ minHeight: "100vh", background: "#f0f4f8", display: "flex", alignItems: "center", justifyContent: "center" }}>
//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//       <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//         <div style={{ width: 20, height: 20, border: "2.5px solid #2563eb", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
//         <span style={{ color: "#64748b", fontSize: 14, fontWeight: 500, fontFamily: "Sora, sans-serif" }}>Loading applicants…</span>
//       </div>
//     </div>
//   );

//   return (
//     <div className="ra-root" style={{ minHeight: "100vh", background: "#f0f4f8" }}>
//       <FontStyle />

//       {/* ══ HERO ══ */}
//       <div style={{ background: "linear-gradient(135deg, #0c1a2e 0%, #0f2d52 60%, #1a3a6e 100%)", position: "relative", overflow: "hidden" }}>
//         <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
//         <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)" }} />
//         <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "2.5rem 2rem" }}>

//           <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
//             <div>
//               <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.35)", borderRadius: 99, padding: "5px 14px", marginBottom: 12 }}>
//                 <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#60a5fa", display: "inline-block", animation: "pulse 2s infinite" }} />
//                 <span style={{ fontSize: 11, fontWeight: 700, color: "#93c5fd", letterSpacing: "0.1em", textTransform: "uppercase" }}>Recruiter Dashboard</span>
//               </div>
//               <h1 style={{ fontSize: 28, fontWeight: 800, color: "white", margin: 0, lineHeight: 1.2 }}>All Applicants</h1>
//               <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginTop: 6 }}>
//                 Review, filter and manage every candidate across all your job postings
//               </p>
//             </div>

//             {/* Hero stat boxes */}
//             <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
//               {[
//                 { label: "Total",       count: counts.All,         color: "#60a5fa" },
//                 { label: "Applied",     count: counts.Applied,     color: "#60a5fa" },
//                 { label: "Shortlisted", count: counts.Shortlisted, color: "#34d399" },
//                 { label: "Rejected",    count: counts.Rejected,    color: "#f87171" },
//               ].map(({ label, count, color }) => (
//                 <div key={label} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "12px 18px", textAlign: "center", minWidth: 70 }}>
//                   <div style={{ fontSize: 22, fontWeight: 800, color, fontFamily: "JetBrains Mono, monospace" }}>{count}</div>
//                   <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 600, marginTop: 2 }}>{label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Progress bars per status */}
//           {applications.length > 0 && (
//             <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
//               {["Applied", "Reviewed", "Shortlisted", "Rejected"].map(s => {
//                 const cfg = STATUS[s];
//                 const pct = applications.length ? Math.round((counts[s] / applications.length) * 100) : 0;
//                 return (
//                   <div key={s} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "10px 14px" }}>
//                     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
//                       <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{s}</span>
//                       <span style={{ fontSize: 11, color: "white", fontWeight: 700, fontFamily: "JetBrains Mono, monospace" }}>{pct}%</span>
//                     </div>
//                     <div className="ra-progress-track">
//                       <div className="ra-progress-fill" style={{ width: `${pct}%`, background: cfg.dot }} />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ══ TAB NAV ══ */}
//       <div style={{ background: "white", borderBottom: "1px solid #e2e8f0" }}>
//         <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem", display: "flex", gap: 0 }}>
//           {["All", "Applied", "Reviewed", "Shortlisted", "Rejected"].map(tab => (
//             <button
//               key={tab}
//               className={`ra-tab ${activeTab === tab ? "active" : ""}`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab}
//               <span style={{
//                 marginLeft: 6, fontSize: 10, fontWeight: 800,
//                 background: activeTab === tab ? "#eff6ff" : "#f1f5f9",
//                 color: activeTab === tab ? "#2563eb" : "#94a3b8",
//                 border: `1px solid ${activeTab === tab ? "#bfdbfe" : "#e2e8f0"}`,
//                 borderRadius: 99, padding: "1px 7px", fontFamily: "JetBrains Mono, monospace"
//               }}>
//                 {counts[tab]}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ══ BODY ══ */}
//       <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem" }}>

//         {/* ── Filter bar ── */}
//         <div className="fade-up fu-1" style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 14, padding: "14px 18px", marginBottom: 20, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
//           {/* Search */}
//           <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
//             <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#94a3b8" }}>🔍</span>
//             <input
//               className="ra-input"
//               style={{ paddingLeft: 36 }}
//               placeholder="Search by name, email or job title…"
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//             />
//           </div>
//           {/* Job filter */}
//           <select className="ra-select" value={jobFilter} onChange={e => setJobFilter(e.target.value)}>
//             <option value="All">All Jobs</option>
//             {Object.entries(uniqueJobs).map(([id, title]) => (
//               <option key={id} value={id}>{title}</option>
//             ))}
//           </select>
//           {/* Clear */}
//           {(search || statusFilter !== "All" || jobFilter !== "All") && (
//             <button className="ra-btn ra-btn-slate" onClick={() => { setSearch(""); setStatusFilter("All"); setJobFilter("All"); }}>
//               ✕ Clear
//             </button>
//           )}
//           <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginLeft: "auto" }}>
//             {filtered.length} result{filtered.length !== 1 ? "s" : ""}
//           </span>
//         </div>

//         {/* ── Empty state ── */}
//         {filtered.length === 0 && (
//           <div className="fade-up fu-2" style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: "4rem", textAlign: "center" }}>
//             <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
//             <p style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
//               {applications.length === 0 ? "No applications yet" : "No results found"}
//             </p>
//             <p style={{ fontSize: 13, color: "#64748b" }}>
//               {applications.length === 0
//                 ? "Applications will appear here once candidates apply to your jobs."
//                 : "Try adjusting your search or filters."}
//             </p>
//           </div>
//         )}

//         {/* ── Applicant cards ── */}
//         {filtered.length > 0 && (
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             {filtered.map((app, idx) => {
//               const cfg = STATUS[app.status] || STATUS.Applied;
//               const nextSteps = WORKFLOW[app.status] || [];
//               const isUpdating = updatingId === app._id;

//               return (
//                 <div key={app._id} className={`ra-card fade-up fu-${Math.min(idx + 2, 4)}`}>

//                   {/* Card header — job title row */}
//                   <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", background: "#fafbfc", borderBottom: "1px solid #f1f5f9" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                       <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #2563eb, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
//                         {app.job?.title?.[0]?.toUpperCase() || "?"}
//                       </div>
//                       <div>
//                         <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", margin: 0 }}>{app.job?.title || "—"}</p>
//                         <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>
//                           Applied {new Date(app.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
//                         </p>
//                       </div>
//                     </div>
//                     {/* Status badge */}
//                     <span className="ra-badge" style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.text }}>
//                       <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />
//                       {cfg.label}
//                     </span>
//                   </div>

//                   {/* Card body */}
//                   <div style={{ padding: "16px 20px" }}>
//                     <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>

//                       {/* Avatar */}
//                       <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #6366f1, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 18, flexShrink: 0 }}>
//                         {app.applicant?.name?.[0]?.toUpperCase() || "?"}
//                       </div>

//                       {/* Info */}
//                       <div style={{ flex: 1, minWidth: 200 }}>
//                         <p style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: 0 }}>{app.applicant?.name || "—"}</p>
//                         <p style={{ fontSize: 12, color: "#64748b", margin: "3px 0 0" }}>{app.applicant?.email || "—"}</p>
//                         {app.applicant?.phone && (
//                           <p style={{ fontSize: 12, color: "#64748b", margin: "2px 0 0" }}>📞 {app.applicant.phone}</p>
//                         )}

//                         {/* Skills */}
//                         {app.applicant?.skills?.length > 0 && (
//                           <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
//                             {app.applicant.skills.slice(0, 5).map((s, i) => (
//                               <span key={i} style={{ fontSize: 11, fontWeight: 600, color: "#1d4ed8", background: "#eff6ff", border: "1px solid #bfdbfe", padding: "2px 8px", borderRadius: 20 }}>{s}</span>
//                             ))}
//                             {app.applicant.skills.length > 5 && (
//                               <span style={{ fontSize: 11, color: "#94a3b8", padding: "2px 6px" }}>+{app.applicant.skills.length - 5} more</span>
//                             )}
//                           </div>
//                         )}

//                         {/* Experience & Education chips */}
//                         <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
//                           {app.applicant?.experience?.length > 0 && (
//                             <InfoChip icon="💼" label="Experience" value={app.applicant.experience.map(e => e.role).slice(0, 2).join(", ")} />
//                           )}
//                           {app.applicant?.education?.length > 0 && (
//                             <InfoChip icon="🎓" label="Education" value={app.applicant.education.map(e => e.degree).slice(0, 1).join(", ")} />
//                           )}
//                         </div>
//                       </div>

//                       {/* Action column */}
//                       <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end", flexShrink: 0 }}>
//                         {/* Resume */}
//                         {app.applicant?.resumeFileId ? (
//                           <button
//                             className="ra-btn ra-btn-blue"
//                             onClick={() => setResumeModal({
//                               url: `http://localhost:5000/api/users/file/${app.applicant.resumeFileId}`,
//                               name: app.applicant.name,
//                             })}
//                           >
//                             📄 View Resume
//                           </button>
//                         ) : (
//                           <span style={{ fontSize: 11, color: "#94a3b8", fontStyle: "italic" }}>No resume</span>
//                         )}
//                         {/* View full profile */}
//                         <button
//                           className="ra-btn ra-btn-slate"
//                           onClick={() => setProfileModal(app)}
//                         >
//                           👤 Full Profile
//                         </button>
//                       </div>
//                     </div>

//                     {/* Action buttons */}
//                     {nextSteps.length > 0 && (
//                       <div style={{ display: "flex", gap: 8, marginTop: 14, paddingTop: 14, borderTop: "1px solid #f1f5f9", alignItems: "center", flexWrap: "wrap" }}>
//                         <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Move to:</span>
//                         {nextSteps.map(next => {
//                           const ncfg = STATUS[next];
//                           const btnClass = next === "Shortlisted" ? "ra-btn-green" : next === "Rejected" ? "ra-btn-red" : "ra-btn-amber";
//                           const icon = next === "Shortlisted" ? "✓" : next === "Rejected" ? "✕" : "👁";
//                           return (
//                             <button
//                               key={next}
//                               className={`ra-btn ${btnClass}`}
//                               disabled={isUpdating}
//                               onClick={() => updateStatus(app._id, next, app.applicant?.name)}
//                             >
//                               {isUpdating ? (
//                                 <span style={{ width: 12, height: 12, border: "2px solid currentColor", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.6s linear infinite" }} />
//                               ) : icon}
//                               {next}
//                             </button>
//                           );
//                         })}
//                       </div>
//                     )}

//                     {/* Terminal states */}
//                     {nextSteps.length === 0 && (
//                       <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #f1f5f9" }}>
//                         <span className="ra-badge" style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.text }}>
//                           {app.status === "Shortlisted" ? "✓ Candidate Shortlisted — No further action needed" : "✕ Candidate Rejected"}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* ══ RESUME MODAL ══ */}
//       {resumeModal && (
//         <div className="ra-modal-backdrop" onClick={e => e.target === e.currentTarget && setResumeModal(null)}>
//           <div className="ra-modal" style={{ maxWidth: 800, height: "85vh" }}>
//             <div className="ra-modal-header">
//               <div>
//                 <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>📄 Resume</h2>
//                 <p style={{ fontSize: 12, color: "#64748b", margin: "3px 0 0" }}>{resumeModal.name}</p>
//               </div>
//               <div style={{ display: "flex", gap: 8 }}>
//                 <a href={resumeModal.url} target="_blank" rel="noreferrer" className="ra-btn ra-btn-blue">⬇ Download</a>
//                 <button className="ra-btn ra-btn-slate" onClick={() => setResumeModal(null)}>✕ Close</button>
//               </div>
//             </div>
//             <div style={{ flex: 1, overflow: "hidden" }}>
//               <iframe src={resumeModal.url} title="Resume" style={{ width: "100%", height: "100%", border: "none" }} />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ══ FULL PROFILE MODAL ══ */}
//       {profileModal && (
//         <div className="ra-modal-backdrop" onClick={e => e.target === e.currentTarget && setProfileModal(null)}>
//           <div className="ra-modal">
//             <div className="ra-modal-header">
//               <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                 <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 18 }}>
//                   {profileModal.applicant?.name?.[0]?.toUpperCase() || "?"}
//                 </div>
//                 <div>
//                   <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>{profileModal.applicant?.name}</h2>
//                   <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>Applicant Profile · {profileModal.job?.title}</p>
//                 </div>
//               </div>
//               <button className="ra-btn ra-btn-slate" onClick={() => setProfileModal(null)}>✕</button>
//             </div>
//             <div className="ra-modal-body">
//               <ProfileSection title="Contact">
//                 <ModalRow label="Email"    value={profileModal.applicant?.email   || "—"} />
//                 <ModalRow label="Phone"    value={profileModal.applicant?.phone   || "—"} />
//                 <ModalRow label="Location" value={[profileModal.applicant?.city, profileModal.applicant?.country].filter(Boolean).join(", ") || "—"} />
//               </ProfileSection>

//               {profileModal.applicant?.bio && (
//                 <ProfileSection title="About">
//                   <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.7, margin: 0 }}>{profileModal.applicant.bio}</p>
//                 </ProfileSection>
//               )}

//               {profileModal.applicant?.skills?.length > 0 && (
//                 <ProfileSection title="Skills">
//                   <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//                     {profileModal.applicant.skills.map((s, i) => (
//                       <span key={i} style={{ fontSize: 12, fontWeight: 600, color: "#1d4ed8", background: "#eff6ff", border: "1px solid #bfdbfe", padding: "4px 10px", borderRadius: 20 }}>{s}</span>
//                     ))}
//                   </div>
//                 </ProfileSection>
//               )}

//               {profileModal.applicant?.experience?.length > 0 && (
//                 <ProfileSection title="Experience">
//                   {profileModal.applicant.experience.map((e, i) => (
//                     <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
//                       <div style={{ width: 32, height: 32, borderRadius: 8, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>💼</div>
//                       <div>
//                         <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", margin: 0 }}>{e.role}</p>
//                         <p style={{ fontSize: 12, color: "#64748b", margin: "2px 0" }}>{e.company}</p>
//                         <span style={{ fontSize: 11, fontWeight: 600, color: "#6366f1", background: "#eef2ff", border: "1px solid #c7d2fe", padding: "2px 8px", borderRadius: 20, fontFamily: "JetBrains Mono, monospace" }}>{e.duration}</span>
//                         {e.desc && <p style={{ fontSize: 12, color: "#64748b", marginTop: 6, lineHeight: 1.6 }}>{e.desc}</p>}
//                       </div>
//                     </div>
//                   ))}
//                 </ProfileSection>
//               )}

//               {profileModal.applicant?.education?.length > 0 && (
//                 <ProfileSection title="Education">
//                   {profileModal.applicant.education.map((e, i) => (
//                     <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
//                       <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🎓</div>
//                       <div>
//                         <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", margin: 0 }}>{e.degree}</p>
//                         <p style={{ fontSize: 12, color: "#64748b", margin: "2px 0" }}>{e.institute}</p>
//                         <span style={{ fontSize: 11, fontWeight: 600, color: "#6366f1", background: "#eef2ff", border: "1px solid #c7d2fe", padding: "2px 8px", borderRadius: 20, fontFamily: "JetBrains Mono, monospace" }}>{e.year}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </ProfileSection>
//               )}

//               {profileModal.applicant?.linkedin && (
//                 <ProfileSection title="Links">
//                   <a href={profileModal.applicant.linkedin} target="_blank" rel="noreferrer" className="ra-btn ra-btn-blue">🔗 LinkedIn</a>
//                   {profileModal.applicant?.portfolio && (
//                     <a href={profileModal.applicant.portfolio} target="_blank" rel="noreferrer" className="ra-btn ra-btn-slate" style={{ marginLeft: 8 }}>🌐 Portfolio</a>
//                   )}
//                 </ProfileSection>
//               )}
//             </div>
//             <div className="ra-modal-footer">
//               {profileModal.applicant?.resumeFileId && (
//                 <button className="ra-btn ra-btn-blue" style={{ fontSize: 13, padding: "9px 20px" }}
//                   onClick={() => { setResumeModal({ url: `http://localhost:5000/api/users/file/${profileModal.applicant.resumeFileId}`, name: profileModal.applicant.name }); setProfileModal(null); }}>
//                   📄 View Resume
//                 </button>
//               )}
//               <button className="ra-btn ra-btn-slate" style={{ fontSize: 13, padding: "9px 20px" }} onClick={() => setProfileModal(null)}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ══ CONFIRM STATUS MODAL ══ */}
//       {confirmModal && (
//         <div className="ra-modal-backdrop" onClick={e => e.target === e.currentTarget && setConfirmModal(null)}>
//           <div className="ra-modal" style={{ maxWidth: 400 }}>
//             <div className="ra-modal-header">
//               <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>Confirm Status Change</h2>
//               <button className="ra-btn ra-btn-slate" onClick={() => setConfirmModal(null)}>✕</button>
//             </div>
//             <div className="ra-modal-body">
//               <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.6 }}>
//                 Are you sure you want to mark <strong>{confirmModal.name}</strong> as{" "}
//                 <strong style={{ color: STATUS[confirmModal.status]?.text }}>{confirmModal.status}</strong>?
//               </p>
//               {confirmModal.status === "Rejected" && (
//                 <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", marginTop: 12 }}>
//                   <p style={{ fontSize: 12, color: "#991b1b", margin: 0 }}>⚠️ This action cannot be undone. The candidate will be permanently rejected for this position.</p>
//                 </div>
//               )}
//               {confirmModal.status === "Shortlisted" && (
//                 <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 10, padding: "10px 14px", marginTop: 12 }}>
//                   <p style={{ fontSize: 12, color: "#065f46", margin: 0 }}>✓ Once shortlisted, this status cannot be changed further.</p>
//                 </div>
//               )}
//             </div>
//             <div className="ra-modal-footer">
//               <button className="ra-btn ra-btn-slate" style={{ fontSize: 13, padding: "9px 20px" }} onClick={() => setConfirmModal(null)}>Cancel</button>
//               <button
//                 className={`ra-btn ${confirmModal.status === "Rejected" ? "ra-btn-red" : confirmModal.status === "Shortlisted" ? "ra-btn-green" : "ra-btn-amber"}`}
//                 style={{ fontSize: 13, padding: "9px 20px" }}
//                 onClick={confirmStatusUpdate}
//               >
//                 Confirm → {confirmModal.status}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ── Sub-components ── */
// function InfoChip({ icon, label, value }) {
//   return (
//     <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 10px", maxWidth: 220 }}>
//       <p style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{icon} {label}</p>
//       <p style={{ fontSize: 12, fontWeight: 600, color: "#334155", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</p>
//     </div>
//   );
// }

// function ProfileSection({ title, children }) {
//   return (
//     <div style={{ marginBottom: 20 }}>
//       <p style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{title}</p>
//       {children}
//     </div>
//   );
// }

// function ModalRow({ label, value }) {
//   return (
//     <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
//       <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", minWidth: 70 }}>{label}</span>
//       <span style={{ fontSize: 12, fontWeight: 500, color: "#334155" }}>{value}</span>
//     </div>
//   );
// }
import { useEffect, useState, useMemo } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import InterviewScheduler from "../components/InterviewScheduler";

/* ── Status config ── */
const STATUS = {
  Applied:     { bg: "bg-blue-50",    border: "border-blue-200",    text: "text-blue-700",      dot: "bg-blue-500",      label: "Applied"     },
  Reviewed:    { bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-700",     dot: "bg-amber-400",    label: "Reviewed"    },
  Shortlisted: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700",   dot: "bg-emerald-500",  label: "Shortlisted" },
  Interview:   { bg: "bg-purple-50",  border: "border-purple-200",  text: "text-purple-700",    dot: "bg-purple-500",   label: "Interview"   },
  Offer:       { bg: "bg-green-50",   border: "border-green-200",   text: "text-green-700",     dot: "bg-green-500",    label: "Offer🏆"     },
  Rejected:    { bg: "bg-red-50",     border: "border-red-200",     text: "text-red-700",       dot: "bg-red-500",      label: "Rejected"    },
};

/* Hex colors for progress bars (dynamic widths need inline style) */
const STATUS_HEX = {
  Applied: "#3b82f6", Reviewed: "#f59e0b", Shortlisted: "#10b981", Interview: "#a855f7", Offer: "#22c55e", Rejected: "#ef4444",
};

const WORKFLOW = {
  Applied:     ["Reviewed", "Rejected"],
  Reviewed:    ["Shortlisted", "Rejected"],
  Shortlisted: ["Interview", "Rejected"],
  Interview:   ["Offer", "Rejected"],
  Offer:       [],
  Rejected:    [],
};

const BTN_NEXT = {
  Reviewed:    "text-amber-800   bg-amber-50   border-amber-200   hover:bg-amber-100",
  Shortlisted: "text-emerald-800 bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
  Interview:   "text-purple-800   bg-purple-50   border-purple-200   hover:bg-purple-100",
  Offer:       "text-green-800    bg-green-50    border-green-200    hover:bg-green-100",
  Rejected:    "text-red-800      bg-red-50      border-red-200      hover:bg-red-100",
};

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
export default function RecruiterApplicants() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [updatingId, setUpdatingId]     = useState(null);

  const [search,    setSearch]    = useState("");
  const [jobFilter, setJobFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("All");

  const [profileModal, setProfileModal] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [contactModal, setContactModal] = useState(null);
  const [emailForm, setEmailForm] = useState({ subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [schedulingApp, setSchedulingApp] = useState(null);

  /* ── Fetch ── */
  const fetchApplicants = async () => {
    try {
      const { data } = await api.get("/applications/recruiter/all");
      setApplications(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load applicants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplicants(); }, []);

  /* ── Status update ── */
  const updateStatus = (appId, status, name) =>
    setConfirmModal({ appId, status, name });

  const confirmStatusUpdate = async () => {
    const { appId, status } = confirmModal;
    setUpdatingId(appId);
    setConfirmModal(null);
    try {
      await api.put(`/applications/${appId}/status`, { status });
      toast.success(`Status updated to "${status}"`);
      await fetchApplicants();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleContact = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/recruiter/contact", {
        candidateId: contactModal.applicant?._id,
        subject: emailForm.subject,
        message: emailForm.message
      });
      toast.success(`Message sent to ${contactModal.applicant?.name}!`);
      setContactModal(null);
      setEmailForm({ subject: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  /* ── Derived ── */
  const uniqueJobs = useMemo(() => {
    const map = {};
    applications.forEach(a => { if (a.job?._id) map[a.job._id] = a.job.title; });
    return map;
  }, [applications]);

  const counts = useMemo(() => {
    const c = { All: applications.length, Applied: 0, Reviewed: 0, Shortlisted: 0, Interview: 0, Offer: 0, Rejected: 0 };
    applications.forEach(a => { if (c[a.status] !== undefined) c[a.status]++; });
    return c;
  }, [applications]);

  const filtered = useMemo(() => {
    return applications.filter(app => {
      const matchTab    = activeTab === "All" || app.status === activeTab;
      const matchJob    = jobFilter === "All" || app.job?._id === jobFilter;
      const q           = search.toLowerCase();
      const matchSearch = !q ||
        app.applicant?.name?.toLowerCase().includes(q) ||
        app.applicant?.email?.toLowerCase().includes(q) ||
        app.job?.title?.toLowerCase().includes(q);
      return matchTab && matchJob && matchSearch;
    });
  }, [applications, activeTab, jobFilter, search]);

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

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-start justify-between gap-5 flex-wrap">

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 border"
                style={{ background: "rgba(37,99,235,0.2)", borderColor: "rgba(37,99,235,0.35)" }}>
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">Recruiter Dashboard</span>
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">All Applicants</h1>
              <p className="text-sm mt-1.5 text-white/50">
                Review, filter and manage every candidate across all your job postings
              </p>
            </div>

            {/* Stat boxes */}
            <div className="flex gap-3 flex-wrap">
              {[
                { label: "Total",       count: counts.All,         color: "text-blue-300"    },
                { label: "Shortlisted", count: counts.Shortlisted, color: "text-emerald-300" },
                { label: "Interview",   count: counts.Interview,   color: "text-purple-300"  },
                { label: "Offer",       count: counts.Offer,       color: "text-green-400"   },
                { label: "Rejected",    count: counts.Rejected,    color: "text-red-300"     },
              ].map(({ label, count, color }) => (
                <div key={label} className="rounded-xl px-4 py-3 text-center min-w-16 border"
                  style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.12)" }}>
                  <p className={`text-xl font-extrabold ${color}`}>{count}</p>
                  <p className="text-xs font-semibold mt-0.5 text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline progress bars */}
          {applications.length > 0 && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {["Applied", "Reviewed", "Shortlisted", "Interview", "Offer", "Rejected"].map(s => {
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
                        style={{ width: `${pct}%`, background: STATUS_HEX[s] }} />
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
          {["All", "Applied", "Reviewed", "Shortlisted", "Interview", "Offer", "Rejected"].map(tab => (
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
              placeholder="Search by name, email or job title…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="px-3 py-2 text-xs font-semibold border border-slate-200 rounded-lg bg-slate-50 text-slate-700 outline-none focus:border-blue-500 cursor-pointer transition"
            value={jobFilter}
            onChange={e => setJobFilter(e.target.value)}
          >
            <option value="All">All Jobs</option>
            {Object.entries(uniqueJobs).map(([id, title]) => (
              <option key={id} value={id}>{title}</option>
            ))}
          </select>
          {(search || jobFilter !== "All") && (
            <button
              onClick={() => { setSearch(""); setJobFilter("All"); }}
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
            <div className="text-5xl mb-3">📭</div>
            <p className="text-sm font-bold text-slate-800 mb-1">
              {applications.length === 0 ? "No applications yet" : "No results found"}
            </p>
            <p className="text-sm text-slate-400">
              {applications.length === 0
                ? "Applications will appear here once candidates apply to your jobs."
                : "Try adjusting your search or filters."}
            </p>
          </div>
        )}

        {/* Applicant cards */}
        {filtered.length > 0 && (
          <div className="flex flex-col gap-4">
            {filtered.map((app) => {
              const cfg        = STATUS[app.status] || STATUS.Applied;
              const nextSteps  = WORKFLOW[app.status] || [];
              const isUpdating = updatingId === app._id;

              return (
                <div key={app._id}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

                  {/* Card header */}
                  <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0">
                        {app.job?.title?.[0]?.toUpperCase() || "?"}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{app.job?.title || "—"}</p>
                        <p className="text-xs text-slate-400">
                          Applied {new Date(app.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
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
                              value={app.applicant.experience.map(e => e.role).slice(0, 2).join(", ")} />
                          )}
                          {app.applicant?.education?.length > 0 && (
                            <InfoChip icon="🎓" label="Education"
                              value={app.applicant.education.map(e => e.degree).slice(0, 1).join(", ")} />
                          )}
                        </div>
                      </div>

                      {/* Actions */}
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
                          👤 Full Profile
                        </button>
                        <button
                          onClick={() => {
                            setContactModal(app);
                            setEmailForm({
                              subject: `Regarding your application for ${app.job?.title}`,
                              message: `Hi ${app.applicant?.name},\n\nI saw your application for the ${app.job?.title} position and I'm interested in discussing it further...`
                            });
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
                        >
                          💬 Contact
                        </button>
                        {(app.status === "Shortlisted" || app.status === "Interview") && (
                          <button
                            onClick={() => setSchedulingApp(app)}
                            className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition"
                          >
                            📅 Schedule Interview
                          </button>
                        )}
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
                            onClick={() => updateStatus(app._id, next, app.applicant?.name)}
                            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition disabled:opacity-50 disabled:cursor-not-allowed ${BTN_NEXT[next]}`}
                          >
                            {isUpdating
                              ? <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              : next === "Shortlisted" ? "✓" : next === "Interview" ? "📅" : next === "Offer" ? "🏆" : next === "Rejected" ? "✕" : "👁"
                            }
                            {next}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Terminal state label */}
                    {nextSteps.length === 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                          {app.status === "Offer"
                            ? "🏆 Offer Extended — Awaiting response"
                            : app.status === "Rejected"
                            ? "✕ Candidate Rejected"
                            : "✓ Pipeline Stage Reached"}
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
                  <p className="text-xs text-slate-500">Applicant · {profileModal.job?.title}</p>
                </div>
              </div>
              <button onClick={() => setProfileModal(null)}
                className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

              <ProfileSection title="Contact">
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
                Are you sure you want to mark{" "}
                <strong className="text-slate-900">{confirmModal.name}</strong> as{" "}
                <strong className={STATUS[confirmModal.status]?.text}>{confirmModal.status}</strong>?
              </p>
              {confirmModal.status === "Rejected" && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-xs text-red-700">⚠️ This action cannot be undone. The candidate will be permanently rejected for this position.</p>
                </div>
              )}
              {confirmModal.status === "Shortlisted" && (
                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <p className="text-xs text-emerald-700">✓ Once shortlisted, this status cannot be changed further.</p>
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

      {/* ── CONTACT MODAL ── */}
      {contactModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setContactModal(null)}
        >
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Message to Applicant</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{contactModal.applicant?.name}</p>
              </div>
              <button onClick={() => setContactModal(null)} className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition">✕</button>
            </div>
            
            <form onSubmit={handleContact} className="p-7 space-y-5">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Subject</label>
                <input
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm font-semibold focus:border-blue-500 focus:bg-white outline-none transition"
                  placeholder="Subject of your message"
                  value={emailForm.subject}
                  onChange={e => setEmailForm({ ...emailForm, subject: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Message Body</label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm font-semibold focus:border-blue-500 focus:bg-white outline-none transition resize-none"
                  placeholder="Type your message here..."
                  value={emailForm.message}
                  onChange={e => setEmailForm({ ...emailForm, message: e.target.value })}
                />
              </div>
              
              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-500/30 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sending ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>📧 Send Secure Email</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── INTERVIEW SCHEDULER MODAL ── */}
      {schedulingApp && (
        <InterviewScheduler 
          application={schedulingApp} 
          onClose={() => setSchedulingApp(null)} 
          onScheduled={fetchApplicants}
        />
      )}
    </div>
  );
}

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
