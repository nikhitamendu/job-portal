import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const statusColors = {
  Scheduled: "bg-blue-50 border-blue-100 text-blue-600",
  Completed: "bg-green-50 border-green-100 text-green-600",
  Cancelled: "bg-red-50 border-red-100 text-red-500",
  Rescheduled: "bg-amber-50 border-amber-100 text-amber-600",
};

const statusDot = {
  Scheduled: "bg-blue-500",
  Completed: "bg-green-500",
  Cancelled: "bg-red-400",
  Rescheduled: "bg-amber-400",
};

const MyInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInterviews = async () => {
    try {
      const { data } = await api.get("/interviews/my-interviews");
      setInterviews(data);
    } catch (err) {
      toast.error("Failed to load interviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    if (
      status === "Cancelled" &&
      !window.confirm("Are you sure you want to cancel this interview?")
    )
      return;
    try {
      await api.put(`/interviews/${id}/status`, { status });
      toast.success(`Interview ${status}`);
      fetchInterviews();
    } catch (err) {
      toast.error("Failed to update interview");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Interviews
          </h1>
          <p className="text-slate-500 mt-1.5 text-sm sm:text-base font-medium">
            Manage and track your upcoming scheduled meetings
          </p>
        </div>

        {/* Empty state */}
        {interviews.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-10 sm:p-16 text-center shadow-sm">
            <div className="text-5xl sm:text-6xl mb-4">📅</div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
              No interviews scheduled
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">
              Your scheduled interviews will appear here once recruiters invite you.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6">
            {interviews.map((iv) => (
              <div
                key={iv._id}
                className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-5 sm:p-7">

                  {/* Top section: status + title + date */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-5">
                    <div className="flex-1 min-w-0">
                      {/* Status badge */}
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-2 ${
                          statusColors[iv.status] || statusColors.Scheduled
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            statusDot[iv.status] || statusDot.Scheduled
                          }`}
                        />
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
                          {iv.status}
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight truncate">
                        {iv.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-bold text-blue-600 mt-1 truncate">
                        {iv.job?.title} at {iv.recruiter?.companyName || iv.recruiter?.name}
                      </p>
                    </div>

                    {/* Date — inline on mobile, right-aligned on sm+ */}
                    <div className="flex sm:flex-col sm:items-end gap-3 sm:gap-0 shrink-0">
                      <p className="text-base sm:text-lg font-black text-slate-900">
                        {new Date(iv.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest sm:text-right">
                        {new Date(iv.date).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Info cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    {/* Meeting type */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl p-3.5">
                      <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Meeting Type & Link
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg shrink-0">
                          {iv.type === "Online" ? "🌐" : iv.type === "Phone" ? "📞" : "📍"}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800">{iv.type}</p>
                          {iv.type === "Online" ? (
                            <a
                              href={iv.location}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-bold text-blue-600 hover:underline break-all line-clamp-1"
                            >
                              Join Meeting →
                            </a>
                          ) : (
                            <p className="text-xs font-semibold text-slate-600 truncate">
                              {iv.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Duration + recruiter */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl p-3.5">
                      <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Duration & Recruiter
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg shrink-0">⏳</span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800">{iv.duration} Minutes</p>
                          <p className="text-xs font-semibold text-slate-500 truncate">
                            {iv.recruiter?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {iv.notes && (
                    <div className="mb-5 p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-xl sm:rounded-2xl">
                      <p className="text-[9px] sm:text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5">
                        Recruiter Notes
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                        "{iv.notes}"
                      </p>
                    </div>
                  )}

                  {/* Action buttons */}
                  {iv.status === "Scheduled" && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        onClick={() => handleStatusUpdate(iv._id, "Cancelled")}
                        className="w-full sm:flex-1 py-2.5 sm:py-3 bg-red-50 border border-red-100 text-red-600 text-xs font-black rounded-xl hover:bg-red-100 transition"
                      >
                        Cancel Meeting
                      </button>
                      {iv.type === "Online" && (
                        <a
                          href={iv.location}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full sm:flex-[2] py-2.5 sm:py-3 bg-blue-600 text-white text-xs font-black rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 text-center"
                        >
                          Join Now
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInterviews;
