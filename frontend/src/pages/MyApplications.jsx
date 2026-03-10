
// import { useEffect, useState, useMemo } from "react";
// import api from "../services/api";
// import { Link } from "react-router-dom";

// /* ── Google Fonts ── */
// const FontStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
//     .ma-root * { font-family: 'Sora', sans-serif; box-sizing: border-box; }

//     @keyframes ma-spin    { to { transform: rotate(360deg); } }
//     @keyframes ma-fadeUp  { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
//     @keyframes ma-pulse   { 0%,100%{opacity:1} 50%{opacity:0.4} }
//     @keyframes ma-shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }

//     .ma-fade-up  { animation: ma-fadeUp 0.3s ease both; }
//     .ma-fu-1 { animation-delay:0.04s; }
//     .ma-fu-2 { animation-delay:0.08s; }
//     .ma-fu-3 { animation-delay:0.12s; }
//     .ma-fu-4 { animation-delay:0.16s; }

//     .ma-card {
//       background: white; border: 1px solid #e2e8f0; border-radius: 16px;
//       box-shadow: 0 1px 4px rgba(0,0,0,0.04); overflow: hidden;
//       transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
//     }
//     .ma-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.08); border-color: #cbd5e1; transform: translateY(-2px); }

//     /* Status-colored left border */
//     .ma-card.status-Applied     { border-left: 4px solid #3b82f6; }
//     .ma-card.status-Reviewed    { border-left: 4px solid #f59e0b; }
//     .ma-card.status-Shortlisted { border-left: 4px solid #10b981; }
//     .ma-card.status-Rejected    { border-left: 4px solid #ef4444; }

//     .ma-btn {
//       display: inline-flex; align-items: center; gap: 6px;
//       font-size: 12px; font-weight: 700; padding: 6px 14px;
//       border-radius: 8px; border: 1px solid; cursor: pointer;
//       transition: all 0.15s; font-family: 'Sora', sans-serif; text-decoration: none;
//     }
//     .ma-btn-blue  { color:#1d4ed8; background:#eff6ff; border-color:#bfdbfe; }
//     .ma-btn-blue:hover  { background:#dbeafe; }
//     .ma-btn-slate { color:#475569; background:#f8fafc; border-color:#e2e8f0; }
//     .ma-btn-slate:hover { background:#f1f5f9; }

//     .ma-badge {
//       display: inline-flex; align-items: center; gap: 5px;
//       font-size: 11px; font-weight: 700; padding: 5px 11px;
//       border-radius: 20px; border: 1px solid; white-space: nowrap;
//     }

//     .ma-tab {
//       padding: 11px 18px; font-size: 13px; font-weight: 600; color: #64748b;
//       border: none; background: none; cursor: pointer;
//       border-bottom: 2px solid transparent; transition: all 0.15s;
//       font-family: 'Sora', sans-serif; display: flex; align-items: center; gap: 6px;
//     }
//     .ma-tab:hover { color: #0f172a; }
//     .ma-tab.active { color: #2563eb; border-bottom-color: #2563eb; }

//     .ma-input {
//       width: 100%; padding: 9px 14px 9px 36px; font-size: 13px;
//       border: 1.5px solid #e2e8f0; border-radius: 10px;
//       background: #f8fafc; color: #0f172a; outline: none;
//       transition: all 0.15s; font-family: 'Sora', sans-serif;
//     }
//     .ma-input:focus { border-color: #2563eb; background: white; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }

//     .ma-progress-track { height: 5px; background: rgba(255,255,255,0.12); border-radius: 99px; overflow: hidden; margin-top: 5px; }
//     .ma-progress-fill  { height: 100%; border-radius: 99px; transition: width 0.8s cubic-bezier(0.34,1.56,0.64,1); }

//     /* Timeline stepper */
//     .ma-timeline { display: flex; align-items: center; gap: 0; margin-top: 12px; }
//     .ma-step { display: flex; align-items: center; flex: 1; }
//     .ma-step-dot {
//       width: 24px; height: 24px; border-radius: 50%; border: 2px solid;
//       display: flex; align-items: center; justify-content: center;
//       font-size: 10px; font-weight: 800; flex-shrink: 0; transition: all 0.3s;
//     }
//     .ma-step-line { flex: 1; height: 2px; transition: background 0.3s; }
//     .ma-step-label { font-size: 10px; font-weight: 600; margin-top: 4px; text-align: center; }

//     /* Detail expand */
//     .ma-detail {
//       max-height: 0; overflow: hidden; transition: max-height 0.35s ease;
//     }
//     .ma-detail.open { max-height: 500px; }
//   `}</style>
// );

// /* ── Config ── */
// const STATUS = {
//   Applied:     { bg:"#eff6ff", border:"#bfdbfe", text:"#1d4ed8", dot:"#3b82f6", icon:"🔵", label:"Applied"     },
//   Reviewed:    { bg:"#fffbeb", border:"#fde68a", text:"#92400e", dot:"#f59e0b", icon:"🟡", label:"Reviewed"    },
//   Shortlisted: { bg:"#ecfdf5", border:"#a7f3d0", text:"#065f46", dot:"#10b981", icon:"🟢", label:"Shortlisted" },
//   Rejected:    { bg:"#fef2f2", border:"#fecaca", text:"#991b1b", dot:"#ef4444", icon:"🔴", label:"Rejected"    },
// };

// const STEPS = ["Applied", "Reviewed", "Shortlisted"];

// /* Step index — Rejected is a branch */
// const stepIndex = (status) => {
//   if (status === "Rejected") return -1;
//   return STEPS.indexOf(status);
// };

// /* ════════════════════════════════════════════
//    MAIN COMPONENT
// ════════════════════════════════════════════ */
// const MyApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading]           = useState(true);
//   const [activeTab, setActiveTab]       = useState("All");
//   const [search, setSearch]             = useState("");
//   const [expandedId, setExpandedId]     = useState(null);

//   const fetchApplications = async () => {
//     try {
//       const { data } = await api.get("/applications/my-applications");
//       setApplications(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchApplications(); }, []);

//   /* ── Derived ── */
//   const counts = useMemo(() => {
//     const c = { All:applications.length, Applied:0, Reviewed:0, Shortlisted:0, Rejected:0 };
//     applications.forEach(a => { if (c[a.status]!==undefined) c[a.status]++; });
//     return c;
//   }, [applications]);

//   const filtered = useMemo(() => {
//     return applications.filter(app => {
//       const matchTab = activeTab === "All" || app.status === activeTab;
//       const q = search.toLowerCase();
//       const matchSearch = !q ||
//         app.job?.title?.toLowerCase().includes(q) ||
//         app.job?.postedBy?.name?.toLowerCase().includes(q) ||
//         app.job?.location?.city?.toLowerCase().includes(q);
//       return matchTab && matchSearch;
//     });
//   }, [applications, activeTab, search]);

//   /* ── Loading ── */
//   if (loading) return (
//     <div style={{ minHeight:"100vh", background:"#f0f4f8", display:"flex", alignItems:"center", justifyContent:"center" }}>
//       <style>{`@keyframes ma-spin { to { transform: rotate(360deg); } }`}</style>
//       <div style={{ display:"flex", alignItems:"center", gap:12 }}>
//         <div style={{ width:20, height:20, border:"2.5px solid #2563eb", borderTopColor:"transparent", borderRadius:"50%", animation:"ma-spin 0.7s linear infinite" }} />
//         <span style={{ color:"#64748b", fontSize:14, fontWeight:500, fontFamily:"Sora, sans-serif" }}>Loading applications…</span>
//       </div>
//     </div>
//   );

//   /* ── Completion % ── */
//   const shortlisted = counts.Shortlisted;
//   const rejected    = counts.Rejected;
//   const total       = applications.length;
//   const successRate = total > 0 ? Math.round((shortlisted / total) * 100) : 0;

//   return (
//     <div className="ma-root" style={{ minHeight:"100vh", background:"#f0f4f8" }}>
//       <FontStyle />

//       {/* ══ HERO ══ */}
//       <div style={{ background:"linear-gradient(135deg, #0c1a2e 0%, #0f2d52 60%, #1a3a6e 100%)", position:"relative", overflow:"hidden" }}>
//         <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize:"40px 40px" }} />
//         <div style={{ position:"absolute", top:0, right:0, width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)" }} />
//         <div style={{ position:"absolute", bottom:0, left:0, width:250, height:250, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />

//         <div style={{ position:"relative", zIndex:1, maxWidth:1000, margin:"0 auto", padding:"2.5rem 2rem" }}>
//           <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:20, flexWrap:"wrap" }}>

//             <div>
//               <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(37,99,235,0.2)", border:"1px solid rgba(37,99,235,0.35)", borderRadius:99, padding:"5px 14px", marginBottom:10 }}>
//                 <span style={{ width:7, height:7, borderRadius:"50%", background:"#60a5fa", display:"inline-block", animation:"ma-pulse 2s infinite" }} />
//                 <span style={{ fontSize:11, fontWeight:700, color:"#93c5fd", letterSpacing:"0.1em", textTransform:"uppercase" }}>Job Seeker</span>
//               </div>
//               <h1 style={{ fontSize:26, fontWeight:800, color:"white", margin:0 }}>My Applications</h1>
//               <p style={{ color:"rgba(255,255,255,0.45)", fontSize:13, marginTop:6 }}>Track every application and your hiring pipeline</p>
//             </div>

//             {/* Stat boxes */}
//             <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
//               {[
//                 { label:"Total",       count:counts.All,         color:"#93c5fd" },
//                 { label:"Reviewed",    count:counts.Reviewed,    color:"#fcd34d" },
//                 { label:"Shortlisted", count:counts.Shortlisted, color:"#6ee7b7" },
//                 { label:"Rejected",    count:counts.Rejected,    color:"#fca5a5" },
//               ].map(({ label, count, color }) => (
//                 <div key={label} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:12, padding:"10px 16px", textAlign:"center", minWidth:68 }}>
//                   <div style={{ fontSize:20, fontWeight:800, color, fontFamily:"JetBrains Mono, monospace" }}>{count}</div>
//                   <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", fontWeight:600, marginTop:2 }}>{label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Success rate bar */}
//           {total > 0 && (
//             <div style={{ marginTop:20, maxWidth:340 }}>
//               <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
//                 <span style={{ fontSize:11, color:"rgba(255,255,255,0.45)", fontWeight:600 }}>Shortlist Rate</span>
//                 <span style={{ fontSize:12, color:"white", fontWeight:800, fontFamily:"JetBrains Mono, monospace" }}>{successRate}%</span>
//               </div>
//               <div className="ma-progress-track">
//                 <div className="ma-progress-fill" style={{ width:`${successRate}%`, background:"linear-gradient(90deg, #34d399, #6ee7b7)" }} />
//               </div>
//               <p style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:4 }}>
//                 {shortlisted} shortlisted · {rejected} rejected · {counts.Applied + counts.Reviewed} in progress
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ══ TAB NAV ══ */}
//       <div style={{ background:"white", borderBottom:"1px solid #e2e8f0" }}>
//         <div style={{ maxWidth:1000, margin:"0 auto", padding:"0 2rem", display:"flex" }}>
//           {["All","Applied","Reviewed","Shortlisted","Rejected"].map(tab => (
//             <button key={tab} className={`ma-tab ${activeTab===tab?"active":""}`} onClick={() => setActiveTab(tab)}>
//               {tab}
//               <span style={{
//                 fontSize:10, fontWeight:800, fontFamily:"JetBrains Mono, monospace",
//                 background: activeTab===tab ? "#eff6ff" : "#f1f5f9",
//                 color:      activeTab===tab ? "#2563eb" : "#94a3b8",
//                 border:`1px solid ${activeTab===tab ? "#bfdbfe" : "#e2e8f0"}`,
//                 borderRadius:99, padding:"1px 7px"
//               }}>
//                 {counts[tab]}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ══ BODY ══ */}
//       <div style={{ maxWidth:1000, margin:"0 auto", padding:"2rem" }}>

//         {/* Filter bar */}
//         {applications.length > 0 && (
//           <div className="ma-fade-up ma-fu-1" style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:14, padding:"12px 16px", marginBottom:20, display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
//             <div style={{ flex:1, minWidth:200, position:"relative" }}>
//               <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:14, color:"#94a3b8" }}>🔍</span>
//               <input className="ma-input" placeholder="Search by job title, company or location…" value={search} onChange={e => setSearch(e.target.value)} />
//             </div>
//             {search && (
//               <button className="ma-btn ma-btn-slate" onClick={() => setSearch("")}>✕ Clear</button>
//             )}
//             <span style={{ fontSize:12, color:"#94a3b8", fontWeight:600, marginLeft:"auto" }}>
//               {filtered.length} result{filtered.length!==1?"s":""}
//             </span>
//           </div>
//         )}

//         {/* Empty — no applications at all */}
//         {applications.length === 0 && (
//           <div className="ma-fade-up ma-fu-1" style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:16, padding:"5rem 2rem", textAlign:"center" }}>
//             <div style={{ fontSize:52, marginBottom:14 }}>📭</div>
//             <p style={{ fontSize:16, fontWeight:700, color:"#0f172a", marginBottom:8 }}>No applications yet</p>
//             <p style={{ fontSize:13, color:"#64748b", marginBottom:20 }}>Start applying to jobs and track your progress here.</p>
//             <Link to="/jobs" className="ma-btn ma-btn-blue" style={{ fontSize:13, padding:"10px 22px", borderRadius:10 }}>
//               Browse Jobs →
//             </Link>
//           </div>
//         )}

//         {/* Empty — filtered */}
//         {applications.length > 0 && filtered.length === 0 && (
//           <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:16, padding:"3rem", textAlign:"center" }}>
//             <div style={{ fontSize:40, marginBottom:10 }}>🔍</div>
//             <p style={{ fontSize:14, fontWeight:700, color:"#0f172a", marginBottom:6 }}>No results found</p>
//             <p style={{ fontSize:13, color:"#64748b" }}>Try a different search term or tab.</p>
//           </div>
//         )}

//         {/* Application cards */}
//         {filtered.length > 0 && (
//           <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
//             {filtered.map((app, idx) => {
//               const cfg      = STATUS[app.status] || STATUS.Applied;
//               const isOpen   = expandedId === app._id;
//               const sIdx     = stepIndex(app.status);
//               const isRej    = app.status === "Rejected";

//               return (
//                 <div key={app._id} className={`ma-card status-${app.status} ma-fade-up ma-fu-${Math.min(idx+2,4)}`}>

//                   {/* ── Card main row ── */}
//                   <div style={{ padding:"16px 20px", display:"flex", alignItems:"flex-start", gap:14, flexWrap:"wrap" }}>

//                     {/* Company avatar */}
//                     <div style={{
//                       width:48, height:48, borderRadius:14, flexShrink:0,
//                       background: isRej
//                         ? "linear-gradient(135deg, #ef4444, #dc2626)"
//                         : app.status==="Shortlisted"
//                         ? "linear-gradient(135deg, #10b981, #059669)"
//                         : "linear-gradient(135deg, #2563eb, #4f46e5)",
//                       display:"flex", alignItems:"center", justifyContent:"center",
//                       color:"white", fontWeight:800, fontSize:20
//                     }}>
//                       {app.job?.postedBy?.name?.[0]?.toUpperCase() || "?"}
//                     </div>

//                     {/* Info */}
//                     <div style={{ flex:1, minWidth:180 }}>
//                       <p style={{ fontSize:15, fontWeight:700, color:"#0f172a", margin:0 }}>{app.job?.title || "—"}</p>
//                       <p style={{ fontSize:12, color:"#64748b", margin:"3px 0 0" }}>
//                         {app.job?.postedBy?.name || "—"}
//                         {app.job?.location?.city && ` · 📍 ${app.job.location.city}`}
//                         {app.job?.employmentType && ` · ${app.job.employmentType}`}
//                       </p>
//                       {app.job?.salary?.min && (
//                         <p style={{ fontSize:12, color:"#2563eb", fontWeight:600, margin:"3px 0 0" }}>
//                           💰 ₹{Number(app.job.salary.min).toLocaleString()} – ₹{Number(app.job.salary.max).toLocaleString()}
//                         </p>
//                       )}
//                       <p style={{ fontSize:11, color:"#94a3b8", margin:"4px 0 0" }}>
//                         Applied {new Date(app.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
//                       </p>

//                       {/* ── Status timeline stepper ── */}
//                       {!isRej ? (
//                         <div style={{ marginTop:12 }}>
//                           <div className="ma-timeline">
//                             {STEPS.map((step, i) => {
//                               const done    = sIdx > i;
//                               const current = sIdx === i;
//                               const pending = sIdx < i;
//                               return (
//                                 <div key={step} className="ma-step" style={{ flex: i < STEPS.length-1 ? 1 : "none" }}>
//                                   <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
//                                     <div className="ma-step-dot" style={{
//                                       background: done||current ? STATUS[step].dot : "white",
//                                       borderColor: done||current ? STATUS[step].dot : "#e2e8f0",
//                                       color: done||current ? "white" : "#94a3b8",
//                                       boxShadow: current ? `0 0 0 3px ${STATUS[step].dot}33` : "none",
//                                     }}>
//                                       {done ? "✓" : current ? "●" : "○"}
//                                     </div>
//                                     <span className="ma-step-label" style={{ color: done||current ? STATUS[step].dot : "#94a3b8" }}>{step}</span>
//                                   </div>
//                                   {i < STEPS.length-1 && (
//                                     <div className="ma-step-line" style={{ background: done ? STATUS[STEPS[i+1]].dot : "#e2e8f0", margin:"0 4px", marginBottom:16 }} />
//                                   )}
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       ) : (
//                         <div style={{ marginTop:10 }}>
//                           <span className="ma-badge" style={{ background:"#fef2f2", borderColor:"#fecaca", color:"#991b1b", fontSize:11 }}>
//                             ✕ Application Rejected
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Right column */}
//                     <div style={{ display:"flex", flexDirection:"column", gap:8, alignItems:"flex-end", flexShrink:0 }}>
//                       {/* Status badge */}
//                       <span className="ma-badge" style={{ background:cfg.bg, borderColor:cfg.border, color:cfg.text }}>
//                         <span style={{ width:6, height:6, borderRadius:"50%", background:cfg.dot, display:"inline-block" }} />
//                         {cfg.label}
//                       </span>

//                       {/* View job */}
//                       <Link to={`/jobs/${app.job?._id}`} className="ma-btn ma-btn-blue">
//                         View Job →
//                       </Link>

//                       {/* Expand toggle */}
//                       <button
//                         className="ma-btn ma-btn-slate"
//                         onClick={() => setExpandedId(isOpen ? null : app._id)}
//                       >
//                         {isOpen ? "▲ Less" : "▼ Details"}
//                       </button>
//                     </div>
//                   </div>

//                   {/* ── Expanded detail panel ── */}
//                   <div className={`ma-detail ${isOpen?"open":""}`}>
//                     <div style={{ padding:"0 20px 18px", borderTop:"1px solid #f1f5f9" }}>
//                       <div style={{ paddingTop:16, display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px,1fr))", gap:10 }}>
//                         <DetailField icon="🏢" label="Workplace" value={app.job?.workplaceType || "—"} />
//                         <DetailField icon="📊" label="Experience Level" value={app.job?.experienceLevel || "—"} />
//                         <DetailField icon="📍" label="Location" value={[app.job?.location?.city, app.job?.location?.country].filter(Boolean).join(", ") || "—"} />
//                         <DetailField icon="⏳" label="Deadline" value={app.job?.applicationDeadline ? new Date(app.job.applicationDeadline).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}) : "Not specified"} />
//                         <DetailField icon="📅" label="Posted By" value={app.job?.postedBy?.email || "—"} />
//                         <DetailField icon="🔖" label="Application ID" value={app._id?.slice(-8).toUpperCase()} mono />
//                       </div>

//                       {/* Skills required */}
//                       {app.job?.skillsRequired?.length > 0 && (
//                         <div style={{ marginTop:14 }}>
//                           <p style={{ fontSize:10, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Skills Required</p>
//                           <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
//                             {(Array.isArray(app.job.skillsRequired) ? app.job.skillsRequired : app.job.skillsRequired.split(","))
//                               .map((s,i) => (
//                                 <span key={i} style={{ fontSize:11, fontWeight:600, color:"#1d4ed8", background:"#eff6ff", border:"1px solid #bfdbfe", padding:"3px 9px", borderRadius:20 }}>{s.trim()}</span>
//                               ))}
//                           </div>
//                         </div>
//                       )}

//                       {/* Status message */}
//                       <div style={{ marginTop:14, padding:"10px 14px", borderRadius:10, background: cfg.bg, border:`1px solid ${cfg.border}` }}>
//                         <p style={{ fontSize:12, fontWeight:700, color:cfg.text, margin:0 }}>
//                           {app.status === "Applied"     && "⏳ Your application is under review. Hang tight!"}
//                           {app.status === "Reviewed"    && "👁 A recruiter has reviewed your profile. You may hear back soon."}
//                           {app.status === "Shortlisted" && "🎉 Congratulations! You've been shortlisted. Expect to be contacted."}
//                           {app.status === "Rejected"    && "Unfortunately, your application was not selected this time. Keep applying!"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Browse more jobs CTA */}
//         {applications.length > 0 && (
//           <div style={{ marginTop:24, textAlign:"center" }}>
//             <Link to="/jobs" className="ma-btn ma-btn-blue" style={{ fontSize:13, padding:"11px 28px", borderRadius:12 }}>
//               + Browse More Jobs
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// function DetailField({ icon, label, value, mono }) {
//   return (
//     <div style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:10, padding:"8px 12px" }}>
//       <p style={{ fontSize:10, fontWeight:600, color:"#94a3b8", margin:0, textTransform:"uppercase", letterSpacing:"0.06em" }}>{icon} {label}</p>
//       <p style={{ fontSize:12, fontWeight:600, color:"#334155", margin:"3px 0 0", fontFamily: mono ? "JetBrains Mono, monospace" : "Sora, sans-serif" }}>{value}</p>
//     </div>
//   );
// }

// export default MyApplications;
import { useEffect, useState, useMemo } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const STATUS = {
  Applied:     { bg:"bg-blue-50",    border:"border-blue-200",    text:"text-blue-700",    dot:"bg-blue-500",    label:"Applied"     },
  Reviewed:    { bg:"bg-amber-50",   border:"border-amber-200",   text:"text-amber-800",   dot:"bg-amber-400",   label:"Reviewed"    },
  Shortlisted: { bg:"bg-emerald-50", border:"border-emerald-200", text:"text-emerald-800", dot:"bg-emerald-500", label:"Shortlisted" },
  Rejected:    { bg:"bg-red-50",     border:"border-red-200",     text:"text-red-800",     dot:"bg-red-500",     label:"Rejected"    },
};

const STEPS = ["Applied", "Reviewed", "Shortlisted"];

const stepIndex = (status) => {
  if (status === "Rejected") return -1;
  return STEPS.indexOf(status);
};

const STEP_ACTIVE_CLASS = {
  Applied:     "bg-blue-500 border-blue-500 text-white",
  Reviewed:    "bg-amber-400 border-amber-400 text-white",
  Shortlisted: "bg-emerald-500 border-emerald-500 text-white",
};
const STEP_LINE_ACTIVE = {
  Applied:     "bg-blue-500",
  Reviewed:    "bg-amber-400",
  Shortlisted: "bg-emerald-500",
};

/* ════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════ */
const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [activeTab, setActiveTab]       = useState("All");
  const [search, setSearch]             = useState("");
  const [expandedId, setExpandedId]     = useState(null);

  useEffect(() => {
    api.get("/applications/my-applications")
      .then(({ data }) => setApplications(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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

  const shortlisted = counts.Shortlisted;
  const rejected    = counts.Rejected;
  const total       = applications.length;
  const successRate = total > 0 ? Math.round((shortlisted / total) * 100) : 0;

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
                { label: "Total",       count: counts.All,          color: "text-blue-300"    },
                { label: "Reviewed",    count: counts.Reviewed,     color: "text-yellow-300"  },
                { label: "Shortlisted", count: counts.Shortlisted,  color: "text-emerald-300" },
                { label: "Rejected",    count: counts.Rejected,     color: "text-red-300"     },
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
                {shortlisted} shortlisted · {rejected} rejected · {counts.Applied + counts.Reviewed} in progress
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ══ TABS ══ */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 flex overflow-x-auto">
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
              const cfg    = STATUS[app.status] || STATUS.Applied;
              const isOpen = expandedId === app._id;
              const sIdx   = stepIndex(app.status);
              const isRej  = app.status === "Rejected";

              const avatarBg =
                isRej                        ? "from-red-500 to-red-600"       :
                app.status === "Shortlisted" ? "from-emerald-500 to-emerald-600" :
                                               "from-blue-600 to-indigo-600";

              const leftBorder =
                isRej                        ? "border-l-4 border-l-red-500"      :
                app.status === "Shortlisted" ? "border-l-4 border-l-emerald-500"  :
                app.status === "Reviewed"    ? "border-l-4 border-l-amber-400"    :
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
                            const done    = sIdx > i;
                            const current = sIdx === i;
                            return (
                              <div key={step} className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
                                <div className="flex flex-col items-center">
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-extrabold flex-shrink-0 transition-all ${
                                    done || current
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
                    </div>
                  </div>

                  {/* Expanded panel */}
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
                    <div className="px-5 pb-5 border-t border-slate-100 pt-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        <DetailField icon="🏢" label="Workplace"        value={app.job?.workplaceType   || "—"} />
                        <DetailField icon="📊" label="Exp. Level"       value={app.job?.experienceLevel || "—"} />
                        <DetailField icon="📍" label="Location"         value={[app.job?.location?.city, app.job?.location?.country].filter(Boolean).join(", ") || "—"} />
                        <DetailField icon="⏳" label="Deadline"         value={app.job?.applicationDeadline ? new Date(app.job.applicationDeadline).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }) : "Not specified"} />
                        <DetailField icon="📧" label="Posted By"        value={app.job?.postedBy?.email || "—"} />
                        <DetailField icon="🔖" label="Application ID"   value={app._id?.slice(-8).toUpperCase()} mono />
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
                          {app.status === "Applied"     && "⏳ Your application is under review. Hang tight!"}
                          {app.status === "Reviewed"    && "👁 A recruiter has reviewed your profile. You may hear back soon."}
                          {app.status === "Shortlisted" && "🎉 Congratulations! You've been shortlisted. Expect to be contacted."}
                          {app.status === "Rejected"    && "Unfortunately, your application was not selected this time. Keep applying!"}
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
