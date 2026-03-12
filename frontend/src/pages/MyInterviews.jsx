import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

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

  useEffect(() => { fetchInterviews(); }, []);

  const handleStatusUpdate = async (id, status) => {
    if (status === "Cancelled" && !window.confirm("Are you sure you want to cancel this interview?")) return;
    try {
      await api.put(`/interviews/${id}/status`, { status });
      toast.success(`Interview ${status}`);
      fetchInterviews();
    } catch (err) {
      toast.error("Failed to update interview");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Interviews</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage and track your upcoming scheduled meetings</p>
        </div>

        {interviews.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No interviews scheduled</h3>
            <p className="text-slate-400">Your scheduled interviews will appear here once recruiters invite you.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {interviews.map((iv) => (
              <div key={iv._id} className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-7">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">{iv.status}</span>
                      </div>
                      <h2 className="text-xl font-extrabold text-slate-900 leading-tight">{iv.title}</h2>
                      <p className="text-sm font-bold text-blue-600 mt-1">{iv.job?.title} at {iv.recruiter?.companyName || iv.recruiter?.name}</p>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="text-right">
                        <p className="text-lg font-black text-slate-900">{new Date(iv.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{new Date(iv.date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-7">
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Meeting Type & Link</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{iv.type === "Online" ? "🌐" : iv.type === "Phone" ? "📞" : "📍"}</span>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{iv.type}</p>
                          {iv.type === "Online" ? (
                            <a href={iv.location} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:underline break-all">Join Meeting →</a>
                          ) : (
                            <p className="text-xs font-semibold text-slate-600">{iv.location}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Duration & Recruiter</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">⏳</span>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{iv.duration} Minutes</p>
                          <p className="text-xs font-semibold text-slate-500">{iv.recruiter?.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {iv.notes && (
                    <div className="mb-7 p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5">Recruiter Notes</p>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium italic">"{iv.notes}"</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {iv.status === "Scheduled" && (
                      <>
                        <button 
                          onClick={() => handleStatusUpdate(iv._id, "Cancelled")}
                          className="flex-1 py-3 bg-red-50 border border-red-100 text-red-600 text-xs font-black rounded-xl hover:bg-red-100 transition"
                        >
                          Cancel Meeting
                        </button>
                        {iv.type === "Online" && (
                          <a 
                            href={iv.location} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex-[2] py-3 bg-blue-600 text-white text-xs font-black rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 text-center"
                          >
                            Join Now
                          </a>
                        )}
                      </>
                    )}
                  </div>
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
