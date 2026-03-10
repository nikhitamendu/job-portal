
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import { toast } from "react-toastify";

// export default function CreateJob() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     employmentType: "",
//     workplaceType: "",
//     location: { city: "", country: "" },
//     salary: { min: "", max: "" },
//     experienceLevel: "",
//     skillsRequired: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes(".")) {
//       const [parent, child] = name.split(".");
//       setForm({ ...form, [parent]: { ...form[parent], [child]: value } });
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
//           .filter(Boolean),
//       };
//       await api.post("/jobs", payload);
//       toast.success("Job created successfully 🎉");
//       navigate("/recruiter/dashboard");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to create job");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100">

//       {/* ── Hero Banner ── */}
//       <div className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
//         <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />
//         <div className="relative z-10 max-w-3xl mx-auto px-6 py-8">
//           <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/35 rounded-full px-3.5 py-1.5 mb-3">
//             <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
//             <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
//               Recruiter
//             </span>
//           </div>
//           <h1 className="text-2xl font-extrabold text-white tracking-tight">
//             Post a New Job
//           </h1>
//           <p className="text-sm text-white/50 mt-1">
//             Fill in the details below to publish your job listing
//           </p>
//         </div>
//       </div>

//       {/* ── Form Card ── */}
//       <div className="max-w-3xl mx-auto px-6 py-8">
//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

//           <form onSubmit={handleSubmit}>

//             {/* ── Section: Basic Info ── */}
//             <Section title="Basic Information" icon="📋">
//               <Input
//                 label="Job Title"
//                 name="title"
//                 placeholder="e.g. Senior Frontend Engineer"
//                 value={form.title}
//                 onChange={handleChange}
//                 required
//               />
//               <Textarea
//                 label="Job Description"
//                 name="description"
//                 placeholder="Describe the role, responsibilities, and requirements…"
//                 value={form.description}
//                 onChange={handleChange}
//                 required
//               />
//             </Section>

//             <Divider />

//             {/* ── Section: Job Type ── */}
//             <Section title="Job Type" icon="💼">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <Select
//                   label="Employment Type"
//                   name="employmentType"
//                   value={form.employmentType}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select type</option>
//                   <option value="Full-time">Full-time</option>
//                   <option value="Part-time">Part-time</option>
//                   <option value="Internship">Internship</option>
//                   <option value="Contract">Contract</option>
//                 </Select>

//                 <Select
//                   label="Workplace Type"
//                   name="workplaceType"
//                   value={form.workplaceType}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select workplace</option>
//                   <option value="On-site">On-site</option>
//                   <option value="Remote">Remote</option>
//                   <option value="Hybrid">Hybrid</option>
//                 </Select>

//                 <Select
//                   label="Experience Level"
//                   name="experienceLevel"
//                   value={form.experienceLevel}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select level</option>
//                   <option value="Entry">Entry</option>
//                   <option value="Mid">Mid</option>
//                   <option value="Senior">Senior</option>
//                   <option value="Lead">Lead</option>
//                 </Select>
//               </div>
//             </Section>

//             <Divider />

//             {/* ── Section: Location ── */}
//             <Section title="Location" icon="📍">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <Input
//                   label="City"
//                   name="location.city"
//                   placeholder="e.g. Hyderabad"
//                   value={form.location.city}
//                   onChange={handleChange}
//                 />
//                 <Input
//                   label="Country"
//                   name="location.country"
//                   placeholder="e.g. India"
//                   value={form.location.country}
//                   onChange={handleChange}
//                 />
//               </div>
//             </Section>

//             <Divider />

//             {/* ── Section: Salary ── */}
//             <Section title="Salary Range" icon="💰">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <Input
//                   label="Minimum Salary (₹)"
//                   name="salary.min"
//                   placeholder="e.g. 500000"
//                   value={form.salary.min}
//                   onChange={handleChange}
//                   type="number"
//                 />
//                 <Input
//                   label="Maximum Salary (₹)"
//                   name="salary.max"
//                   placeholder="e.g. 1200000"
//                   value={form.salary.max}
//                   onChange={handleChange}
//                   type="number"
//                 />
//               </div>
//             </Section>

//             <Divider />

//             {/* ── Section: Skills ── */}
//             <Section title="Skills Required" icon="🛠">
//               <Input
//                 label="Skills (comma separated)"
//                 name="skillsRequired"
//                 placeholder="e.g. React, Node.js, MongoDB"
//                 value={form.skillsRequired}
//                 onChange={handleChange}
//               />
//               {/* Live skill preview */}
//               {form.skillsRequired && (
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {form.skillsRequired
//                     .split(",")
//                     .map((s) => s.trim())
//                     .filter(Boolean)
//                     .map((skill, i) => (
//                       <span
//                         key={i}
//                         className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                 </div>
//               )}
//             </Section>

//             {/* ── Submit ── */}
//             <div className="px-6 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
//               <p className="text-xs text-slate-400">
//                 Your job will be visible to all job seekers immediately after posting.
//               </p>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`flex-shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer
//                   ${loading
//                     ? "bg-slate-200 text-slate-400 cursor-not-allowed"
//                     : "bg-blue-700 text-white shadow-md shadow-blue-200 hover:bg-blue-800 hover:-translate-y-0.5 hover:shadow-lg"
//                   }`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     Creating…
//                   </>
//                 ) : (
//                   "Post Job →"
//                 )}
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════
//    REUSABLE COMPONENTS
// ═══════════════════════════════════════════ */

// function Section({ title, icon, children }) {
//   return (
//     <div className="px-6 py-5">
//       <div className="flex items-center gap-2 mb-4">
//         <span className="text-base">{icon}</span>
//         <h3 className="text-xs font-bold text-slate-500 tracking-widest uppercase">
//           {title}
//         </h3>
//       </div>
//       <div className="space-y-4">{children}</div>
//     </div>
//   );
// }

// function Divider() {
//   return <div className="border-t border-slate-100 mx-6" />;
// }

// function Input({ label, ...props }) {
//   return (
//     <div>
//       <label className="block text-xs font-bold text-slate-600 mb-1.5 tracking-wide">
//         {label}
//       </label>
//       <input
//         {...props}
//         className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-300 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100"
//       />
//     </div>
//   );
// }

// function Textarea({ label, ...props }) {
//   return (
//     <div>
//       <label className="block text-xs font-bold text-slate-600 mb-1.5 tracking-wide">
//         {label}
//       </label>
//       <textarea
//         {...props}
//         rows="4"
//         className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-300 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100 resize-none"
//       />
//     </div>
//   );
// }

// function Select({ label, children, ...props }) {
//   return (
//     <div>
//       <label className="block text-xs font-bold text-slate-600 mb-1.5 tracking-wide">
//         {label}
//       </label>
//       <select
//         {...props}
//         className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100 cursor-pointer"
//       >
//         {children}
//       </select>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

/* ─────────────────────────────────────────────
   FONTS — only fonts + keyframes
───────────────────────────────────────────── */
const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');
    *, *::before, *::after { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
    .mono { font-family: 'DM Mono', monospace; }

    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .anim-up { animation: fadeSlideUp 0.35s cubic-bezier(0.22,1,0.36,1) both; }
    .d1 { animation-delay: 0.04s; }
    .d2 { animation-delay: 0.09s; }
    .d3 { animation-delay: 0.14s; }
    .d4 { animation-delay: 0.19s; }
    .d5 { animation-delay: 0.24s; }
    .d6 { animation-delay: 0.29s; }
  `}</style>
);

/* ─────────────────────────────────────────────
   SHARED STYLES
───────────────────────────────────────────── */
const inputCls  = "w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100 transition";
const selectCls = "w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-100 transition cursor-pointer";

/* ─────────────────────────────────────────────
   INITIAL FORM STATE
───────────────────────────────────────────── */
const INITIAL = {
  title: "",
  description: "",
  employmentType: "",
  workplaceType: "",
  experienceLevel: "",
  location: { city: "", country: "" },
  salary: { min: "", max: "" },
  skillsRequired: "",
  applicationDeadline: "",
};

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function CreateJob() {
  const navigate      = useNavigate();
  const [form, setForm]       = useState(INITIAL);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setForm(f => ({ ...f, [parent]: { ...f[parent], [child]: value } }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        skillsRequired: form.skillsRequired
          .split(",")
          .map(s => s.trim())
          .filter(Boolean),
      };
      await api.post("/jobs", payload);
      toast.success("Job posted successfully.");
      navigate("/recruiter/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create job.");
    } finally {
      setLoading(false);
    }
  };

  /* derived */
  const skillTags = form.skillsRequired
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const completionFields = [
    form.title,
    form.description,
    form.employmentType,
    form.workplaceType,
    form.experienceLevel,
    form.location.city,
    form.skillsRequired,
  ];
  const filledCount = completionFields.filter(Boolean).length;
  const completionPct = Math.round((filledCount / completionFields.length) * 100);

  /* ════════════════ RENDER ════════════════ */
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <Fonts />

      {/* ══════════════════════════════
          HEADER
      ══════════════════════════════ */}
      <header className="bg-gradient-to-br from-[#050d1a] via-[#0a1f3d] to-[#0d2a50] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
            backgroundSize: "48px 48px"
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 py-8">

          {/* Back link */}
          <button
            onClick={() => navigate("/recruiter/dashboard")}
            className="inline-flex items-center gap-2 mono text-[11px] font-medium text-white/40 hover:text-white/70 transition-colors mb-5 group"
          >
            <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
            Dashboard
          </button>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="mono text-[10px] font-medium text-blue-400 tracking-widest uppercase">
                  New Listing
                </span>
              </div>
              <h1 className="text-xl font-semibold text-white tracking-tight">Post a Job</h1>
              <p className="mono text-[11px] text-white/35 mt-1">
                Visible to all candidates immediately after posting
              </p>
            </div>

            {/* Completion indicator */}
            <div className="flex-shrink-0 text-right">
              <p className="mono text-[10px] text-white/30 uppercase tracking-widest mb-1.5">Form completion</p>
              <div className="flex items-center gap-2.5">
                <div className="w-28 h-1 rounded-full overflow-hidden bg-white/10">
                  {/* dynamic width — must stay inline */}
                  <div className="h-full rounded-full bg-blue-400 transition-all duration-500"
                    style={{ width: `${completionPct}%` }} />
                </div>
                <span className="mono text-xs font-medium text-white/50">{completionPct}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════
          FORM
      ══════════════════════════════ */}
      <main className="max-w-3xl mx-auto px-6 md:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">

            {/* ── Card 1: Basic Info ── */}
            <FormCard label="Basic Information" delay="d1">
              <FormField label="Job Title" required>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Frontend Engineer"
                  className={inputCls}
                  required
                />
              </FormField>

              <FormField label="Description" required>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the role, responsibilities, and what you're looking for in a candidate…"
                  rows={5}
                  className={`${inputCls} resize-none`}
                  required
                />
              </FormField>
            </FormCard>

            {/* ── Card 2: Job Type ── */}
            <FormCard label="Job Type" delay="d2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="Employment Type">
                  <select name="employmentType" value={form.employmentType} onChange={handleChange} className={selectCls}>
                    <option value="">Select…</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                  </select>
                </FormField>

                <FormField label="Workplace Type">
                  <select name="workplaceType" value={form.workplaceType} onChange={handleChange} className={selectCls}>
                    <option value="">Select…</option>
                    <option>On-site</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                  </select>
                </FormField>

                <FormField label="Experience Level">
                  <select name="experienceLevel" value={form.experienceLevel} onChange={handleChange} className={selectCls}>
                    <option value="">Select…</option>
                    <option>Entry</option>
                    <option>Mid</option>
                    <option>Senior</option>
                    <option>Lead</option>
                  </select>
                </FormField>
              </div>

              {/* Type chips preview */}
              {(form.employmentType || form.workplaceType || form.experienceLevel) && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {form.employmentType && (
                    <span className="mono text-[10px] font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                      {form.employmentType}
                    </span>
                  )}
                  {form.workplaceType && (
                    <span className="mono text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                      {form.workplaceType}
                    </span>
                  )}
                  {form.experienceLevel && (
                    <span className="mono text-[10px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg">
                      {form.experienceLevel}
                    </span>
                  )}
                </div>
              )}
            </FormCard>

            {/* ── Card 3: Location ── */}
            <FormCard label="Location" delay="d3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="City">
                  <input
                    name="location.city"
                    value={form.location.city}
                    onChange={handleChange}
                    placeholder="e.g. Hyderabad"
                    className={inputCls}
                  />
                </FormField>
                <FormField label="Country">
                  <input
                    name="location.country"
                    value={form.location.country}
                    onChange={handleChange}
                    placeholder="e.g. India"
                    className={inputCls}
                  />
                </FormField>
              </div>
            </FormCard>

            {/* ── Card 4: Salary ── */}
            <FormCard label="Salary Range" delay="d4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Minimum (₹ / year)">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 mono text-sm text-slate-400 pointer-events-none">₹</span>
                    <input
                      type="number"
                      name="salary.min"
                      value={form.salary.min}
                      onChange={handleChange}
                      placeholder="500000"
                      className={`${inputCls} pl-8`}
                    />
                  </div>
                </FormField>
                <FormField label="Maximum (₹ / year)">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 mono text-sm text-slate-400 pointer-events-none">₹</span>
                    <input
                      type="number"
                      name="salary.max"
                      value={form.salary.max}
                      onChange={handleChange}
                      placeholder="1500000"
                      className={`${inputCls} pl-8`}
                    />
                  </div>
                </FormField>
              </div>

              {/* Salary preview */}
              {(form.salary.min || form.salary.max) && (
                <div className="flex items-center gap-2 mt-3">
                  <span className="mono text-[10px] text-slate-400 uppercase tracking-widest">Preview</span>
                  <span className="mono text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                    {form.salary.min ? `₹${(form.salary.min / 100000).toFixed(1)}L` : "—"}
                    {" – "}
                    {form.salary.max ? `₹${(form.salary.max / 100000).toFixed(1)}L` : "—"}
                    {" / yr"}
                  </span>
                </div>
              )}
            </FormCard>

            {/* ── Card 5: Skills ── */}
            <FormCard label="Skills Required" delay="d5">
              <FormField label="Skills" hint="Separate with commas">
                <input
                  name="skillsRequired"
                  value={form.skillsRequired}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB, TypeScript…"
                  className={inputCls}
                />
              </FormField>

              {skillTags.length > 0 && (
                <div className="mt-3">
                  <p className="mono text-[10px] text-slate-400 uppercase tracking-widest mb-2">Preview</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skillTags.map((s, i) => (
                      <span key={i}
                        className="mono text-[11px] font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </FormCard>

            {/* ── Card 6: Deadline ── */}
            <FormCard label="Application Deadline" delay="d6">
              <FormField label="Closing Date" hint="Optional">
                <input
                  type="date"
                  name="applicationDeadline"
                  value={form.applicationDeadline}
                  onChange={handleChange}
                  className={inputCls}
                />
              </FormField>
              {form.applicationDeadline && (
                <p className="mono text-[11px] text-slate-500 mt-2">
                  Applications close on{" "}
                  <span className="font-medium text-slate-700">
                    {new Date(form.applicationDeadline).toLocaleDateString("en-IN", {
                      day: "numeric", month: "long", year: "numeric"
                    })}
                  </span>
                </p>
              )}
            </FormCard>

            {/* ── Actions ── */}
            <div className="flex items-center justify-between pt-2 pb-4">
              <button
                type="button"
                onClick={() => navigate("/recruiter/dashboard")}
                className="inline-flex items-center gap-2 mono text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
                Discard & go back
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`inline-flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-xl transition-all ${
                  loading
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-slate-900 hover:bg-slate-800 text-white hover:-translate-y-0.5 hover:shadow-lg shadow-md"
                }`}
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    Posting…
                  </>
                ) : (
                  <>
                    Post Job
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7 7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
            </div>

          </div>
        </form>
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
function FormCard({ label, children, delay = "" }) {
  return (
    <div className={`bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-[0_4px_20px_-6px_rgba(0,0,0,0.07)] transition-all duration-200 anim-up ${delay}`}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
        <p className="mono text-[10px] font-medium text-slate-500 uppercase tracking-widest">{label}</p>
      </div>
      <div className="px-6 py-5 space-y-4">
        {children}
      </div>
    </div>
  );
}

function FormField({ label, hint, required, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="mono text-[11px] font-medium text-slate-500 uppercase tracking-wider">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        {hint && <span className="mono text-[10px] text-slate-400">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
