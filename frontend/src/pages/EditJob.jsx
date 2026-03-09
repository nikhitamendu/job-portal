// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";

// export default function EditJob() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchJob();
//   }, []);

//   const fetchJob = async () => {
//     try {
//       const { data } = await api.get(`/jobs/${id}`);
//       const job =data.job;
//       setForm({
//         ...data,
//         skillsRequired: data.skillsRequired?.join(", ") || ""
//       });
//     } catch (err) {
//   console.log("UPDATE ERROR:", err.response?.data);
//   toast.error(err.response?.data?.message || "Failed to update job");
// }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name.includes(".")) {
//       const [parent, child] = name.split(".");
//       setForm({
//         ...form,
//         [parent]: { ...form[parent], [child]: value }
//       });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const payload = {
//         ...form,
//         skillsRequired: form.skillsRequired
//           .split(",")
//           .map((s) => s.trim())
//           .filter(Boolean)
//       };

//       await api.put(`/jobs/${id}`, payload);

//       toast.success("Job updated successfully 🎉");
//       navigate("/recruiter/dashboard");

//     } catch (err) {
//       toast.error("Failed to update job");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!form) return <div className="p-10">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 py-10">
//       <div className="max-w-3xl mx-auto bg-white border rounded-xl p-6">

//         <h2 className="text-2xl font-bold mb-6">
//           Edit Job
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           <Input label="Job Title" name="title" value={form.title} onChange={handleChange} />

//           <Textarea label="Job Description" name="description" value={form.description} onChange={handleChange} />

//           <div className="grid grid-cols-2 gap-4">
//             <Input label="City" name="location.city" value={form.location?.city || ""} onChange={handleChange} />
//             <Input label="Country" name="location.country" value={form.location?.country || ""} onChange={handleChange} />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <Input label="Minimum Salary" name="salary.min" value={form.salary?.min || ""} onChange={handleChange} type="number" />
//             <Input label="Maximum Salary" name="salary.max" value={form.salary?.max || ""} onChange={handleChange} type="number" />
//           </div>

//           <Select name="experienceLevel" value={form.experienceLevel} onChange={handleChange}>
//             <option value="Entry">Entry</option>
//             <option value="Mid">Mid</option>
//             <option value="Senior">Senior</option>
//             <option value="Lead">Lead</option>
//           </Select>

//           <Input
//             label="Skills Required (comma separated)"
//             name="skillsRequired"
//             value={form.skillsRequired}
//             onChange={handleChange}
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 bg-blue-600 text-white rounded"
//           >
//             {loading ? "Updating..." : "Update Job"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

// /* Reusable Components */

// function Input({ label, ...props }) {
//   return (
//     <div>
//       <label className="text-sm text-gray-600">{label}</label>
//       <input {...props} className="w-full border px-3 py-2 rounded mt-1" />
//     </div>
//   );
// }

// function Textarea({ label, ...props }) {
//   return (
//     <div>
//       <label className="text-sm text-gray-600">{label}</label>
//       <textarea {...props} rows="4" className="w-full border px-3 py-2 rounded mt-1" />
//     </div>
//   );
// }

// function Select({ children, ...props }) {
//   return (
//     <div>
//       <label className="text-sm text-gray-600">Experience Level</label>
//       <select {...props} className="w-full border px-3 py-2 rounded mt-1">
//         {children}
//       </select>
//     </div>
//   );
// }
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const { data } = await api.get(`/jobs/${id}`);
      const job = data.job;
      setForm({
        ...data,
        skillsRequired: data.skillsRequired?.join(", ") || "",
      });
    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data);
      toast.error(err.response?.data?.message || "Failed to update job");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setForm({ ...form, [parent]: { ...form[parent], [child]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...form,
        skillsRequired: form.skillsRequired
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      await api.put(`/jobs/${id}`, payload);
      toast.success("Job updated successfully 🎉");
      navigate("/recruiter/dashboard");
    } catch (err) {
      toast.error("Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  /* ── Loading ── */
  if (!form)
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading job details…</span>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ── Hero Banner ── */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/35 rounded-full px-3.5 py-1.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-bold text-amber-300 tracking-widest uppercase">
              Edit Listing
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Update Job Post
          </h1>
          <p className="text-sm text-white/50 mt-1">
            {form.title ? `Editing: "${form.title}"` : "Make changes to your job listing"}
          </p>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <form onSubmit={handleSubmit}>

            {/* ── Section: Basic Info ── */}
            <Section title="Basic Information" icon="📋">
              <Input
                label="Job Title"
                name="title"
                placeholder="e.g. Senior Frontend Engineer"
                value={form.title || ""}
                onChange={handleChange}
              />
              <Textarea
                label="Job Description"
                name="description"
                placeholder="Describe the role, responsibilities, and requirements…"
                value={form.description || ""}
                onChange={handleChange}
              />
            </Section>

            <Divider />

            {/* ── Section: Job Type ── */}
            <Section title="Job Type" icon="💼">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Employment Type"
                  name="employmentType"
                  value={form.employmentType || ""}
                  onChange={handleChange}
                >
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </Select>

                <Select
                  label="Workplace Type"
                  name="workplaceType"
                  value={form.workplaceType || ""}
                  onChange={handleChange}
                >
                  <option value="">Select workplace</option>
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </Select>

                <Select
                  label="Experience Level"
                  name="experienceLevel"
                  value={form.experienceLevel || ""}
                  onChange={handleChange}
                >
                  <option value="">Select level</option>
                  <option value="Entry">Entry</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                </Select>
              </div>
            </Section>

            <Divider />

            {/* ── Section: Location ── */}
            <Section title="Location" icon="📍">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="City"
                  name="location.city"
                  placeholder="e.g. Hyderabad"
                  value={form.location?.city || ""}
                  onChange={handleChange}
                />
                <Input
                  label="Country"
                  name="location.country"
                  placeholder="e.g. India"
                  value={form.location?.country || ""}
                  onChange={handleChange}
                />
              </div>
            </Section>

            <Divider />

            {/* ── Section: Salary ── */}
            <Section title="Salary Range" icon="💰">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Minimum Salary (₹)"
                  name="salary.min"
                  placeholder="e.g. 500000"
                  value={form.salary?.min || ""}
                  onChange={handleChange}
                  type="number"
                />
                <Input
                  label="Maximum Salary (₹)"
                  name="salary.max"
                  placeholder="e.g. 1200000"
                  value={form.salary?.max || ""}
                  onChange={handleChange}
                  type="number"
                />
              </div>
            </Section>

            <Divider />

            {/* ── Section: Skills ── */}
            <Section title="Skills Required" icon="🛠">
              <Input
                label="Skills (comma separated)"
                name="skillsRequired"
                placeholder="e.g. React, Node.js, MongoDB"
                value={form.skillsRequired || ""}
                onChange={handleChange}
              />
              {/* Live skill preview */}
              {form.skillsRequired && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.skillsRequired
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              )}
            </Section>

            {/* ── Submit Footer ── */}
            <div className="px-6 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate("/recruiter/dashboard")}
                className="text-sm font-semibold text-slate-500 hover:text-slate-700 transition cursor-pointer"
              >
                ← Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer
                  ${loading
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-blue-700 text-white shadow-md shadow-blue-200 hover:bg-blue-800 hover:-translate-y-0.5 hover:shadow-lg"
                  }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating…
                  </>
                ) : (
                  "Save Changes →"
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   REUSABLE COMPONENTS
═══════════════════════════════════════════ */

function Section({ title, icon, children }) {
  return (
    <div className="px-6 py-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">{icon}</span>
        <h3 className="text-xs font-bold text-slate-500 tracking-widest uppercase">
          {title}
        </h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-slate-100 mx-6" />;
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5 tracking-wide">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-300 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5 tracking-wide">
        {label}
      </label>
      <textarea
        {...props}
        rows="4"
        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-300 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100 resize-none"
      />
    </div>
  );
}

function Select({ label, children, ...props }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5 tracking-wide">
        {label}
      </label>
      <select
        {...props}
        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100 cursor-pointer"
      >
        {children}
      </select>
    </div>
  );
}
