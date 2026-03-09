// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useAuth } from "../context/AuthContext";
// import { useState } from "react";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const { isAuthenticated, logout, user } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = async () => {
//     await logout();
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-sm">
//       <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">

//         {/* LOGO */}
//         <Link
//           to="/"
//           className="text-xl font-bold tracking-wide hover:opacity-90 transition"
//         >
//           Job<span className="text-blue-500">Portal</span>
//         </Link>

//         {/* MOBILE MENU BUTTON */}
//         <button
//           className="md:hidden text-white"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           ☰
//         </button>

//         {/* NAV LINKS */}
//         <div
//           className={`${
//             isOpen ? "flex" : "hidden"
//           } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-6 md:p-0 gap-4 text-sm`}
//         >
//           {!isAuthenticated ? (
//             <>
//               <NavItem to="/login">Login</NavItem>
//               <NavItem to="/register">Register</NavItem>
//             </>
//           ) : (
//             <>
//               {/* RECRUITER NAV */}
//               {user?.role === "recruiter" && (
//                 <>
//                   <NavItem to="/recruiter/dashboard">
//                     Dashboard
//                   </NavItem>

//                   <NavItem to="/recruiter/applicants">
//                     View Applicants
//                   </NavItem>

//                   <NavItem to="/profile">
//                     Company Profile
//                   </NavItem>
//                 </>
//               )}

//               {/* JOB SEEKER NAV */}
//               {user?.role !== "recruiter" && (
//                 <>
//                   <NavItem to="/profile">Profile</NavItem>
//                   <NavItem to="/my-applications">
//                     My Applications
//                   </NavItem>
//                 </>
//               )}

//               {/* LOGOUT */}
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-md text-sm font-medium transition"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// /* ACTIVE LINK COMPONENT */
// function NavItem({ to, children }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `px-2 py-1 rounded-md transition ${
//           isActive
//             ? "text-blue-400 font-semibold"
//             : "text-gray-300 hover:text-white"
//         }`
//       }
//     >
//       {children}
//     </NavLink>
//   );
// }
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-[#0d2340] to-slate-900 border-b border-white/8 sticky top-0 z-50 shadow-lg shadow-black/20">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* ── LOGO ── */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0" onClick={() => setIsOpen(false)}>
          <div className="w-8 h-8 rounded-xl bg-blue-700 flex items-center justify-center text-white font-extrabold text-base shadow-md shadow-blue-900/50">
            H
          </div>
          <span className="text-base font-extrabold text-white tracking-tight">
            Hire<span className="text-blue-400">Hub</span>
          </span>
        </Link>

        {/* ── DESKTOP NAV ── */}
        <div className="hidden md:flex items-center gap-1">
          {!isAuthenticated ? (
            <>
              <NavItem to="/jobs">Browse Jobs</NavItem>
              <NavItem to="/login">Login</NavItem>
              <Link
                to="/register"
                className="ml-2 px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold rounded-lg transition hover:-translate-y-0.5 shadow-md shadow-blue-900/40"
              >
                Sign Up →
              </Link>
            </>
          ) : (
            <>
              {user?.role === "recruiter" ? (
                <>
                  <NavItem to="/recruiter/dashboard">Dashboard</NavItem>
                  <NavItem to="/recruiter/applicants">All Applicants</NavItem>
                  <NavItem to="/profile">Profile</NavItem>
                </>
              ) : (
                <>
                  <NavItem to="/jobs">Browse Jobs</NavItem>
                  <NavItem to="/profile">Profile</NavItem>
                  <NavItem to="/my-applications">My Applications</NavItem>
                </>
              )}

              {/* User pill + logout (logout reveals on hover) */}
              <div className="flex items-center gap-2 ml-3 pl-3 border-l border-white/12">
                <div className="group flex items-center gap-2 bg-white/6 hover:bg-white/10 border border-white/10 hover:border-red-500/30 rounded-full pl-1.5 pr-2 py-1 transition-all duration-200 cursor-pointer" onClick={handleLogout}>
                  {/* Avatar */}
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0">
                    {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                  </div>

                  {/* Email */}
                  <span className="text-xs text-white/65 group-hover:text-white/45 font-medium max-w-[120px] truncate transition-colors duration-200">
                    {user?.email}
                  </span>

                  {/* Logout icon — hidden by default, slides in on hover */}
                  <span className="flex items-center gap-1 overflow-hidden max-w-0 group-hover:max-w-[80px] opacity-0 group-hover:opacity-100 transition-all duration-300 text-red-400 text-xs font-bold whitespace-nowrap pl-0 group-hover:pl-1.5 border-l-0 group-hover:border-l border-red-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                    </svg>
                    Logout
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── MOBILE RIGHT: avatar + hamburger ── */}
        <div className="flex md:hidden items-center gap-2.5">
          {isAuthenticated && (
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg bg-white/8 border border-white/12 hover:bg-white/14 transition cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`block w-4.5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-4.5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block w-4.5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

      </div>

      {/* ── MOBILE MENU ── */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-screen border-t border-white/8" : "max-h-0"}`}>
        <div className="px-5 py-4 bg-gradient-to-b from-[#0d2340] to-slate-900 space-y-1">

          {/* User info banner */}
          {isAuthenticated && (
            <div className="flex items-center gap-3 bg-white/6 border border-white/10 rounded-xl px-3.5 py-2.5 mb-3">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-extrabold text-white flex-shrink-0">
                {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">{user?.name || "User"}</p>
                <p className="text-xs text-white/45 truncate">{user?.email}</p>
              </div>
              <span className={`ml-auto text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${
                user?.role === "recruiter"
                  ? "bg-amber-500/20 border border-amber-500/30 text-amber-300"
                  : "bg-blue-500/20 border border-blue-500/30 text-blue-300"
              }`}>
                {user?.role === "recruiter" ? "Recruiter" : "Job Seeker"}
              </span>
            </div>
          )}

          {/* Nav links */}
          {!isAuthenticated ? (
            <>
              <MobileNavItem to="/jobs"     onClick={() => setIsOpen(false)}>Browse Jobs</MobileNavItem>
              <MobileNavItem to="/login"    onClick={() => setIsOpen(false)}>Login</MobileNavItem>
              <MobileNavItem to="/register" onClick={() => setIsOpen(false)}>Register</MobileNavItem>
            </>
          ) : (
            <>
              {user?.role === "recruiter" ? (
                <>
                  <MobileNavItem to="/recruiter/dashboard"  onClick={() => setIsOpen(false)}>Dashboard</MobileNavItem>
                  <MobileNavItem to="/recruiter/applicants" onClick={() => setIsOpen(false)}>All Applicants</MobileNavItem>
                  <MobileNavItem to="/profile"              onClick={() => setIsOpen(false)}>Profile</MobileNavItem>
                </>
              ) : (
                <>
                  <MobileNavItem to="/jobs"            onClick={() => setIsOpen(false)}>Browse Jobs</MobileNavItem>
                  <MobileNavItem to="/profile"         onClick={() => setIsOpen(false)}>Profile</MobileNavItem>
                  <MobileNavItem to="/my-applications" onClick={() => setIsOpen(false)}>My Applications</MobileNavItem>
                </>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/15 hover:bg-red-500/22 border border-red-500/25 text-red-400 text-sm font-bold rounded-xl transition cursor-pointer"
              >
                <span>↩</span> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

/* ── Desktop NavItem ── */
function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
          isActive
            ? "bg-blue-600/20 text-blue-300 border border-blue-500/25"
            : "text-white/60 hover:text-white hover:bg-white/8"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

/* ── Mobile NavItem ── */
function MobileNavItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
          isActive
            ? "bg-blue-600/20 text-blue-300 border border-blue-500/20"
            : "text-white/65 hover:text-white hover:bg-white/8"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
