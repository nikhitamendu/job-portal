// import { useState, useEffect } from "react";
// import axios from "../services/api";
// import { toast } from "react-toastify";

// export default function Profile() {
//   const [profile, setProfile] = useState(null);
//   const [completion, setCompletion] = useState(0);

//   const [editBasic, setEditBasic] = useState(false);
//   const [editSkills, setEditSkills] = useState(false);
//   const [editExperience, setEditExperience] = useState(false);
//   const [editEducation, setEditEducation] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     const { data } = await axios.get("/users/profile");
//     setProfile(data.user);
//     setCompletion(data.completion);
//   };

//   if (!profile)
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="flex items-center gap-3 text-slate-400">
//           <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
//           <span className="text-sm font-medium">Loading profile…</span>
//         </div>
//       </div>
//     );

//   const isRecruiter = profile.role === "recruiter";

//   /* ── SAVE FUNCTIONS ── */
//   const updateProfile = async (updatedFields) => {
//     const { data } = await axios.put("/users/profile", updatedFields);
//     setProfile(data.user);
//     setCompletion(data.completion);
//   };

//   /* ── RESUME ── */
//   const handleResumeUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const isReplace = !!profile.resumeFileId;
//     try {
//       const formData = new FormData();
//       formData.append("resume", file);
//       await axios.post("/users/upload-resume", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       await fetchProfile();
//       toast.success(isReplace ? "Resume replaced successfully!" : "Resume uploaded successfully!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to upload resume.");
//     } finally {
//       e.target.value = null;
//     }
//   };

//   const handleDeleteResume = async () => {
//     try {
//       await axios.delete("/users/delete-resume");
//       await fetchProfile();
//       toast.success("Resume deleted successfully.");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to delete resume.");
//     }
//   };

//   /* ── DELETE GENERIC ── */
//   const handleDeleteItem = async (field, index) => {
//     const updated = profile[field].filter((_, i) => i !== index);
//     await updateProfile({ [field]: updated });
//   };

//   /* ── PROFILE PICTURE ── */
//   const handleProfilePicUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("profilePic", file);
//     await axios.post("/users/upload-profile-pic", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     await fetchProfile();
//     e.target.value = null;
//   };

//   const handleDeleteProfilePic = async () => {
//     await axios.delete("/users/delete-profile-pic");
//     await fetchProfile();
//   };

//   /* ── UI ── */
//   return (
//     <div className="min-h-screen bg-slate-100">

//       {/* ── TOP HERO BANNER ── */}
//       <div className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
//         <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

//         <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">

//             {/* Avatar */}
//             <div className="relative flex-shrink-0">
//               {profile.profilePicFileId ? (
//                 <img
//                   src={`http://localhost:5000/api/users/file/${profile.profilePicFileId}`}
//                   alt="Profile"
//                   className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20"
//                 />
//               ) : (
//                 <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-3xl font-extrabold border-2 border-white/10">
//                   {profile.name?.[0] || "U"}
//                 </div>
//               )}
//               <label className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer text-xs text-slate-600 hover:bg-slate-100 transition">
//                 ✎
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleProfilePicUpload}
//                   className="hidden"
//                 />
//               </label>
//             </div>

//             {/* Info */}
//             <div className="flex-1">
//               <h1 className="text-2xl font-extrabold text-white tracking-tight">
//                 {profile.name}
//               </h1>
//               <p className="text-sm text-white/50 mt-0.5 capitalize">
//                 {isRecruiter
//                   ? `Recruiter${profile.companyName ? ` · ${profile.companyName}` : ""}`
//                   : `Job Seeker${profile.location ? ` · ${profile.location}` : ""}`}
//               </p>

//               {/* Completion bar */}
//               <div className="mt-3 max-w-xs">
//                 <div className="flex justify-between text-xs mb-1">
//                   <span className="text-white/50 font-medium">Profile Completion</span>
//                   <span className="text-white font-bold">{completion}%</span>
//                 </div>
//                 <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-500"
//                     style={{ width: `${completion}%` }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex items-center gap-2 flex-shrink-0">
//               {profile.profilePicFileId && (
//                 <button
//                   onClick={handleDeleteProfilePic}
//                   className="text-xs text-red-400 hover:text-red-300 font-medium transition px-3 py-1.5 rounded-lg border border-red-400/30 hover:bg-red-400/10"
//                 >
//                   Remove Photo
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── BODY ── */}
//       <div className="max-w-6xl mx-auto px-6 py-8">
//         <div className="grid md:grid-cols-3 gap-6">

//           {/* ── LEFT SIDEBAR ── */}
//           <div className="space-y-4">

//             {/* Contact Card */}
//             <Card title="Contact Info">
//               <div className="space-y-2.5">
//                 <InfoRow icon="✉️" label="Email"    value={profile.email    || "—"} />
//                 <InfoRow icon="📞" label="Phone"    value={profile.phone    || "—"} />
//                 {/* Location only relevant for job seekers */}
//                 {!isRecruiter && (
//                   <InfoRow icon="📍" label="Location" value={profile.location || "—"} />
//                 )}
//               </div>
//             </Card>

//             {/* ✅ Quick Stats — only for job seekers */}
//             {!isRecruiter && (
//               <div className="grid grid-cols-2 gap-3">
//                 {[
//                   { num: profile.skills?.length    || 0,  lbl: "Skills"     },
//                   { num: profile.experience?.length || 0, lbl: "Experience" },
//                   { num: profile.education?.length  || 0, lbl: "Education"  },
//                   { num: profile.resumeFileId ? 1   : 0,  lbl: "Resume"     },
//                 ].map(({ num, lbl }) => (
//                   <div
//                     key={lbl}
//                     className="bg-white rounded-xl border border-slate-200 p-3 text-center shadow-sm"
//                   >
//                     <div className="text-xl font-extrabold text-slate-900 tracking-tight">{num}</div>
//                     <div className="text-xs text-slate-400 font-medium mt-0.5">{lbl}</div>
//                   </div>
//                 ))}
//               </div>
//             )}

//           </div>

//           {/* ── RIGHT MAIN ── */}
//           <div className="md:col-span-2 space-y-5">

//             {/* RECRUITER: Company Info */}
//             {isRecruiter && (
//               <Card title="Company Information" onEdit={() => setEditBasic(true)}>
//                 <div className="grid sm:grid-cols-2 gap-3">
//                   <Info label="Company Name"     value={profile.companyName        || "—"} />
//                   <Info label="Industry"         value={profile.industry           || "—"} />
//                   <Info label="Company Size"     value={profile.companySize        || "—"} />
//                   <Info label="Company Location" value={profile.companyLocation    || "—"} />
//                   <Info label="Website"          value={profile.companyWebsite     || "—"} />
//                   <Info label="Description"      value={profile.companyDescription || "—"} />
//                 </div>
//               </Card>
//             )}

//             {/* JOB SEEKER sections */}
//             {!isRecruiter && (
//               <>
//                 {/* Skills */}
//                 <Card title="Skills" onEdit={() => setEditSkills(true)}>
//                   {profile.skills?.length === 0 ? (
//                     <Empty text="No skills added yet" />
//                   ) : (
//                     <div className="flex flex-wrap gap-2">
//                       {profile.skills.map((skill, i) => (
//                         <div
//                           key={i}
//                           className="group flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
//                         >
//                           {skill}
//                           <button
//                             onClick={() => handleDeleteItem("skills", i)}
//                             className="hidden group-hover:inline text-blue-400 hover:text-red-500 transition text-xs leading-none cursor-pointer"
//                           >
//                             ✕
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </Card>

//                 {/* Experience */}
//                 <Card
//                   title="Experience"
//                   onEdit={() => { setEditingIndex(null); setEditExperience(true); }}
//                 >
//                   {profile.experience?.length === 0 ? (
//                     <Empty text="No experience added yet" />
//                   ) : (
//                     <div className="space-y-1">
//                       {profile.experience.map((e, i) => (
//                         <ItemRow
//                           key={i}
//                           primary={e.role}
//                           secondary={`${e.company} · ${e.duration}`}
//                           onEdit={() => { setEditingIndex(i); setEditExperience(true); }}
//                           onDelete={() => handleDeleteItem("experience", i)}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </Card>

//                 {/* Education */}
//                 <Card
//                   title="Education"
//                   onEdit={() => { setEditingIndex(null); setEditEducation(true); }}
//                 >
//                   {profile.education?.length === 0 ? (
//                     <Empty text="No education added yet" />
//                   ) : (
//                     <div className="space-y-1">
//                       {profile.education.map((e, i) => (
//                         <ItemRow
//                           key={i}
//                           primary={e.degree}
//                           secondary={`${e.institute} · ${e.year}`}
//                           onEdit={() => { setEditingIndex(i); setEditEducation(true); }}
//                           onDelete={() => handleDeleteItem("education", i)}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </Card>

//                 {/* Resume */}
//                 <Card title="Resume">
//                   {profile.resumeFileId ? (
//                     <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-xl mb-3">
//                       <div className="flex items-center gap-2.5">
//                         <span className="text-emerald-600 text-lg">📄</span>
//                         <span className="text-sm font-semibold text-emerald-700">
//                           Resume Uploaded
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm">
//                         <a
//                           href={`http://localhost:5000/api/users/file/${profile.resumeFileId}`}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
//                         >
//                           👁 View
//                         </a>
//                         <button
//                           onClick={handleDeleteResume}
//                           className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
//                         >
//                           🗑 Delete
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <Empty text="No resume uploaded yet" />
//                   )}

//                   <label className="mt-2 inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer transition shadow-sm shadow-blue-200">
//                     📎 {profile.resumeFileId ? "Replace Resume" : "Upload Resume"}
//                     <input
//                       type="file"
//                       accept=".pdf,.doc,.docx"
//                       onChange={handleResumeUpload}
//                       className="hidden"
//                     />
//                   </label>
//                 </Card>
//               </>
//             )}

//           </div>
//         </div>
//       </div>

//       {/* ── MODALS ── */}
//       {editBasic && (
//         <BasicModal
//           data={profile}
//           onClose={() => setEditBasic(false)}
//           onSave={(data) => { updateProfile(data); setEditBasic(false); }}
//         />
//       )}

//       {!isRecruiter && editSkills && (
//         <SkillsModal
//           data={profile.skills}
//           onClose={() => setEditSkills(false)}
//           onSave={(skills) => { updateProfile({ skills }); setEditSkills(false); }}
//         />
//       )}

//       {!isRecruiter && editExperience && (
//         <ExperienceModal
//           data={editingIndex !== null ? profile.experience[editingIndex] : null}
//           onClose={() => setEditExperience(false)}
//           onSave={(form) => {
//             let updated = [...profile.experience];
//             if (editingIndex !== null) updated[editingIndex] = form;
//             else updated.push(form);
//             updateProfile({ experience: updated });
//             setEditExperience(false);
//             setEditingIndex(null);
//           }}
//         />
//       )}

//       {!isRecruiter && editEducation && (
//         <EducationModal
//           data={editingIndex !== null ? profile.education[editingIndex] : null}
//           onClose={() => setEditEducation(false)}
//           onSave={(form) => {
//             let updated = [...profile.education];
//             if (editingIndex !== null) updated[editingIndex] = form;
//             else updated.push(form);
//             updateProfile({ education: updated });
//             setEditEducation(false);
//             setEditingIndex(null);
//           }}
//         />
//       )}
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════
//    REUSABLE COMPONENTS
// ═══════════════════════════════════════════ */

// function Card({ title, children, onEdit }) {
//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
//           {title}
//         </h3>
//         {onEdit && (
//           <button
//             onClick={onEdit}
//             className="inline-flex items-center gap-1 text-xs text-blue-700 font-bold bg-blue-50 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
//           >
//             + Add / Edit
//           </button>
//         )}
//       </div>
//       {children}
//     </div>
//   );
// }

// function Info({ label, value }) {
//   return (
//     <div>
//       <p className="text-xs text-slate-400 font-medium mb-0.5">{label}</p>
//       <p className="text-sm text-slate-800 font-medium">{value}</p>
//     </div>
//   );
// }

// function InfoRow({ icon, label, value }) {
//   return (
//     <div className="flex items-start gap-2.5">
//       <span className="text-base mt-0.5 flex-shrink-0">{icon}</span>
//       <div>
//         <p className="text-xs text-slate-400 font-medium">{label}</p>
//         <p className="text-sm text-slate-700 font-medium">{value}</p>
//       </div>
//     </div>
//   );
// }

// function Empty({ text }) {
//   return <p className="text-sm text-slate-400 italic py-1">{text}</p>;
// }

// function ItemRow({ primary, secondary, onEdit, onDelete }) {
//   return (
//     <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
//       <div>
//         <p className="text-sm font-semibold text-slate-800">{primary}</p>
//         <p className="text-xs text-slate-400 mt-0.5">{secondary}</p>
//       </div>
//       <div className="flex items-center gap-2 flex-shrink-0 ml-4">
//         {onEdit && (
//           <button
//             onClick={onEdit}
//             className="inline-flex items-center gap-1 text-xs text-blue-700 font-semibold bg-blue-50 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
//           >
//             ✏️ Edit
//           </button>
//         )}
//         <button
//           onClick={onDelete}
//           className="inline-flex items-center gap-1 text-xs text-red-600 font-semibold bg-red-50 border border-red-100 hover:bg-red-100 hover:border-red-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
//         >
//           🗑 Delete
//         </button>
//       </div>
//     </div>
//   );
// }

// function Modal({ title, children, onClose, onSave }) {
//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
//         <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
//           <h2 className="text-base font-bold text-slate-900">{title}</h2>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
//           >
//             ✕
//           </button>
//         </div>
//         <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
//           {children}
//         </div>
//         <div className="flex justify-end gap-2.5 px-6 py-4 border-t border-slate-100 bg-slate-50">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition cursor-pointer"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onSave}
//             className="px-4 py-2 text-sm font-bold text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition shadow-sm shadow-blue-200 cursor-pointer"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function BasicModal({ data, onClose, onSave }) {
//   const [form, setForm] = useState(data);
//   useEffect(() => { setForm(data); }, [data]);
//   const isRecruiter = form.role === "recruiter";

//   return (
//     <Modal title="Edit Profile" onClose={onClose} onSave={() => onSave(form)}>
//       <Input
//         label="Name"
//         value={form.name || ""}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />
//       {!isRecruiter && (
//         <>
//           <Input label="Location" value={form.location || ""} onChange={(e) => setForm({ ...form, location: e.target.value })} />
//           <Input label="Phone"    value={form.phone    || ""} onChange={(e) => setForm({ ...form, phone:    e.target.value })} />
//         </>
//       )}
//       {isRecruiter && (
//         <>
//           <Input label="Company Name"     value={form.companyName        || ""} onChange={(e) => setForm({ ...form, companyName:        e.target.value })} />
//           <Input label="Industry"         value={form.industry           || ""} onChange={(e) => setForm({ ...form, industry:           e.target.value })} />
//           <Input label="Company Size"     value={form.companySize        || ""} onChange={(e) => setForm({ ...form, companySize:        e.target.value })} />
//           <Input label="Company Location" value={form.companyLocation    || ""} onChange={(e) => setForm({ ...form, companyLocation:    e.target.value })} />
//           <Input label="Company Website"  value={form.companyWebsite     || ""} onChange={(e) => setForm({ ...form, companyWebsite:     e.target.value })} />
//           <Input label="Description"      value={form.companyDescription || ""} onChange={(e) => setForm({ ...form, companyDescription: e.target.value })} />
//         </>
//       )}
//     </Modal>
//   );
// }

// function SkillsModal({ data, onClose, onSave }) {
//   const [value, setValue] = useState("");
//   useEffect(() => { setValue((data || []).join(", ")); }, [data]);

//   return (
//     <Modal
//       title="Edit Skills"
//       onClose={onClose}
//       onSave={() => onSave(value.split(",").map((s) => s.trim()).filter(Boolean))}
//     >
//       <Input
//         label="Skills (comma separated)"
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//       />
//     </Modal>
//   );
// }

// function ExperienceModal({ data, onClose, onSave }) {
//   const [form, setForm] = useState({ role: "", company: "", duration: "", desc: "" });
//   useEffect(() => { if (data) setForm(data); else setForm({ role: "", company: "", duration: "", desc: "" }); }, [data]);

//   return (
//     <Modal title={data ? "Edit Experience" : "Add Experience"} onClose={onClose} onSave={() => onSave(form)}>
//       <Input label="Role"        value={form.role}     onChange={(e) => setForm({ ...form, role:     e.target.value })} />
//       <Input label="Company"     value={form.company}  onChange={(e) => setForm({ ...form, company:  e.target.value })} />
//       <Input label="Duration"    value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
//       <Input label="Description" value={form.desc}     onChange={(e) => setForm({ ...form, desc:     e.target.value })} />
//     </Modal>
//   );
// }

// function EducationModal({ data, onClose, onSave }) {
//   const [form, setForm] = useState({ degree: "", institute: "", year: "" });
//   useEffect(() => { if (data) setForm(data); else setForm({ degree: "", institute: "", year: "" }); }, [data]);

//   return (
//     <Modal title={data ? "Edit Education" : "Add Education"} onClose={onClose} onSave={() => onSave(form)}>
//       <Input label="Degree"    value={form.degree}    onChange={(e) => setForm({ ...form, degree:    e.target.value })} />
//       <Input label="Institute" value={form.institute} onChange={(e) => setForm({ ...form, institute: e.target.value })} />
//       <Input label="Year"      value={form.year}      onChange={(e) => setForm({ ...form, year:      e.target.value })} />
//     </Modal>
//   );
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
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import axios from "../services/api";
import { toast } from "react-toastify";

/* ─── Google Font import via @import in a style tag ─── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

    * { font-family: 'Sora', sans-serif; }
    .mono { font-family: 'JetBrains Mono', monospace; }

    :root {
      --bg: #f0f4f8;
      --surface: #ffffff;
      --border: #e2e8f0;
      --text: #0f172a;
      --muted: #64748b;
      --accent: #2563eb;
      --accent-light: #eff6ff;
      --accent-border: #bfdbfe;
      --success: #059669;
      --success-light: #ecfdf5;
      --danger: #dc2626;
      --danger-light: #fef2f2;
      --hero-from: #0c1a2e;
      --hero-to: #0f2d52;
    }

    .profile-root { background: var(--bg); min-height: 100vh; }

    /* Hero */
    .hero {
      background: linear-gradient(135deg, var(--hero-from) 0%, var(--hero-to) 60%, #1a3a6e 100%);
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 80% 60% at 70% 40%, rgba(37,99,235,0.18) 0%, transparent 70%),
                  radial-gradient(ellipse 40% 40% at 10% 80%, rgba(99,102,241,0.12) 0%, transparent 60%);
    }
    .hero-grid {
      position: absolute; inset: 0;
      background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 40px 40px;
    }
    .hero-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 2.5rem 2rem 3rem; }

    /* Avatar */
    .avatar-wrap { position: relative; flex-shrink: 0; }
    .avatar-img {
      width: 96px; height: 96px; border-radius: 20px;
      object-fit: cover; border: 3px solid rgba(255,255,255,0.15);
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }
    .avatar-placeholder {
      width: 96px; height: 96px; border-radius: 20px;
      background: linear-gradient(135deg, #2563eb, #4f46e5);
      display: flex; align-items: center; justify-content: center;
      font-size: 2.2rem; font-weight: 800; color: white;
      border: 3px solid rgba(255,255,255,0.15);
      box-shadow: 0 8px 32px rgba(37,99,235,0.4);
    }
    .avatar-edit-btn {
      position: absolute; bottom: -8px; right: -8px;
      width: 28px; height: 28px; background: white; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      color: #334155; transition: transform 0.15s;
    }
    .avatar-edit-btn:hover { transform: scale(1.1); }

    /* Badge */
    .role-badge {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
      padding: 4px 10px; border-radius: 6px; margin-bottom: 6px;
    }
    .role-badge.jobseeker { background: rgba(37,99,235,0.2); color: #93c5fd; border: 1px solid rgba(37,99,235,0.3); }
    .role-badge.recruiter { background: rgba(5,150,105,0.2); color: #6ee7b7; border: 1px solid rgba(5,150,105,0.3); }

    /* Progress bar */
    .progress-wrap { margin-top: 14px; max-width: 280px; }
    .progress-labels { display: flex; justify-content: space-between; margin-bottom: 5px; }
    .progress-track { height: 5px; background: rgba(255,255,255,0.12); border-radius: 99px; overflow: hidden; }
    .progress-fill {
      height: 100%; border-radius: 99px;
      background: linear-gradient(90deg, #3b82f6, #818cf8);
      transition: width 0.8s cubic-bezier(0.34,1.56,0.64,1);
    }

    /* Tab nav */
    .tab-nav { background: var(--surface); border-bottom: 1px solid var(--border); }
    .tab-nav-inner { max-width: 1100px; margin: 0 auto; padding: 0 2rem; display: flex; gap: 0; }
    .tab-btn {
      padding: 14px 20px; font-size: 13px; font-weight: 600; color: var(--muted);
      border: none; background: none; cursor: pointer;
      border-bottom: 2px solid transparent; transition: all 0.15s; display: flex; align-items: center; gap: 7px;
    }
    .tab-btn:hover { color: var(--text); }
    .tab-btn.active { color: var(--accent); border-bottom-color: var(--accent); }

    /* Body */
    .body-inner { max-width: 1100px; margin: 0 auto; padding: 2rem; }
    .body-grid { display: grid; grid-template-columns: 280px 1fr; gap: 1.5rem; }
    @media (max-width: 768px) { .body-grid { grid-template-columns: 1fr; } }

    /* Card */
    .card {
      background: var(--surface); border-radius: 16px;
      border: 1px solid var(--border); padding: 1.5rem;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }
    .card + .card { margin-top: 1rem; }
    .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
    .card-title {
      font-size: 11px; font-weight: 700; color: var(--muted);
      letter-spacing: 0.1em; text-transform: uppercase;
    }

    /* Buttons */
    .btn-edit {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: 12px; font-weight: 600; color: var(--accent);
      background: var(--accent-light); border: 1px solid var(--accent-border);
      padding: 5px 12px; border-radius: 8px; cursor: pointer; transition: all 0.15s;
    }
    .btn-edit:hover { background: #dbeafe; }
    .btn-danger {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: 12px; font-weight: 600; color: var(--danger);
      background: var(--danger-light); border: 1px solid #fecaca;
      padding: 5px 12px; border-radius: 8px; cursor: pointer; transition: all 0.15s;
    }
    .btn-danger:hover { background: #fee2e2; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 13px; font-weight: 700; color: white;
      background: var(--accent); border: none;
      padding: 9px 18px; border-radius: 10px; cursor: pointer; transition: all 0.15s;
      box-shadow: 0 2px 8px rgba(37,99,235,0.25);
    }
    .btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); }
    .btn-secondary {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 13px; font-weight: 600; color: var(--muted);
      background: white; border: 1px solid var(--border);
      padding: 9px 18px; border-radius: 10px; cursor: pointer; transition: all 0.15s;
    }
    .btn-secondary:hover { background: var(--bg); }

    /* Skill chips */
    .skill-chip {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--accent-light); border: 1px solid var(--accent-border);
      color: #1d4ed8; font-size: 12px; font-weight: 600;
      padding: 5px 12px; border-radius: 20px; transition: all 0.15s;
    }
    .skill-chip:hover { background: #dbeafe; }
    .skill-chip .del { cursor: pointer; color: #93c5fd; font-size: 11px; transition: color 0.15s; }
    .skill-chip .del:hover { color: var(--danger); }

    /* Timeline items */
    .timeline-item {
      display: flex; gap: 14px; padding: 12px 0;
      border-bottom: 1px solid var(--border);
    }
    .timeline-item:last-child { border-bottom: none; }
    .timeline-dot {
      width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; margin-top: 2px;
    }
    .timeline-dot.work { background: #eff6ff; }
    .timeline-dot.edu { background: #f0fdf4; }
    .timeline-actions { display: flex; gap: 6px; align-items: flex-start; flex-shrink: 0; }

    /* Contact row */
    .contact-row { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--border); }
    .contact-row:last-child { border-bottom: none; }
    .contact-icon {
      width: 32px; height: 32px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px; flex-shrink: 0;
    }

    /* Stat boxes */
    .stat-box {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 12px; padding: 14px; text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .stat-num { font-size: 22px; font-weight: 800; color: var(--text); }
    .stat-lbl { font-size: 11px; font-weight: 600; color: var(--muted); margin-top: 2px; }

    /* Resume box */
    .resume-box {
      display: flex; align-items: center; justify-content: space-between;
      background: var(--success-light); border: 1px solid #a7f3d0;
      border-radius: 12px; padding: 12px 16px; margin-bottom: 12px;
    }

    /* Company info grid */
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    @media (max-width: 500px) { .info-grid { grid-template-columns: 1fr; } }
    .info-field { }
    .info-field-label { font-size: 11px; font-weight: 600; color: var(--muted); margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.06em; }
    .info-field-value { font-size: 14px; font-weight: 500; color: var(--text); }

    /* Modal */
    .modal-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.55);
      backdrop-filter: blur(4px); z-index: 50;
      display: flex; align-items: center; justify-content: center; padding: 1rem;
    }
    .modal-box {
      background: white; border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      border: 1px solid var(--border); width: 100%; max-width: 480px;
      overflow: hidden;
      animation: modalIn 0.2s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes modalIn {
      from { opacity: 0; transform: scale(0.93) translateY(10px); }
      to   { opacity: 1; transform: scale(1)    translateY(0);    }
    }
    .modal-header { padding: 20px 24px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
    .modal-title { font-size: 16px; font-weight: 700; color: var(--text); }
    .modal-close { width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--border); background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; color: var(--muted); transition: all 0.15s; }
    .modal-close:hover { background: var(--bg); color: var(--text); }
    .modal-body { padding: 20px 24px; max-height: 60vh; overflow-y: auto; display: flex; flex-direction: column; gap: 14px; }
    .modal-footer { padding: 16px 24px; border-top: 1px solid var(--border); background: var(--bg); display: flex; justify-content: flex-end; gap: 10px; }

    /* Input */
    .field-label { font-size: 12px; font-weight: 700; color: #374151; margin-bottom: 5px; display: block; }
    .field-input {
      width: 100%; padding: 10px 14px; font-size: 14px;
      border: 1.5px solid var(--border); border-radius: 10px;
      background: var(--bg); color: var(--text);
      outline: none; transition: all 0.15s; box-sizing: border-box;
    }
    .field-input:focus { border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
    .field-textarea { resize: vertical; min-height: 80px; }

    /* Empty state */
    .empty { padding: 20px 0; text-align: center; color: var(--muted); font-size: 13px; font-style: italic; }

    /* Recruiter stats bar */
    .recruiter-stat {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 14px; border-radius: 10px; background: var(--bg);
      border: 1px solid var(--border); margin-bottom: 8px;
    }
    .recruiter-stat:last-child { margin-bottom: 0; }

    /* fade-up animation for sections */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.35s ease both; }
    .fade-up-1 { animation-delay: 0.05s; }
    .fade-up-2 { animation-delay: 0.1s; }
    .fade-up-3 { animation-delay: 0.15s; }
    .fade-up-4 { animation-delay: 0.2s; }
    .fade-up-5 { animation-delay: 0.25s; }

    /* Social links */
    .social-link {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 12px; font-weight: 600; color: var(--accent);
      text-decoration: none; padding: 5px 10px;
      background: var(--accent-light); border: 1px solid var(--accent-border);
      border-radius: 8px; transition: all 0.15s;
    }
    .social-link:hover { background: #dbeafe; }
  `}</style>
);

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [completion, setCompletion] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  /* Modal states */
  const [modal, setModal] = useState(null); // 'basic' | 'skills' | 'experience' | 'education' | 'social' | 'company'
  const [editingIndex, setEditingIndex] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get("/notifications");
      setNotifications(data.notifications);
    } catch (err) {
      console.error("Error fetching activity:", err);
    }
  };

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("/users/profile");
      setProfile(data.user);
      setCompletion(data.completion);
      fetchNotifications();
    } catch {
      toast.error("Failed to load profile.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 20, height: 20, border: "2.5px solid #2563eb", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <span style={{ color: "#64748b", fontSize: 14, fontWeight: 500 }}>Loading profile…</span>
      </div>
    </div>
  );

  const isRecruiter = profile.role === "recruiter";

  const updateProfile = async (fields) => {
    try {
      const { data } = await axios.put("/users/profile", fields);
      setProfile(data.user);
      setCompletion(data.completion);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed.");
    }
  };

  /* File handlers */
  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const fd = new FormData(); fd.append("profilePic", file);
    try {
      await axios.post("/users/upload-profile-pic", fd, { headers: { "Content-Type": "multipart/form-data" } });
      await fetchProfile(); toast.success("Photo updated!");
    } catch { toast.error("Photo upload failed."); }
    e.target.value = null;
  };
  const handleDeleteProfilePic = async () => {
    try { await axios.delete("/users/delete-profile-pic"); await fetchProfile(); toast.success("Photo removed."); }
    catch { toast.error("Failed to remove photo."); }
  };
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const fd = new FormData(); fd.append("resume", file);
    try {
      await axios.post("/users/upload-resume", fd, { headers: { "Content-Type": "multipart/form-data" } });
      await fetchProfile(); toast.success(profile.resumeFileId ? "Resume replaced!" : "Resume uploaded!");
    } catch (err) { toast.error(err.response?.data?.message || "Upload failed."); }
    e.target.value = null;
  };
  const handleDeleteResume = async () => {
    try { await axios.delete("/users/delete-resume"); await fetchProfile(); toast.success("Resume deleted."); }
    catch { toast.error("Failed to delete resume."); }
  };
  const handleDeleteItem = async (field, index) => {
    const updated = profile[field].filter((_, i) => i !== index);
    await updateProfile({ [field]: updated });
  };

  /* Tabs */
  const jobseekerTabs = [
    { id: "overview", label: "Overview", icon: "◉" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "resume", label: "Resume", icon: "📄" },
    { id: "activity", label: "Activity", icon: "📊" },
  ];
  const recruiterTabs = [
    { id: "overview", label: "Overview", icon: "◉" },
    { id: "company", label: "Company", icon: "🏢" },
    { id: "activity", label: "Activity", icon: "📊" },
  ];
  const tabs = isRecruiter ? recruiterTabs : jobseekerTabs;

  return (
    <div className="profile-root">
      <FontStyle />

      {/* ══ HERO ══ */}
      <div className="hero">
        <div className="hero-grid" />
        <div className="hero-inner">
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>

            {/* Avatar */}
            <div className="avatar-wrap">
              {profile.profilePicFileId ? (
                <img
                  src={`http://localhost:5000/api/users/file/${profile.profilePicFileId}`}
                  alt="Profile"
                  className="avatar-img"
                />
              ) : (
                <div className="avatar-placeholder">{profile.name?.[0]?.toUpperCase() || "U"}</div>
              )}
              <label className="avatar-edit-btn" title="Change photo">
                ✎
                <input type="file" accept="image/*" onChange={handleProfilePicUpload} style={{ display: "none" }} />
              </label>
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <div className={`role-badge ${isRecruiter ? "recruiter" : "jobseeker"}`}>
                {isRecruiter ? "🏢 Recruiter" : "👤 Job Seeker"}
              </div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: "white", margin: 0, lineHeight: 1.2 }}>
                {profile.name}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, marginTop: 4, fontWeight: 500 }}>
                {isRecruiter
                  ? `${profile.jobTitle || "Recruiter"}${profile.companyName ? " · " + profile.companyName : ""}${profile.companyLocation ? " · " + profile.companyLocation : ""}`
                  : `${profile.jobTitle || "Professional"}${profile.city ? " · " + profile.city : ""}${profile.country ? ", " + profile.country : ""}`}
              </p>

              {/* Social quick links */}
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                {profile.linkedin && (
                  <a href={profile.linkedin.startsWith("http") ? profile.linkedin : `https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="social-link">🔗 LinkedIn</a>
                )}
                {profile.portfolio && (
                  <a href={profile.portfolio.startsWith("http") ? profile.portfolio : `https://${profile.portfolio}`} target="_blank" rel="noreferrer" className="social-link">🌐 Portfolio</a>
                )}
                {isRecruiter && profile.companyWebsite && (
                  <a href={profile.companyWebsite.startsWith("http") ? profile.companyWebsite : `https://${profile.companyWebsite}`} target="_blank" rel="noreferrer" className="social-link">🌐 Website</a>
                )}
              </div>

              {/* Progress bar */}
              <div className="progress-wrap">
                <div className="progress-labels">
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600 }}>Profile Strength</span>
                  <span style={{ color: "white", fontSize: 12, fontWeight: 800 }} className="mono">{completion}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${completion}%` }} />
                </div>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 4 }}>
                  {completion < 50 ? "Add more details to stand out" : completion < 80 ? "Looking good! Keep going" : "Great profile! 🎉"}
                </p>
              </div>
            </div>

            {/* Hero actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
              <button
                className="btn-edit"
                style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", color: "white" }}
                onClick={() => setModal("basic")}
              >
                ✏️ Edit Profile
              </button>
              {profile.profilePicFileId && (
                <button
                  onClick={handleDeleteProfilePic}
                  style={{ fontSize: 12, color: "rgba(255,100,100,0.8)", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", padding: "5px 12px", borderRadius: 8, cursor: "pointer" }}
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══ TAB NAV ══ */}
      <div className="tab-nav">
        <div className="tab-nav-inner">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ══ BODY ══ */}
      <div className="body-inner">
        <div className="body-grid">

          {/* ── SIDEBAR ── */}
          <div>
            {/* Contact */}
            <div className="card fade-up fade-up-1">
              <div className="card-header">
                <span className="card-title">Contact</span>
                <button className="btn-edit" onClick={() => setModal("basic")}>✏️ Edit</button>
              </div>
              <ContactRow icon="✉️" bg="#eff6ff" value={profile.email || "—"} label="Email" />
              <ContactRow icon="📞" bg="#f0fdf4" value={profile.phone || "—"} label="Phone" />
              {!isRecruiter && (
                <ContactRow icon="📍" bg="#fefce8" value={[profile.city, profile.country].filter(Boolean).join(", ") || "—"} label="Location" />
              )}
              {isRecruiter && (
                <ContactRow icon="📍" bg="#fefce8" value={profile.companyLocation || "—"} label="Company Location" />
              )}
            </div>

            {/* Social Links */}
            <div className="card fade-up fade-up-2" style={{ marginTop: "1rem" }}>
              <div className="card-header">
                <span className="card-title">Social</span>
                <button className="btn-edit" onClick={() => setModal("social")}>✏️ Edit</button>
              </div>
              {profile.linkedin ? (
                <ContactRow icon="🔗" bg="#eff6ff" value={profile.linkedin} label="LinkedIn" isLink />
              ) : (
                <p style={{ fontSize: 12, color: "var(--muted)", fontStyle: "italic" }}>No LinkedIn added</p>
              )}
              {!isRecruiter && profile.portfolio ? (
                <ContactRow icon="🌐" bg="#f5f3ff" value={profile.portfolio} label="Portfolio" isLink />
              ) : !isRecruiter ? (
                <p style={{ fontSize: 12, color: "var(--muted)", fontStyle: "italic", marginTop: 6 }}>No portfolio added</p>
              ) : null}
              {isRecruiter && profile.companyWebsite ? (
                <ContactRow icon="🌐" bg="#f5f3ff" value={profile.companyWebsite} label="Website" isLink />
              ) : isRecruiter ? (
                <p style={{ fontSize: 12, color: "var(--muted)", fontStyle: "italic", marginTop: 6 }}>No website added</p>
              ) : null}
            </div>

            {/* Stats – only for job seekers */}
            {!isRecruiter && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "1rem" }}>
                {[
                  { num: profile.skills?.length || 0, lbl: "Skills", icon: "⚡" },
                  { num: profile.experience?.length || 0, lbl: "Jobs", icon: "💼" },
                  { num: profile.education?.length || 0, lbl: "Degrees", icon: "🎓" },
                  { num: profile.resumeFileId ? 1 : 0, lbl: "Resume", icon: "📄" },
                ].map(({ num, lbl, icon }) => (
                  <div className="stat-box fade-up fade-up-3" key={lbl}>
                    <div style={{ fontSize: 18, marginBottom: 2 }}>{icon}</div>
                    <div className="stat-num">{num}</div>
                    <div className="stat-lbl">{lbl}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Recruiter stats */}
            {isRecruiter && (
              <div className="card fade-up fade-up-3" style={{ marginTop: "1rem" }}>
                <div className="card-header"><span className="card-title">Quick Info</span></div>
                {[
                  { label: "Industry", value: profile.industry || "—", icon: "🏭" },
                  { label: "Company Size", value: profile.companySize || "—", icon: "👥" },
                  { label: "Member Since", value: profile.createdAt ? new Date(profile.createdAt).getFullYear() : "—", icon: "📅" },
                ].map(({ label, value, icon }) => (
                  <div className="recruiter-stat" key={label}>
                    <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>{icon} {label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── MAIN CONTENT ── */}
          <div>
            {/* ── OVERVIEW TAB ── */}
            {activeTab === "overview" && (
              <div>
                {/* Bio */}
                <div className="card fade-up fade-up-1">
                  <div className="card-header">
                    <span className="card-title">About</span>
                    <button className="btn-edit" onClick={() => setModal("basic")}>✏️ Edit</button>
                  </div>
                  {profile.bio ? (
                    <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.7, margin: 0 }}>{profile.bio}</p>
                  ) : (
                    <p className="empty">No bio added yet. Tell people about yourself!</p>
                  )}
                </div>

                {/* Job Seeker: Skills preview */}
                {!isRecruiter && (
                  <div className="card fade-up fade-up-2" style={{ marginTop: "1rem" }}>
                    <div className="card-header">
                      <span className="card-title">Skills</span>
                      <button className="btn-edit" onClick={() => setModal("skills")}>+ Add / Edit</button>
                    </div>
                    {profile.skills?.length > 0 ? (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {profile.skills.map((skill, i) => (
                          <span className="skill-chip" key={i}>
                            {skill}
                            <span className="del" onClick={() => handleDeleteItem("skills", i)}>✕</span>
                          </span>
                        ))}
                      </div>
                    ) : <p className="empty">No skills added yet</p>}
                  </div>
                )}

                {/* Job Seeker: Recent experience preview */}
                {!isRecruiter && profile.experience?.length > 0 && (
                  <div className="card fade-up fade-up-3" style={{ marginTop: "1rem" }}>
                    <div className="card-header">
                      <span className="card-title">Recent Experience</span>
                      <button className="btn-edit" onClick={() => setActiveTab("experience")}>View All →</button>
                    </div>
                    {profile.experience.slice(0, 2).map((e, i) => (
                      <TimelineItem key={i} type="work" primary={e.role} secondary={e.company} meta={e.duration} desc={e.desc} />
                    ))}
                  </div>
                )}

                {/* Recruiter: Company overview */}
                {isRecruiter && (
                  <div className="card fade-up fade-up-2" style={{ marginTop: "1rem" }}>
                    <div className="card-header">
                      <span className="card-title">Company Overview</span>
                      <button className="btn-edit" onClick={() => setModal("company")}>✏️ Edit</button>
                    </div>
                    <div className="info-grid">
                      <InfoField label="Company Name" value={profile.companyName || "—"} />
                      <InfoField label="Industry" value={profile.industry || "—"} />
                      <InfoField label="Company Size" value={profile.companySize || "—"} />
                      <InfoField label="Location" value={profile.companyLocation || "—"} />
                      <InfoField label="Website" value={profile.companyWebsite || "—"} isLink />
                    </div>
                    {profile.companyDescription && (
                      <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>About Company</p>
                        <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.7, margin: 0 }}>{profile.companyDescription}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── EXPERIENCE TAB ── */}
            {activeTab === "experience" && !isRecruiter && (
              <div>
                <div className="card fade-up fade-up-1">
                  <div className="card-header">
                    <span className="card-title">Work Experience</span>
                    <button className="btn-edit" onClick={() => { setEditingIndex(null); setModal("experience"); }}>+ Add Experience</button>
                  </div>
                  {profile.experience?.length > 0 ? (
                    profile.experience.map((e, i) => (
                      <TimelineItem
                        key={i} type="work"
                        primary={e.role} secondary={e.company}
                        meta={e.duration} desc={e.desc}
                        onEdit={() => { setEditingIndex(i); setModal("experience"); }}
                        onDelete={() => handleDeleteItem("experience", i)}
                      />
                    ))
                  ) : (
                    <div style={{ textAlign: "center", padding: "2rem 0" }}>
                      <div style={{ fontSize: 40, marginBottom: 8 }}>💼</div>
                      <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 12 }}>No experience added yet</p>
                      <button className="btn-primary" onClick={() => { setEditingIndex(null); setModal("experience"); }}>+ Add Your First Job</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── EDUCATION TAB ── */}
            {activeTab === "education" && !isRecruiter && (
              <div>
                <div className="card fade-up fade-up-1">
                  <div className="card-header">
                    <span className="card-title">Education</span>
                    <button className="btn-edit" onClick={() => { setEditingIndex(null); setModal("education"); }}>+ Add Education</button>
                  </div>
                  {profile.education?.length > 0 ? (
                    profile.education.map((e, i) => (
                      <TimelineItem
                        key={i} type="edu"
                        primary={e.degree} secondary={e.institute}
                        meta={e.year}
                        onEdit={() => { setEditingIndex(i); setModal("education"); }}
                        onDelete={() => handleDeleteItem("education", i)}
                      />
                    ))
                  ) : (
                    <div style={{ textAlign: "center", padding: "2rem 0" }}>
                      <div style={{ fontSize: 40, marginBottom: 8 }}>🎓</div>
                      <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 12 }}>No education added yet</p>
                      <button className="btn-primary" onClick={() => { setEditingIndex(null); setModal("education"); }}>+ Add Education</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── RESUME TAB ── */}
            {activeTab === "resume" && !isRecruiter && (
              <div>
                <div className="card fade-up fade-up-1">
                  <div className="card-header">
                    <span className="card-title">Resume / CV</span>
                  </div>
                  {profile.resumeFileId ? (
                    <div style={{
                      display: "flex", flexDirection: "column", gap: 16,
                      background: "white", borderRadius: "16px", border: "1px solid var(--border)",
                      padding: "20px", marginBottom: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
                    }}>
                      {/* Strength Meter */}
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>Resume Strength</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--success)" }}>85%</span>
                        </div>
                        <div style={{ height: 6, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: "85%", background: "linear-gradient(90deg, #10b981, #34d399)", borderRadius: 3 }} />
                        </div>
                        <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>✨ Great! Your resume is formatted correctly for ATS.</p>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{
                          width: 56, height: 56, borderRadius: "12px", background: "#fef2f2",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 28, color: "#ef4444", border: "1px solid #fee2e2"
                        }}>📄</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 15, fontWeight: 700, margin: 0, color: "var(--text)" }}>
                            {profile.resumeFileName || `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`}
                          </p>
                          <p style={{ fontSize: 13, color: "var(--muted)", margin: "4px 0 0" }}>
                            Uploaded {profile.updatedAt ? formatDistanceToNow(new Date(profile.updatedAt), { addSuffix: true }) : 'Recently'}
                          </p>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button className="btn-danger" onClick={handleDeleteResume}>🗑 Delete</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", padding: "3rem 0", marginBottom: 16 }}>
                      <div style={{ fontSize: 64, marginBottom: 16 }}>📄</div>
                      <p style={{ color: "var(--text)", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>No Resume Uploaded</p>
                      <p style={{ color: "var(--muted)", fontSize: 13, maxWidth: "240px", margin: "0 auto 20px" }}>
                        Upload your CV to let recruiters find you and apply to jobs with one click.
                      </p>
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <label className="btn-primary" style={{ display: "inline-flex", cursor: "pointer", margin: 0, padding: "10px 24px" }}>
                      {profile.resumeFileId ? "Replace Resume" : "Upload Resume"}
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} style={{ display: "none" }} />
                    </label>
                    {profile.resumeFileId && (
                      <a
                        href={`${import.meta.env.VITE_API_URL}/users/file/${profile.resumeFileId}`}
                        download={`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`}
                        style={{ fontSize: 14, fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}
                      >
                        Download PDF
                      </a>
                    )}
                  </div>
                  <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 12 }}>
                    Preferred format: <b>PDF</b> (Max 5MB)
                  </p>
                </div>
              </div>
            )}

            {/* ── COMPANY TAB (Recruiter) ── */}
            {activeTab === "company" && isRecruiter && (
              <div className="card fade-up fade-up-1">
                <div className="card-header">
                  <span className="card-title">Company Details</span>
                  <button className="btn-edit" onClick={() => setModal("company")}>✏️ Edit</button>
                </div>
                <div className="info-grid" style={{ marginBottom: 20 }}>
                  <InfoField label="Company Name" value={profile.companyName || "—"} />
                  <InfoField label="Industry" value={profile.industry || "—"} />
                  <InfoField label="Company Size" value={profile.companySize || "—"} />
                  <InfoField label="Location" value={profile.companyLocation || "—"} />
                  <InfoField label="Website" value={profile.companyWebsite || "—"} isLink />
                </div>
                {profile.companyDescription && (
                  <div style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>About the Company</p>
                    <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.75 }}>{profile.companyDescription}</p>
                  </div>
                )}
              </div>
            )}

            {/* ── ACTIVITY TAB ── */}
            {activeTab === "activity" && (
              <div className="card fade-up fade-up-1">
                <div className="card-header"><span className="card-title">{isRecruiter ? "Hiring Activity" : "Recent Activity"}</span></div>
                {notifications.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {notifications.slice(0, 5).map((notif, i) => (
                      <div key={i} style={{ padding: "12px 0", borderBottom: i === notifications.length - 1 ? "none" : "1px solid var(--border)", display: "flex", gap: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                          {notif.type === "application" ? "📋" : "🔔"}
                        </div>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", margin: 0 }}>{notif.message}</p>
                          <p style={{ fontSize: 11, color: "var(--muted)", margin: "2px 0 0" }}>{formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}</p>
                        </div>
                      </div>
                    ))}
                    <Link to="/notifications" style={{ textAlign: "center", padding: "12px 0 4px", fontSize: 12, fontWeight: 700, color: "var(--accent)", textDecoration: "none" }}>
                      View Full Activity Feed →
                    </Link>
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "3rem 0" }}>
                    <div style={{ fontSize: 48, marginBottom: 10 }}>📊</div>
                    <p style={{ color: "var(--muted)", fontSize: 14 }}>No recent activity</p>
                    <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }}>Activity from your job posts will show up here</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══ MODALS ══ */}
      {modal === "basic" && (
        <BasicModal
          data={profile}
          onClose={() => setModal(null)}
          onSave={(d) => { updateProfile(d); setModal(null); }}
        />
      )}
      {modal === "social" && (
        <SocialModal
          data={profile}
          onClose={() => setModal(null)}
          onSave={(d) => { updateProfile(d); setModal(null); }}
        />
      )}
      {modal === "skills" && !isRecruiter && (
        <SkillsModal
          data={profile.skills}
          onClose={() => setModal(null)}
          onSave={(skills) => { updateProfile({ skills }); setModal(null); }}
        />
      )}
      {modal === "experience" && !isRecruiter && (
        <ExperienceModal
          data={editingIndex !== null ? profile.experience[editingIndex] : null}
          onClose={() => { setModal(null); setEditingIndex(null); }}
          onSave={(form) => {
            let updated = [...(profile.experience || [])];
            if (editingIndex !== null) updated[editingIndex] = form; else updated.push(form);
            updateProfile({ experience: updated });
            setModal(null); setEditingIndex(null);
          }}
        />
      )}
      {modal === "education" && !isRecruiter && (
        <EducationModal
          data={editingIndex !== null ? profile.education[editingIndex] : null}
          onClose={() => { setModal(null); setEditingIndex(null); }}
          onSave={(form) => {
            let updated = [...(profile.education || [])];
            if (editingIndex !== null) updated[editingIndex] = form; else updated.push(form);
            updateProfile({ education: updated });
            setModal(null); setEditingIndex(null);
          }}
        />
      )}
      {modal === "company" && isRecruiter && (
        <CompanyModal
          data={profile}
          onClose={() => setModal(null)}
          onSave={(d) => { updateProfile(d); setModal(null); }}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   REUSABLE DISPLAY COMPONENTS
══════════════════════════════════════════════ */

function ContactRow({ icon, bg, label, value, isLink }) {
  return (
    <div className="contact-row">
      <div className="contact-icon" style={{ background: bg }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", margin: 0 }}>{label}</p>
        {isLink && value !== "—" ? (
          <a href={value.startsWith("http") ? value : `https://${value}`} target="_blank" rel="noreferrer"
            style={{ fontSize: 13, fontWeight: 500, color: "var(--accent)", wordBreak: "break-all" }}>
            {value}
          </a>
        ) : (
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", margin: 0, wordBreak: "break-all" }}>{value}</p>
        )}
      </div>
    </div>
  );
}

function InfoField({ label, value, isLink }) {
  return (
    <div className="info-field">
      <p className="info-field-label">{label}</p>
      {isLink && value !== "—" ? (
        <a href={value.startsWith("http") ? value : `https://${value}`} target="_blank" rel="noreferrer"
          style={{ fontSize: 14, fontWeight: 500, color: "var(--accent)" }}>{value}</a>
      ) : (
        <p className="info-field-value">{value}</p>
      )}
    </div>
  );
}

function TimelineItem({ type, primary, secondary, meta, desc, onEdit, onDelete }) {
  return (
    <div className="timeline-item">
      <div className={`timeline-dot ${type}`}>{type === "work" ? "💼" : "🎓"}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", margin: 0 }}>{primary}</p>
        <p style={{ fontSize: 13, color: "var(--muted)", margin: "2px 0 0" }}>{secondary}</p>
        {meta && <span style={{ display: "inline-block", marginTop: 4, fontSize: 11, fontWeight: 600, color: "#6366f1", background: "#eef2ff", border: "1px solid #c7d2fe", padding: "2px 8px", borderRadius: 20 }} className="mono">{meta}</span>}
        {desc && <p style={{ fontSize: 13, color: "#64748b", marginTop: 6, lineHeight: 1.6 }}>{desc}</p>}
      </div>
      {(onEdit || onDelete) && (
        <div className="timeline-actions">
          {onEdit && <button className="btn-edit" onClick={onEdit}>✏️</button>}
          {onDelete && <button className="btn-danger" onClick={onDelete}>🗑</button>}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MODAL SHELL
══════════════════════════════════════════════ */
function ModalShell({ title, onClose, onSave, children }) {
  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={onSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {type === "textarea"
        ? <textarea className="field-input field-textarea" value={value} onChange={onChange} placeholder={placeholder} />
        : <input type={type} className="field-input" value={value} onChange={onChange} placeholder={placeholder} />
      }
    </div>
  );
}

/* ══════════════════════════════════════════════
   SPECIFIC MODALS
══════════════════════════════════════════════ */

function BasicModal({ data, onClose, onSave }) {
  const [form, setForm] = useState({ ...data });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const isRecruiter = form.role === "recruiter";
  return (
    <ModalShell title="Edit Basic Info" onClose={onClose} onSave={() => onSave(form)}>
      <Field label="Full Name" value={form.name || ""} onChange={set("name")} />
      <Field label="Job Title" value={form.jobTitle || ""} onChange={set("jobTitle")} placeholder={isRecruiter ? "e.g. Senior Recruiter" : "e.g. Frontend Developer"} />
      <Field label="Bio / About" type="textarea" value={form.bio || ""} onChange={set("bio")} placeholder="Write a short bio about yourself…" />
      <Field label="Phone" value={form.phone || ""} onChange={set("phone")} placeholder="+91 98765 43210" />
      {!isRecruiter && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="City" value={form.city || ""} onChange={set("city")} placeholder="Hyderabad" />
            <Field label="Country" value={form.country || ""} onChange={set("country")} placeholder="India" />
          </div>
          <Field label="Gender" value={form.gender || ""} onChange={set("gender")} placeholder="e.g. Male / Female / Other" />
        </>
      )}
    </ModalShell>
  );
}

function SocialModal({ data, onClose, onSave }) {
  const [form, setForm] = useState({ linkedin: data.linkedin || "", portfolio: data.portfolio || "" });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <ModalShell title="Social Links" onClose={onClose} onSave={() => onSave(form)}>
      <Field label="LinkedIn URL" value={form.linkedin} onChange={set("linkedin")} placeholder="https://linkedin.com/in/yourname" />
      <Field label="Portfolio URL" value={form.portfolio} onChange={set("portfolio")} placeholder="https://yourportfolio.com" />
    </ModalShell>
  );
}

function CompanyModal({ data, onClose, onSave }) {
  const [form, setForm] = useState({
    companyName: data.companyName || "",
    industry: data.industry || "",
    companySize: data.companySize || "",
    companyLocation: data.companyLocation || "",
    companyWebsite: data.companyWebsite || "",
    companyDescription: data.companyDescription || "",
  });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <ModalShell title="Edit Company Info" onClose={onClose} onSave={() => onSave(form)}>
      <Field label="Company Name" value={form.companyName} onChange={set("companyName")} placeholder="Acme Corp" />
      <Field label="Industry" value={form.industry} onChange={set("industry")} placeholder="e.g. Technology, Finance" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Company Size" value={form.companySize} onChange={set("companySize")} placeholder="e.g. 50-200" />
        <Field label="Location" value={form.companyLocation} onChange={set("companyLocation")} placeholder="City, Country" />
      </div>
      <Field label="Website" value={form.companyWebsite} onChange={set("companyWebsite")} placeholder="https://company.com" />
      <Field label="About Company" type="textarea"
        value={form.companyDescription} onChange={set("companyDescription")} placeholder="Describe your company…" />
    </ModalShell>
  );
}

function SkillsModal({ data, onClose, onSave }) {
  const [value, setValue] = useState((data || []).join(", "));
  return (
    <ModalShell title="Edit Skills" onClose={onClose} onSave={() => onSave(value.split(",").map(s => s.trim()).filter(Boolean))}>
      <Field label="Skills (comma-separated)" value={value} onChange={(e) => setValue(e.target.value)}
        placeholder="React, Node.js, MongoDB, TypeScript…" />
      <p style={{ fontSize: 12, color: "var(--muted)", marginTop: -6 }}>Separate each skill with a comma.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
        {value.split(",").map(s => s.trim()).filter(Boolean).map((s, i) => (
          <span className="skill-chip" key={i} style={{ fontSize: 11 }}>{s}</span>
        ))}
      </div>
    </ModalShell>
  );
}

function ExperienceModal({ data, onClose, onSave }) {
  const [form, setForm] = useState({ role: "", company: "", duration: "", desc: "", ...(data || {}) });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <ModalShell title={data ? "Edit Experience" : "Add Experience"} onClose={onClose} onSave={() => onSave(form)}>
      <Field label="Job Title / Role" value={form.role} onChange={set("role")} placeholder="e.g. Frontend Developer" />
      <Field label="Company" value={form.company} onChange={set("company")} placeholder="e.g. Google" />
      <Field label="Duration" value={form.duration} onChange={set("duration")} placeholder="e.g. Jan 2022 – Present" />
      <Field label="Description" type="textarea" value={form.desc} onChange={set("desc")} placeholder="What did you work on? Key achievements…" />
    </ModalShell>
  );
}

function EducationModal({ data, onClose, onSave }) {
  const [form, setForm] = useState({ degree: "", institute: "", year: "", ...(data || {}) });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <ModalShell title={data ? "Edit Education" : "Add Education"} onClose={onClose} onSave={() => onSave(form)}>
      <Field label="Degree / Certification" value={form.degree} onChange={set("degree")} placeholder="e.g. B.Tech Computer Science" />
      <Field label="University / Institute" value={form.institute} onChange={set("institute")} placeholder="e.g. IIT Hyderabad" />
      <Field label="Year / Duration" value={form.year} onChange={set("year")} placeholder="e.g. 2018 – 2022" />
    </ModalShell>
  );
}
