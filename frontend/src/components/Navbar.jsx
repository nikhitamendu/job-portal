import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import api from "../services/api";
import NotificationDropdown from "./NotificationDropdown";

const JOBSEEKER_LINKS = [
  { to: "/jobs",            label: "Browse Jobs",     icon: "🔍" },
  { to: "/my-applications", label: "My Applications", icon: "📋" },
  { to: "/interviews",      label: "Interviews",      icon: "📅" },
];

const RECRUITER_LINKS = [
  { to: "/recruiter/dashboard",  label: "Dashboard",      icon: "📊" },
  { to: "/recruiter/applicants", label: "Applicants",     icon: "👥" },
  { to: "/recruiter/interviews", label: "Interviews",     icon: "📅" },
  { to: "/recruiter/search",     label: "Find Talent",    icon: "🔍" },
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
  const roleColor = isAdmin
    ? "bg-purple-100 text-purple-700"
    : isRecruiter
    ? "bg-amber-100 text-amber-700"
    : "bg-blue-100 text-blue-700";

  /* ─── Nav link (desktop) ─── */
  const DesktopLink = ({ link }) => (
    <NavLink
      to={link.to}
      className={({ isActive }) =>
        `relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
          isActive
            ? "text-blue-600 bg-blue-50"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        }`
      }
    >
      <span className="text-base leading-none">{link.icon}</span>
      {link.label}
    </NavLink>
  );

  return (
    <nav
      className={`sticky top-0 z-50 bg-white border-b border-slate-200 transition-shadow duration-200 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-6">

          {/* ── LOGO ── */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-200 group-hover:shadow-blue-300 transition-shadow">
              H
            </div>
            <span className="text-slate-900 font-extrabold text-xl tracking-tight">
              Hire<span className="text-blue-600">Hub</span>
            </span>
          </Link>

          {/* ── DESKTOP NAV LINKS ── */}
          <div className="hidden md:flex items-center gap-0.5 flex-1">
            {isAuthenticated ? (
              isAdmin ? (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive ? "text-purple-600 bg-purple-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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
                  `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`
                }
              >
                🔍 Browse Jobs
              </NavLink>
            )}
          </div>

          {/* ── RIGHT SIDE ── */}
          <div className="flex items-center gap-2 ml-auto">

            {/* NOTIFICATIONS */}
            {isAuthenticated && (
              <div ref={notifRef} className="relative">
                <button
                  onClick={() => setNotifOpen(o => !o)}
                  className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  title="Notifications"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
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
              <>
                <NavLink
                  to="/login"
                  className="hidden md:block text-slate-600 hover:text-slate-900 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Log in
                </NavLink>
                <Link
                  to="/register"
                  className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-sm shadow-blue-200"
                >
                  Sign up →
                </Link>
              </>
            ) : (
              /* USER DROPDOWN */
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setUserDropdown(o => !o)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-150"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-slate-800 text-xs font-bold truncate max-w-[100px] leading-tight">{user?.name}</p>
                    <p className="text-slate-400 text-[10px] leading-tight">{roleLabel}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="hidden md:block w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 py-2 z-[60]">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-slate-100 mb-1">
                      <p className="text-slate-900 text-sm font-bold truncate">{user?.name}</p>
                      <p className="text-slate-400 text-xs truncate mt-0.5">{user?.email}</p>
                      <span className={`inline-block mt-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${roleColor}`}>
                        {roleLabel}
                      </span>
                    </div>

                    {/* Nav links in dropdown */}
                    {isAdmin ? (
                      <Link to="/admin" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                        ⚡ Admin Panel
                      </Link>
                    ) : (
                      <>
                        {navLinks.map(link => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                          >
                            <span>{link.icon}</span>
                            {link.label}
                          </Link>
                        ))}
                        <Link
                          to="/profile"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        >
                          <span>👤</span> Profile
                        </Link>
                        {isRecruiter && (
                          <Link
                            to="/recruiter/create-job"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                          >
                            <span>➕</span> Post a Job
                          </Link>
                        )}
                      </>
                    )}

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <div
        className={`md:hidden border-t border-slate-100 bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {isAuthenticated ? (
            <>
              {/* User info card */}
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-base flex-shrink-0">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-slate-900 text-sm font-bold truncate">{user?.name}</p>
                  <p className="text-slate-400 text-xs truncate">{user?.email}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${roleColor}`}>
                  {roleLabel}
                </span>
              </div>

              {/* Mobile links */}
              {isAdmin ? (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive ? "text-purple-600 bg-purple-50" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                          isActive ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`
                      }
                    >
                      <span>{link.icon}</span>
                      {link.label}
                    </NavLink>
                  ))}
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        isActive ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    <span>👤</span> Profile
                  </NavLink>
                  {isRecruiter && (
                    <NavLink
                      to="/recruiter/create-job"
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    >
                      <span>➕</span> Post a Job
                    </NavLink>
                  )}
                </>
              )}

              <div className="border-t border-slate-100 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/jobs"     className="flex items-center gap-3 px-3.5 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl text-sm font-semibold transition-colors">🔍 Browse Jobs</NavLink>
              <NavLink to="/login"    className="flex items-center gap-3 px-3.5 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl text-sm font-semibold transition-colors">🔐 Log in</NavLink>
              <NavLink to="/register" className="flex items-center gap-3 px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors">✨ Sign up</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}