import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import api from "../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all' | 'unread'

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get("/notifications");
      setNotifications(data.notifications);
    } catch (err) {
      toast.error("Failed to load activity.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/notifications/mark-read/${id}`);
      setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (err) { }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(notifications.filter(n => n._id !== id));
      toast.success("Notification removed");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const filteredNotifs = filter === "unread" ? notifications.filter(n => !n.read) : notifications;

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f3f2ef", padding: "32px 20px" }}>
      <style>{`
        .notif-wrapper { max-width: 1128px; margin: 0 auto; display: grid; grid-template-columns: 225px 1fr 290px; gap: 24px; }
        @media (max-width: 992px) { .notif-wrapper { grid-template-columns: 1fr; } .notif-left, .notif-right { display: none; } }
        
        .side-card { background: white; border-radius: 10px; border: 1px solid #e0e0e0; overflow: hidden; }
        .feed-container { display: flex; flex-direction: column; gap: 8px; }
        
        .notif-card { background: white; border: 1px solid #e0e0e0; border-radius: 10px; display: flex; gap: 12px; padding: 16px; transition: background 0.2s; }
        .notif-card:hover { background: #f8f8f8; }
        .notif-card.unread { background: #eff6ff; border-left: 4px solid #0a66c2; }
        
        .icon-box { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-center; font-size: 20px; flex-shrink: 0; background: #f3f2ef; }
        .notif-body { flex: 1; min-width: 0; }
        .notif-text { font-size: 14px; color: rgba(0,0,0,0.9); line-height: 1.4; margin: 0; }
        .notif-time { font-size: 12px; color: rgba(0,0,0,0.6); margin-top: 4px; }
        
        .filter-btn { padding: 8px 16px; border-radius: 20px; border: 1px solid #0a66c2; color: #0a66c2; font-weight: 600; font-size: 14px; cursor: pointer; background: white; transition: all 0.2s; }
        .filter-btn.active { background: #0a66c2; color: white; }
        .filter-btn:hover { background: #0a66c21a; }
      `}</style>

      <div className="notif-wrapper">
        {/* LEFT COLUMN: MINI PROFILE */}
        <aside className="notif-left">
          <div className="side-card">
            <div style={{ height: 54, background: "#a0b4b7" }} />
            <div style={{ padding: "0 12px 16px", marginTop: -30, textAlign: "center" }}>
              <div style={{ width: 72, height: 72, border: "2px solid white", borderRadius: "50%", background: "#eee", margin: "0 auto", overflow: "hidden" }}>
                {user?.profilePicFileId ? (
                  <img src={`${import.meta.env.VITE_API_URL}/users/file/${user.profilePicFileId}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#666" }}>{user?.name?.[0]}</div>
                )}
              </div>
              <h3 style={{ margin: "12px 0 4px", fontSize: 16, fontWeight: 700 }}>{user?.name}</h3>
              <p style={{ fontSize: 12, color: "rgba(0,0,0,0.6)", margin: 0 }}>{user?.jobTitle || "Job Hub User"}</p>
            </div>
            <div style={{ borderTop: "1px solid #e0e0e0", padding: 12 }}>
              <div className="flex justify-between text-xs font-bold text-gray-500">
                <span>Total Notifications</span>
                <span className="text-blue-600">{notifications.length}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: FEED */}
        <main className="feed-container">
          <div className="side-card" style={{ padding: 16, display: "flex", gap: 8, marginBottom: 8 }}>
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            <button className={`filter-btn ${filter === 'unread' ? 'active' : ''}`} onClick={() => setFilter('unread')}>Unread</button>
          </div>

          {filteredNotifs.length === 0 ? (
            <div className="side-card" style={{ padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔔</div>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>No notifications found</h3>
              <p style={{ color: "rgba(0,0,0,0.6)", marginTop: 4 }}>We'll let you know when something important happens.</p>
            </div>
          ) : (
            filteredNotifs.map(notif => (
              <div 
                key={notif._id} 
                className={`notif-card ${!notif.read ? 'unread' : ''}`}
                onMouseEnter={() => !notif.read && handleMarkRead(notif._id)}
              >
                <div className="icon-box">
                  {getIcon(notif.type)}
                </div>
                <div className="notif-body">
                  <p className="notif-text">
                    {notif.message}
                  </p>
                  <p className="notif-time">
                    {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                  </p>
                  {notif.link && (
                    <Link to={notif.link} style={{ display: "inline-block", marginTop: 8, fontSize: 14, fontWeight: 600, color: "#0a66c2", textDecoration: "none" }}>
                      View Details
                    </Link>
                  )}
                </div>
                <button 
                  onClick={() => handleDelete(notif._id)}
                  style={{ background: "none", border: "none", color: "rgba(0,0,0,0.4)", cursor: "pointer", fontSize: 18 }}
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </main>

        {/* RIGHT COLUMN: STATS */}
        <aside className="notif-right">
          <div className="side-card" style={{ padding: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Activity Insights</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <StatRow label="Applications" value={notifications.filter(n => n.type === 'application').length} />
              <StatRow label="Outreach" value={notifications.filter(n => n.type === 'outreach').length} />
              <StatRow label="Job Matches" value={notifications.filter(n => n.type === 'job_match' || n.type === 'new_job').length} />
            </div>
          </div>
          
          <div className="side-card" style={{ padding: 16, marginTop: 16, textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "rgba(0,0,0,0.6)", margin: 0 }}>
              HireHub Premium Insight © 2026
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

const StatRow = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span style={{ fontSize: 13, color: "rgba(0,0,0,0.7)" }}>{label}</span>
    <span style={{ fontSize: 13, fontWeight: 700, color: "#0a66c2" }}>{value}</span>
  </div>
);

function getIcon(type) {
  switch (type) {
    case "application": return "📋";
    case "status_update": return "⚙️";
    case "new_job": return "✨";
    case "job_match": return "🔥";
    case "outreach": return "✉️";
    case "message": return "💬";
    default: return "🔔";
  }
}

export default Notifications;
