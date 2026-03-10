
// import { Link } from "react-router-dom";

// const employmentColors = {
//   "Full-time":  { bg: "bg-blue-50",    border: "border-blue-100",   text: "text-blue-700"   },
//   "Part-time":  { bg: "bg-purple-50",  border: "border-purple-100", text: "text-purple-700" },
//   "Internship": { bg: "bg-amber-50",   border: "border-amber-100",  text: "text-amber-700"  },
//   "Contract":   { bg: "bg-emerald-50", border: "border-emerald-100",text: "text-emerald-700"},
// };

// const JobCard = ({ job }) => {
//   const typeStyle = employmentColors[job.employmentType] || employmentColors["Full-time"];

//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200 p-5 flex flex-col">

//       {/* Top row: avatar + type badge */}
//       <div className="flex items-start justify-between mb-4">
//         <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-base flex-shrink-0">
//           {job.companyName?.[0]?.toUpperCase() || job.title?.[0]?.toUpperCase() || "?"}
//         </div>
//         {job.employmentType && (
//           <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${typeStyle.bg} ${typeStyle.border} ${typeStyle.text}`}>
//             {job.employmentType}
//           </span>
//         )}
//       </div>

//       {/* Title & company */}
//       <h2 className="text-sm font-bold text-slate-900 leading-snug mb-1 line-clamp-2">
//         {job.title}
//       </h2>
//       <p className="text-xs text-slate-400 font-medium mb-3">
//         {job.companyName || "—"}
//       </p>

//       {/* Meta */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         {job.city && (
//           <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
//             📍 {job.city}
//           </span>
//         )}
//         {job.salary?.min && (
//           <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
//             💰 ₹{Number(job.salary.min).toLocaleString()}+
//           </span>
//         )}
//         {job.workplaceType && (
//           <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
//             🏢 {job.workplaceType}
//           </span>
//         )}
//       </div>

//       {/* Skills preview */}
//       {job.skillsRequired?.length > 0 && (
//         <div className="flex flex-wrap gap-1.5 mb-4">
//           {(Array.isArray(job.skillsRequired)
//             ? job.skillsRequired
//             : job.skillsRequired.split(",")
//           )
//             .slice(0, 3)
//             .map((s, i) => (
//               <span
//                 key={i}
//                 className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full"
//               >
//                 {s.trim()}
//               </span>
//             ))}
//           {(Array.isArray(job.skillsRequired)
//             ? job.skillsRequired
//             : job.skillsRequired.split(",")
//           ).length > 3 && (
//             <span className="text-xs text-slate-400 font-medium px-2 py-0.5">
//               +{(Array.isArray(job.skillsRequired) ? job.skillsRequired : job.skillsRequired.split(",")).length - 3} more
//             </span>
//           )}
//         </div>
//       )}

//       {/* Footer */}
//       <div className="mt-auto pt-3 border-t border-slate-100">
//         <Link
//           to={`/jobs/${job._id}`}
//           className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 px-4 py-2 rounded-xl transition cursor-pointer"
//         >
//           View Details →
//         </Link>
//       </div>

//     </div>
//   );
// };

// export default JobCard;
import { Link } from "react-router-dom";

const employmentColors = {
  "Full-time":  { bg: "bg-blue-50",    border: "border-blue-100",   text: "text-blue-700"   },
  "Part-time":  { bg: "bg-purple-50",  border: "border-purple-100", text: "text-purple-700" },
  "Internship": { bg: "bg-amber-50",   border: "border-amber-100",  text: "text-amber-700"  },
  "Contract":   { bg: "bg-emerald-50", border: "border-emerald-100",text: "text-emerald-700"},
};

const JobCard = ({ job, isApplied = false }) => {
  const typeStyle = employmentColors[job.employmentType] || employmentColors["Full-time"];

  const skills = Array.isArray(job.skillsRequired)
    ? job.skillsRequired
    : job.skillsRequired?.split(",") || [];

  return (
    <div className={`bg-white rounded-2xl border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5 flex flex-col
      ${isApplied ? "border-emerald-200 bg-emerald-50/30" : "border-slate-200 hover:border-slate-300"}`}
    >

      {/* Top row: avatar + type badge */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold text-base flex-shrink-0
          ${isApplied
            ? "bg-gradient-to-br from-emerald-500 to-teal-600"
            : "bg-gradient-to-br from-blue-600 to-indigo-600"
          }`}
        >
          {job.companyName?.[0]?.toUpperCase() || job.title?.[0]?.toUpperCase() || "?"}
        </div>

        <div className="flex items-center gap-2">
          {/* Applied badge */}
          {isApplied && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              ✓ Applied
            </span>
          )}
          {/* Employment type badge */}
          {job.employmentType && (
            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${typeStyle.bg} ${typeStyle.border} ${typeStyle.text}`}>
              {job.employmentType}
            </span>
          )}
        </div>
      </div>

      {/* Title & company */}
      <h2 className="text-sm font-bold text-slate-900 leading-snug mb-1 line-clamp-2">
        {job.title}
      </h2>
      <p className="text-xs text-slate-400 font-medium mb-3">
        {job.companyName || "—"}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.city && (
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
            📍 {job.city}
          </span>
        )}
        {job.salary?.min && (
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
            💰 ₹{Number(job.salary.min).toLocaleString()}+
          </span>
        )}
        {job.workplaceType && (
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
            🏢 {job.workplaceType}
          </span>
        )}
      </div>

      {/* Skills preview */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills.slice(0, 3).map((s, i) => (
            <span
              key={i}
              className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full"
            >
              {s.trim()}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="text-xs text-slate-400 font-medium px-2 py-0.5">
              +{skills.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-3 border-t border-slate-100">
        <Link
          to={`/jobs/${job._id}`}
          className={`w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer border
            ${isApplied
              ? "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
              : "text-blue-700 bg-blue-50 border-blue-100 hover:bg-blue-100 hover:border-blue-200"
            }`}
        >
          {isApplied ? "✓ Applied · View Details" : "View Details →"}
        </Link>
      </div>

    </div>
  );
};

export default JobCard;
