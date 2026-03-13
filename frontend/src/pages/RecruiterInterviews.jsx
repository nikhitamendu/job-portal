import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const statusColors = {
  Scheduled:   "bg-blue-50 border-blue-100 text-blue-600",
  Completed:   "bg-green-50 border-green-100 text-green-600",
  Cancelled:   "bg-red-50 border-red-100 text-red-500",
  Rescheduled: "bg-amber-50 border-amber-100 text-amber-600",
};
const statusDot = {
  Scheduled:   "bg-blue-500",
  Completed:   "bg-green-500",
  Cancelled:   "bg-red-400",
  Rescheduled: "bg-amber-400",
};

const typeIcon = { Online: "🌐", "In-person": "📍", Phone: "📞" };

const fmt = (d) =>
  new Date(d).toLocaleString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

const RecruiterInterviews = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState("all");

  const fetch = async () => {
    try {
      const { data } = await api.get("/interviews/recruiter");
      setInterviews(data);
    } catch {
      toast.error("Failed to load interviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id, status) => {
    if (!window.confirm(`Mark this interview as ${status}?`)) return;
    try {
      await api.put(`/interviews/${id}/status`, { status });
      toast.success(`Marked as ${status}`);
      fetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const visible = filter === "all"
    ? interviews
    : interviews.filter((iv) => iv.status === filter);

  const counts = interviews.reduce((acc, iv) => {
    acc[iv.status] = (acc[iv.status] || 0) + 1;
    return acc;
  }, {});

  /* ── Loading ── */
  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero Banner ── */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/35 rounded-full px-3.5 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
              {interviews.length} Interview{interviews.length !== 1 ? "s" : ""}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">
            Scheduled Interviews
          </h1>
          <p className="text-sm text-white/50">
            Manage and track interviews you've scheduled with candidates
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mt-5">
            {/* Stat pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Scheduled",   color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
                { label: "Completed",   color: "bg-green-500/20 text-green-300 border-green-500/30" },
                { label: "Cancelled",   color: "bg-red-500/20 text-red-300 border-red-500/30" },
                { label: "Rescheduled", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
              ].map(({ label, color }) =>
                counts[label] ? (
                  <div key={label} className={`flex items-center gap-2 border rounded-full px-3 py-1.5 ${color}`}>
                    <span className="text-xs font-bold">{counts[label]} {label}</span>
                  </div>
                ) : null
              )}
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => navigate("/recruiter/applicants")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition flex items-center gap-2 shrink-0"
            >
              <span>➕</span>
              Schedule New Interview
            </button>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {["all", "Scheduled", "Completed", "Cancelled", "Rescheduled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition whitespace-nowrap ${
                filter === f
                  ? "bg-blue-600 border-blue-600 text-white shadow shadow-blue-200"
                  : "bg-white border-slate-200 text-slate-500 hover:border-blue-300"
              }`}
            >
              {f === "all" ? "All" : f}
              {f !== "all" && counts[f] ? ` (${counts[f]})` : ""}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {visible.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              {filter === "all" ? "No interviews scheduled yet" : `No ${filter} interviews`}
            </h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
              Ready to meet your next star candidate? Go to the Applicants page and click the 📅 Schedule button on anyReviewed or Shortlisted applicant.
            </p>
            <button 
              onClick={() => navigate("/recruiter/applicants")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl text-sm font-bold hover:bg-blue-100 transition"
            >
              Manage Applicants →
            </button>
          </div>
        )}

        {/* Interview cards */}
        <div className="grid gap-4">
          {visible.map((iv) => (
            <div
              key={iv._id}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-6">
                {/* Top: status + title + date */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-5">
                  <div className="flex-1 min-w-0">
                    {/* Status badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-2 ${statusColors[iv.status] || statusColors.Scheduled}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDot[iv.status] || statusDot.Scheduled}`} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{iv.status}</span>
                    </div>
                    <h2 className="text-lg font-extrabold text-slate-900 leading-tight">{iv.title}</h2>
                    <p className="text-xs font-bold text-blue-600 mt-1">{iv.job?.title}</p>
                  </div>

                  <div className="flex sm:flex-col sm:items-end gap-3 sm:gap-0 shrink-0">
                    <p className="text-base font-black text-slate-900">
                      {new Date(iv.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest sm:text-right">
                      {new Date(iv.date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>

                {/* Candidate + interview info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                  {/* Candidate */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Candidate</p>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-extrabold shrink-0">
                        {iv.candidate?.name?.[0]?.toUpperCase() || "?"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{iv.candidate?.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{iv.candidate?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Type & Link */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Type & Link</p>
                    <div className="flex items-center gap-2">
                      <span className="text-base shrink-0">{typeIcon[iv.type] || "📅"}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800">{iv.type}</p>
                        {iv.type === "Online" ? (
                          <a href={iv.location} target="_blank" rel="noreferrer"
                            className="text-[10px] font-bold text-blue-600 hover:underline break-all line-clamp-1">
                            Open link →
                          </a>
                        ) : (
                          <p className="text-[10px] text-slate-500 truncate">{iv.location}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Duration</p>
                    <div className="flex items-center gap-2">
                      <span className="text-base shrink-0">⏳</span>
                      <p className="text-xs font-bold text-slate-800">{iv.duration} Minutes</p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {iv.notes && (
                  <div className="mb-5 p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5">Your Notes</p>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium italic">"{iv.notes}"</p>
                  </div>
                )}

                {/* Action buttons — only for Scheduled interviews */}
                {iv.status === "Scheduled" && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => updateStatus(iv._id, "Cancelled")}
                      className="sm:flex-1 py-2.5 bg-red-50 border border-red-100 text-red-600 text-xs font-black rounded-xl hover:bg-red-100 transition"
                    >
                      Cancel Interview
                    </button>
                    <button
                      onClick={() => updateStatus(iv._id, "Completed")}
                      className="sm:flex-[2] py-2.5 bg-green-600 text-white text-xs font-black rounded-xl hover:bg-green-700 transition shadow-md shadow-green-500/20"
                    >
                      ✓ Mark as Completed
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterInterviews;
