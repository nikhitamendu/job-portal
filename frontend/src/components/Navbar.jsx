// import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useAuth } from "../context/AuthContext";
// import { useState, useEffect, useRef } from "react";
// import api from "../services/api";
// import NotificationDropdown from "./NotificationDropdown";

// const JOBSEEKER_LINKS = [
//   { to: "/jobs",            label: "Browse Jobs",     icon: "🔍" },
//   { to: "/my-applications", label: "Applications",    icon: "📋" },
//   { to: "/interviews",      label: "Interviews",      icon: "📅" },
// ];

// const RECRUITER_LINKS = [
//   { to: "/recruiter/dashboard",  label: "Dashboard",   icon: "📊" },
//   { to: "/recruiter/applicants", label: "Applicants",  icon: "👥" },
//   { to: "/recruiter/interviews", label: "Interviews",  icon: "📅" },
//   { to: "/recruiter/search",     label: "Find Talent", icon: "🔍" },
// ];

// export default function Navbar() {
//   const navigate  = useNavigate();
//   const location  = useLocation();
//   const { isAuthenticated, logout, user } = useAuth();

//   const [mobileOpen,   setMobileOpen]   = useState(false);
//   const [userDropdown, setUserDropdown] = useState(false);
//   const [notifOpen,    setNotifOpen]    = useState(false);
//   const [scrolled,     setScrolled]     = useState(false);

//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount,   setUnreadCount]   = useState(0);

//   const dropdownRef = useRef(null);
//   const notifRef    = useRef(null);

//   const isRecruiter = user?.role === "recruiter";
//   const isAdmin     = user?.role === "admin";
//   const navLinks    = isRecruiter ? RECRUITER_LINKS : JOBSEEKER_LINKS;

//   /* Close menus on route change */
//   useEffect(() => {
//     setMobileOpen(false);
//     setUserDropdown(false);
//     setNotifOpen(false);
//   }, [location.pathname]);

//   /* Scroll shadow */
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 8);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   /* Close dropdowns on outside click */
//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setUserDropdown(false);
//       if (notifRef.current   && !notifRef.current.contains(e.target))    setNotifOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const fetchNotifications = async () => {
//     if (!isAuthenticated) return;
//     try {
//       const { data } = await api.get("/notifications");
//       setNotifications(data.notifications);
//       setUnreadCount(data.unreadCount);
//     } catch {}
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 30000);
//     return () => clearInterval(interval);
//   }, [isAuthenticated]);

//   const handleLogout = async () => {
//     await logout();
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   const roleLabel = isAdmin ? "Admin" : isRecruiter ? "Recruiter" : "Job Seeker";
//   const rolePill  = isAdmin
//     ? "bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/30"
//     : isRecruiter
//     ? "bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/30"
//     : "bg-sky-500/20 text-sky-300 ring-1 ring-sky-500/30";

//   /* ── Desktop nav link ── */
//   const DesktopLink = ({ link }) => (
//     <NavLink
//       to={link.to}
//       className={({ isActive }) =>
//         `relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
//           isActive
//             ? "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
//             : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
//         }`
//       }
//     >
//       <span className="text-sm leading-none">{link.icon}</span>
//       <span>{link.label}</span>
//     </NavLink>
//   );

//   return (
//     <>
//       {/* ── NAVBAR ── */}
//       <nav
//         className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           scrolled
//             ? "bg-[#080d1a]/95 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_0_rgba(255,255,255,0.04),0_8px_32px_rgba(0,0,0,0.4)]"
//             : "bg-[#080d1a] border-b border-white/5"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center h-14 gap-3">

//             {/* ── LOGO ── */}
//             <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group mr-2">
//               <div className="relative w-7 h-7 flex-shrink-0">
//                 <div className="absolute inset-0 rounded-lg bg-blue-500 blur-sm opacity-50 group-hover:opacity-70 transition-opacity" />
//                 <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-lg">
//                   H
//                 </div>
//               </div>
//               <span className="text-white font-extrabold text-lg tracking-tight leading-none">
//                 Hire<span className="text-blue-400">Hub</span>
//               </span>
//             </Link>

//             {/* ── DESKTOP LINKS ── */}
//             <div className="hidden lg:flex items-center gap-0.5 flex-1">
//               {isAuthenticated ? (
//                 isAdmin ? (
//                   <NavLink
//                     to="/admin"
//                     className={({ isActive }) =>
//                       `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
//                         isActive
//                           ? "bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/30"
//                           : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
//                       }`
//                     }
//                   >
//                     ⚡ Admin Panel
//                   </NavLink>
//                 ) : (
//                   navLinks.map(link => <DesktopLink key={link.to} link={link} />)
//                 )
//               ) : (
//                 <NavLink
//                   to="/jobs"
//                   className={({ isActive }) =>
//                     `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
//                       isActive
//                         ? "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30"
//                         : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
//                     }`
//                   }
//                 >
//                   🔍 Browse Jobs
//                 </NavLink>
//               )}
//             </div>

//             {/* ── RIGHT SIDE ── */}
//             <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">

//               {/* POST A JOB — recruiter shortcut (desktop) */}
//               {isAuthenticated && isRecruiter && (
//                 <Link
//                   to="/recruiter/create-job"
//                   className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-[13px] font-medium ring-1 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-200"
//                 >
//                   <span className="text-xs">＋</span>
//                   Post Job
//                 </Link>
//               )}

//               {/* NOTIFICATIONS */}
//               {isAuthenticated && (
//                 <div ref={notifRef} className="relative">
//                   <button
//                     onClick={() => setNotifOpen(o => !o)}
//                     className="relative w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-100 hover:bg-white/8 transition-colors"
//                     title="Notifications"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//                     </svg>
//                     {unreadCount > 0 && (
//                       <span className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
//                     )}
//                   </button>
//                   {notifOpen && (
//                     <NotificationDropdown
//                       notifications={notifications}
//                       unreadCount={unreadCount}
//                       onRefresh={fetchNotifications}
//                       onClose={() => setNotifOpen(false)}
//                     />
//                   )}
//                 </div>
//               )}

//               {/* GUEST BUTTONS */}
//               {!isAuthenticated ? (
//                 <div className="hidden lg:flex items-center gap-2">
//                   <NavLink
//                     to="/login"
//                     className="text-slate-400 hover:text-slate-100 text-[13px] font-medium px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors"
//                   >
//                     Log in
//                   </NavLink>
//                   <Link
//                     to="/register"
//                     className="bg-blue-500 hover:bg-blue-400 text-white text-[13px] font-semibold px-4 py-1.5 rounded-full transition-colors shadow-[0_0_16px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.45)]"
//                   >
//                     Sign up →
//                   </Link>
//                 </div>
//               ) : (
//                 /* USER AVATAR + DROPDOWN */
//                 <div ref={dropdownRef} className="relative">
//                   <button
//                     onClick={() => setUserDropdown(o => !o)}
//                     className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-150"
//                   >
//                     <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-black text-xs flex-shrink-0">
//                       {user?.name?.[0]?.toUpperCase() || "U"}
//                     </div>
//                     <span className="hidden lg:block text-slate-300 text-[13px] font-medium truncate max-w-[90px]">
//                       {user?.name?.split(" ")[0]}
//                     </span>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="hidden lg:block w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </button>

//                   {/* DROPDOWN PANEL */}
//                   {userDropdown && (
//                     <div className="absolute right-0 mt-2 w-56 bg-[#0e1628] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] py-1.5 z-[60] overflow-hidden">
//                       {/* User info */}
//                       <div className="px-4 py-3 border-b border-white/8 mb-1">
//                         <p className="text-slate-100 text-sm font-semibold truncate">{user?.name}</p>
//                         <p className="text-slate-500 text-xs truncate mt-0.5">{user?.email}</p>
//                         <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${rolePill}`}>
//                           {roleLabel}
//                         </span>
//                       </div>

//                       <div className="px-1.5">
//                         {isAdmin ? (
//                           <Link to="/admin" className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-slate-400 hover:text-slate-100 hover:bg-white/6 rounded-xl transition-colors">
//                             ⚡ Admin Panel
//                           </Link>
//                         ) : (
//                           <>
//                             {navLinks.map(link => (
//                               <Link
//                                 key={link.to}
//                                 to={link.to}
//                                 className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-slate-400 hover:text-slate-100 hover:bg-white/6 rounded-xl transition-colors"
//                               >
//                                 <span className="text-sm">{link.icon}</span>
//                                 {link.label}
//                               </Link>
//                             ))}
//                             <Link to="/profile" className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-slate-400 hover:text-slate-100 hover:bg-white/6 rounded-xl transition-colors">
//                               <span>👤</span> Profile
//                             </Link>
//                             {isRecruiter && (
//                               <Link to="/recruiter/create-job" className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-slate-400 hover:text-slate-100 hover:bg-white/6 rounded-xl transition-colors">
//                                 <span>➕</span> Post a Job
//                               </Link>
//                             )}
//                           </>
//                         )}
//                       </div>

//                       <div className="border-t border-white/8 mt-1 pt-1 px-1.5">
//                         <button
//                           onClick={handleLogout}
//                           className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-[13px] text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                           </svg>
//                           Sign out
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* MOBILE HAMBURGER */}
//               <button
//                 onClick={() => setMobileOpen(o => !o)}
//                 className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-100 hover:bg-white/8 transition-colors"
//                 aria-label="Menu"
//               >
//                 {mobileOpen ? (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 ) : (
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* ── MOBILE DRAWER ── */}
//       {/* Backdrop */}
//       <div
//         onClick={() => setMobileOpen(false)}
//         className={`lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
//           mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//         }`}
//       />

//       {/* Slide-in panel */}
//       <div
//         className={`lg:hidden fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0a0f1e] border-l border-white/8 shadow-[−20px_0_60px_rgba(0,0,0,0.5)] flex flex-col transition-transform duration-300 ease-in-out ${
//           mobileOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Drawer header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
//           <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
//             <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-black text-xs">H</div>
//             <span className="text-white font-extrabold text-base tracking-tight">Hire<span className="text-blue-400">Hub</span></span>
//           </Link>
//           <button
//             onClick={() => setMobileOpen(false)}
//             className="w-7 h-7 flex items-center justify-center rounded-full text-slate-500 hover:text-slate-100 hover:bg-white/8 transition-colors"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Drawer body */}
//         <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
//           {isAuthenticated ? (
//             <>
//               {/* User card */}
//               <div className="flex items-center gap-3 bg-white/4 border border-white/8 rounded-2xl px-4 py-3 mb-3">
//                 <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">
//                   {user?.name?.[0]?.toUpperCase()}
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <p className="text-slate-100 text-sm font-semibold truncate">{user?.name}</p>
//                   <p className="text-slate-500 text-xs truncate">{user?.email}</p>
//                 </div>
//                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${rolePill}`}>
//                   {roleLabel}
//                 </span>
//               </div>

//               {/* Nav links */}
//               {isAdmin ? (
//                 <NavLink
//                   to="/admin"
//                   onClick={() => setMobileOpen(false)}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
//                       isActive ? "bg-violet-500/15 text-violet-400" : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
//                     }`
//                   }
//                 >
//                   ⚡ Admin Panel
//                 </NavLink>
//               ) : (
//                 <>
//                   {navLinks.map(link => (
//                     <NavLink
//                       key={link.to}
//                       to={link.to}
//                       onClick={() => setMobileOpen(false)}
//                       className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
//                           isActive ? "bg-blue-500/15 text-blue-400" : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
//                         }`
//                       }
//                     >
//                       <span>{link.icon}</span>
//                       {link.label}
//                     </NavLink>
//                   ))}
//                   <NavLink
//                     to="/profile"
//                     onClick={() => setMobileOpen(false)}
//                     className={({ isActive }) =>
//                       `flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
//                         isActive ? "bg-blue-500/15 text-blue-400" : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
//                       }`
//                     }
//                   >
//                     <span>👤</span> Profile
//                   </NavLink>
//                   {isRecruiter && (
//                     <NavLink
//                       to="/recruiter/create-job"
//                       onClick={() => setMobileOpen(false)}
//                       className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-slate-400 hover:bg-white/5 hover:text-slate-100 transition-colors"
//                     >
//                       <span>➕</span> Post a Job
//                     </NavLink>
//                   )}
//                 </>
//               )}
//             </>
//           ) : (
//             <>
//               <NavLink to="/jobs"    onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${isActive ? "bg-blue-500/15 text-blue-400" : "text-slate-400 hover:bg-white/5 hover:text-slate-100"}`}>🔍 Browse Jobs</NavLink>
//               <NavLink to="/login"   onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${isActive ? "bg-blue-500/15 text-blue-400" : "text-slate-400 hover:bg-white/5 hover:text-slate-100"}`}>🔐 Log in</NavLink>
//             </>
//           )}
//         </div>

//         {/* Drawer footer */}
//         <div className="border-t border-white/8 px-3 py-3">
//           {isAuthenticated ? (
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               Sign out
//             </button>
//           ) : (
//             <NavLink
//               to="/register"
//               onClick={() => setMobileOpen(false)}
//               className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-[13px] font-semibold bg-blue-500 hover:bg-blue-400 text-white transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]"
//             >
//               ✨ Sign up free
//             </NavLink>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import NotificationDropdown from "./NotificationDropdown";

const JOBSEEKER_LINKS = [
  { to: "/jobs",            label: "Browse Jobs",     icon: "🔍" },
  { to: "/my-applications", label: "Applications",    icon: "📋" },
  { to: "/interviews",      label: "Interviews",      icon: "📅" },
];

const RECRUITER_LINKS = [
  { to: "/recruiter/dashboard",  label: "Dashboard",   icon: "📊" },
  { to: "/recruiter/applicants", label: "Applicants",  icon: "👥" },
  { to: "/recruiter/interviews", label: "Interviews",  icon: "📅" },
  { to: "/recruiter/search",     label: "Find Talent", icon: "🔍" },
];

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { isAuthenticated, logout, user } = useAuth();

  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [notifOpen,    setNotifOpen]    = useState(false);
  const [scrolled,     setScrolled]     = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount,   setUnreadCount]   = useState(0);

  const dropdownRef = useRef(null);
  const notifRef    = useRef(null);

  const isRecruiter = user?.role === "recruiter";
  const isAdmin     = user?.role === "admin";
  const navLinks    = isRecruiter ? RECRUITER_LINKS : JOBSEEKER_LINKS;

  /* Close menus on route change */
  useEffect(() => {
    setMobileOpen(false);
    setUserDropdown(false);
    setNotifOpen(false);
  }, [location.pathname]);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close dropdowns on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setUserDropdown(false);
      if (notifRef.current   && !notifRef.current.contains(e.target))    setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchNotifications = async () => {
    if (!isAuthenticated) return;
    try {
      const { data } = await api.get("/notifications");
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch {}
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const roleLabel = isAdmin ? "Admin" : isRecruiter ? "Recruiter" : "Job Seeker";
  const rolePill  = isAdmin
    ? "bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/30"
    : isRecruiter
    ? "bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/30"
    : "bg-sky-500/20 text-sky-300 ring-1 ring-sky-500/30";

  /* ── Desktop nav link ── */
  const DesktopLink = ({ link }) => (
    <NavLink
      to={link.to}
      className={({ isActive }) =>
        `relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
          isActive
            ? "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
            : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
        }`
      }
    >
      <span className="text-sm leading-none">{link.icon}</span>
      <span>{link.label}</span>
    </NavLink>
  );

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        className={`flex-shrink-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#080d1a]/95 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_0_rgba(255,255,255,0.04),0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-[#080d1a] border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 gap-3">

            {/* ── LOGO ── */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group mr-2">
              <div className="relative w-7 h-7 flex-shrink-0">
                <div className="absolute inset-0 rounded-lg bg-blue-500 blur-sm opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-lg">
                  H
                </div>
              </div>
              <span className="text-white font-extrabold text-lg tracking-tight leading-none">
                Hire<span className="text-blue-400">Hub</span>
              </span>
            </Link>

            {/* ── DESKTOP LINKS ── */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1">
              {isAuthenticated ? (
                isAdmin ? (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/30"
                          : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                      }`
                    }
                  >
                    ⚡ Admin Panel
                  </NavLink>
                ) : (
                  navLinks.map(link => <DesktopLink key={link.to} link={link} />)
                )
              ) : (
                <NavLink
                  to="/jobs"
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30"
                        : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                    }`
                  }
                >
                  🔍 Browse Jobs
                </NavLink>
              )}
            </div>

            {/* ── RIGHT SIDE ── */}
            <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">

              {/* POST A JOB — recruiter shortcut (desktop) */}
              {isAuthenticated && isRecruiter && (
                <Link
                  to="/recruiter/create-job"
                  className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-[13px] font-medium ring-1 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-200"
                >
                  <span className="text-xs">＋</span>
                  Post Job
                </Link>
              )}

              {/* NOTIFICATIONS */}
              {isAuthenticated && (
                <div ref={notifRef} className="relative">
                  <button
                    onClick={() => setNotifOpen(o => !o)}
                    className="relative w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-100 hover:bg-white/8 transition-colors"
                    title="Notifications"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
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

              {/* GUEST BUTTONS */}
              {!isAuthenticated ? (
                <div className="hidden lg:flex items-center gap-2">
                  <NavLink
                    to="/login"
                    className="text-slate-400 hover:text-slate-100 text-[13px] font-medium px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors"
                  >
                    Log in
                  </NavLink>
                  <Link
                    to="/register"
                    className="bg-blue-500 hover:bg-blue-400 text-white text-[13px] font-semibold px-4 py-1.5 rounded-full transition-colors shadow-[0_0_16px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.45)]"
                  >
                    Sign up →
                  </Link>
                </div>
              ) : (
                /* USER AVATAR + DROPDOWN */
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setUserDropdown(o => !o)}
                    className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-150"
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-black text-xs flex-shrink-0">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="hidden lg:block text-slate-300 text-[13px] font-medium truncate max-w-[90px]">
                      {user?.name?.split(" ")[0]}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="hidden lg:block w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* DROPDOWN PANEL */}
                  {userDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#0e1628] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] py-1.5 z-[60] overflow-hidden">
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-white/8 mb-1">
                        <p className="text-slate-100 text-sm font-semibold truncate">{user?.name}</p>
                        <p className="text-slate-500 text-xs truncate mt-0.5">{user?.email}</p>
                        <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${rolePill}`}>
                          {roleLabel}
                        </span>
                      </div>

                      <div className="px-1.5">
                        {isAdmin ? (
                          <Link to="/admin" className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-slate-400 hover:text-slate-100 hover:bg-white/6 rounded-xl transition-colors">
                            ⚡ Admin Panel
                          </Link>
                        ) : (
                          <>
                            {navLinks.map(link => (
                              <Link
                                key={link.to}
                                to={link.to}
                                className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-slate-400 hover:text-slate-100 hover:bg-white/6 rounded-xl transition-colors"
                              >
                                <span className="text-sm">{link.icon}</span>
                                {link.label}
                              </Link>
                            ))}
                            <Link to="/profile" className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-slate-400 hover:text-slate-100 hover:bg-white/6 rounded-xl transition-colors">
                              <span>👤</span> Profile
                            </Link>
                            {isRecruiter && (
                              <Link to="/recruiter/create-job" className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-slate-400 hover:text-slate-100 hover:bg-white/6 rounded-xl transition-colors">
                                <span>➕</span> Post a Job
                              </Link>
                            )}
                          </>
                        )}
                      </div>

                      <div className="border-t border-white/8 mt-1 pt-1 px-1.5">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-[13px] text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MOBILE HAMBURGER */}
              <button
                onClick={() => setMobileOpen(o => !o)}
                className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-100 hover:bg-white/8 transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {/* Backdrop */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-in panel */}
      <div
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-white border-r border-slate-200 shadow-[20px_0_60px_rgba(0,0,0,0.15)] flex flex-col transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-black text-xs">H</div>
            <span className="text-slate-900 font-extrabold text-base tracking-tight">Hire<span className="text-blue-600">Hub</span></span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
          {isAuthenticated ? (
            <>
              {/* User card */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 mb-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-slate-800 text-sm font-semibold truncate">{user?.name}</p>
                  <p className="text-slate-400 text-xs truncate">{user?.email}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${rolePill}`}>
                  {roleLabel}
                </span>
              </div>

              {/* Nav links */}
              {isAdmin ? (
                <NavLink
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
                      isActive ? "bg-violet-50 text-violet-600" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`
                  }
                >
                  ⚡ Admin Panel
                </NavLink>
              ) : (
                <>
                  {navLinks.map(link => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
                          isActive ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`
                      }
                    >
                      <span>{link.icon}</span>
                      {link.label}
                    </NavLink>
                  ))}
                  <NavLink
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
                        isActive ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    <span>👤</span> Profile
                  </NavLink>
                  {isRecruiter && (
                    <NavLink
                      to="/recruiter/create-job"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    >
                      <span>➕</span> Post a Job
                    </NavLink>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <NavLink to="/jobs"  onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${isActive ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>🔍 Browse Jobs</NavLink>
              <NavLink to="/login" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${isActive ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>🔐 Log in</NavLink>
            </>
          )}
        </div>

        {/* Drawer footer */}
        <div className="border-t border-slate-100 px-3 py-3">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          ) : (
            <NavLink
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-[13px] font-semibold bg-blue-500 hover:bg-blue-400 text-white transition-colors shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              ✨ Sign up free
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
}
