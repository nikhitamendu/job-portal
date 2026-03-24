// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const stats = [
//   { num: "50,000+", label: "Job Seekers" },
//   { num: "12,000+", label: "Open Roles"  },
//   { num: "4,800+",  label: "Companies"   },
//   { num: "98%",     label: "Satisfaction"},
// ];

// const features = [
//   { icon: "🎯", title: "Smart Job Matching",  desc: "Our algorithm matches your skills to the most relevant roles — no more endless scrolling."   },
//   { icon: "⚡", title: "One-Click Apply",     desc: "Your profile is your resume. Apply to jobs instantly with everything already filled in."       },
//   { icon: "📊", title: "Track Applications",  desc: "Real-time status updates from Applied to Shortlisted — always know where you stand."           },
//   { icon: "🏢", title: "Top Companies",       desc: "Connect with hiring managers at Google, Microsoft, Stripe, Amazon and thousands more."         },
//   { icon: "🔒", title: "Privacy First",       desc: "Your data is yours. Share your profile only with companies you choose to apply to."             },
//   { icon: "💬", title: "Recruiter Connect",   desc: "Let recruiters discover your profile and reach out directly — opportunities come to you."       },
// ];

// const companies = ["Google","Microsoft","Amazon","Stripe","Notion","Figma","Vercel","Airbnb","Razorpay","Zomato"];

// const liveJobs = [
//   { abbr:"G", bg:"bg-blue-700",   title:"Senior React Engineer", co:"Google",   loc:"Remote",    tag:"Full-time", tc:"text-blue-300",  tbg:"bg-blue-500/15"   },
//   { abbr:"N", bg:"bg-slate-800",  title:"Product Designer",      co:"Notion",   loc:"Bangalore", tag:"Hybrid",    tc:"text-indigo-300", tbg:"bg-indigo-500/15" },
//   { abbr:"R", bg:"bg-sky-700",    title:"Backend Engineer",      co:"Razorpay", loc:"Mumbai",    tag:"On-site",   tc:"text-emerald-300",tbg:"bg-emerald-500/10"},
//   { abbr:"S", bg:"bg-indigo-600", title:"Data Analyst",          co:"Stripe",   loc:"Hyderabad", tag:"Full-time", tc:"text-blue-300",  tbg:"bg-blue-500/15"   },
// ];

// const testimonials = [
//   { name:"Arjun Mehta",  role:"Frontend Engineer · Stripe",  av:"A", bg:"bg-blue-600",   text:"Found my role in 2 weeks. Every suggestion felt hand-picked for me."          },
//   { name:"Priya Sharma", role:"UX Designer · Notion",        av:"P", bg:"bg-violet-600", text:"Three interviews in one week. The tracker made everything effortless."         },
//   { name:"Ravi Kiran",   role:"Backend Engineer · Razorpay", av:"R", bg:"bg-sky-700",    text:"Posted a job and got 40 qualified applicants in just 3 days. Outstanding."     },
// ];

// const steps = [
//   { n:"01", icon:"👤", title:"Build Your Profile",  desc:"Add skills, experience, education and upload your resume. Your profile becomes your universal application." },
//   { n:"02", icon:"🔍", title:"Discover & Apply",    desc:"Browse thousands of jobs by role, location and salary. Apply with one click — no forms to fill."           },
//   { n:"03", icon:"🚀", title:"Get Hired",            desc:"Track your application in real time. Get shortlisted, interview, and land your dream role."                },
// ];

// export default function Home() {
//   const { user } = useAuth();

//   return (
//     <div className="bg-slate-50 overflow-x-hidden">

//       {/* ═══════════════════════════════
//           HERO
//       ═══════════════════════════════ */}
//       <section className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden px-5 pt-14 pb-16">

//         {/* bg effects */}
//         <div className="absolute inset-0 pointer-events-none"
//           style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"52px 52px" }} />
//         <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
//         <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

//         <div className="max-w-6xl mx-auto relative z-10">
//           <div className="grid lg:grid-cols-2 gap-10 items-center">

//             {/* ── Left ── */}
//             <div>
//               {/* badge */}
//               <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 rounded-full px-3.5 py-1.5 mb-5">
//                 <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
//                 <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
//                   12,000+ Jobs Available Now
//                 </span>
//               </div>

//               {/* headline */}
//               <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
//                 Land Your<br />
//                 <span className="text-amber-400 italic">Dream Job</span><br />
//                 Faster.
//               </h1>

//               <p className="text-sm text-white/50 leading-relaxed max-w-md mb-6">
//                 HireHub connects ambitious professionals with top companies.
//                 Smart matching. One-click apply. Real-time tracking.
//                 Your next chapter starts here.
//               </p>

//               {/* search */}
//               <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-xl max-w-md mb-5">
//                 <span className="pl-4 text-base">🔍</span>
//                 <input
//                   className="flex-1 px-3 py-3 text-sm text-slate-800 outline-none bg-transparent placeholder-slate-400"
//                   placeholder="Search jobs, companies, skills…"
//                   onKeyDown={(e) => { if (e.key === "Enter") window.location.href = "/jobs"; }}
//                 />
//                 <Link
//                   to="/jobs"
//                   className="m-1 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition"
//                 >
//                   Search
//                 </Link>
//               </div>

//               {/* popular tags */}
//               <div className="flex flex-wrap gap-1.5 mb-6">
//                 <span className="text-xs text-white/30 font-semibold self-center">Popular:</span>
//                 {["React Developer","UI/UX Designer","Data Analyst","Product Manager"].map(t => (
//                   <Link key={t} to="/jobs"
//                     className="text-xs font-semibold text-white/55 bg-white/8 border border-white/12 hover:border-blue-400/50 hover:text-blue-300 rounded-full px-3 py-1 transition"
//                   >{t}</Link>
//                 ))}
//               </div>

//               {/* CTAs */}
//               <div className="flex flex-wrap gap-2.5 mb-8">
//                 <Link to={user ? "/jobs" : "/register"}
//                   className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-900/40 transition hover:-translate-y-0.5"
//                 >
//                   Get Started Free →
//                 </Link>
//                 <Link to="/jobs"
//                   className="inline-flex items-center gap-1.5 bg-white/8 hover:bg-white/14 text-white/82 border border-white/15 text-sm font-semibold px-5 py-2.5 rounded-xl transition hover:-translate-y-0.5"
//                 >
//                   Browse Jobs
//                 </Link>
//               </div>

//               {/* notification chips */}
//               <div className="hidden sm:flex flex-wrap gap-2">
//                 {[
//                   { bg:"bg-blue-600",   icon:"✓",  title:"Application Sent",     sub:"Senior React Eng · Google"  },
//                   { bg:"bg-emerald-600",icon:"🎉", title:"You're Shortlisted!",   sub:"Product Designer · Notion"  },
//                   { bg:"bg-amber-500",  icon:"👁", title:"Profile Viewed",        sub:"by 3 Recruiters today"      },
//                 ].map((n,i) => (
//                   <div key={i} className="flex items-center gap-2.5 bg-white/6 border border-white/10 rounded-xl px-3 py-2">
//                     <div className={`w-7 h-7 rounded-lg ${n.bg} flex items-center justify-center text-sm flex-shrink-0`}>{n.icon}</div>
//                     <div>
//                       <p className="text-xs font-bold text-white">{n.title}</p>
//                       <p className="text-xs text-white/38">{n.sub}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ── Right: Live jobs panel ── */}
//             <div className="hidden lg:block bg-white/5 border border-white/12 rounded-2xl p-4 backdrop-blur-sm">

//               {/* header */}
//               <div className="flex items-center justify-between mb-3.5">
//                 <span className="text-xs font-bold text-white/38 tracking-widest uppercase">Latest Openings</span>
//                 <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
//                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//                   Live
//                 </span>
//               </div>

//               {/* job rows */}
//               <div className="space-y-2">
//                 {liveJobs.map((j,i) => (
//                   <div key={i} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/16 rounded-xl px-3 py-2.5 transition cursor-pointer group">
//                     <div className={`w-8 h-8 rounded-lg ${j.bg} flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0`}>{j.abbr}</div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-xs font-bold text-white/90 truncate">{j.title}</p>
//                       <p className="text-xs text-white/38 mt-0.5">{j.co} · {j.loc}</p>
//                     </div>
//                     <span className={`text-xs font-bold px-2.5 py-1 rounded-full border border-current ${j.tc} ${j.tbg} flex-shrink-0`}>{j.tag}</span>
//                   </div>
//                 ))}
//               </div>

//               <Link to="/jobs" className="block text-center text-xs font-bold text-white/30 hover:text-white/60 mt-3 transition">
//                 View all 12,000+ jobs →
//               </Link>

//               {/* mini stats */}
//               <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/8">
//                 {[
//                   { n:"4,800+", l:"Companies Hiring" },
//                   { n:"98%",    l:"Satisfaction"     },
//                   { n:"50K+",   l:"Users Hired"      },
//                   { n:"~1 day", l:"Avg. Response"    },
//                 ].map(({n,l},i) => (
//                   <div key={i} className="bg-white/5 rounded-xl px-3 py-2.5">
//                     <p className="text-base font-extrabold text-white tracking-tight">{n}</p>
//                     <p className="text-xs text-white/32 mt-0.5">{l}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════
//           TICKER
//       ═══════════════════════════════ */}
//       <div className="overflow-hidden bg-white border-t border-b border-slate-200 py-3">
//         <div className="flex gap-10 w-max" style={{ animation:"tick 22s linear infinite" }}>
//           {[...companies,...companies].map((c,i) => (
//             <div key={i} className="flex items-center gap-2 whitespace-nowrap text-xs font-bold text-slate-400 tracking-widest uppercase">
//               <span className="w-1 h-1 rounded-full bg-slate-300" />
//               {c}
//             </div>
//           ))}
//         </div>
//         <style>{`@keyframes tick { to { transform: translateX(-50%); } }`}</style>
//       </div>

//       {/* ═══════════════════════════════
//           STATS
//       ═══════════════════════════════ */}
//       <div className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 py-8 px-5">
//         <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
//           {stats.map(({num, label},i) => (
//             <div key={i} className="text-center">
//               <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{num}</p>
//               <p className="text-xs text-white/38 font-medium mt-1">{label}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ═══════════════════════════════
//           FEATURES
//       ═══════════════════════════════ */}
//       <section className="px-5 py-16 bg-slate-50">
//         <div className="max-w-6xl mx-auto">
//           <div className="mb-10">
//             <p className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-1">Why HireHub</p>
//             <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Everything you need<br />to get hired.</h2>
//             <p className="text-sm text-slate-500 mt-2 max-w-md leading-relaxed">Built for job seekers and recruiters alike. No friction, no noise — just results.</p>
//           </div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {features.map((f,i) => (
//               <div key={i} className="bg-white border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 rounded-2xl p-5 transition hover:-translate-y-1">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-lg mb-3">{f.icon}</div>
//                 <p className="text-sm font-bold text-slate-900 mb-1.5">{f.title}</p>
//                 <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════
//           HOW IT WORKS
//       ═══════════════════════════════ */}
//       <section className="px-5 py-16 bg-slate-100">
//         <div className="max-w-6xl mx-auto">
//           <div className="mb-10">
//             <p className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-1">How It Works</p>
//             <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Hired in 3 simple steps.</h2>
//           </div>
//           <div className="grid sm:grid-cols-3 gap-6">
//             {steps.map(({n, icon, title, desc}) => (
//               <div key={n} className="bg-white border border-slate-200 hover:border-blue-200 rounded-2xl p-5 relative transition hover:shadow-md">
//                 <span className="absolute top-4 right-5 text-4xl font-black text-slate-100 leading-none">{n}</span>
//                 <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-lg mb-3">{icon}</div>
//                 <p className="text-sm font-bold text-slate-900 mb-1.5">{title}</p>
//                 <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════
//           TESTIMONIALS
//       ═══════════════════════════════ */}
//       <section className="px-5 py-16 bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
//         <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/8 blur-2xl pointer-events-none" />

//         <div className="max-w-6xl mx-auto relative z-10">
//           <div className="mb-10">
//             <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-1">Testimonials</p>
//             <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Real people.<br />Real results.</h2>
//             <p className="text-sm text-white/45 mt-2 max-w-md leading-relaxed">Join thousands who found their next opportunity through HireHub.</p>
//           </div>
//           <div className="grid sm:grid-cols-3 gap-4">
//             {testimonials.map((t,i) => (
//               <div key={i} className="bg-white/6 border border-white/10 hover:bg-white/10 rounded-2xl p-5 transition hover:-translate-y-1">
//                 <div className="flex gap-0.5 mb-3">
//                   {[...Array(5)].map((_,j) => <span key={j} className="text-amber-400 text-xs">★</span>)}
//                 </div>
//                 <p className="text-xs text-white/62 italic leading-relaxed mb-4">"{t.text}"</p>
//                 <div className="flex items-center gap-2.5">
//                   <div className={`w-8 h-8 rounded-full ${t.bg} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>{t.av}</div>
//                   <div>
//                     <p className="text-xs font-bold text-white">{t.name}</p>
//                     <p className="text-xs text-white/35 mt-0.5">{t.role}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ═══════════════════════════════
//           DUAL CTA
//       ═══════════════════════════════ */}
//       <section className="px-5 py-16 bg-slate-50">
//         <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-4">

//           {/* Seekers */}
//           <div className="bg-gradient-to-br from-slate-900 to-[#0d2340] rounded-2xl p-7 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-blue-500/15 blur-2xl pointer-events-none" />
//             <div className="inline-flex items-center gap-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full px-3 py-1 mb-3">
//               <span className="text-xs font-bold tracking-widest uppercase text-blue-300">For Job Seekers</span>
//             </div>
//             <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug mb-2">
//               Find your next<br /><em className="text-amber-400">big opportunity.</em>
//             </h3>
//             <p className="text-xs text-white/45 leading-relaxed mb-4 max-w-xs">
//               Browse thousands of roles, apply instantly, and track every application in one clean dashboard.
//             </p>
//             <Link to={user ? "/jobs" : "/register"}
//               className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-blue-900/40 hover:-translate-y-0.5"
//             >
//               Start Job Search →
//             </Link>
//           </div>

//           {/* Recruiters */}
//           <div className="bg-gradient-to-br from-[#1e3a1e] to-[#14532d] rounded-2xl p-7 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />
//             <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1 mb-3">
//               <span className="text-xs font-bold tracking-widest uppercase text-emerald-300">For Recruiters</span>
//             </div>
//             <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug mb-2">
//               Hire the best<br /><em className="text-amber-400">talent faster.</em>
//             </h3>
//             <p className="text-xs text-white/45 leading-relaxed mb-4 max-w-xs">
//               Post jobs, manage applicants, and find your next star hire — all in one streamlined dashboard.
//             </p>
//             <Link to={user ? "/recruiter/dashboard" : "/register"}
//               className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-emerald-900/40 hover:-translate-y-0.5"
//             >
//               Post a Job →
//             </Link>
//           </div>

//         </div>
//       </section>

//       {/* ═══════════════════════════════
//           FINAL CTA
//       ═══════════════════════════════ */}
//       <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 px-5 py-16 text-center relative overflow-hidden">
//         <div className="absolute inset-0 pointer-events-none"
//           style={{ backgroundImage:"radial-gradient(ellipse 65% 70% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)" }} />
//         <div className="max-w-2xl mx-auto relative z-10">
//           <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
//             Your dream job is<br />one click away.
//           </h2>
//           <p className="text-sm text-white/55 mb-7">
//             Join 50,000+ professionals already on HireHub. Free forever for job seekers.
//           </p>
//           <div className="flex flex-wrap gap-3 justify-center">
//             <Link to="/register"
//               className="inline-flex items-center gap-1.5 bg-white text-blue-700 text-sm font-extrabold px-6 py-3 rounded-xl shadow-xl hover:-translate-y-0.5 transition"
//             >
//               Create Free Account →
//             </Link>
//             <Link to="/jobs"
//               className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/16 border border-white/25 text-white/80 text-sm font-semibold px-6 py-3 rounded-xl transition hover:-translate-y-0.5"
//             >
//               Browse Jobs
//             </Link>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const stats = [
  { num: "50,000+", label: "Job Seekers",  icon: "👥" },
  { num: "12,000+", label: "Open Roles",   icon: "💼" },
  { num: "4,800+",  label: "Companies",    icon: "🏢" },
  { num: "98%",     label: "Satisfaction", icon: "⭐" },
];

const features = [
  { icon: "🎯", title: "Smart Job Matching",  desc: "Our algorithm matches your skills to the most relevant roles — no more endless scrolling."   },
  { icon: "⚡", title: "One-Click Apply",     desc: "Your profile is your resume. Apply to jobs instantly with everything already filled in."       },
  { icon: "📊", title: "Track Applications",  desc: "Real-time status updates from Applied to Shortlisted — always know where you stand."           },
  { icon: "🏢", title: "Top Companies",       desc: "Connect with hiring managers at Google, Microsoft, Stripe, Amazon and thousands more."         },
  { icon: "🔒", title: "Privacy First",       desc: "Your data is yours. Share your profile only with companies you choose to apply to."             },
  { icon: "💬", title: "Recruiter Connect",   desc: "Let recruiters discover your profile and reach out directly — opportunities come to you."       },
];

const companies = ["Google","Microsoft","Amazon","Stripe","Notion","Figma","Vercel","Airbnb","Razorpay","Zomato"];

const liveJobs = [
  { abbr:"G", bg:"bg-blue-700",   title:"Senior React Engineer", co:"Google",   loc:"Remote",    tag:"Full-time", tc:"text-blue-300",   tbg:"bg-blue-500/15"    },
  { abbr:"N", bg:"bg-slate-800",  title:"Product Designer",      co:"Notion",   loc:"Bangalore", tag:"Hybrid",    tc:"text-indigo-300", tbg:"bg-indigo-500/15"  },
  { abbr:"R", bg:"bg-sky-700",    title:"Backend Engineer",      co:"Razorpay", loc:"Mumbai",    tag:"On-site",   tc:"text-emerald-300",tbg:"bg-emerald-500/10" },
  { abbr:"S", bg:"bg-indigo-600", title:"Data Analyst",          co:"Stripe",   loc:"Hyderabad", tag:"Full-time", tc:"text-blue-300",   tbg:"bg-blue-500/15"    },
];

const testimonials = [
  { name:"Arjun Mehta",  role:"Frontend Engineer · Stripe",  av:"A", bg:"bg-blue-600",   text:"Found my role in 2 weeks. Every suggestion felt hand-picked for me."      },
  { name:"Priya Sharma", role:"UX Designer · Notion",        av:"P", bg:"bg-violet-600", text:"Three interviews in one week. The tracker made everything effortless."     },
  { name:"Ravi Kiran",   role:"Backend Engineer · Razorpay", av:"R", bg:"bg-sky-700",    text:"Posted a job and got 40 qualified applicants in just 3 days. Outstanding." },
];

const steps = [
  { n:"01", icon:"👤", title:"Build Your Profile",  desc:"Add skills, experience, education and upload your resume. Your profile becomes your universal application." },
  { n:"02", icon:"🔍", title:"Discover & Apply",    desc:"Browse thousands of jobs by role, location and salary. Apply with one click — no forms to fill."           },
  { n:"03", icon:"🚀", title:"Get Hired",            desc:"Track your application in real time. Get shortlisted, interview, and land your dream role."                },
];

const categories = [
  { icon:"💻", label:"Technology",  count:"3,240 jobs" },
  { icon:"🎨", label:"Design",      count:"1,180 jobs" },
  { icon:"📈", label:"Marketing",   count:"890 jobs"   },
  { icon:"💰", label:"Finance",     count:"760 jobs"   },
  { icon:"🏥", label:"Healthcare",  count:"640 jobs"   },
  { icon:"📚", label:"Education",   count:"520 jobs"   },
  { icon:"⚙️", label:"Engineering", count:"2,100 jobs" },
  { icon:"🤝", label:"Sales",       count:"980 jobs"   },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="bg-slate-50 overflow-x-hidden">

      {/* ═══════════════════════════════
          HERO
      ═══════════════════════════════ */}
      <section className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden min-h-[92vh] flex items-center px-5 pt-14 pb-16">

        {/* bg effects */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"52px 52px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* ── Left Copy ── */}
            <div>
              {/* badge */}
              <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 rounded-full px-3.5 py-1.5 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
                  12,000+ Jobs Available Now
                </span>
              </div>

              {/* headline */}
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
                Land Your<br />
                <span className="text-amber-400 italic">Dream Job</span><br />
                Faster.
              </h1>

              <p className="text-sm text-white/50 leading-relaxed max-w-md mb-6">
                HireHub connects ambitious professionals with top companies.
                Smart matching. One-click apply. Real-time tracking.
                Your next chapter starts here.
              </p>

              {/* search */}
              <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-xl max-w-md mb-5">
                <span className="pl-4 text-base">🔍</span>
                <input
                  className="flex-1 px-3 py-3 text-sm text-slate-800 outline-none bg-transparent placeholder-slate-400"
                  placeholder="Search jobs, companies, skills…"
                  onKeyDown={(e) => { if (e.key === "Enter") window.location.href = "/jobs"; }}
                />
                <Link
                  to="/jobs"
                  className="m-1 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition"
                >
                  Search
                </Link>
              </div>

              {/* popular tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                <span className="text-xs text-white/30 font-semibold self-center">Popular:</span>
                {["React Developer","UI/UX Designer","Data Analyst","Product Manager"].map(t => (
                  <Link key={t} to="/jobs"
                    className="text-xs font-semibold text-white/55 bg-white/8 border border-white/12 hover:border-blue-400/50 hover:text-blue-300 rounded-full px-3 py-1 transition"
                  >{t}</Link>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                <Link to={user ? "/jobs" : "/register"}
                  className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-900/40 transition hover:-translate-y-0.5"
                >
                  Get Started Free →
                </Link>
                <Link to="/jobs"
                  className="inline-flex items-center gap-1.5 bg-white/8 hover:bg-white/14 text-white/82 border border-white/15 text-sm font-semibold px-5 py-2.5 rounded-xl transition hover:-translate-y-0.5"
                >
                  Browse Jobs
                </Link>
              </div>

              {/* notification chips */}
              <div className="hidden sm:flex flex-wrap gap-2">
                {[
                  { bg:"bg-blue-600",    icon:"✓",  title:"Application Sent",   sub:"Senior React Eng · Google" },
                  { bg:"bg-emerald-600", icon:"🎉", title:"You're Shortlisted!", sub:"Product Designer · Notion" },
                  { bg:"bg-amber-500",   icon:"👁", title:"Profile Viewed",      sub:"by 3 Recruiters today"    },
                ].map((n,i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white/6 border border-white/10 rounded-xl px-3 py-2">
                    <div className={`w-7 h-7 rounded-lg ${n.bg} flex items-center justify-center text-sm flex-shrink-0`}>{n.icon}</div>
                    <div>
                      <p className="text-xs font-bold text-white">{n.title}</p>
                      <p className="text-xs text-white/38">{n.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Hero Image with floating badges ── */}
            <div className="hidden lg:flex items-center justify-center relative">

              {/* glow rings */}
              <div className="absolute w-[460px] h-[460px] rounded-full bg-blue-500/10 border border-blue-500/10 pointer-events-none" />
              <div className="absolute w-[350px] h-[350px] rounded-full bg-indigo-500/8 pointer-events-none" />

              {/* image in organic rounded shape */}
              <div className="relative w-[400px] h-[490px]">

                <div className="absolute inset-x-10 bottom-0 top-0 rounded-[60%_60%_50%_50%/55%_55%_45%_45%] overflow-hidden border-4 border-blue-400/20 shadow-2xl shadow-black/50">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85&auto=format&fit=crop"
                    alt="Professional job seeker"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                </div>

                {/* floating badge — top right: Daily Job Post */}
                <div className="absolute top-8 -right-4 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-2xl shadow-black/30">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">💼</div>
                  <div>
                    <p className="text-xl font-black text-slate-900 leading-none">234+</p>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">Daily Job Post</p>
                  </div>
                </div>

                {/* floating badge — middle right: Profile views */}
                <div className="absolute top-1/2 -right-8 -translate-y-1/2 flex items-center gap-2.5 bg-white rounded-2xl px-4 py-3 shadow-2xl shadow-black/30">
                  <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-base">👁</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Profile Viewed</p>
                    <p className="text-xs text-slate-400">by 3 Recruiters today</p>
                  </div>
                </div>

                {/* floating badge — bottom left: Shortlisted */}
                <div className="absolute bottom-16 -left-6 flex items-center gap-2.5 bg-white rounded-2xl px-4 py-3 shadow-2xl shadow-black/30">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-base">🎉</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">You're Shortlisted!</p>
                    <p className="text-xs text-slate-400">Product Designer · Notion</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          TICKER
      ═══════════════════════════════ */}
      <div className="overflow-hidden bg-white border-t border-b border-slate-200 py-3">
        <div className="flex gap-10 w-max" style={{ animation:"tick 22s linear infinite" }}>
          {[...companies,...companies].map((c,i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap text-xs font-bold text-slate-400 tracking-widest uppercase">
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              {c}
            </div>
          ))}
        </div>
        <style>{`@keyframes tick { to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* ═══════════════════════════════
          STATS
      ═══════════════════════════════ */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 py-8 px-5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(({num, label, icon},i) => (
            <div key={i} className="text-center">
              <div className="text-2xl mb-1">{icon}</div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{num}</p>
              <p className="text-xs text-white/38 font-medium mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════
          TRENDING CATEGORIES
      ═══════════════════════════════ */}
      <section className="px-5 py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-2">Explore</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Trending Categories</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">Find opportunities across the most in-demand fields and industries.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((c,i) => (
              <Link key={i} to="/jobs"
                className="group bg-white hover:bg-blue-700 border border-slate-200 hover:border-blue-700 rounded-2xl p-5 flex flex-col items-center text-center transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition">{c.icon}</div>
                <p className="text-sm font-bold text-slate-800 group-hover:text-white mb-1">{c.label}</p>
                <p className="text-xs text-slate-400 group-hover:text-blue-200 font-medium">{c.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          FEATURES
      ═══════════════════════════════ */}
      <section className="px-5 py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-1">Why HireHub</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Everything you need<br />to get hired.</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-md leading-relaxed">Built for job seekers and recruiters alike. No friction, no noise — just results.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f,i) => (
              <div key={i} className="bg-white border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 rounded-2xl p-5 transition hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-lg mb-3">{f.icon}</div>
                <p className="text-sm font-bold text-slate-900 mb-1.5">{f.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════ */}
      <section className="px-5 py-16 bg-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-1">How It Works</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Hired in 3 simple steps.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map(({n, icon, title, desc}) => (
              <div key={n} className="bg-white border border-slate-200 hover:border-blue-200 rounded-2xl p-5 relative transition hover:shadow-md">
                <span className="absolute top-4 right-5 text-4xl font-black text-slate-100 leading-none">{n}</span>
                <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-lg mb-3">{icon}</div>
                <p className="text-sm font-bold text-slate-900 mb-1.5">{title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════ */}
      <section className="px-5 py-16 bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/8 blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest uppercase text-blue-400 mb-1">Testimonials</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Real people.<br />Real results.</h2>
            <p className="text-sm text-white/45 mt-2 max-w-md leading-relaxed">Join thousands who found their next opportunity through HireHub.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {testimonials.map((t,i) => (
              <div key={i} className="bg-white/6 border border-white/10 hover:bg-white/10 rounded-2xl p-5 transition hover:-translate-y-1">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_,j) => <span key={j} className="text-amber-400 text-xs">★</span>)}
                </div>
                <p className="text-xs text-white/62 italic leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full ${t.bg} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>{t.av}</div>
                  <div>
                    <p className="text-xs font-bold text-white">{t.name}</p>
                    <p className="text-xs text-white/35 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          DUAL CTA
      ═══════════════════════════════ */}
      <section className="px-5 py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-4">

          {/* Seekers */}
          <div className="bg-gradient-to-br from-slate-900 to-[#0d2340] rounded-2xl p-7 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-blue-500/15 blur-2xl pointer-events-none" />
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full px-3 py-1 mb-3">
              <span className="text-xs font-bold tracking-widest uppercase text-blue-300">For Job Seekers</span>
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug mb-2">
              Find your next<br /><em className="text-amber-400">big opportunity.</em>
            </h3>
            <p className="text-xs text-white/45 leading-relaxed mb-4 max-w-xs">
              Browse thousands of roles, apply instantly, and track every application in one clean dashboard.
            </p>
            <Link to={user ? "/jobs" : "/register"}
              className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-blue-900/40 hover:-translate-y-0.5"
            >
              Start Job Search →
            </Link>
          </div>

          {/* Recruiters */}
          <div className="bg-gradient-to-br from-[#1e3a1e] to-[#14532d] rounded-2xl p-7 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none" />
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1 mb-3">
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-300">For Recruiters</span>
            </div>
            <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug mb-2">
              Hire the best<br /><em className="text-amber-400">talent faster.</em>
            </h3>
            <p className="text-xs text-white/45 leading-relaxed mb-4 max-w-xs">
              Post jobs, manage applicants, and find your next star hire — all in one streamlined dashboard.
            </p>
            <Link to={user ? "/recruiter/dashboard" : "/register"}
              className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-emerald-900/40 hover:-translate-y-0.5"
            >
              Post a Job →
            </Link>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════
          FINAL CTA
      ═══════════════════════════════ */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 px-5 py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:"radial-gradient(ellipse 65% 70% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)" }} />
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
            Your dream job is<br />one click away.
          </h2>
          <p className="text-sm text-white/55 mb-7">
            Join 50,000+ professionals already on HireHub. Free forever for job seekers.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/register"
              className="inline-flex items-center gap-1.5 bg-white text-blue-700 text-sm font-extrabold px-6 py-3 rounded-xl shadow-xl hover:-translate-y-0.5 transition"
            >
              Create Free Account →
            </Link>
            <Link to="/jobs"
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/16 border border-white/25 text-white/80 text-sm font-semibold px-6 py-3 rounded-xl transition hover:-translate-y-0.5"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
