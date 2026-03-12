import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const InterviewScheduler = ({ application, onClose, onScheduled }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: `Interview for ${application.job?.title || "Position"}`,
    date: "",
    duration: 45,
    type: "Online",
    location: "",
    notes: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/interviews/schedule", {
        applicationId: application._id,
        ...formData
      });
      toast.success("Interview scheduled successfully!");
      if (onScheduled) onScheduled();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to schedule interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Schedule Interview</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              Candidate: {application.applicant?.name}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-7 space-y-4 overflow-y-auto max-h-[75vh]">
          <div>
            <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Meeting Title</label>
            <input
              required
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm font-semibold focus:border-blue-500 focus:bg-white outline-none transition"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Date & Time</label>
              <input
                required
                type="datetime-local"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm font-semibold focus:border-blue-500 focus:bg-white outline-none transition"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Duration (min)</label>
              <input
                required
                type="number"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm font-semibold focus:border-blue-500 focus:bg-white outline-none transition"
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Type</label>
            <div className="flex gap-2">
              {["Online", "In-person", "Phone"].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: t })}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition ${
                    formData.type === t 
                      ? "bg-blue-600 border-blue-600 text-white" 
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
              {formData.type === "Online" ? "Meeting Link" : "Address / Number"}
            </label>
            <input
              required
              placeholder={formData.type === "Online" ? "e.g. Zoom or Google Meet link" : "e.g. Office address or phone number"}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm font-semibold focus:border-blue-500 focus:bg-white outline-none transition"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Interview Notes (Optional)</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm font-semibold focus:border-blue-500 focus:bg-white outline-none transition resize-none"
              placeholder="Instructions or agenda..."
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-500/30 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Schedule & Notify Candidate"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InterviewScheduler;
