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

/* ─── Styles ─── */
const S = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#060d1a 0%,#0a1628 50%,#0d1f3a 100%)",
    color: "white",
    fontFamily: "'Sora',sans-serif",
  },
  sidebar: {
    width: 240,
    minHeight: "100vh",
    background: "rgba(255,255,255,0.04)",
    borderRight: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    flexDirection: "column",
    padding: "28px 16px",
    position: "sticky",
    top: 0,
    flexShrink: 0,
  },
  navBtn: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "'Sora',sans-serif",
    width: "100%",
    textAlign: "left",
    transition: "all 0.15s",
    background: active ? "rgba(37,99,235,0.25)" : "transparent",
    color: active ? "#93c5fd" : "rgba(255,255,255,0.6)",
    borderLeft: active ? "3px solid #3b82f6" : "3px solid transparent",
  }),
  card: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: "24px",
    backdropFilter: "blur(10px)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "10px 14px",
    textAlign: "left",
    fontSize: 11,
    fontWeight: 700,
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  td: {
    padding: "13px 14px",
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    verticalAlign: "middle",
  },
  badge: (color) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "3px 10px",
    borderRadius: 99,
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    ...color,
  }),
  btn: (variant = "danger") => ({
    padding: "5px 12px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "'Sora',sans-serif",
    transition: "all 0.15s",
    ...(variant === "danger"
      ? { background: "rgba(239,68,68,0.15)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.25)" }
      : variant === "success"
      ? { background: "rgba(34,197,94,0.15)", color: "#86efac", border: "1px solid rgba(34,197,94,0.25)" }
      : { background: "rgba(59,130,246,0.15)", color: "#93c5fd", border: "1px solid rgba(59,130,246,0.25)" }),
  }),
};

const ROLE_BADGE = {
  user:      { background: "rgba(37,99,235,0.2)",  border: "1px solid rgba(37,99,235,0.35)",   color: "#93c5fd"  },
  recruiter: { background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.35)", color: "#fcd34d"  },
  admin:     { background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.35)", color: "#d8b4fe"  },
};

/* ═══════════════════════════════════════════
   STAT CARD
═══════════════════════════════════════════ */
function StatCard({ icon, label, value, accent, sub }) {
  return (
    <div style={{ ...S.card, display: "flex", alignItems: "center", gap: 18 }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, flexShrink: 0,
        background: accent + "22", border: `1px solid ${accent}44`,
      }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "white", lineHeight: 1.1 }}>
          {fmt(value)}
        </p>
        <p style={{ margin: "3px 0 0", fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>
          {label}
        </p>
        {sub && (
          <p style={{ margin: "2px 0 0", fontSize: 11, color: accent, fontWeight: 600 }}>{sub}</p>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   OVERVIEW TAB
═══════════════════════════════════════════ */
function OverviewTab({ stats }) {
  if (!stats) return (
    <div style={{ textAlign: "center", padding: 60, color: "rgba(255,255,255,0.3)" }}>
      Loading stats…
    </div>
  );
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24, color: "white" }}>
        Platform Overview
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 16, marginBottom: 32 }}>
        <StatCard icon="👤" label="Job Seekers"    value={stats.totalUsers}        accent="#3b82f6" />
        <StatCard icon="🏢" label="Recruiters"     value={stats.totalRecruiters}   accent="#f59e0b" />
        <StatCard icon="💼" label="Total Jobs"     value={stats.totalJobs}         accent="#8b5cf6"
          sub={`${fmt(stats.activeJobs)} active · ${fmt(stats.inactiveJobs)} inactive`}
        />
        <StatCard icon="📋" label="Applications"  value={stats.totalApplications} accent="#10b981" />
      </div>

      <div style={S.card}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
          Quick Stats
        </h3>
        {[
          { label: "Active Job Listings",   val: fmt(stats.activeJobs) },
          { label: "Inactive / Expired",    val: fmt(stats.inactiveJobs) },
          { label: "Avg Applications/Job",  val: stats.totalJobs ? (stats.totalApplications / stats.totalJobs).toFixed(1) : "0" },
        ].map(({ label, val }) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 13 }}>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>{label}</span>
            <span style={{ fontWeight: 700, color: "white" }}>{val}</span>
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

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: "white" }}>
          User Management <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>({fmt(total)})</span>
        </h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{ padding: "8px 14px", borderRadius: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontSize: 13, fontFamily: "'Sora',sans-serif", outline: "none", width: 220 }}
          />
          <select
            value={roleFilter}
            onChange={(e) => { setRole(e.target.value); setPage(1); }}
            style={{ padding: "8px 12px", borderRadius: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontSize: 13, fontFamily: "'Sora',sans-serif", outline: "none" }}
          >
            <option value="all">All Roles</option>
            <option value="user">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.3)" }}>Loading…</div>
          ) : users.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.3)" }}>No users found</div>
          ) : (
            <table style={S.table}>
              <thead>
                <tr>
                  {["User", "Role", "Verified", "Joined", "Actions"].map((h) => (
                    <th key={h} style={S.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} style={{ transition: "background 0.12s" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={S.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#2563eb,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                          {u.name?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: "white", fontSize: 13 }}>{u.name}</div>
                          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={S.td}>
                      {u._id === me._id ? (
                        <span style={S.badge(ROLE_BADGE[u.role] || ROLE_BADGE.user)}>
                          {u.role} (you)
                        </span>
                      ) : (
                        <select
                          disabled={roleChanging[u._id]}
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          style={{ padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: 12, fontFamily: "'Sora',sans-serif", cursor: "pointer", outline: "none" }}
                        >
                          <option value="user">Job Seeker</option>
                          <option value="recruiter">Recruiter</option>
                          <option value="admin">Admin</option>
                        </select>
                      )}
                    </td>
                    <td style={S.td}>
                      <span style={S.badge(u.isVerified
                        ? { background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#86efac" }
                        : { background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }
                      )}>
                        {u.isVerified ? "✓ Yes" : "✗ No"}
                      </span>
                    </td>
                    <td style={{ ...S.td, color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
                      {timeAgo(u.createdAt)}
                    </td>
                    <td style={S.td}>
                      {u._id !== me._id && (
                        <button style={S.btn("danger")} onClick={() => handleDelete(u._id, u.name)}>
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
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
          {[...Array(Math.ceil(total / 15))].map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}
              style={{ padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "'Sora',sans-serif",
                background: page === i + 1 ? "#2563eb" : "rgba(255,255,255,0.08)",
                color: page === i + 1 ? "white" : "rgba(255,255,255,0.5)" }}
            >{i + 1}</button>
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: "white" }}>
          Job Management <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>({fmt(total)})</span>
        </h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            placeholder="Search title or city…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{ padding: "8px 14px", borderRadius: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontSize: 13, fontFamily: "'Sora',sans-serif", outline: "none", width: 220 }}
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            style={{ padding: "8px 12px", borderRadius: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontSize: 13, fontFamily: "'Sora',sans-serif", outline: "none" }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.3)" }}>Loading…</div>
          ) : jobs.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40, color: "rgba(255,255,255,0.3)" }}>No jobs found</div>
          ) : (
            <table style={S.table}>
              <thead>
                <tr>
                  {["Job Title", "Recruiter", "Applications", "Status", "Posted", "Actions"].map((h) => (
                    <th key={h} style={S.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => (
                  <tr key={j._id} style={{ transition: "background 0.12s" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={S.td}>
                      <div style={{ fontWeight: 700, color: "white", fontSize: 13, maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {j.title}
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
                        {j.employmentType} · {j.workplaceType}
                      </div>
                    </td>
                    <td style={S.td}>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{j.postedBy?.name || "—"}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{j.postedBy?.companyName || j.postedBy?.email || ""}</div>
                    </td>
                    <td style={{ ...S.td, textAlign: "center" }}>
                      <span style={{ fontWeight: 800, color: "#93c5fd" }}>{j.applicationCount}</span>
                    </td>
                    <td style={S.td}>
                      <button
                        disabled={toggling[j._id]}
                        onClick={() => handleToggle(j._id)}
                        style={S.btn(j.isActive ? "success" : "danger")}
                      >
                        {toggling[j._id] ? "…" : j.isActive ? "✓ Active" : "✗ Inactive"}
                      </button>
                    </td>
                    <td style={{ ...S.td, color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
                      {timeAgo(j.createdAt)}
                    </td>
                    <td style={S.td}>
                      <button style={S.btn("danger")} onClick={() => handleDelete(j._id, j.title)}>
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

      {total > 15 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
          {[...Array(Math.ceil(total / 15))].map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}
              style={{ padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "'Sora',sans-serif",
                background: page === i + 1 ? "#2563eb" : "rgba(255,255,255,0.08)",
                color: page === i + 1 ? "white" : "rgba(255,255,255,0.5)" }}
            >{i + 1}</button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN ADMIN DASHBOARD
═══════════════════════════════════════════ */
export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats")
      .then(({ data }) => setStats(data))
      .catch(() => toast.error("Failed to load stats"));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const NAV = [
    { key: "overview", icon: "📊", label: "Overview" },
    { key: "users",    icon: "👥", label: "Users" },
    { key: "jobs",     icon: "💼", label: "Jobs" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        option { background: #1e3a5f; color: white; }
        input::placeholder { color: rgba(255,255,255,0.3) !important; }
      `}</style>

      <div style={{ ...S.page, display: "flex" }}>
        {/* ─── SIDEBAR ─── */}
        <aside style={S.sidebar}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#2563eb,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, color: "white" }}>
              H
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: "white" }}>
                Hire<span style={{ color: "#60a5fa" }}>Hub</span>
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 600, marginTop: 1 }}>Admin Panel</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            {NAV.map(({ key, icon, label }) => (
              <button key={key} style={S.navBtn(tab === key)} onClick={() => setTab(key)}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                {label}
              </button>
            ))}
          </nav>

          {/* Admin info */}
          <div style={{ marginTop: "auto", padding: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: "white" }}>
                {user?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.name}</div>
                <div style={{ fontSize: 10, color: "#d8b4fe", fontWeight: 600 }}>⚡ Administrator</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{ width: "100%", padding: "7px 0", borderRadius: 8, background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Sora',sans-serif" }}
            >
              ↩ Sign Out
            </button>
          </div>
        </aside>

        {/* ─── MAIN CONTENT ─── */}
        <main style={{ flex: 1, padding: "36px 32px", overflowY: "auto", minWidth: 0 }}>
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "white" }}>
                ⚡
              </div>
              <div>
                <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "white" }}>Admin Dashboard</h1>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Full platform control</p>
              </div>
            </div>
            {/* Stat quick bar */}
            {stats && (
              <div style={{ display: "flex", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
                {[
                  { label: "Users",        val: fmt(stats.totalUsers),        color: "#3b82f6" },
                  { label: "Recruiters",   val: fmt(stats.totalRecruiters),   color: "#f59e0b" },
                  { label: "Active Jobs",  val: fmt(stats.activeJobs),        color: "#10b981" },
                  { label: "Applications",val: fmt(stats.totalApplications),  color: "#8b5cf6" },
                ].map(({ label, val, color }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{label}:</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "white" }}>{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tab content */}
          {tab === "overview" && <OverviewTab stats={stats} />}
          {tab === "users"    && <UsersTab />}
          {tab === "jobs"     && <JobsTab />}
        </main>
      </div>
    </>
  );
}
