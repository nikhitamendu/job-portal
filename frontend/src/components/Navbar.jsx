
// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useAuth } from "../context/AuthContext";
// import { useState, useEffect, useRef } from "react";
// import api from "../services/api";
// import NotificationDropdown from "./NotificationDropdown";

// const FontStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
//     .nb-root * { font-family: 'Sora', sans-serif; box-sizing: border-box; }

//     @keyframes nb-fadeDown {
//       from { opacity: 0; transform: translateY(-8px); }
//       to   { opacity: 1; transform: translateY(0); }
//     }
//     @keyframes nb-pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
//     @keyframes nb-ping {
//       75%, 100% { transform: scale(2); opacity: 0; }
//     }

//     .nb-dropdown {
//       animation: nb-fadeDown 0.18s cubic-bezier(0.34,1.56,0.64,1);
//     }

//     .nb-nav-link {
//       padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 600;
//       color: rgba(255,255,255,0.6); text-decoration: none;
//       transition: all 0.15s; display: flex; align-items: center; gap: 6px;
//       border: 1px solid transparent;
//     }
//     .nb-nav-link:hover { color: white; background: rgba(255,255,255,0.08); }
//     .nb-nav-link.active {
//       color: #93c5fd; background: rgba(37,99,235,0.18);
//       border-color: rgba(37,99,235,0.25);
//     }

//     .nb-mobile-link {
//       display: flex; align-items: center; gap: 10px;
//       padding: 11px 14px; border-radius: 12px; font-size: 13px; font-weight: 600;
//       color: rgba(255,255,255,0.65); text-decoration: none;
//       transition: all 0.15s; border: 1px solid transparent;
//     }
//     .nb-mobile-link:hover { color: white; background: rgba(255,255,255,0.08); }
//     .nb-mobile-link.active { color: #93c5fd; background: rgba(37,99,235,0.15); border-color: rgba(37,99,235,0.2); }

//     .nb-avatar {
//       width: 34px; height: 34px; border-radius: 10px;
//       background: linear-gradient(135deg, #2563eb, #4f46e5);
//       display: flex; align-items: center; justify-content: center;
//       color: white; font-weight: 800; font-size: 14px; flex-shrink: 0;
//       border: 2px solid rgba(255,255,255,0.15);
//     }

//     .nb-search-bar {
//       width: 100%; padding: 8px 14px 8px 36px; font-size: 13px;
//       border: 1.5px solid rgba(255,255,255,0.12); border-radius: 10px;
//       background: rgba(255,255,255,0.08); color: white; outline: none;
//       transition: all 0.2s; font-family: 'Sora', sans-serif;
//     }
//     .nb-search-bar::placeholder { color: rgba(255,255,255,0.35); }
//     .nb-search-bar:focus { border-color: rgba(37,99,235,0.6); background: rgba(255,255,255,0.12); box-shadow: 0 0 0 3px rgba(37,99,235,0.15); }

//     .nb-notif-dot {
//       position: absolute; top: -2px; right: -2px;
//       width: 8px; height: 8px; border-radius: 50%; background: #ef4444;
//       border: 2px solid #0d2340;
//     }
//     .nb-notif-dot::before {
//       content: ''; position: absolute; inset: -2px; border-radius: 50%;
//       background: #ef4444; animation: nb-ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
//     }

//     /* Hamburger lines */
//     .nb-ham-line {
//       display: block; width: 18px; height: 2px;
//       background: white; border-radius: 99px; transition: all 0.25s;
//     }
//   `}</style>
// );

// /* ── Nav items per role ── */
// const JOBSEEKER_LINKS = [
//   { to: "/jobs",            label: "Browse Jobs",      icon: "🔍" },
//   { to: "/my-applications", label: "My Applications",  icon: "📋" },
//   { to: "/profile",         label: "Profile",          icon: "👤" },
// ];

// const RECRUITER_LINKS = [
//   { to: "/recruiter/dashboard",   label: "Dashboard",      icon: "📊" },
//   { to: "/recruiter/applicants",  label: "All Applicants", icon: "👥" },
//   { to: "/recruiter/search",      label: "Find Talent",    icon: "🔍" },
//   { to: "/profile",               label: "Profile",        icon: "👤" },
// ];

// /* ════════════════════════════════════════════
//    MAIN NAVBAR
// ════════════════════════════════════════════ */
// export default function Navbar() {
//   const navigate  = useNavigate();
//   const location  = useLocation();
//   const { isAuthenticated, logout, user } = useAuth();

//   const [mobileOpen,   setMobileOpen]   = useState(false);
//   const [userDropdown, setUserDropdown] = useState(false);
//   const [searchOpen,   setSearchOpen]   = useState(false);
//   const [searchQuery,  setSearchQuery]  = useState("");
//   const [scrolled,     setScrolled]     = useState(false);
//   const [appCount,     setAppCount]     = useState(0);
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount,   setUnreadCount]   = useState(0);
//   const [notifOpen,     setNotifOpen]     = useState(false);

//   const dropdownRef = useRef(null);
//   const searchRef   = useRef(null);

//   const isRecruiter = user?.role === "recruiter";
//   const navLinks    = isRecruiter ? RECRUITER_LINKS : JOBSEEKER_LINKS;

//   /* Close mobile on route change */
//   useEffect(() => { 
//     setMobileOpen(false); 
//     setUserDropdown(false);
//     setNotifOpen(false); 
//   }, [location.pathname]);

//   /* Scroll shadow */
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   /* Fetch application count for job seeker badge */
//   useEffect(() => {
//     if (!isAuthenticated || isRecruiter) return;
//     api.get("/applications/my-applications")
//       .then(({ data }) => {
//         const pending = data.filter(a => a.status === "Applied" || a.status === "Reviewed").length;
//         setAppCount(pending);
//       })
//       .catch(() => {});
//   }, [isAuthenticated, isRecruiter]);

//   /* Fetch Notifications */
//   const fetchNotifications = async () => {
//     if (!isAuthenticated) return;
//     try {
//       const { data } = await api.get("/notifications");
//       setNotifications(data.notifications);
//       setUnreadCount(data.unreadCount);
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
//     return () => clearInterval(interval);
//   }, [isAuthenticated]);

//   /* Close dropdown on outside click */
//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setUserDropdown(false);
//       if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
//       if (notifRef && notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const notifRef = useRef(null);

//   const handleLogout = async () => {
//     await logout();
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//       setSearchOpen(false);
//     }
//   };

//   return (
//     <nav className="nb-root" style={{
//       background: "linear-gradient(135deg, #0c1a2e 0%, #0f2d52 60%, #1a3a6e 100%)",
//       borderBottom: "1px solid rgba(255,255,255,0.08)",
//       position: "sticky", top: 0, zIndex: 50,
//       boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.35)" : "none",
//       transition: "box-shadow 0.2s",
//     }}>
//       <FontStyle />

//       <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", height: 64, display: "flex", alignItems: "center", gap: 16 }}>

//         {/* ── LOGO ── */}
//         <Link to="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", flexShrink:0 }}>
//           <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#2563eb,#4f46e5)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:800, fontSize:18, boxShadow:"0 4px 12px rgba(37,99,235,0.4)", border:"1px solid rgba(255,255,255,0.15)" }}>
//             H
//           </div>
//           <span style={{ fontSize:17, fontWeight:800, color:"white", letterSpacing:"-0.02em" }}>
//             Hire<span style={{ color:"#60a5fa" }}>Hub</span>
//           </span>
//         </Link>

//         {/* ── DESKTOP LINKS ── */}
//         <div style={{ display:"flex", alignItems:"center", gap:2, flex:1 }} className="hidden-mobile">
//           {isAuthenticated ? (
//             navLinks.map(link => (
//               <NavLink
//                 key={link.to}
//                 to={link.to}
//                 className={({ isActive }) => `nb-nav-link${isActive ? " active" : ""}`}
//               >
//                 <span>{link.icon}</span>
//                 {link.label}
//                 {/* Badge for My Applications */}
//                 {link.to === "/my-applications" && appCount > 0 && (
//                   <span style={{ fontSize:10, fontWeight:800, background:"#ef4444", color:"white", borderRadius:99, padding:"1px 6px", fontFamily:"JetBrains Mono, monospace" }}>
//                     {appCount}
//                   </span>
//                 )}
//               </NavLink>
//             ))
//           ) : (
//             <>
//               <NavLink to="/jobs" className={({ isActive }) => `nb-nav-link${isActive?" active":""}`}>
//                 🔍 Browse Jobs
//               </NavLink>
//             </>
//           )}
//         </div>

//         {/* ── RIGHT ACTIONS ── */}
//         <div style={{ display:"flex", alignItems:"center", gap:8, marginLeft:"auto", flexShrink:0 }}>

//           {/* Search button */}
//           <div ref={searchRef} style={{ position:"relative" }}>
//             <button
//               onClick={() => setSearchOpen(o => !o)}
//               style={{ width:36, height:36, borderRadius:9, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.7)", fontSize:15, transition:"all 0.15s" }}
//               title="Search jobs"
//             >
//               🔍
//             </button>

//             {/* Search dropdown */}
//             {searchOpen && (
//               <div className="nb-dropdown" style={{ position:"absolute", top:"calc(100% + 10px)", right:0, width:300, background:"#1e3a5f", border:"1px solid rgba(255,255,255,0.12)", borderRadius:14, padding:14, boxShadow:"0 16px 40px rgba(0,0,0,0.4)", zIndex:100 }}>
//                 <form onSubmit={handleSearch} style={{ position:"relative" }}>
//                   <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:14, color:"rgba(255,255,255,0.4)" }}>🔍</span>
//                   <input
//                     autoFocus
//                     className="nb-search-bar"
//                     placeholder="Search jobs, skills, companies…"
//                     value={searchQuery}
//                     onChange={e => setSearchQuery(e.target.value)}
//                   />
//                 </form>
//                 <p style={{ fontSize:11, color:"rgba(255,255,255,0.3)", margin:"8px 0 0", textAlign:"center" }}>Press Enter to search</p>
//               </div>
//             )}
//           </div>

//           {/* Notification bell */}
//           {isAuthenticated && (
//             <div ref={notifRef} style={{ position:"relative" }}>
//               <button
//                 onClick={() => setNotifOpen(o => !o)}
//                 style={{ width:36, height:36, borderRadius:9, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.7)", fontSize:15, transition:"all 0.15s", position: "relative" }}
//                 title="Notifications"
//               >
//                 🔔
//                 {unreadCount > 0 && (
//                   <span className="nb-notif-dot" style={{ top: -2, right: -2 }} />
//                 )}
//               </button>

//               {notifOpen && (
//                 <NotificationDropdown
//                   notifications={notifications}
//                   unreadCount={unreadCount}
//                   onRefresh={fetchNotifications}
//                   onClose={() => setNotifOpen(false)}
//                 />
//               )}
//             </div>
//           )}

//           {!isAuthenticated ? (
//             /* Guest buttons */
//             <>
//               <NavLink to="/login" className={({ isActive }) => `nb-nav-link${isActive?" active":""}`} style={{ display:"flex" }}>
//                 Login
//               </NavLink>
//               <Link to="/register" style={{ padding:"7px 16px", background:"linear-gradient(135deg,#2563eb,#4f46e5)", color:"white", fontSize:13, fontWeight:700, borderRadius:10, textDecoration:"none", border:"1px solid rgba(255,255,255,0.15)", boxShadow:"0 2px 8px rgba(37,99,235,0.35)", transition:"all 0.15s", whiteSpace:"nowrap" }}>
//                 Sign Up →
//               </Link>
//             </>
//           ) : (
//             /* User dropdown */
//             <div ref={dropdownRef} style={{ position:"relative" }}>
//               <button
//                 onClick={() => setUserDropdown(o => !o)}
//                 style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"5px 10px 5px 5px", cursor:"pointer", transition:"all 0.15s" }}
//               >
//                 <div className="nb-avatar">{user?.name?.[0]?.toUpperCase() || "U"}</div>
//                 <div style={{ textAlign:"left" }}>
//                   <p style={{ fontSize:12, fontWeight:700, color:"white", margin:0, maxWidth:100, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.name || "User"}</p>
//                   <p style={{ fontSize:10, color:"rgba(255,255,255,0.45)", margin:0 }}>{isRecruiter ? "Recruiter" : "Job Seeker"}</p>
//                 </div>
//                 <span style={{ color:"rgba(255,255,255,0.4)", fontSize:10, marginLeft:2 }}>▼</span>
//               </button>

//               {/* Dropdown menu */}
//               {userDropdown && (
//                 <div className="nb-dropdown" style={{ position:"absolute", top:"calc(100% + 10px)", right:0, width:230, background:"#1e3a5f", border:"1px solid rgba(255,255,255,0.12)", borderRadius:16, overflow:"hidden", boxShadow:"0 16px 40px rgba(0,0,0,0.4)", zIndex:100 }}>

//                   {/* User info header */}
//                   <div style={{ padding:"14px 16px", borderBottom:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.04)" }}>
//                     <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//                       <div className="nb-avatar" style={{ width:38, height:38, fontSize:16 }}>{user?.name?.[0]?.toUpperCase() || "U"}</div>
//                       <div style={{ minWidth:0 }}>
//                         <p style={{ fontSize:13, fontWeight:700, color:"white", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.name}</p>
//                         <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.email}</p>
//                       </div>
//                     </div>
//                     <div style={{ marginTop:8 }}>
//                       <span style={{ fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:99, background: isRecruiter ? "rgba(245,158,11,0.2)" : "rgba(37,99,235,0.2)", border:`1px solid ${isRecruiter ? "rgba(245,158,11,0.35)" : "rgba(37,99,235,0.35)"}`, color: isRecruiter ? "#fcd34d" : "#93c5fd", textTransform:"uppercase", letterSpacing:"0.06em" }}>
//                         {isRecruiter ? "🏢 Recruiter" : "👤 Job Seeker"}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Menu items */}
//                   <div style={{ padding:"8px" }}>
//                     {navLinks.map(link => (
//                       <Link key={link.to} to={link.to} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:10, color:"rgba(255,255,255,0.7)", textDecoration:"none", fontSize:13, fontWeight:600, transition:"all 0.15s" }}
//                         onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.08)"}
//                         onMouseLeave={e => e.currentTarget.style.background="transparent"}
//                       >
//                         <span style={{ fontSize:15 }}>{link.icon}</span>
//                         {link.label}
//                         {link.to === "/my-applications" && appCount > 0 && (
//                           <span style={{ marginLeft:"auto", fontSize:10, fontWeight:800, background:"#ef4444", color:"white", borderRadius:99, padding:"1px 6px" }}>{appCount}</span>
//                         )}
//                       </Link>
//                     ))}

//                     {/* Divider */}
//                     <div style={{ height:1, background:"rgba(255,255,255,0.08)", margin:"6px 0" }} />

//                     {/* Recruiter quick actions */}
//                     {isRecruiter && (
//                       <>
//                         <Link to="/recruiter/create-job" style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:10, color:"rgba(255,255,255,0.7)", textDecoration:"none", fontSize:13, fontWeight:600, transition:"all 0.15s" }}
//                           onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.08)"}
//                           onMouseLeave={e => e.currentTarget.style.background="transparent"}
//                         >
//                           <span>➕</span> Post a Job
//                         </Link>
//                         <div style={{ height:1, background:"rgba(255,255,255,0.08)", margin:"6px 0" }} />
//                       </>
//                     )}

//                     {/* Logout */}
//                     <button
//                       onClick={handleLogout}
//                       style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:10, color:"#fca5a5", background:"none", border:"none", fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.15s", textAlign:"left", fontFamily:"Sora, sans-serif" }}
//                       onMouseEnter={e => e.currentTarget.style.background="rgba(239,68,68,0.12)"}
//                       onMouseLeave={e => e.currentTarget.style.background="transparent"}
//                     >
//                       <span>↩</span> Sign Out
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Mobile hamburger */}
//           <button
//             onClick={() => setMobileOpen(o => !o)}
//             style={{ display:"none", width:36, height:36, borderRadius:9, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:4, cursor:"pointer" }}
//             className="show-mobile"
//             aria-label="Toggle menu"
//           >
//             <span className="nb-ham-line" style={{ transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
//             <span className="nb-ham-line" style={{ opacity: mobileOpen ? 0 : 1 }} />
//             <span className="nb-ham-line" style={{ transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
//           </button>
//         </div>
//       </div>

//       {/* ── MOBILE MENU ── */}
//       <div style={{ overflow:"hidden", maxHeight: mobileOpen ? 600 : 0, transition:"max-height 0.3s ease", borderTop: mobileOpen ? "1px solid rgba(255,255,255,0.08)" : "none" }} className="show-mobile-block">
//         <div style={{ padding:"12px 16px 16px", background:"linear-gradient(180deg, #0f2d52, #0c1a2e)", display:"flex", flexDirection:"column", gap:4 }}>

//           {/* User info */}
//           {isAuthenticated && (
//             <div style={{ display:"flex", alignItems:"center", gap:12, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:14, padding:"12px 14px", marginBottom:8 }}>
//               <div className="nb-avatar" style={{ width:40, height:40, fontSize:16 }}>{user?.name?.[0]?.toUpperCase() || "U"}</div>
//               <div style={{ flex:1, minWidth:0 }}>
//                 <p style={{ fontSize:13, fontWeight:700, color:"white", margin:0 }}>{user?.name}</p>
//                 <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.email}</p>
//               </div>
//               <span style={{ fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:99, background: isRecruiter ? "rgba(245,158,11,0.2)" : "rgba(37,99,235,0.2)", border:`1px solid ${isRecruiter ? "rgba(245,158,11,0.3)" : "rgba(37,99,235,0.3)"}`, color: isRecruiter ? "#fcd34d" : "#93c5fd", flexShrink:0 }}>
//                 {isRecruiter ? "Recruiter" : "Seeker"}
//               </span>
//             </div>
//           )}

//           {/* Mobile search */}
//           <form onSubmit={handleSearch} style={{ position:"relative", marginBottom:4 }}>
//             <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:14, color:"rgba(255,255,255,0.4)" }}>🔍</span>
//             <input className="nb-search-bar" placeholder="Search jobs…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
//           </form>

//           {/* Nav links */}
//           {!isAuthenticated ? (
//             <>
//               <NavLink to="/jobs"     className={({ isActive }) => `nb-mobile-link${isActive?" active":""}`}>🔍 Browse Jobs</NavLink>
//               <NavLink to="/login"    className={({ isActive }) => `nb-mobile-link${isActive?" active":""}`}>🔐 Login</NavLink>
//               <NavLink to="/register" className={({ isActive }) => `nb-mobile-link${isActive?" active":""}`}>✨ Sign Up</NavLink>
//             </>
//           ) : (
//             <>
//               {navLinks.map(link => (
//                 <NavLink key={link.to} to={link.to} className={({ isActive }) => `nb-mobile-link${isActive?" active":""}`}>
//                   <span>{link.icon}</span>
//                   {link.label}
//                   {link.to === "/my-applications" && appCount > 0 && (
//                     <span style={{ marginLeft:"auto", fontSize:10, fontWeight:800, background:"#ef4444", color:"white", borderRadius:99, padding:"2px 7px" }}>{appCount}</span>
//                   )}
//                 </NavLink>
//               ))}

//               {isRecruiter && (
//                 <NavLink to="/recruiter/create-job" className={({ isActive }) => `nb-mobile-link${isActive?" active":""}`}>
//                   ➕ Post a Job
//                 </NavLink>
//               )}

//               <div style={{ height:1, background:"rgba(255,255,255,0.08)", margin:"4px 0" }} />

//               <button onClick={handleLogout} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", borderRadius:12, color:"#fca5a5", background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Sora, sans-serif", width:"100%" }}>
//                 ↩ Sign Out
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Responsive CSS */}
//       <style>{`
//         @media (min-width: 768px) {
//           .hidden-mobile { display: flex !important; }
//           .show-mobile   { display: none !important; }
//           .show-mobile-block { display: none !important; }
//         }
//         @media (max-width: 767px) {
//           .hidden-mobile { display: none !important; }
//           .show-mobile   { display: flex !important; }
//           .show-mobile-block { display: block !important; }
//         }
//       `}</style>
//     </nav>
//   );
// }
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import NotificationDropdown from "./NotificationDropdown";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
    .nb-root * { font-family: 'Sora', sans-serif; box-sizing: border-box; }

    @keyframes nb-fadeDown {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes nb-pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    @keyframes nb-ping {
      75%, 100% { transform: scale(2); opacity: 0; }
    }

    .nb-dropdown {
      animation: nb-fadeDown 0.18s cubic-bezier(0.34,1.56,0.64,1);
    }

    .nb-nav-link {
      padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 600;
      color: rgba(255,255,255,0.6); text-decoration: none;
      transition: all 0.15s; display: flex; align-items: center; gap: 6px;
      border: 1px solid transparent;
    }
    .nb-nav-link:hover { color: white; background: rgba(255,255,255,0.08); }
    .nb-nav-link.active {
      color: #93c5fd; background: rgba(37,99,235,0.18);
      border-color: rgba(37,99,235,0.25);
    }

    .nb-mobile-link {
      display: flex; align-items: center; gap: 10px;
      padding: 11px 14px; border-radius: 12px; font-size: 13px; font-weight: 600;
      color: rgba(255,255,255,0.65); text-decoration: none;
      transition: all 0.15s; border: 1px solid transparent;
    }
    .nb-mobile-link:hover { color: white; background: rgba(255,255,255,0.08); }
    .nb-mobile-link.active { color: #93c5fd; background: rgba(37,99,235,0.15); border-color: rgba(37,99,235,0.2); }

    .nb-avatar {
      width: 34px; height: 34px; border-radius: 10px;
      background: linear-gradient(135deg, #2563eb, #4f46e5);
      display: flex; align-items: center; justify-content: center;
      color: white; font-weight: 800; font-size: 14px; flex-shrink: 0;
      border: 2px solid rgba(255,255,255,0.15);
    }

    .nb-notif-dot {
      position: absolute; top: -2px; right: -2px;
      width: 8px; height: 8px; border-radius: 50%; background: #ef4444;
      border: 2px solid #0d2340;
    }
    .nb-notif-dot::before {
      content: ''; position: absolute; inset: -2px; border-radius: 50%;
      background: #ef4444; animation: nb-ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
    }

    /* Hamburger lines */
    .nb-ham-line {
      display: block; width: 18px; height: 2px;
      background: white; border-radius: 99px; transition: all 0.25s;
    }
  `}</style>
);

/* ── Nav items per role ── */
const JOBSEEKER_LINKS = [
  { to: "/jobs",            label: "Browse Jobs",      icon: "🔍" },
  { to: "/my-applications", label: "My Applications",  icon: "📋" },
  { to: "/interviews",      label: "Interviews",       icon: "📅" },
  { to: "/profile",         label: "Profile",          icon: "👤" },
];

const RECRUITER_LINKS = [
  { to: "/recruiter/dashboard",   label: "Dashboard",      icon: "📊" },
  { to: "/recruiter/applicants",  label: "All Applicants", icon: "👥" },
  { to: "/interviews",            label: "Interviews",     icon: "📅" },
  { to: "/recruiter/search",      label: "Find Talent",    icon: "🔍" },
  { to: "/profile",               label: "Profile",        icon: "👤" },
];

/* ════════════════════════════════════════════
   MAIN NAVBAR
════════════════════════════════════════════ */
export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { isAuthenticated, logout, user } = useAuth();

  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [appCount,     setAppCount]     = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount,   setUnreadCount]   = useState(0);
  const [notifOpen,     setNotifOpen]     = useState(false);

  const dropdownRef = useRef(null);
  const notifRef    = useRef(null);

  const isRecruiter = user?.role === "recruiter";
  const isAdmin     = user?.role === "admin";
  const navLinks    = isRecruiter ? RECRUITER_LINKS : JOBSEEKER_LINKS;

  /* Close mobile on route change */
  useEffect(() => {
    setMobileOpen(false);
    setUserDropdown(false);
    setNotifOpen(false);
  }, [location.pathname]);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Fetch application count for job seeker badge */
  useEffect(() => {
    if (!isAuthenticated || isRecruiter) return;
    api.get("/applications/my-applications")
      .then(({ data }) => {
        const pending = data.filter(a => a.status === "Applied" || a.status === "Reviewed").length;
        setAppCount(pending);
      })
      .catch(() => {});
  }, [isAuthenticated, isRecruiter]);

  /* Fetch Notifications */
  const fetchNotifications = async () => {
    if (!isAuthenticated) return;
    try {
      const { data } = await api.get("/notifications");
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setUserDropdown(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="nb-root" style={{
      background: "linear-gradient(135deg, #0c1a2e 0%, #0f2d52 60%, #1a3a6e 100%)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      position: "sticky", top: 0, zIndex: 50,
      boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.35)" : "none",
      transition: "box-shadow 0.2s",
    }}>
      <FontStyle />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", height: 64, display: "flex", alignItems: "center", gap: 16 }}>

        {/* ── LOGO ── */}
        <Link to="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", flexShrink:0 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#2563eb,#4f46e5)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:800, fontSize:18, boxShadow:"0 4px 12px rgba(37,99,235,0.4)", border:"1px solid rgba(255,255,255,0.15)" }}>
            H
          </div>
          <span style={{ fontSize:17, fontWeight:800, color:"white", letterSpacing:"-0.02em" }}>
            Hire<span style={{ color:"#60a5fa" }}>Hub</span>
          </span>
        </Link>

        {/* ── DESKTOP LINKS ── */}
        <div style={{ display:"flex", alignItems:"center", gap:2, flex:1 }} className="hidden-mobile">
          {isAuthenticated ? (
            isAdmin ? (
              <NavLink to="/admin" className={({ isActive }) => `nb-nav-link${isActive ? " active" : ""}`}>
                <span>⚡</span> Admin Panel
              </NavLink>
            ) : (
              navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `nb-nav-link${isActive ? " active" : ""}`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                  {/* Badge for My Applications */}
                  {link.to === "/my-applications" && appCount > 0 && (
                    <span style={{ fontSize:10, fontWeight:800, background:"#ef4444", color:"white", borderRadius:99, padding:"1px 6px", fontFamily:"JetBrains Mono, monospace" }}>
                      {appCount}
                    </span>
                  )}
                </NavLink>
              ))
            )
          ) : (
            <>
              <NavLink to="/jobs" className={({ isActive }) => `nb-nav-link${isActive?" active":""}`}>
                🔍 Browse Jobs
              </NavLink>
            </>
          )}
        </div>

        {/* ── RIGHT ACTIONS ── */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginLeft:"auto", flexShrink:0 }}>

          {/* Notification bell */}
          {isAuthenticated && (
            <div ref={notifRef} style={{ position:"relative" }}>
              <button
                onClick={() => setNotifOpen(o => !o)}
                style={{ width:36, height:36, borderRadius:9, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.7)", fontSize:15, transition:"all 0.15s", position:"relative" }}
                title="Notifications"
              >
                🔔
                {unreadCount > 0 && (
                  <span className="nb-notif-dot" style={{ top: -2, right: -2 }} />
                )}
              </button>

              {notifOpen && (
                <NotificationDropdown
                  notifications={notifications}
                  unreadCount={unreadCount}
                  onRefresh={fetchNotifications}
                  onClose={() => setNotifOpen(false)}
                />
              )}
            </div>
          )}

          {!isAuthenticated ? (
            /* Guest buttons */
            <>
              <NavLink to="/login" className={({ isActive }) => `nb-nav-link${isActive?" active":""}`} style={{ display:"flex" }}>
                Login
              </NavLink>
              <Link to="/register" style={{ padding:"7px 16px", background:"linear-gradient(135deg,#2563eb,#4f46e5)", color:"white", fontSize:13, fontWeight:700, borderRadius:10, textDecoration:"none", border:"1px solid rgba(255,255,255,0.15)", boxShadow:"0 2px 8px rgba(37,99,235,0.35)", transition:"all 0.15s", whiteSpace:"nowrap" }}>
                Sign Up →
              </Link>
            </>
          ) : (
            /* User dropdown */
            <div ref={dropdownRef} style={{ position:"relative" }}>
              <button
                onClick={() => setUserDropdown(o => !o)}
                style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"5px 10px 5px 5px", cursor:"pointer", transition:"all 0.15s" }}
              >
                <div className="nb-avatar">{user?.name?.[0]?.toUpperCase() || "U"}</div>
                <div style={{ textAlign:"left" }}>
                  <p style={{ fontSize:12, fontWeight:700, color:"white", margin:0, maxWidth:100, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.name || "User"}</p>
                  <p style={{ fontSize:10, color:"rgba(255,255,255,0.45)", margin:0 }}>{isAdmin ? "Admin" : isRecruiter ? "Recruiter" : "Job Seeker"}</p>
                </div>
                <span style={{ color:"rgba(255,255,255,0.4)", fontSize:10, marginLeft:2 }}>▼</span>
              </button>

              {/* Dropdown menu */}
              {userDropdown && (
                <div className="nb-dropdown" style={{ position:"absolute", top:"calc(100% + 10px)", right:0, width:230, background:"#1e3a5f", border:"1px solid rgba(255,255,255,0.12)", borderRadius:16, overflow:"hidden", boxShadow:"0 16px 40px rgba(0,0,0,0.4)", zIndex:100 }}>

                  {/* User info header */}
                  <div style={{ padding:"14px 16px", borderBottom:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.04)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div className="nb-avatar" style={{ width:38, height:38, fontSize:16 }}>{user?.name?.[0]?.toUpperCase() || "U"}</div>
                      <div style={{ minWidth:0 }}>
                        <p style={{ fontSize:13, fontWeight:700, color:"white", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.name}</p>
                        <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.email}</p>
                      </div>
                    </div>
                    <div style={{ marginTop:8 }}>
                      <span style={{ fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:99,
                        background: isAdmin ? "rgba(168,85,247,0.2)" : isRecruiter ? "rgba(245,158,11,0.2)" : "rgba(37,99,235,0.2)",
                        border:`1px solid ${isAdmin ? "rgba(168,85,247,0.35)" : isRecruiter ? "rgba(245,158,11,0.35)" : "rgba(37,99,235,0.35)"}`,
                        color: isAdmin ? "#d8b4fe" : isRecruiter ? "#fcd34d" : "#93c5fd",
                        textTransform:"uppercase", letterSpacing:"0.06em" }}>
                        {isAdmin ? "⚡ Admin" : isRecruiter ? "🏢 Recruiter" : "👤 Job Seeker"}
                      </span>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div style={{ padding:"8px" }}>
                    {navLinks.map(link => (
                      <Link key={link.to} to={link.to} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:10, color:"rgba(255,255,255,0.7)", textDecoration:"none", fontSize:13, fontWeight:600, transition:"all 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.08)"}
                        onMouseLeave={e => e.currentTarget.style.background="transparent"}
                      >
                        <span style={{ fontSize:15 }}>{link.icon}</span>
                        {link.label}
                        {link.to === "/my-applications" && appCount > 0 && (
                          <span style={{ marginLeft:"auto", fontSize:10, fontWeight:800, background:"#ef4444", color:"white", borderRadius:99, padding:"1px 6px" }}>{appCount}</span>
                        )}
                      </Link>
                    ))}

                    {/* Divider */}
                    <div style={{ height:1, background:"rgba(255,255,255,0.08)", margin:"6px 0" }} />

                    {/* Admin quick link */}
                    {isAdmin && (
                      <>
                        <Link to="/admin" style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:10, color:"#d8b4fe", textDecoration:"none", fontSize:13, fontWeight:600, transition:"all 0.15s",
                          background:"rgba(168,85,247,0.1)", border:"1px solid rgba(168,85,247,0.2)" }}
                          onMouseEnter={e => e.currentTarget.style.background="rgba(168,85,247,0.2)"}
                          onMouseLeave={e => e.currentTarget.style.background="rgba(168,85,247,0.1)"}
                        >
                          <span>⚡</span> Admin Panel
                        </Link>
                        <div style={{ height:1, background:"rgba(255,255,255,0.08)", margin:"6px 0" }} />
                      </>
                    )}

                    {/* Recruiter quick actions */}
                    {isRecruiter && (
                      <>
                        <Link to="/recruiter/create-job" style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:10, color:"rgba(255,255,255,0.7)", textDecoration:"none", fontSize:13, fontWeight:600, transition:"all 0.15s" }}
                          onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.08)"}
                          onMouseLeave={e => e.currentTarget.style.background="transparent"}
                        >
                          <span>➕</span> Post a Job
                        </Link>
                        <div style={{ height:1, background:"rgba(255,255,255,0.08)", margin:"6px 0" }} />
                      </>
                    )}

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:10, color:"#fca5a5", background:"none", border:"none", fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.15s", textAlign:"left", fontFamily:"Sora, sans-serif" }}
                      onMouseEnter={e => e.currentTarget.style.background="rgba(239,68,68,0.12)"}
                      onMouseLeave={e => e.currentTarget.style.background="transparent"}
                    >
                      <span>↩</span> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{ display:"none", width:36, height:36, borderRadius:9, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:4, cursor:"pointer" }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            <span className="nb-ham-line" style={{ transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span className="nb-ham-line" style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span className="nb-ham-line" style={{ transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <div style={{ overflow:"hidden", maxHeight: mobileOpen ? 600 : 0, transition:"max-height 0.3s ease", borderTop: mobileOpen ? "1px solid rgba(255,255,255,0.08)" : "none" }} className="show-mobile-block">
        <div style={{ padding:"12px 16px 16px", background:"linear-gradient(180deg, #0f2d52, #0c1a2e)", display:"flex", flexDirection:"column", gap:4 }}>

          {/* User info */}
          {isAuthenticated && (
            <div style={{ display:"flex", alignItems:"center", gap:12, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:14, padding:"12px 14px", marginBottom:8 }}>
              <div className="nb-avatar" style={{ width:40, height:40, fontSize:16 }}>{user?.name?.[0]?.toUpperCase() || "U"}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:13, fontWeight:700, color:"white", margin:0 }}>{user?.name}</p>
                <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user?.email}</p>
              </div>
              <span style={{ fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:99, background: isRecruiter ? "rgba(245,158,11,0.2)" : "rgba(37,99,235,0.2)", border:`1px solid ${isRecruiter ? "rgba(245,158,11,0.3)" : "rgba(37,99,235,0.3)"}`, color: isRecruiter ? "#fcd34d" : "#93c5fd", flexShrink:0 }}>
                {isRecruiter ? "Recruiter" : "Seeker"}
              </span>
            </div>
          )}

          {/* Nav links */}
          {!isAuthenticated ? (
            <>
              <NavLink to="/jobs"     className={({ isActive }) => `nb-mobile-link${isActive?" active":""}`}>🔍 Browse Jobs</NavLink>
              <NavLink to="/login"    className={({ isActive }) => `nb-mobile-link${isActive?" active":""}`}>🔐 Login</NavLink>
              <NavLink to="/register" className={({ isActive }) => `nb-mobile-link${isActive?" active":""}`}>✨ Sign Up</NavLink>
            </>
          ) : (
            <>
              {navLinks.map(link => (
                <NavLink key={link.to} to={link.to} className={({ isActive }) => `nb-mobile-link${isActive?" active":""}`}>
                  <span>{link.icon}</span>
                  {link.label}
                  {link.to === "/my-applications" && appCount > 0 && (
                    <span style={{ marginLeft:"auto", fontSize:10, fontWeight:800, background:"#ef4444", color:"white", borderRadius:99, padding:"2px 7px" }}>{appCount}</span>
                  )}
                </NavLink>
              ))}

              {isAdmin && (
                <NavLink to="/admin" className={({ isActive }) => `nb-mobile-link${isActive?" active":""}`} style={{ color:"#d8b4fe" }}>
                  <span>⚡</span> Admin Panel
                </NavLink>
              )}

              {isRecruiter && (
                <NavLink to="/recruiter/create-job" className={({ isActive }) => `nb-mobile-link${isActive?" active":""}`}>
                  ➕ Post a Job
                </NavLink>
              )}

              <div style={{ height:1, background:"rgba(255,255,255,0.08)", margin:"4px 0" }} />

              <button onClick={handleLogout} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", borderRadius:12, color:"#fca5a5", background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Sora, sans-serif", width:"100%" }}>
                ↩ Sign Out
              </button>
            </>
          )}
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none !important; }
          .show-mobile-block { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
          .show-mobile-block { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
