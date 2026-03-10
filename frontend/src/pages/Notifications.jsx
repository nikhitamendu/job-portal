import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import api from "../services/api";
import { toast } from "react-toastify";

const NotificationStyles = () => (
  <style>{`
    .notif-page {
      min-h-screen bg-slate-50 py-12 px-6;
    }
    .notif-container {
      max-width: 800px; margin: 0 auto;
    }
    .notif-card {
      background: white; border-radius: 20px; border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); overflow: hidden;
    }
    .notif-item {
      padding: 20px; border-bottom: 1px solid #f1f5f9;
      display: flex; gap: 16px; transition: background 0.2s;
    }
    .notif-item:hover { background: #f8fafc; }
    .notif-item.unread { background: #eff6ff; }
    .notif-item:last-child { border-bottom: none; }
    
    .notif-icon {
      width: 48px; height: 48px; border-radius: 12px;
      display: flex; alignItems: center; justifyContent: center;
      font-size: 20px; flex-shrink: 0;
    }
  `}</style>
);

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get("/notifications");
      setNotifications(data.notifications);
    } catch (err) {
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Mark all as read when visiting the page
    api.put("/notifications/mark-read/all").catch(() => {});
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(notifications.filter(n => n._id !== id));
      toast.success("Notification deleted");
    } catch (err) {
      toast.error("Failed to delete notification");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6">
      <NotificationStyles />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Notifications</h1>
            <p className="text-slate-500 mt-1">Stay updated with your latest activity</p>
          </div>
          <div className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-blue-400/30">
            {notifications.length} Total
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          {notifications.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-xl font-bold text-slate-800">No notifications yet</h3>
              <p className="text-slate-500 mt-2">When you get updates, they'll show up here.</p>
              <Link to="/jobs" className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
                Browse Jobs
              </Link>
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif._id} 
                className={`p-6 border-b border-slate-100 flex gap-4 transition-colors ${!notif.read ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
              >
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner flex-shrink-0"
                  style={{ background: getIconBg(notif.type) }}
                >
                  {getIcon(notif.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-slate-800 leading-relaxed ${!notif.read ? 'font-bold' : 'font-medium'}`}>
                      {notif.message}
                    </p>
                    <button 
                      onClick={() => handleDelete(notif._id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      🕒 {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                    </span>
                    {notif.link && (
                      <Link 
                        to={notif.link}
                        className="text-xs font-extrabold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                      >
                        View Details →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
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
    case "application": return "#eff6ff";
    case "status_update": return "#ecfdf5";
    case "new_job": return "#fff7ed";
    case "message": return "#f5f3ff";
    default: return "#f8fafc";
  }
}
