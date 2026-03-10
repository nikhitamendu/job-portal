
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const JobDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  /* ── Fetch job + check if already applied ── */
  const fetchJob = async () => {
    try {
      const { data } = await api.get(`/jobs/${id}`);
      setJob(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfApplied = async () => {
    try {
      const { data } = await api.get(`/applications/check/${id}`);
      setApplied(data.applied); // backend returns { applied: true/false }
    } catch (error) {
      // If endpoint doesn't exist yet, fall back silently
      console.warn("Check-applied endpoint not available:", error);
    }
  };

  // Fetch job on mount (public, no auth needed)
  useEffect(() => {
    fetchJob();
  }, [id]);

  // Check applied status only after auth finishes loading
  useEffect(() => {
    if (authLoading) return;
    if (user && user.role !== "recruiter") {
      checkIfApplied();
    }
  }, [id, user, authLoading]);

  const handleApply = async () => {
    if (!user) {
      toast.info("Please login to apply for this job.");
      navigate("/login", { state: { from: location } });
      return;
    }

    try {
      setApplying(true);
      const { data } = await api.post(`/applications/apply/${job._id}`);
      toast.success(data.message);
      setApplied(true);
    } catch (error) {
      // If backend says "already applied", also mark as applied in UI
      const msg = error.response?.data?.message || "Application failed";
      if (msg.toLowerCase().includes("already applied")) {
        setApplied(true);
        toast.info("You have already applied for this job.");
      } else {
        toast.error(msg);
      }
    } finally {
      setApplying(false);
    }
  };

  /* ── Loading ── */
  if (loading)
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading job details…</span>
        </div>
      </div>
    );

  if (!job)
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-3">🔍</div>
          <p className="text-slate-500 font-medium">Job not found.</p>
        </div>
      </div>
    );

  /* ── Apply Button (reused in two places) ── */
  const ApplyButton = ({ className = "" }) => {
    if (user?.role === "recruiter") return null;
    return (
      <button
        onClick={handleApply}
        disabled={applying || applied}
        className={`flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
          ${applied
            ? "bg-emerald-500 text-white cursor-not-allowed shadow-md shadow-emerald-900/30"
            : applying
            ? "bg-slate-600 text-white/60 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/40 hover:-translate-y-0.5 cursor-pointer"
          } ${className}`}
      >
        {applied ? (
          <><span>✓</span> Applied</>
        ) : applying ? (
          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Applying…</>
        ) : (
          "Apply Now →"
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ── Hero Banner ── */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl flex-shrink-0 border-2 border-white/10">
                {job.postedBy?.name?.[0]?.toUpperCase() || "?"}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight leading-tight">
                  {job.title}
                </h1>
                <p className="text-sm text-white/50 mt-0.5">
                  Posted by{" "}
                  <span className="text-white/70 font-medium">{job.postedBy?.name}</span>
                  {" · "}
                  <span>{job.postedBy?.email}</span>
                </p>
              </div>
            </div>
            <ApplyButton />
          </div>

          {/* Quick info pills */}
          <div className="flex flex-wrap gap-2 mt-5">
            {[
              { icon: "💼", label: job.employmentType },
              { icon: "🏢", label: job.workplaceType },
              { icon: "📊", label: job.experienceLevel },
              { icon: "📍", label: `${job.location?.city}, ${job.location?.country}` },
              { icon: "💰", label: `₹${job.salary?.min?.toLocaleString()} – ₹${job.salary?.max?.toLocaleString()}` },
              job.applicationDeadline && {
                icon: "⏳",
                label: `Deadline: ${new Date(job.applicationDeadline).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric",
                })}`,
              },
            ]
              .filter(Boolean)
              .map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-3 py-1.5">
                  <span className="text-xs">{item.icon}</span>
                  <span className="text-xs font-semibold text-white/65">{item.label}</span>
                </div>
              ))}
          </div>

          {/* Already applied notice in hero */}
          {applied && user?.role !== "recruiter" && (
            <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold text-emerald-300">
                You have already applied for this job
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">

        {/* Description */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <SectionTitle icon="📄" title="Job Description" />
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{job.description}</p>
        </div>

        {/* Requirements */}
        {job.requirements && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <SectionTitle icon="✅" title="Requirements" />
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{job.requirements}</p>
          </div>
        )}

        {/* Skills */}
        {job.skillsRequired && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <SectionTitle icon="🛠" title="Skills Required" />
            <div className="flex flex-wrap gap-2 mt-3">
              {(Array.isArray(job.skillsRequired)
                ? job.skillsRequired
                : job.skillsRequired.split(",")
              ).map((s) => s.trim()).filter(Boolean).map((skill, i) => (
                <span key={i} className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* About recruiter */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <SectionTitle icon="🏢" title="About the Recruiter" />
          <div className="flex items-center gap-3 mt-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-base flex-shrink-0">
              {job.postedBy?.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{job.postedBy?.name}</p>
              <p className="text-xs text-slate-400">{job.postedBy?.email}</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA — changes appearance when already applied */}
        {user?.role !== "recruiter" && (
          <div className={`rounded-2xl p-6 flex items-center justify-between gap-4 shadow-lg transition-all duration-300
            ${applied
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-200"
              : "bg-gradient-to-r from-blue-700 to-indigo-700 shadow-blue-200"
            }`}
          >
            <div>
              {applied ? (
                <>
                  <p className="text-white font-bold text-base">✓ Application Submitted!</p>
                  <p className="text-white/70 text-sm mt-0.5">
                    The recruiter will review your profile and get back to you.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-white font-bold text-base">Interested in this role?</p>
                  <p className="text-white/60 text-sm mt-0.5">
                    Apply now and take the next step in your career.
                  </p>
                </>
              )}
            </div>
            <ApplyButton
              className={applied ? "" : "!bg-white !text-blue-700 hover:!bg-slate-100"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-base">{icon}</span>
      <h2 className="text-xs font-bold text-slate-500 tracking-widest uppercase">{title}</h2>
    </div>
  );
}

export default JobDetails;

