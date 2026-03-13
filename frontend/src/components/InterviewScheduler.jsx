import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "14:00", "14:30", "15:00", "15:30", "16:00",
];

const DURATIONS = [15, 30, 45, 60, 90];

const typeIcons = { Online: "🌐", "In-person": "📍", Phone: "📞" };

const InterviewScheduler = ({ application, onClose, onScheduled }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: `Interview for ${application.job?.title || "Position"}`,
    date: "",
    time: "",
    duration: 45,
    type: "Online",
    location: "",
    notes: "",
  });

  const set = (key, val) => setFormData((p) => ({ ...p, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.time) {
      toast.error("Please select a time slot");
      return;
    }
    setLoading(true);
    try {
      await api.post("/interviews/schedule", {
        applicationId: application._id,
        title: formData.title,
        date: `${formData.date}T${formData.time}`,
        duration: formData.duration,
        type: formData.type,
        location: formData.location,
        notes: formData.notes,
      });
      toast.success("Interview scheduled! Candidate has been notified.");
      onScheduled?.();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to schedule interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex justify-between items-start shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Schedule Interview</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
              {application.applicant?.name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              {application.job?.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition text-lg shrink-0"
          >
            ✕
          </button>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Meeting Title */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
              Meeting Title
            </label>
            <input
              required
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm font-semibold focus:border-blue-500 focus:bg-white outline-none transition"
              value={formData.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
              Date
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm font-semibold focus:border-blue-500 focus:bg-white outline-none transition"
              value={formData.date}
              onChange={(e) => set("date", e.target.value)}
            />
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
              Time Slot
            </label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => set("time", slot)}
                  className={`py-2 rounded-xl text-xs font-bold border-2 transition ${
                    formData.time === slot
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-white border-slate-100 text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
              Duration
            </label>
            <div className="flex gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => set("duration", d)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition ${
                    formData.duration === d
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-white border-slate-100 text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  {d}m
                </button>
              ))}
            </div>
          </div>

          {/* Interview Type */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
              Interview Type
            </label>
            <div className="flex gap-2">
              {["Online", "In-person", "Phone"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => set("type", type)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition flex items-center justify-center gap-1 ${
                    formData.type === type
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-white border-slate-100 text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <span>{typeIcons[type]}</span>
                  <span>{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location / Meeting Link */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
              {formData.type === "Online" ? "Meeting Link" : "Address / Phone Number"}
            </label>
            <input
              required
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm font-semibold focus:border-blue-500 focus:bg-white outline-none transition"
              placeholder={
                formData.type === "Online"
                  ? "e.g. Google Meet or Zoom link"
                  : "e.g. Office address or phone number"
              }
              value={formData.location}
              onChange={(e) => set("location", e.target.value)}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
              Notes for Candidate <span className="text-slate-300 normal-case tracking-normal font-medium">(optional)</span>
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 text-sm font-semibold focus:border-blue-500 focus:bg-white outline-none transition resize-none"
              placeholder="Instructions, what to prepare, agenda..."
              value={formData.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-extrabold shadow-lg shadow-blue-500/30 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Scheduling…
              </>
            ) : (
              "📅 Schedule & Notify Candidate"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InterviewScheduler;