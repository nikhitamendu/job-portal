// // import { useState, useEffect } from "react";
// // import axios from "../services/api";

// // export default function Profile() {

// //   const [profile, setProfile] = useState(null);
// //   const [completion, setCompletion] = useState(0);

// //   const [editBasic, setEditBasic] = useState(false);
// //   const [editSkills, setEditSkills] = useState(false);
// //   const [editExperience, setEditExperience] = useState(false);
// //   const [editEducation, setEditEducation] = useState(false);

// //   const [editingIndex, setEditingIndex] = useState(null);//Used when editing specific experience/education entry.

// //   useEffect(() => {
// //     fetchProfile();
// //   }, []);

// //   const fetchProfile = async () => {
// //     const { data } = await axios.get("/users/profile");
// //     setProfile(data.user);
// //     setCompletion(data.completion);
// //   };

// //   if (!profile) return <div className="p-10">Loading...</div>;
// //   //untill api returns show loading

// // const isRecruiter = profile.role === "recruiter";
// // // console.log("PROFILE ROLE:", profile.role);

// //   /* ================= SAVE FUNCTIONS ================= */

// //   const updateProfile = async (updatedFields) => {
// //     const { data } = await axios.put("/users/profile", updatedFields);
// //     setProfile(data.user);
// //     setCompletion(data.completion);  //only updates the updated fields
// //   };

// //   /* ================= RESUME ================= */

// //   const handleResumeUpload = async (e) => {
// //     const file = e.target.files[0];  //user selects file
// //     if (!file) return;

// //     const formData = new FormData();
// //     formData.append("resume", file); //send this file to backend

// //     await axios.post("/users/upload-resume", formData, {
// //       headers: { "Content-Type": "multipart/form-data" } //send tro backend gridfs stores file
// //     });

// //     await fetchProfile();
// // //reload profile to show update
// //     e.target.value = null;
// //   };

// //   const handleDeleteResume = async () => {
// //     await axios.delete("/users/delete-resume");
// //     await fetchProfile();
// //   };

// //   /* ================= DELETE GENERIC ================= */

// //   const handleDeleteItem = async (field, index) => {
// //     const updated = profile[field].filter((_, i) => i !== index);
// //     await updateProfile({ [field]: updated });
// //   };
// //   /* ================= PROFILE PICTURE ================= */

// // const handleProfilePicUpload = async (e) => {
// //   const file = e.target.files[0];
// //   if (!file) return;

// //   const formData = new FormData();
// //   formData.append("profilePic", file);

// //   await axios.post("/users/upload-profile-pic", formData, {
// //     headers: { "Content-Type": "multipart/form-data" }
// //   });

// //   await fetchProfile();
// //   e.target.value = null;
// // };

// // const handleDeleteProfilePic = async () => {
// //   await axios.delete("/users/delete-profile-pic");
// //   await fetchProfile();
// // };


// //   /* ================= UI ================= */

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-10">
// //       <div className="max-w-6xl mx-auto px-6 space-y-6">

// //         {/* Completion */}
// //         <div className="bg-white border rounded-xl p-6">
// //           <div className="flex justify-between text-sm mb-2">
// //             <span>Profile Completion</span>
// //             <span>{completion}%</span>
// //           </div>
// //           <div className="bg-gray-200 h-2 rounded-full">
// //             <div
// //               className="bg-blue-600 h-2 rounded-full"
// //               style={{ width: `${completion}%` }}
// //             />
// //           </div>
// //         </div>

// //         <div className="grid md:grid-cols-3 gap-6">

// //           {/* LEFT */}
// //         {/* LEFT */}
// // <div className="bg-white rounded-xl border p-6 text-center">

// //   <div className="relative w-24 h-24 mx-auto">
// //     {profile.profilePicFileId ? (
// //       <img
// //         src={`http://localhost:5000/api/users/file/${profile.profilePicFileId}`}
// //         alt="Profile"
// //         className="w-24 h-24 rounded-full object-cover border"
// //       />
// //     ) : (
// //       <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
// //         {profile.name?.[0] || "U"}
// //       </div>
// //     )}

// //     <label className="absolute bottom-0 right-0 bg-white border rounded-full p-1 cursor-pointer text-xs shadow">
// //       ✎
// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={handleProfilePicUpload}
// //         className="hidden"
// //       />
// //     </label>
// //   </div>

// //   {profile.profilePicFileId && (
// //     <button
// //       onClick={handleDeleteProfilePic}
// //       className="mt-2 text-red-600 text-sm"
// //     >
// //       Remove Photo
// //     </button>
// //   )}

// //   <h2 className="mt-4 font-bold text-lg">{profile.name}</h2>
// //   {/* <p className="text-gray-500 text-sm">{profile.role}</p> */}
// //   <p className="text-gray-500 text-sm capitalize">
// //   {isRecruiter ? "Recruiter" : "Job Seeker"}
// // </p>

// //   <button
// //     onClick={() => setEditBasic(true)}
// //     className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
// //   >
// //     Edit Basic Info
// //   </button>

// // </div>


// //           {/* RIGHT */}
// //           <div className="md:col-span-2 space-y-6">

// //   {/*for recruiter */}        
// // {isRecruiter && (
// //   <Card title="Company Information" onEdit={() => setEditBasic(true)}>
// //     <Info label="Company Name" value={profile.companyName || "—"} />
// //     <Info label="Industry" value={profile.industry || "—"} />
// //     <Info label="Company Size" value={profile.companySize || "—"} />
// //     <Info label="Company Location" value={profile.companyLocation || "—"} />
// //     <Info label="Website" value={profile.companyWebsite || "—"} />
// //     <Info label="Description" value={profile.companyDescription || "—"} />
// //   </Card>
// // )}
// // {!isRecruiter && (
// //   <>
// //     {/* Skills */}
// //     <Card title="Skills" onEdit={() => setEditSkills(true)}>
// //       {profile.skills?.length === 0 ? (
// //         <Empty text="No skills added yet" />
// //       ) : (
// //         <div className="flex flex-wrap gap-2">
// //           {profile.skills.map((skill, i) => (
// //             <div
// //               key={i}
// //               className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm group"
// //             >
// //               {skill}
// //               <button
// //                 onClick={() => handleDeleteItem("skills", i)}
// //                 className="hidden group-hover:inline text-red-500"
// //               >
// //                 ✕
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </Card>

// //  {/*experience*/}
// //  <Card
// //   title="Experience"
// //   onEdit={() => {
// //     setEditingIndex(null);
// //     setEditExperience(true);
// //   }}
// // >

// //   {profile.experience?.length === 0 ? (
// //     <Empty text="No experience added yet" />
// //   ) : (
// //     profile.experience.map((e, i) => (
// //       <ItemRow
// //         key={i}
// //         text={`${e.role} • ${e.company} (${e.duration})`}
// //         onEdit={() => {
// //           setEditingIndex(i);
// //           setEditExperience(true);
// //         }}
// //         onDelete={() => handleDeleteItem("experience", i)}
// //       />
// //     ))
// //   )}

// //   <button
// //     onClick={() => {
// //       setEditingIndex(null);
// //       setEditExperience(true);
// //     }}
// //     className="mt-3 text-blue-600 text-sm"
// //   >
// //     + Add Experience
// //   </button>

// // </Card>

// //     {/* Education */}
// //    <Card
// //   title="Education"
// //   onEdit={() => {
// //     setEditingIndex(null);
// //     setEditEducation(true);
// //   }}
// // >

// //   {profile.education?.length === 0 ? (
// //     <Empty text="No education added yet" />
// //   ) : (
// //     profile.education.map((e, i) => (
// //       <ItemRow
// //         key={i}
// //         text={`${e.degree} • ${e.institute} (${e.year})`}
// //         onEdit={() => {
// //           setEditingIndex(i);
// //           setEditEducation(true);
// //         }}
// //         onDelete={() => handleDeleteItem("education", i)}
// //       />
// //     ))
// //   )}

// //   <button
// //     onClick={() => {
// //       setEditingIndex(null);
// //       setEditEducation(true);
// //     }}
// //     className="mt-3 text-blue-600 text-sm"
// //   >
// //     + Add Education
// //   </button>

// // </Card>

// //     {/* Resume */}
// //     <Card title="Resume">
// //       {profile.resumeFileId ? (
// //         <div className="space-y-3">
// //           <div className="flex items-center justify-between bg-green-50 border border-green-200 px-4 py-2 rounded">
// //             <span className="text-green-700 text-sm font-medium">
// //               ✔ Resume Uploaded
// //             </span>

// //             <div className="space-x-4 text-sm">
// //               <a
// //                 href={`http://localhost:5000/api/users/file/${profile.resumeFileId}`}
// //                 target="_blank"
// //                 rel="noreferrer"
// //                 className="text-blue-600 underline"
// //               >
// //                 View
// //               </a>

// //               <button
// //                 onClick={handleDeleteResume}
// //                 className="text-red-600"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       ) : (
// //         <Empty text="No resume uploaded" />
// //       )}

// //       <label className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer text-sm">
// //         {profile.resumeFileId ? "Replace Resume" : "Upload Resume"}
// //         <input
// //           type="file"
// //           accept=".pdf,.doc,.docx"
// //           onChange={handleResumeUpload}
// //           className="hidden"
// //         />
// //       </label>
// //     </Card>
// //   </>
// // )}

// //           </div>
// //         </div>
// //       </div>

// //       {/* MODALS */}
// //       {editBasic && (
// //         <BasicModal
// //           data={profile}
// //           onClose={() => setEditBasic(false)}
// //           onSave={(data) => {
// //             updateProfile(data);
// //             setEditBasic(false);
// //           }}
// //         />
// //       )}

// //       {!isRecruiter && editSkills && (
// //         <SkillsModal
// //           data={profile.skills}
// //           onClose={() => setEditSkills(false)}
// //           onSave={(skills) => {
// //             updateProfile({ skills });
// //             setEditSkills(false);
// //           }}
// //         />
// //       )}

// //     {!isRecruiter && editExperience && (
// //   <ExperienceModal
// //     data={editingIndex !== null ? profile.experience[editingIndex] : null}
// //     onClose={() => setEditExperience(false)}
// //     onSave={(form) => {
// //       let updated = [...profile.experience];
// //       if (editingIndex !== null) updated[editingIndex] = form;
// //       else updated.push(form);

// //       updateProfile({ experience: updated });
// //       setEditExperience(false);
// //       setEditingIndex(null);
// //     }}
// //   />
// // )}
// // {!isRecruiter && editEducation && (
// //   <EducationModal
// //     data={editingIndex !== null ? profile.education[editingIndex] : null}
// //     onClose={() => setEditEducation(false)}
// //     onSave={(form) => {
// //       let updated = [...profile.education];
// //       if (editingIndex !== null) updated[editingIndex] = form;
// //       else updated.push(form);

// //       updateProfile({ education: updated });
// //       setEditEducation(false);
// //       setEditingIndex(null);
// //     }}
// //   />
// // )}
// //     </div>
// //   );
// // }

// // /* ================= REUSABLE COMPONENTS ================= */

// // function Card({ title, children, onEdit }) {
// //   return (
// //     <div className="bg-white border rounded-xl p-6">
// //       <div className="flex justify-between mb-4">
// //         <h3 className="font-semibold">{title}</h3>
// //         {onEdit && (
// //           <button onClick={onEdit} className="text-blue-600 text-sm">
// //             Add / Edit
// //           </button>
// //         )}
// //       </div>
// //       {children}
// //     </div>
// //   );
// // }

// // function Info({ label, value }) {
// //   return (
// //     <div>
// //       <p className="text-sm text-gray-500">{label}</p>
// //       <p>{value}</p>
// //     </div>
// //   );
// // }

// // function Empty({ text }) {
// //   return <p className="text-gray-400 text-sm">{text}</p>;
// // }

// // function ItemRow({ text, onEdit, onDelete }) {
// //   return (
// //     <div className="flex justify-between items-center border-b py-2">
// //       <span>{text}</span>
// //       <div className="space-x-3 text-sm">
// //         {onEdit && (
// //           <button onClick={onEdit} className="text-blue-600">
// //             Edit
// //           </button>
// //         )}
// //         <button onClick={onDelete} className="text-red-600">
// //           Delete
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
// // function Modal({ title, children, onClose, onSave }) {
// //   return (
// //     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
// //       <div className="bg-white w-full max-w-md p-6 rounded-xl">
// //         <h2 className="font-bold mb-4">{title}</h2>
// //         <div className="space-y-3">{children}</div>
// //         <div className="flex justify-end gap-3 mt-4">
// //           <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
// //             Cancel
// //           </button>
// //           <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded">
// //             Save
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function BasicModal({ data, onClose, onSave }) {
// //   const [form, setForm] = useState(data);

// //   useEffect(() => {
// //     setForm(data);
// //   }, [data]);

// //   const isRecruiter = form.role === "recruiter";

// //   return (
// //     <Modal title="Edit Profile" onClose={onClose} onSave={() => onSave(form)}>
      
// //       <Input
// //         label="Name"
// //         value={form.name || ""}
// //         onChange={(e) => setForm({ ...form, name: e.target.value })}
// //       />

// //       {!isRecruiter && (
// //         <>
// //           <Input
// //             label="Location"
// //             value={form.location || ""}
// //             onChange={(e) => setForm({ ...form, location: e.target.value })}
// //           />
// //           <Input
// //             label="Phone"
// //             value={form.phone || ""}
// //             onChange={(e) => setForm({ ...form, phone: e.target.value })}
// //           />
// //         </>
// //       )}

// //       {isRecruiter && (
// //         <>
// //           <Input
// //             label="Company Name"
// //             value={form.companyName || ""}
// //             onChange={(e) =>
// //               setForm({ ...form, companyName: e.target.value })
// //             }
// //           />
// //           <Input
// //             label="Industry"
// //             value={form.industry || ""}
// //             onChange={(e) =>
// //               setForm({ ...form, industry: e.target.value })
// //             }
// //           />
// //           <Input
// //             label="Company Size"
// //             value={form.companySize || ""}
// //             onChange={(e) =>
// //               setForm({ ...form, companySize: e.target.value })
// //             }
// //           />
// //           <Input
// //             label="Company Location"
// //             value={form.companyLocation || ""}
// //             onChange={(e) =>
// //               setForm({ ...form, companyLocation: e.target.value })
// //             }
// //           />
// //           <Input
// //             label="Company Website"
// //             value={form.companyWebsite || ""}
// //             onChange={(e) =>
// //               setForm({ ...form, companyWebsite: e.target.value })
// //             }
// //           />
// //           <Input
// //             label="Company Description"
// //             value={form.companyDescription || ""}
// //             onChange={(e) =>
// //               setForm({ ...form, companyDescription: e.target.value })
// //             }
// //           />
// //         </>
// //       )}
// //     </Modal>
// //   );
// // }
// // function SkillsModal({ data, onClose, onSave }) {
// //   const [value, setValue] = useState("");

// //   useEffect(() => {
// //     setValue((data || []).join(", "));
// //   }, [data]);

// //   return (
// //     <Modal
// //       title="Edit Skills"
// //       onClose={onClose}
// //       onSave={() =>
// //         onSave(value.split(",").map((s) => s.trim()).filter(Boolean))
// //       }
// //     >
// //       <Input
// //         label="Skills (comma separated)"
// //         value={value}
// //         onChange={(e) => setValue(e.target.value)}
// //       />
// //     </Modal>
// //   );
// // }
// // function ExperienceModal({ data, onClose, onSave }) {
// //  const [form, setForm] = useState({
// //   role: "",
// //   company: "",
// //   duration: "",
// //   desc: "",
// // });
// //  useEffect(() => {
// //   if (data) {
// //     setForm(data);
// //   } else {
// //     setForm({
// //       role: "",
// //       company: "",
// //       duration: "",
// //       desc: "",
// //     });
// //   }
// // }, [data]);
// //   return (
// //     <Modal title="Experience" onClose={onClose} onSave={() => onSave(form)}>
// //       <Input
// //         label="Role"
// //         value={form.role}
// //         onChange={(e) => setForm({ ...form, role: e.target.value })}
// //       />
// //       <Input
// //         label="Company"
// //         value={form.company}
// //         onChange={(e) => setForm({ ...form, company: e.target.value })}
// //       />
// //       <Input
// //         label="Duration"
// //         value={form.duration}
// //         onChange={(e) => setForm({ ...form, duration: e.target.value })}
// //       />
// //       <Input
// //         label="Description"
// //         value={form.desc}
// //         onChange={(e) => setForm({ ...form, desc: e.target.value })}
// //       />
// //     </Modal>
// //   );
// // }
// // function EducationModal({ data, onClose, onSave }) {
// //   const [form, setForm] = useState({
// //   degree: "",
// //   institute: "",
// //   year: "",
// // });

// //  useEffect(() => {
// //   if (data) {
// //     setForm(data);
// //   } else {
// //     setForm({
// //       degree: "",
// //       institute: "",
// //       year: "",
// //     });
// //   }
// // }, [data]);
// //   return (
// //     <Modal title="Education" onClose={onClose} onSave={() => onSave(form)}>
// //       <Input
// //         label="Degree"
// //         value={form.degree}
// //         onChange={(e) => setForm({ ...form, degree: e.target.value })}
// //       />
// //       <Input
// //         label="Institute"
// //         value={form.institute}
// //         onChange={(e) => setForm({ ...form, institute: e.target.value })}
// //       />
// //       <Input
// //         label="Year"
// //         value={form.year}
// //         onChange={(e) => setForm({ ...form, year: e.target.value })}
// //       />
// //     </Modal>
// //   );
// // }
// // function Input({ label, ...props }) {
// //   return (
// //     <div>
// //       <label className="text-sm text-gray-600">{label}</label>
// //       <input {...props} className="w-full border px-3 py-2 rounded-md" />
// //     </div>
// //   );
// // }
// // //User opens Profile page
// // // ↓
// // // React sends GET /api/users/profile
// // // ↓
// // // Axios interceptor attaches JWT
// // // ↓
// // // authMiddleware verifies token
// // // ↓
// // // userController.getProfile()
// // // ↓
// // // MongoDB fetch user
// // // ↓
// // // Calculate completion %
// // // ↓
// // // Send JSON response
// // // ↓
// // // React setProfile() updates UI
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
//         {/* Glow blobs */}
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
//                 {isRecruiter ? "Recruiter" : "Job Seeker"}
//                 {profile.location && ` · ${profile.location}`}
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
//                 <InfoRow icon="✉️" label="Email" value={profile.email || "—"} />
//                 <InfoRow icon="📞" label="Phone" value={profile.phone || "—"} />
//                 <InfoRow icon="📍" label="Location" value={profile.location || "—"} />
//               </div>
//             </Card>

//             {/* Quick Stats */}
//             <div className="grid grid-cols-2 gap-3">
//               {[
//                 { num: profile.skills?.length || 0,      lbl: "Skills"       },
//                 { num: profile.experience?.length || 0,  lbl: "Experience"   },
//                 { num: profile.education?.length || 0,   lbl: "Education"    },
//                 { num: profile.resumeFileId ? 1 : 0,     lbl: "Resume"       },
//               ].map(({ num, lbl }) => (
//                 <div
//                   key={lbl}
//                   className="bg-white rounded-xl border border-slate-200 p-3 text-center shadow-sm"
//                 >
//                   <div className="text-xl font-extrabold text-slate-900 tracking-tight">{num}</div>
//                   <div className="text-xs text-slate-400 font-medium mt-0.5">{lbl}</div>
//                 </div>
//               ))}
//             </div>

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
//   return (
//     <p className="text-sm text-slate-400 italic py-1">{text}</p>
//   );
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
//         {/* Modal Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
//           <h2 className="text-base font-bold text-slate-900">{title}</h2>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
//           >
//             ✕
//           </button>
//         </div>
//         {/* Modal Body */}
//         <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
//           {children}
//         </div>
//         {/* Modal Footer */}
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
//           <Input
//             label="Location"
//             value={form.location || ""}
//             onChange={(e) => setForm({ ...form, location: e.target.value })}
//           />
//           <Input
//             label="Phone"
//             value={form.phone || ""}
//             onChange={(e) => setForm({ ...form, phone: e.target.value })}
//           />
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
import axios from "../services/api";
import { toast } from "react-toastify";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [completion, setCompletion] = useState(0);

  const [editBasic, setEditBasic] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [editExperience, setEditExperience] = useState(false);
  const [editEducation, setEditEducation] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data } = await axios.get("/users/profile");
    setProfile(data.user);
    setCompletion(data.completion);
  };

  if (!profile)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading profile…</span>
        </div>
      </div>
    );

  const isRecruiter = profile.role === "recruiter";

  /* ── SAVE FUNCTIONS ── */
  const updateProfile = async (updatedFields) => {
    const { data } = await axios.put("/users/profile", updatedFields);
    setProfile(data.user);
    setCompletion(data.completion);
  };

  /* ── RESUME ── */
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isReplace = !!profile.resumeFileId;
    try {
      const formData = new FormData();
      formData.append("resume", file);
      await axios.post("/users/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchProfile();
      toast.success(isReplace ? "Resume replaced successfully!" : "Resume uploaded successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload resume.");
    } finally {
      e.target.value = null;
    }
  };

  const handleDeleteResume = async () => {
    try {
      await axios.delete("/users/delete-resume");
      await fetchProfile();
      toast.success("Resume deleted successfully.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete resume.");
    }
  };

  /* ── DELETE GENERIC ── */
  const handleDeleteItem = async (field, index) => {
    const updated = profile[field].filter((_, i) => i !== index);
    await updateProfile({ [field]: updated });
  };

  /* ── PROFILE PICTURE ── */
  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profilePic", file);
    await axios.post("/users/upload-profile-pic", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    await fetchProfile();
    e.target.value = null;
  };

  const handleDeleteProfilePic = async () => {
    await axios.delete("/users/delete-profile-pic");
    await fetchProfile();
  };

  /* ── UI ── */
  return (
    <div className="min-h-screen bg-slate-100">

      {/* ── TOP HERO BANNER ── */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              {profile.profilePicFileId ? (
                <img
                  src={`http://localhost:5000/api/users/file/${profile.profilePicFileId}`}
                  alt="Profile"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-3xl font-extrabold border-2 border-white/10">
                  {profile.name?.[0] || "U"}
                </div>
              )}
              <label className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer text-xs text-slate-600 hover:bg-slate-100 transition">
                ✎
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                {profile.name}
              </h1>
              <p className="text-sm text-white/50 mt-0.5 capitalize">
                {isRecruiter
                  ? `Recruiter${profile.companyName ? ` · ${profile.companyName}` : ""}`
                  : `Job Seeker${profile.location ? ` · ${profile.location}` : ""}`}
              </p>

              {/* Completion bar */}
              <div className="mt-3 max-w-xs">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/50 font-medium">Profile Completion</span>
                  <span className="text-white font-bold">{completion}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-500"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {profile.profilePicFileId && (
                <button
                  onClick={handleDeleteProfilePic}
                  className="text-xs text-red-400 hover:text-red-300 font-medium transition px-3 py-1.5 rounded-lg border border-red-400/30 hover:bg-red-400/10"
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6">

          {/* ── LEFT SIDEBAR ── */}
          <div className="space-y-4">

            {/* Contact Card */}
            <Card title="Contact Info">
              <div className="space-y-2.5">
                <InfoRow icon="✉️" label="Email"    value={profile.email    || "—"} />
                <InfoRow icon="📞" label="Phone"    value={profile.phone    || "—"} />
                {/* Location only relevant for job seekers */}
                {!isRecruiter && (
                  <InfoRow icon="📍" label="Location" value={profile.location || "—"} />
                )}
              </div>
            </Card>

            {/* ✅ Quick Stats — only for job seekers */}
            {!isRecruiter && (
              <div className="grid grid-cols-2 gap-3">
                {[
                  { num: profile.skills?.length    || 0,  lbl: "Skills"     },
                  { num: profile.experience?.length || 0, lbl: "Experience" },
                  { num: profile.education?.length  || 0, lbl: "Education"  },
                  { num: profile.resumeFileId ? 1   : 0,  lbl: "Resume"     },
                ].map(({ num, lbl }) => (
                  <div
                    key={lbl}
                    className="bg-white rounded-xl border border-slate-200 p-3 text-center shadow-sm"
                  >
                    <div className="text-xl font-extrabold text-slate-900 tracking-tight">{num}</div>
                    <div className="text-xs text-slate-400 font-medium mt-0.5">{lbl}</div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* ── RIGHT MAIN ── */}
          <div className="md:col-span-2 space-y-5">

            {/* RECRUITER: Company Info */}
            {isRecruiter && (
              <Card title="Company Information" onEdit={() => setEditBasic(true)}>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Info label="Company Name"     value={profile.companyName        || "—"} />
                  <Info label="Industry"         value={profile.industry           || "—"} />
                  <Info label="Company Size"     value={profile.companySize        || "—"} />
                  <Info label="Company Location" value={profile.companyLocation    || "—"} />
                  <Info label="Website"          value={profile.companyWebsite     || "—"} />
                  <Info label="Description"      value={profile.companyDescription || "—"} />
                </div>
              </Card>
            )}

            {/* JOB SEEKER sections */}
            {!isRecruiter && (
              <>
                {/* Skills */}
                <Card title="Skills" onEdit={() => setEditSkills(true)}>
                  {profile.skills?.length === 0 ? (
                    <Empty text="No skills added yet" />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, i) => (
                        <div
                          key={i}
                          className="group flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
                        >
                          {skill}
                          <button
                            onClick={() => handleDeleteItem("skills", i)}
                            className="hidden group-hover:inline text-blue-400 hover:text-red-500 transition text-xs leading-none cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                {/* Experience */}
                <Card
                  title="Experience"
                  onEdit={() => { setEditingIndex(null); setEditExperience(true); }}
                >
                  {profile.experience?.length === 0 ? (
                    <Empty text="No experience added yet" />
                  ) : (
                    <div className="space-y-1">
                      {profile.experience.map((e, i) => (
                        <ItemRow
                          key={i}
                          primary={e.role}
                          secondary={`${e.company} · ${e.duration}`}
                          onEdit={() => { setEditingIndex(i); setEditExperience(true); }}
                          onDelete={() => handleDeleteItem("experience", i)}
                        />
                      ))}
                    </div>
                  )}
                </Card>

                {/* Education */}
                <Card
                  title="Education"
                  onEdit={() => { setEditingIndex(null); setEditEducation(true); }}
                >
                  {profile.education?.length === 0 ? (
                    <Empty text="No education added yet" />
                  ) : (
                    <div className="space-y-1">
                      {profile.education.map((e, i) => (
                        <ItemRow
                          key={i}
                          primary={e.degree}
                          secondary={`${e.institute} · ${e.year}`}
                          onEdit={() => { setEditingIndex(i); setEditEducation(true); }}
                          onDelete={() => handleDeleteItem("education", i)}
                        />
                      ))}
                    </div>
                  )}
                </Card>

                {/* Resume */}
                <Card title="Resume">
                  {profile.resumeFileId ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-xl mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-emerald-600 text-lg">📄</span>
                        <span className="text-sm font-semibold text-emerald-700">
                          Resume Uploaded
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <a
                          href={`http://localhost:5000/api/users/file/${profile.resumeFileId}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
                        >
                          👁 View
                        </a>
                        <button
                          onClick={handleDeleteResume}
                          className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Empty text="No resume uploaded yet" />
                  )}

                  <label className="mt-2 inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer transition shadow-sm shadow-blue-200">
                    📎 {profile.resumeFileId ? "Replace Resume" : "Upload Resume"}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                    />
                  </label>
                </Card>
              </>
            )}

          </div>
        </div>
      </div>

      {/* ── MODALS ── */}
      {editBasic && (
        <BasicModal
          data={profile}
          onClose={() => setEditBasic(false)}
          onSave={(data) => { updateProfile(data); setEditBasic(false); }}
        />
      )}

      {!isRecruiter && editSkills && (
        <SkillsModal
          data={profile.skills}
          onClose={() => setEditSkills(false)}
          onSave={(skills) => { updateProfile({ skills }); setEditSkills(false); }}
        />
      )}

      {!isRecruiter && editExperience && (
        <ExperienceModal
          data={editingIndex !== null ? profile.experience[editingIndex] : null}
          onClose={() => setEditExperience(false)}
          onSave={(form) => {
            let updated = [...profile.experience];
            if (editingIndex !== null) updated[editingIndex] = form;
            else updated.push(form);
            updateProfile({ experience: updated });
            setEditExperience(false);
            setEditingIndex(null);
          }}
        />
      )}

      {!isRecruiter && editEducation && (
        <EducationModal
          data={editingIndex !== null ? profile.education[editingIndex] : null}
          onClose={() => setEditEducation(false)}
          onSave={(form) => {
            let updated = [...profile.education];
            if (editingIndex !== null) updated[editingIndex] = form;
            else updated.push(form);
            updateProfile({ education: updated });
            setEditEducation(false);
            setEditingIndex(null);
          }}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   REUSABLE COMPONENTS
═══════════════════════════════════════════ */

function Card({ title, children, onEdit }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
          {title}
        </h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1 text-xs text-blue-700 font-bold bg-blue-50 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            + Add / Edit
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400 font-medium mb-0.5">{label}</p>
      <p className="text-sm text-slate-800 font-medium">{value}</p>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-base mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-sm text-slate-700 font-medium">{value}</p>
      </div>
    </div>
  );
}

function Empty({ text }) {
  return <p className="text-sm text-slate-400 italic py-1">{text}</p>;
}

function ItemRow({ primary, secondary, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-sm font-semibold text-slate-800">{primary}</p>
        <p className="text-xs text-slate-400 mt-0.5">{secondary}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
        {onEdit && (
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1 text-xs text-blue-700 font-semibold bg-blue-50 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            ✏️ Edit
          </button>
        )}
        <button
          onClick={onDelete}
          className="inline-flex items-center gap-1 text-xs text-red-600 font-semibold bg-red-50 border border-red-100 hover:bg-red-100 hover:border-red-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

function Modal({ title, children, onClose, onSave }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
          {children}
        </div>
        <div className="flex justify-end gap-2.5 px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 text-sm font-bold text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition shadow-sm shadow-blue-200 cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function BasicModal({ data, onClose, onSave }) {
  const [form, setForm] = useState(data);
  useEffect(() => { setForm(data); }, [data]);
  const isRecruiter = form.role === "recruiter";

  return (
    <Modal title="Edit Profile" onClose={onClose} onSave={() => onSave(form)}>
      <Input
        label="Name"
        value={form.name || ""}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {!isRecruiter && (
        <>
          <Input label="Location" value={form.location || ""} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Input label="Phone"    value={form.phone    || ""} onChange={(e) => setForm({ ...form, phone:    e.target.value })} />
        </>
      )}
      {isRecruiter && (
        <>
          <Input label="Company Name"     value={form.companyName        || ""} onChange={(e) => setForm({ ...form, companyName:        e.target.value })} />
          <Input label="Industry"         value={form.industry           || ""} onChange={(e) => setForm({ ...form, industry:           e.target.value })} />
          <Input label="Company Size"     value={form.companySize        || ""} onChange={(e) => setForm({ ...form, companySize:        e.target.value })} />
          <Input label="Company Location" value={form.companyLocation    || ""} onChange={(e) => setForm({ ...form, companyLocation:    e.target.value })} />
          <Input label="Company Website"  value={form.companyWebsite     || ""} onChange={(e) => setForm({ ...form, companyWebsite:     e.target.value })} />
          <Input label="Description"      value={form.companyDescription || ""} onChange={(e) => setForm({ ...form, companyDescription: e.target.value })} />
        </>
      )}
    </Modal>
  );
}

function SkillsModal({ data, onClose, onSave }) {
  const [value, setValue] = useState("");
  useEffect(() => { setValue((data || []).join(", ")); }, [data]);

  return (
    <Modal
      title="Edit Skills"
      onClose={onClose}
      onSave={() => onSave(value.split(",").map((s) => s.trim()).filter(Boolean))}
    >
      <Input
        label="Skills (comma separated)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Modal>
  );
}

function ExperienceModal({ data, onClose, onSave }) {
  const [form, setForm] = useState({ role: "", company: "", duration: "", desc: "" });
  useEffect(() => { if (data) setForm(data); else setForm({ role: "", company: "", duration: "", desc: "" }); }, [data]);

  return (
    <Modal title={data ? "Edit Experience" : "Add Experience"} onClose={onClose} onSave={() => onSave(form)}>
      <Input label="Role"        value={form.role}     onChange={(e) => setForm({ ...form, role:     e.target.value })} />
      <Input label="Company"     value={form.company}  onChange={(e) => setForm({ ...form, company:  e.target.value })} />
      <Input label="Duration"    value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
      <Input label="Description" value={form.desc}     onChange={(e) => setForm({ ...form, desc:     e.target.value })} />
    </Modal>
  );
}

function EducationModal({ data, onClose, onSave }) {
  const [form, setForm] = useState({ degree: "", institute: "", year: "" });
  useEffect(() => { if (data) setForm(data); else setForm({ degree: "", institute: "", year: "" }); }, [data]);

  return (
    <Modal title={data ? "Edit Education" : "Add Education"} onClose={onClose} onSave={() => onSave(form)}>
      <Input label="Degree"    value={form.degree}    onChange={(e) => setForm({ ...form, degree:    e.target.value })} />
      <Input label="Institute" value={form.institute} onChange={(e) => setForm({ ...form, institute: e.target.value })} />
      <Input label="Year"      value={form.year}      onChange={(e) => setForm({ ...form, year:      e.target.value })} />
    </Modal>
  );
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
