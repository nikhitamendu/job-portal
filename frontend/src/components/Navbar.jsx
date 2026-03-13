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
  { to: "/profile",         label: "Profile",         icon: "👤" },
];

const RECRUITER_LINKS = [
  { to: "/recruiter/dashboard",   label: "Dashboard",      icon: "📊" },
  { to: "/recruiter/applicants",  label: "All Applicants", icon: "👥" },
  { to: "/recruiter/interviews",  label: "Interviews",     icon: "📅" },
  { to: "/recruiter/search",      label: "Find Talent",    icon: "🔍" },
  { to: "/profile",               label: "Profile",        icon: "👤" },
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
  const [appCount,      setAppCount]      = useState(0);

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
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close dropdowns on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setUserDropdown(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Application count badge (job seeker) */
  useEffect(() => {
    if (!isAuthenticated || isRecruiter) return;
    api.get("/applications/my-applications")
      .then(({ data }) => {
        const pending = data.filter(a => a.status === "Applied" || a.status === "Reviewed").length;
        setAppCount(pending);
      })
      .catch(() => {});
  }, [isAuthenticated, isRecruiter]);

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

  const NavLinkItem = ({ link }) => (
    <NavLink
      to={link.to}
      className={({ isActive }) =>
        `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
          isActive
            ? "text-blue-300 bg-blue-500/20"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }`
      }
    >
      {link.icon} {link.label}
      {link.to === "/my-applications" && appCount > 0 && (
        <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-0.5">
          {appCount}
        </span>
      )}
    </NavLink>
  );

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#0c1a2e] via-[#0f2d52] to-[#1a3a6e] transition-shadow ${
        scrolled ? "shadow-lg shadow-black/40" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">

        {/* ── LOGO ── */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-md shadow-blue-900/40">
            H
          </div>
          <span className="text-white font-extrabold text-lg tracking-tight">
            Hire<span className="text-blue-400">Hub</span>
          </span>
        </Link>

        {/* ── DESKTOP LINKS ── */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {isAuthenticated ? (
            isAdmin ? (
              <NavLink
                to="/admin"
                className="px-3 py-1.5 rounded-lg text-blue-300 bg-blue-500/20 text-sm font-semibold"
              >
                ⚡ Admin Panel
              </NavLink>
            ) : (
              navLinks.map(link => <NavLinkItem key={link.to} link={link} />)
            )
          ) : (
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `px-3 py-1.5 text-sm font-semibold rounded-lg transition ${
                  isActive ? "text-blue-300 bg-blue-500/20" : "text-white/70 hover:text-white hover:bg-white/10"
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
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center text-base transition relative"
                title="Notifications"
              >
                🔔
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0f2d52] animate-pulse" />
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
                className="hidden md:block text-white/70 hover:text-white text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-white/10 transition"
              >
                Login
              </NavLink>
              <Link
                to="/register"
                className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-1.5 rounded-lg transition shadow-md shadow-blue-900/40"
              >
                Sign Up →
              </Link>
            </>
          ) : (
            /* USER DROPDOWN */
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setUserDropdown(o => !o)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 px-2 py-1 rounded-lg transition"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-white text-xs font-bold truncate max-w-[100px]">{user?.name}</p>
                  <p className="text-[10px] text-white/50">
                    {isAdmin ? "Admin" : isRecruiter ? "Recruiter" : "Job Seeker"}
                  </p>
                </div>
                <span className="hidden md:block text-white/40 text-xs">▼</span>
              </button>

              {userDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-[#1e3a5f] border border-white/10 rounded-2xl shadow-2xl shadow-black/40 p-2 z-[60]">

                  {/* User header */}
                  <div className="px-3 py-2.5 border-b border-white/10 mb-1">
                    <p className="text-white text-sm font-bold truncate">{user?.name}</p>
                    <p className="text-white/40 text-xs truncate">{user?.email}</p>
                    <span className={`inline-block mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isAdmin    ? "bg-purple-500/20 border-purple-500/30 text-purple-300" :
                      isRecruiter? "bg-amber-500/20 border-amber-500/30 text-amber-300" :
                                   "bg-blue-500/20 border-blue-500/30 text-blue-300"
                    }`}>
                      {isAdmin ? "⚡ Admin" : isRecruiter ? "🏢 Recruiter" : "👤 Job Seeker"}
                    </span>
                  </div>

                  {isAdmin ? (
                    <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-purple-300 hover:bg-purple-500/10 rounded-xl transition">
                      ⚡ Admin Panel
                    </Link>
                  ) : (
                    navLinks.map(link => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:bg-white/10 rounded-xl transition"
                      >
                        {link.icon} {link.label}
                      </Link>
                    ))
                  )}

                  {isRecruiter && (
                    <>
                      <div className="border-t border-white/10 my-1" />
                      <Link
                        to="/recruiter/create-job"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:bg-white/10 rounded-xl transition"
                      >
                        ➕ Post a Job
                      </Link>
                    </>
                  )}

                  <div className="border-t border-white/10 my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10 rounded-xl transition"
                  >
                    ↩ Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-white bg-white/10 border border-white/10 rounded-lg text-lg"
            aria-label="Menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      <div
        className={`md:hidden bg-[#0f2d52] border-t border-white/10 overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[500px] py-4" : "max-h-0"
        }`}
      >
        <div className="px-6 flex flex-col gap-1">
          {isAuthenticated ? (
            <>
              {/* User info pill */}
              <div className="flex items-center gap-3 bg-white/8 border border-white/10 rounded-2xl px-3 py-2.5 mb-2">
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-bold truncate">{user?.name}</p>
                  <p className="text-white/40 text-xs">{isRecruiter ? "Recruiter" : "Job Seeker"}</p>
                </div>
              </div>

              {isAdmin ? (
                <NavLink to="/admin" className="flex items-center gap-2 px-3 py-2 text-purple-300 hover:bg-white/10 rounded-xl text-sm font-semibold">
                  ⚡ Admin Panel
                </NavLink>
              ) : (
                navLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition ${
                        isActive ? "text-blue-300 bg-blue-500/20" : "text-white/70 hover:bg-white/10"
                      }`
                    }
                  >
                    {link.icon} {link.label}
                  </NavLink>
                ))
              )}

              {isRecruiter && (
                <NavLink to="/recruiter/create-job" className="flex items-center gap-2 px-3 py-2 text-white/70 hover:bg-white/10 rounded-xl text-sm font-semibold">
                  ➕ Post a Job
                </NavLink>
              )}

              <div className="border-t border-white/10 my-1" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-red-300 hover:bg-red-500/10 rounded-xl text-sm font-bold w-full text-left"
              >
                ↩ Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/jobs"     className="px-3 py-2 text-white/70 hover:text-white rounded-xl text-sm">🔍 Browse Jobs</NavLink>
              <NavLink to="/login"    className="px-3 py-2 text-white/70 hover:text-white rounded-xl text-sm">🔐 Login</NavLink>
              <NavLink to="/register" className="px-3 py-2 text-white/70 hover:text-white rounded-xl text-sm">✨ Sign Up</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}