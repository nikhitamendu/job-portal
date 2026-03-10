import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import api from "../services/api";

export default function NotificationDropdown({ notifications, unreadCount, onRefresh, onClose }) {
  const handleMarkRead = async (id) => {
    try {
      await api.put(`/notifications/mark-read/${id}`);
      onRefresh();
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.put("/notifications/mark-read/all");
      onRefresh();
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  };

  return (
    <div className="nb-dropdown" style={{
      position: "absolute",
      top: "calc(100% + 10px)",
      right: 0,
      width: 320,
      background: "#1e3a5f",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
      zIndex: 100
    }}>
      {/* Header */}
      <div style={{
        padding: "14px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.04)"
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "white", margin: 0 }}>Notifications</h3>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#93c5fd",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0
            }}
          >
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div style={{ maxHeight: 360, overflowY: "auto" }}>
        {notifications.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "rgba(255,255,255,0.3)" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔔</div>
            <p style={{ fontSize: 13, margin: 0 }}>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif._id}
              onClick={() => {
                if (!notif.read) handleMarkRead(notif._id);
                onClose();
              }}
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: notif.read ? "transparent" : "rgba(37,99,235,0.08)",
                cursor: "pointer",
                transition: "background 0.15s"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = notif.read ? "transparent" : "rgba(37,99,235,0.08)")}
            >
              <Link to={notif.link || "#"} style={{ textDecoration: "none", display: "flex", gap: 12 }}>
                {/* Icon/Avatar */}
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: getIconBg(notif.type),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                  border: "1px solid rgba(255,255,255,0.1)"
                }}>
                  {getIcon(notif.type)}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 13,
                    color: "white",
                    margin: 0,
                    lineHeight: 1.4,
                    fontWeight: notif.read ? 400 : 600
                  }}>
                    {notif.message}
                  </p>
                  <p style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    margin: "4px 0 0"
                  }}>
                    {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                  </p>
                </div>

                {!notif.read && (
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#2563eb",
                    marginTop: 4,
                    flexShrink: 0
                  }} />
                )}
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <Link
        to="/notifications"
        onClick={onClose}
        style={{
          display: "block",
          padding: "12px",
          textAlign: "center",
          fontSize: 13,
          fontWeight: 600,
          color: "#93c5fd",
          textDecoration: "none",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)"
        }}
      >
        View All Activity
      </Link>
    </div>
  );
}

function getIcon(type) {
  switch (type) {
    case "application": return "📋";
    case "status_update": return "⚙️";
    case "new_job": return "✨";
    case "message": return "💬";
    default: return "🔔";
  }
}

function getIconBg(type) {
  switch (type) {
    case "application": return "rgba(37,99,235,0.2)";
    case "status_update": return "rgba(16,185,129,0.2)";
    case "new_job": return "rgba(245,158,11,0.2)";
    case "message": return "rgba(139,92,246,0.2)";
    default: return "rgba(255,255,255,0.1)";
  }
}
