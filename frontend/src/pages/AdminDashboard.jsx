import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";

/* ─── Tiny helpers ─── */
const fmt = (n) => (n ?? 0).toLocaleString();
const timeAgo = (d) => {
  const s = Math.floor((Date.now() - new Date(d)) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

/* ═══════════════════════════════════════════
   STAT CARD
═══════════════════════════════════════════ */
function StatCard({ icon, label, value, accent, sub }) {
  const colorMap = {
    "#3b82f6": "bg-blue-500/20 border-blue-500/30 text-blue-400",
    "#f59e0b": "bg-amber-500/20 border-amber-500/30 text-amber-400",
    "#8b5cf6": "bg-violet-500/20 border-violet-500/30 text-violet-400",
    "#10b981": "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
  };
  const subColorMap = {
    "#3b82f6": "text-blue-400",
    "#f59e0b": "text-amber-400",
    "#8b5cf6": "text-violet-400",
    "#10b981": "text-emerald-400",
  };
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm flex items-center gap-4 hover:bg-white/8 transition-colors">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border ${colorMap[accent] || "bg-blue-500/20 border-blue-500/30"}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-extrabold text-white leading-tight">{fmt(value)}</p>
        <p className="text-xs text-white/45 font-semibold mt-0.5">{label}</p>
        {sub && <p className={`text-xs font-semibold mt-0.5 ${subColorMap[accent] || "text-blue-400"}`}>{sub}</p>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   OVERVIEW TAB
═══════════════════════════════════════════ */
function OverviewTab({ stats }) {
  if (!stats) return (
    <div className="flex items-center justify-center py-16 text-white/30 text-sm">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-pulse">📊</div>
        Loading stats…
      </div>
    </div>
  );
  return (
    <div>
      <h2 className="text-xl font-extrabold text-white mb-6">Platform Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="👤" label="Job Seekers"   value={stats.totalUsers}        accent="#3b82f6" />
        <StatCard icon="🏢" label="Recruiters"    value={stats.totalRecruiters}   accent="#f59e0b" />
        <StatCard icon="💼" label="Total Jobs"    value={stats.totalJobs}         accent="#8b5cf6"
          sub={`${fmt(stats.activeJobs)} active · ${fmt(stats.inactiveJobs)} inactive`}
        />
        <StatCard icon="📋" label="Applications"  value={stats.totalApplications} accent="#10b981" />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-sm font-bold text-white/60 mb-4">Quick Stats</h3>
        {[
          { label: "Active Job Listings",  val: fmt(stats.activeJobs) },
          { label: "Inactive / Expired",   val: fmt(stats.inactiveJobs) },
          { label: "Avg Applications/Job", val: stats.totalJobs ? (stats.totalApplications / stats.totalJobs).toFixed(1) : "0" },
        ].map(({ label, val }) => (
          <div key={label} className="flex justify-between items-center py-3 border-b border-white/6 last:border-0">
            <span className="text-sm text-white/50">{label}</span>
            <span className="text-sm font-bold text-white">{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   USERS TAB
═══════════════════════════════════════════ */
function UsersTab() {
  const [users, setUsers]     = useState([]);
  const [total, setTotal]     = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");
  const [roleFilter, setRole] = useState("all");
  const [page, setPage]       = useState(1);
  const [roleChanging, setRoleChanging] = useState({});
  const { user: me } = useAuth();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 15 });
      if (search) params.set("search", search);
      if (roleFilter !== "all") params.set("role", roleFilter);
      const { data } = await api.get(`/admin/users?${params}`);
      setUsers(data.users);
      setTotal(data.total);
    } catch {
      toast.error("Failed to load users");
    }
    setLoading(false);
  }, [search, roleFilter, page]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleRoleChange = async (userId, newRole) => {
    setRoleChanging((p) => ({ ...p, [userId]: true }));
    try {
      await api.patch(`/admin/users/${userId}/role`, { role: newRole });
      toast.success("Role updated");
      fetchUsers();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to update role");
    }
    setRoleChanging((p) => ({ ...p, [userId]: false }));
  };

  const handleDelete = async (userId, name) => {
    if (!window.confirm(`Delete user "${name}"? This will also remove their jobs & applications.`)) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      toast.success("User deleted");
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const ROLE_BADGE = {
    user:      "bg-blue-500/20 border-blue-500/30 text-blue-300",
    recruiter: "bg-amber-500/20 border-amber-500/30 text-amber-300",
    admin:     "bg-purple-500/20 border-purple-500/30 text-purple-300",
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-extrabold text-white">
          User Management
          <span className="text-sm text-white/40 font-medium ml-2">({fmt(total)})</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          <input
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-xl bg-white/8 border border-white/12 text-white text-sm placeholder-white/30 outline-none focus:border-blue-500/50 focus:bg-white/10 transition w-48"
          />
          <select
            value={roleFilter}
            onChange={(e) => { setRole(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-xl bg-white/8 border border-white/12 text-white text-sm outline-none focus:border-blue-500/50 cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="user">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-white/30 text-sm gap-2">
              <div className="w-5 h-5 border-2 border-white/20 border-t-blue-400 rounded-full animate-spin" />
              Loading…
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12 text-white/30 text-sm">No users found</div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {["User", "Role", "Verified", "Joined", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-white/40 uppercase tracking-widest border-b border-white/8">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-white/3 transition-colors">
                    {/* User */}
                    <td className="px-4 py-3 border-b border-white/5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white flex-shrink-0">
                          {u.name?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{u.name}</div>
                          <div className="text-xs text-white/40">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    {/* Role */}
                    <td className="px-4 py-3 border-b border-white/5">
                      {u._id === me._id ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${ROLE_BADGE[u.role] || ROLE_BADGE.user}`}>
                          {u.role} (you)
                        </span>
                      ) : (
                        <select
                          disabled={roleChanging[u._id]}
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          className="px-2 py-1 rounded-lg bg-white/8 border border-white/15 text-white text-xs outline-none cursor-pointer disabled:opacity-50"
                        >
                          <option value="user">Job Seeker</option>
                          <option value="recruiter">Recruiter</option>
                          <option value="admin">Admin</option>
                        </select>
                      )}
                    </td>
                    {/* Verified */}
                    <td className="px-4 py-3 border-b border-white/5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        u.isVerified
                          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                          : "bg-red-500/15 border-red-500/30 text-red-400"
                      }`}>
                        {u.isVerified ? "✓ Yes" : "✗ No"}
                      </span>
                    </td>
                    {/* Joined */}
                    <td className="px-4 py-3 border-b border-white/5 text-xs text-white/45">{timeAgo(u.createdAt)}</td>
                    {/* Actions */}
                    <td className="px-4 py-3 border-b border-white/5">
                      {u._id !== me._id && (
                        <button
                          onClick={() => handleDelete(u._id, u.name)}
                          className="px-2.5 py-1 rounded-lg bg-red-500/15 border border-red-500/25 text-red-400 text-xs font-bold hover:bg-red-500/25 transition-colors"
                        >
                          🗑 Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Pagination */}
      {total > 15 && (
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {[...Array(Math.ceil(total / 15))].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-xs font-bold transition-colors ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white/8 text-white/50 hover:bg-white/15 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   JOBS TAB
═══════════════════════════════════════════ */
function JobsTab() {
  const [jobs, setJobs]       = useState([]);
  const [total, setTotal]     = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");
  const [statusFilter, setStatus] = useState("all");
  const [page, setPage]       = useState(1);
  const [toggling, setToggling] = useState({});

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 15 });
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);
      const { data } = await api.get(`/admin/jobs?${params}`);
      setJobs(data.jobs);
      setTotal(data.total);
    } catch {
      toast.error("Failed to load jobs");
    }
    setLoading(false);
  }, [search, statusFilter, page]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const handleToggle = async (jobId) => {
    setToggling((p) => ({ ...p, [jobId]: true }));
    try {
      await api.patch(`/admin/jobs/${jobId}/toggle`);
      fetchJobs();
    } catch {
      toast.error("Failed to toggle job status");
    }
    setToggling((p) => ({ ...p, [jobId]: false }));
  };

  const handleDelete = async (jobId, title) => {
    if (!window.confirm(`Delete job "${title}"? This will also remove all applications.`)) return;
    try {
      await api.delete(`/admin/jobs/${jobId}`);
      toast.success("Job deleted");
      fetchJobs();
    } catch {
      toast.error("Failed to delete job");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-extrabold text-white">
          Job Management
          <span className="text-sm text-white/40 font-medium ml-2">({fmt(total)})</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          <input
            placeholder="Search title or city…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-xl bg-white/8 border border-white/12 text-white text-sm placeholder-white/30 outline-none focus:border-blue-500/50 focus:bg-white/10 transition w-48"
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded-xl bg-white/8 border border-white/12 text-white text-sm outline-none focus:border-blue-500/50 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-white/30 text-sm gap-2">
              <div className="w-5 h-5 border-2 border-white/20 border-t-blue-400 rounded-full animate-spin" />
              Loading…
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 text-white/30 text-sm">No jobs found</div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {["Job Title", "Recruiter", "Applications", "Status", "Posted", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-white/40 uppercase tracking-widest border-b border-white/8">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => (
                  <tr key={j._id} className="hover:bg-white/3 transition-colors">
                    {/* Job */}
                    <td className="px-4 py-3 border-b border-white/5">
                      <div className="text-sm font-bold text-white max-w-[180px] truncate">{j.title}</div>
                      <div className="text-xs text-white/35 mt-0.5">{j.employmentType} · {j.workplaceType}</div>
                    </td>
                    {/* Recruiter */}
                    <td className="px-4 py-3 border-b border-white/5">
                      <div className="text-sm text-white/75">{j.postedBy?.name || "—"}</div>
                      <div className="text-xs text-white/35">{j.postedBy?.companyName || j.postedBy?.email || ""}</div>
                    </td>
                    {/* Applications */}
                    <td className="px-4 py-3 border-b border-white/5 text-center">
                      <span className="text-sm font-extrabold text-blue-300">{j.applicationCount}</span>
                    </td>
                    {/* Status toggle */}
                    <td className="px-4 py-3 border-b border-white/5">
                      <button
                        disabled={toggling[j._id]}
                        onClick={() => handleToggle(j._id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors disabled:opacity-50 ${
                          j.isActive
                            ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/25"
                            : "bg-red-500/15 border-red-500/25 text-red-400 hover:bg-red-500/25"
                        }`}
                      >
                        {toggling[j._id] ? "…" : j.isActive ? "✓ Active" : "✗ Inactive"}
                      </button>
                    </td>
                    {/* Posted */}
                    <td className="px-4 py-3 border-b border-white/5 text-xs text-white/45">{timeAgo(j.createdAt)}</td>
                    {/* Delete */}
                    <td className="px-4 py-3 border-b border-white/5">
                      <button
                        onClick={() => handleDelete(j._id, j.title)}
                        className="px-2.5 py-1 rounded-lg bg-red-500/15 border border-red-500/25 text-red-400 text-xs font-bold hover:bg-red-500/25 transition-colors"
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Pagination */}
      {total > 15 && (
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          {[...Array(Math.ceil(total / 15))].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-xs font-bold transition-colors ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white/8 text-white/50 hover:bg-white/15 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN ADMIN DASHBOARD
═══════════════════════════════════════════ */
const NAV = [
  { key: "overview", icon: "📊", label: "Overview" },
  { key: "users",    icon: "👥", label: "Users" },
  { key: "jobs",     icon: "💼", label: "Jobs" },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab]   = useState("overview");
  const [stats, setStats] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    api.get("/admin/stats")
      .then(({ data }) => setStats(data))
      .catch(() => toast.error("Failed to load stats"));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleTab = (key) => {
    setTab(key);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060d1a] via-[#0a1628] to-[#0d1f3a] text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap'); option { background:#1e3a5f; color:white; }`}</style>

      {/* ── MOBILE HEADER BAR ── */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center gap-3 px-4 h-14 bg-[#0a1628]/95 border-b border-white/10 backdrop-blur-md">
        <button
          onClick={() => setSidebarOpen(o => !o)}
          className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-white text-lg"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-extrabold text-sm">H</div>
          <span className="font-extrabold text-base">Hire<span className="text-blue-400">Hub</span></span>
        </div>
        <div className="ml-auto">
          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300">⚡ Admin</span>
        </div>
      </header>

      <div className="flex relative">

        {/* ── MOBILE OVERLAY ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── SIDEBAR ── */}
        <aside className={`
          fixed lg:sticky top-0 left-0 z-40 w-60 min-h-screen lg:min-h-screen
          bg-[#070e1c] lg:bg-transparent border-r border-white/8
          flex flex-col py-7 px-4 transition-transform duration-300 lg:translate-x-0 lg:flex-shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          {/* Logo */}
          <div className="hidden lg:flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-extrabold text-lg">H</div>
            <div>
              <div className="font-extrabold text-base leading-tight">Hire<span className="text-blue-400">Hub</span></div>
              <div className="text-[10px] text-white/35 font-semibold mt-0.5">Admin Panel</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1 flex-1">
            {NAV.map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => handleTab(key)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold w-full text-left transition-all border-l-[3px] ${
                  tab === key
                    ? "bg-blue-500/20 text-blue-300 border-blue-500"
                    : "transparent text-white/55 border-transparent hover:bg-white/6 hover:text-white"
                }`}
              >
                <span className="text-base">{icon}</span>
                {label}
              </button>
            ))}
          </nav>

          {/* Admin info */}
          <div className="mt-auto pt-4 border-t border-white/8">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-extrabold text-sm flex-shrink-0">
                {user?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{user?.name}</div>
                <div className="text-[10px] text-purple-300 font-semibold">⚡ Administrator</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full py-2 rounded-xl bg-red-500/12 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-colors"
            >
              ↩ Sign Out
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 min-w-0 p-5 lg:p-8">
          {/* Page header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-lg hidden lg:flex">⚡</div>
              <div>
                <h1 className="text-xl lg:text-2xl font-extrabold text-white leading-tight">Admin Dashboard</h1>
                <p className="text-xs text-white/40">Full platform control</p>
              </div>
            </div>

            {/* Quick stat bar */}
            {stats && (
              <div className="flex flex-wrap gap-4 mt-4">
                {[
                  { label: "Users",        val: fmt(stats.totalUsers),       color: "bg-blue-500"    },
                  { label: "Recruiters",   val: fmt(stats.totalRecruiters),  color: "bg-amber-500"   },
                  { label: "Active Jobs",  val: fmt(stats.activeJobs),       color: "bg-emerald-500" },
                  { label: "Applications", val: fmt(stats.totalApplications),color: "bg-violet-500"  },
                ].map(({ label, val, color }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${color} flex-shrink-0`} />
                    <span className="text-xs text-white/50">{label}:</span>
                    <span className="text-xs font-extrabold text-white">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile tab bar */}
          <div className="lg:hidden flex gap-2 mb-6 bg-white/5 border border-white/8 rounded-2xl p-1.5">
            {NAV.map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  tab === key
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tab === "overview" && <OverviewTab stats={stats} />}
          {tab === "users"    && <UsersTab />}
          {tab === "jobs"     && <JobsTab />}
        </main>
      </div>
    </div>
  );
}
