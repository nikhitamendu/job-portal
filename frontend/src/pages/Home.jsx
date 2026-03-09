// // import { Link } from "react-router-dom";

// // export default function Home() {
// //   return (
// //     <div className="bg-gray-50">
// //       {/* ================= HERO SECTION ================= */}
// //       <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
// //         <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          
// //           {/* TEXT */}
// //           <div>
// //             <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
// //               Find Your Dream Job <br /> Build Your Career
// //             </h1>
// //             <p className="text-lg text-blue-100 mb-8">
// //               Explore opportunities, apply easily, and grow your career
// //               with trusted companies.
// //             </p>

// //             <div className="flex gap-4">
// //               <Link
// //                 to="/login"
// //                 className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
// //               >
// //                 Get Started
// //               </Link>

// //               <Link
// //                 to="/register"
// //                 className="border border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition"
// //               >
// //                 Create Account
// //               </Link>
// //             </div>
// //           </div>

// //           {/* IMAGE */}
// //           <div className="hidden md:block">
// //             <img
// //               src="https://img.freepik.com/free-vector/flat-employment-agency-search-new-employees-hire_88138-802.jpg?semt=ais_hybrid&w=740&q=80"
// //               alt="Job search illustration"
// //               className="w-full"
// //             />
// //           </div>
// //         </div>
// //       </section>

// //       {/* ================= STATS SECTION ================= */}
// //       <section className="py-16">
// //         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
// //           <StatCard title="1000+" subtitle="Jobs Available" />
// //           <StatCard title="500+" subtitle="Companies Hiring" />
// //           <StatCard title="10k+" subtitle="Active Job Seekers" />
// //         </div>
// //       </section>

// //       {/* ================= ACTION SECTION ================= */}
// //       <section className="py-16 bg-white">
// //         <div className="max-w-6xl mx-auto px-6 text-center mb-12">
// //           <h2 className="text-3xl font-bold mb-3">
// //             Everything You Need in One Place
// //           </h2>
// //           <p className="text-gray-600">
// //             Simple tools to help you move forward in your career
// //           </p>
// //         </div>

// //         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
// //           <ActionCard
// //             img="https://static.vecteezy.com/system/resources/previews/040/158/453/non_2x/looking-for-a-new-job-career-or-job-search-looking-for-opportunities-looking-for-job-vacancies-free-vector.jpg"
// //             title="Browse Jobs"
// //             desc="Search and apply for jobs that match your skills and interests."
// //             link="/jobs"
// //             btn="Explore Jobs"
// //           />

// //           <ActionCard
// //             img="https://easy.jobs/wp-content/uploads/2021/04/How-To-Write-A-Great-Job-Posting-With-Examples.png"
// //             title="Post a Job"
// //             desc="Hire top talent by posting job openings easily."
// //             link="/post-job"
// //             btn="Post Job"
// //           />

// //           <ActionCard
// //             img="https://cdn.sanity.io/images/jow1kam4/production/2b1271c56cc216b6087da7ed29ed9d9aa973289c-2940x1588.png?w=3840&q=75&fit=clip&auto=format"
// //             title="Your Profile"
// //             desc="Manage your profile and track job applications."
// //             link="/profile"
// //             btn="View Profile"
// //           />
// //         </div>
// //       </section>

// //       {/* ================= FINAL CTA ================= */}
// //       <section className="py-16 text-center bg-gray-50">
// //         <h2 className="text-3xl font-bold mb-3">
// //           Ready to take the next step?
// //         </h2>
// //         <p className="text-gray-600 mb-6">
// //           Join thousands of job seekers building their careers
// //         </p>
// //         <Link
// //           to="/register"
// //           className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
// //         >
// //           Join Now
// //         </Link>
// //       </section>
// //     </div>
// //   );
// // }

// // /* ================= SMALL REUSABLE COMPONENTS ================= */

// // function StatCard({ title, subtitle }) {
// //   return (
// //     <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
// //       <h2 className="text-3xl font-bold text-blue-600">{title}</h2>
// //       <p className="text-gray-600 mt-2">{subtitle}</p>
// //     </div>
// //   );
// // }

// // function ActionCard({ img, title, desc, link, btn }) {
// //   return (
// //     <div className="border rounded-xl p-6 text-center hover:shadow-md transition">
// //       <img
// //         src={img}
// //         alt={title}
// //         className="h-32 mx-auto mb-4"
// //       />
// //       <h3 className="text-xl font-bold mb-2">{title}</h3>
// //       <p className="text-gray-600 mb-4">{desc}</p>
// //       <Link
// //         to={link}
// //         className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
// //       >
// //         {btn}
// //       </Link>
// //     </div>
// //   );
// // }
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Home() {
//   const { user } = useAuth();

//   const stats = [
//     { num: "50,000+", label: "Job Seekers" },
//     { num: "12,000+", label: "Open Roles" },
//     { num: "4,800+",  label: "Companies"  },
//     { num: "98%",     label: "Satisfaction"},
//   ];

//   const features = [
//     {
//       icon: "🎯",
//       title: "Smart Job Matching",
//       desc: "Our algorithm matches your skills and experience to the most relevant roles — no more endless scrolling.",
//     },
//     {
//       icon: "⚡",
//       title: "One-Click Apply",
//       desc: "Your profile is your resume. Apply to jobs instantly with everything already filled in.",
//     },
//     {
//       icon: "📊",
//       title: "Track Applications",
//       desc: "Know exactly where you stand. Real-time status updates from Applied to Shortlisted.",
//     },
//     {
//       icon: "🏢",
//       title: "Top Companies",
//       desc: "Connect directly with hiring managers at Google, Microsoft, Stripe, Amazon and thousands more.",
//     },
//     {
//       icon: "🔒",
//       title: "Privacy First",
//       desc: "Your data, your control. Share your profile only with companies you choose to apply to.",
//     },
//     {
//       icon: "💬",
//       title: "Recruiter Connect",
//       desc: "Recruiters can discover your profile and reach out directly — opportunities find you.",
//     },
//   ];

//   const companies = ["Google", "Microsoft", "Amazon", "Stripe", "Notion", "Figma", "Vercel", "Airbnb"];

//   const testimonials = [
//     {
//       name: "Arjun Mehta",
//       role: "Frontend Engineer, Stripe",
//       avatar: "A",
//       color: "from-blue-500 to-indigo-600",
//       text: "Found my current role within 2 weeks of signing up. The job matching is genuinely impressive — every suggestion felt relevant.",
//     },
//     {
//       name: "Priya Sharma",
//       role: "UX Designer, Notion",
//       avatar: "P",
//       color: "from-violet-500 to-purple-600",
//       text: "HireHub helped me land 3 interviews in a single week. The dashboard makes tracking so easy I never lost track of where I stood.",
//     },
//     {
//       name: "Ravi Kiran",
//       role: "Backend Engineer, Razorpay",
//       avatar: "R",
//       color: "from-emerald-500 to-teal-600",
//       text: "As a recruiter, I posted a job and got 40 qualified applicants in 3 days. The quality of candidates here is outstanding.",
//     },
//   ];

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

//         .hh-page { font-family: 'Outfit', sans-serif; background: #f8f9ff; overflow-x: hidden; }
//         .hh-display { font-family: 'Syne', sans-serif; }

//         /* ── Hero ── */
//         .hh-hero {
//           background: linear-gradient(135deg, #0a0f1e 0%, #0d2340 45%, #0f1a35 100%);
//           position: relative; overflow: hidden;
//           padding: 5rem 1.5rem 6rem;
//         }
//         .hh-hero::before {
//           content: '';
//           position: absolute; inset: 0;
//           background: radial-gradient(ellipse 80% 60% at 70% 40%, rgba(59,130,246,0.18) 0%, transparent 70%),
//                       radial-gradient(ellipse 50% 40% at 20% 80%, rgba(99,102,241,0.12) 0%, transparent 60%);
//         }

//         /* Grid overlay */
//         .hh-grid {
//           position: absolute; inset: 0; pointer-events: none;
//           background-image:
//             linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
//           background-size: 60px 60px;
//         }

//         /* Floating orbs */
//         .hh-orb1 {
//           position: absolute; width: 500px; height: 500px;
//           border-radius: 50%; top: -150px; right: -100px;
//           background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%);
//           animation: orbFloat 8s ease-in-out infinite;
//         }
//         .hh-orb2 {
//           position: absolute; width: 300px; height: 300px;
//           border-radius: 50%; bottom: -50px; left: -50px;
//           background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
//           animation: orbFloat 10s ease-in-out infinite reverse;
//         }
//         @keyframes orbFloat {
//           0%, 100% { transform: translateY(0) scale(1); }
//           50%       { transform: translateY(-30px) scale(1.05); }
//         }

//         /* Animated badge */
//         .hh-badge {
//           display: inline-flex; align-items: center; gap: 0.5rem;
//           background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.35);
//           border-radius: 100px; padding: 0.4rem 1rem;
//           animation: fadeSlideDown 0.6s ease both;
//         }
//         .hh-badge-dot {
//           width: 8px; height: 8px; border-radius: 50%; background: #60a5fa;
//           box-shadow: 0 0 8px #60a5fa;
//           animation: pulse 2s ease-in-out infinite;
//         }
//         @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }

//         /* Hero headline */
//         .hh-h1 {
//           font-size: clamp(2.8rem, 6vw, 5.5rem);
//           font-weight: 800; color: #fff;
//           line-height: 1.05; letter-spacing: -0.04em;
//           animation: fadeSlideUp 0.7s 0.1s ease both;
//         }
//         .hh-h1-accent { color: #fbbf24; font-style: italic; }

//         .hh-hero-sub {
//           font-size: clamp(1rem, 2vw, 1.15rem);
//           color: rgba(255,255,255,0.5); line-height: 1.7; max-width: 540px;
//           animation: fadeSlideUp 0.7s 0.2s ease both;
//         }

//         /* CTA buttons */
//         .hh-cta-row { animation: fadeSlideUp 0.7s 0.3s ease both; }
//         .hh-btn-primary {
//           display: inline-flex; align-items: center; gap: 0.5rem;
//           background: #2563eb; color: white;
//           font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 700;
//           padding: 0.8rem 1.8rem; border-radius: 12px; border: none;
//           cursor: pointer; text-decoration: none;
//           box-shadow: 0 4px 24px rgba(37,99,235,0.45);
//           transition: all 0.2s;
//         }
//         .hh-btn-primary:hover { background: #1d4ed8; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,99,235,0.5); }

//         .hh-btn-secondary {
//           display: inline-flex; align-items: center; gap: 0.5rem;
//           background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.85);
//           font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 600;
//           padding: 0.8rem 1.8rem; border-radius: 12px;
//           border: 1px solid rgba(255,255,255,0.15);
//           cursor: pointer; text-decoration: none; backdrop-filter: blur(8px);
//           transition: all 0.2s;
//         }
//         .hh-btn-secondary:hover { background: rgba(255,255,255,0.14); transform: translateY(-2px); }

//         /* Floating cards */
//         .hh-float-card {
//           background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
//           backdrop-filter: blur(12px); border-radius: 16px; padding: 1rem 1.25rem;
//           animation: fadeSlideUp 0.7s 0.5s ease both;
//         }
//         .hh-float-card-right {
//           background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
//           backdrop-filter: blur(12px); border-radius: 16px; padding: 1rem 1.25rem;
//           animation: fadeSlideUp 0.7s 0.65s ease both;
//         }

//         /* Search bar */
//         .hh-search-bar {
//           display: flex; align-items: center; gap: 0; max-width: 560px;
//           background: white; border-radius: 14px;
//           box-shadow: 0 8px 40px rgba(0,0,0,0.18);
//           overflow: hidden;
//           animation: fadeSlideUp 0.7s 0.45s ease both;
//         }
//         .hh-search-input {
//           flex: 1; padding: 0.9rem 1.2rem; border: none; outline: none;
//           font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: #1e293b;
//           background: transparent;
//         }
//         .hh-search-btn {
//           padding: 0.7rem 1.4rem; background: #2563eb; color: white; border: none;
//           font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 700;
//           cursor: pointer; transition: background 0.2s; margin: 0.25rem; border-radius: 10px;
//         }
//         .hh-search-btn:hover { background: #1d4ed8; }

//         /* Animations */
//         @keyframes fadeSlideUp   { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
//         @keyframes fadeSlideDown { from { opacity:0; transform:translateY(-12px) } to { opacity:1; transform:translateY(0) } }

//         /* ── Stats ── */
//         .hh-stats { background: #1e293b; padding: 2.5rem 1.5rem; }
//         .hh-stat-num {
//           font-family: 'Syne', sans-serif;
//           font-size: 2.2rem; font-weight: 800; color: #fff; letter-spacing: -0.04em; line-height: 1;
//         }
//         .hh-stat-lbl { font-size: 0.78rem; color: rgba(255,255,255,0.4); font-weight: 500; margin-top: 0.25rem; }

//         /* ── Companies ticker ── */
//         .hh-ticker-wrap { overflow: hidden; background: white; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 1rem 0; }
//         .hh-ticker { display: flex; gap: 3rem; animation: ticker 20s linear infinite; width: max-content; }
//         @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
//         .hh-ticker-item {
//           display: flex; align-items: center; gap: 0.5rem;
//           font-family: 'Syne', sans-serif; font-size: 0.85rem; font-weight: 700;
//           color: #94a3b8; letter-spacing: 0.05em; text-transform: uppercase; white-space: nowrap;
//         }

//         /* ── Sections ── */
//         .hh-section { padding: 5rem 1.5rem; }
//         .hh-section-dark { padding: 5rem 1.5rem; background: #0f172a; }
//         .hh-section-alt { padding: 5rem 1.5rem; background: #f1f5f9; }

//         .hh-eyebrow {
//           font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em;
//           text-transform: uppercase; color: #3b82f6; margin-bottom: 0.75rem;
//         }
//         .hh-section-title {
//           font-family: 'Syne', sans-serif;
//           font-size: clamp(1.8rem, 3.5vw, 2.8rem);
//           font-weight: 800; color: #0f172a; line-height: 1.15; letter-spacing: -0.03em;
//         }
//         .hh-section-title-light { color: #fff; }
//         .hh-section-sub { font-size: 1rem; color: #64748b; max-width: 480px; line-height: 1.7; margin-top: 0.75rem; }
//         .hh-section-sub-light { color: rgba(255,255,255,0.5); }

//         /* ── Feature cards ── */
//         .hh-feature-card {
//           background: white; border: 1px solid #e2e8f0; border-radius: 18px;
//           padding: 1.75rem; transition: all 0.25s;
//         }
//         .hh-feature-card:hover {
//           border-color: #bfdbfe; box-shadow: 0 8px 32px rgba(59,130,246,0.12);
//           transform: translateY(-4px);
//         }
//         .hh-feature-icon {
//           width: 3rem; height: 3rem; border-radius: 12px;
//           background: linear-gradient(135deg, #eff6ff, #dbeafe);
//           display: flex; align-items: center; justify-content: center;
//           font-size: 1.3rem; margin-bottom: 1rem;
//         }
//         .hh-feature-title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: #0f172a; margin-bottom: 0.5rem; }
//         .hh-feature-desc { font-size: 0.85rem; color: #64748b; line-height: 1.7; }

//         /* ── Testimonials ── */
//         .hh-testi-card {
//           background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
//           backdrop-filter: blur(12px); border-radius: 20px; padding: 1.75rem;
//           transition: all 0.25s;
//         }
//         .hh-testi-card:hover { background: rgba(255,255,255,0.1); transform: translateY(-4px); }
//         .hh-testi-text { font-size: 0.92rem; color: rgba(255,255,255,0.7); line-height: 1.75; font-style: italic; margin-bottom: 1.25rem; }
//         .hh-testi-name { font-size: 0.85rem; font-weight: 700; color: #fff; }
//         .hh-testi-role { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-top: 0.15rem; }

//         /* ── CTA section ── */
//         .hh-cta-section {
//           background: linear-gradient(135deg, #1e40af, #1d4ed8, #2563eb);
//           padding: 5rem 1.5rem; text-align: center; position: relative; overflow: hidden;
//         }
//         .hh-cta-section::before {
//           content: ''; position: absolute; inset: 0;
//           background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%);
//         }
//         .hh-cta-title {
//           font-family: 'Syne', sans-serif;
//           font-size: clamp(2rem, 4vw, 3.5rem);
//           font-weight: 800; color: white; letter-spacing: -0.04em; line-height: 1.1;
//           position: relative; z-index: 1;
//         }
//         .hh-cta-sub { font-size: 1rem; color: rgba(255,255,255,0.65); margin-top: 0.75rem; position: relative; z-index: 1; }
//         .hh-btn-white {
//           display: inline-flex; align-items: center; gap: 0.5rem;
//           background: white; color: #1d4ed8;
//           font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 800;
//           padding: 0.85rem 2rem; border-radius: 12px; border: none;
//           cursor: pointer; text-decoration: none; transition: all 0.2s;
//           box-shadow: 0 4px 24px rgba(0,0,0,0.2);
//           position: relative; z-index: 1;
//         }
//         .hh-btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.25); }

//         /* ── How it works ── */
//         .hh-step-num {
//           font-family: 'Syne', sans-serif;
//           font-size: 3.5rem; font-weight: 800; color: #e2e8f0;
//           line-height: 1; letter-spacing: -0.05em;
//         }
//         .hh-step-title { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 700; color: #0f172a; margin: 0.5rem 0; }
//         .hh-step-desc { font-size: 0.85rem; color: #64748b; line-height: 1.7; }

//         /* Responsive */
//         @media (max-width: 768px) {
//           .hh-hero { padding: 3.5rem 1.25rem 4rem; }
//           .hh-section, .hh-section-dark, .hh-section-alt { padding: 3.5rem 1.25rem; }
//           .hh-cta-section { padding: 3.5rem 1.25rem; }
//           .hh-stats { padding: 2rem 1.25rem; }
//         }
//       `}</style>

//       <div className="hh-page">

//         {/* ══════════════════════════════
//             HERO
//         ══════════════════════════════ */}
//         <section className="hh-hero">
//           <div className="hh-grid" />
//           <div className="hh-orb1" />
//           <div className="hh-orb2" />

//           <div style={{ maxWidth: "72rem", margin: "0 auto", position: "relative", zIndex: 1 }}>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center" }}>

//               {/* Left content */}
//               <div style={{ maxWidth: "680px" }}>
//                 {/* Badge */}
//                 <div className="hh-badge" style={{ marginBottom: "1.5rem" }}>
//                   <div className="hh-badge-dot" />
//                   <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.75)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
//                     12,000+ Jobs Available Now
//                   </span>
//                 </div>

//                 {/* Headline */}
//                 <h1 className="hh-h1 hh-display" style={{ marginBottom: "1.25rem" }}>
//                   Land Your<br />
//                   <span className="hh-h1-accent">Dream Job</span><br />
//                   Faster.
//                 </h1>

//                 <p className="hh-hero-sub" style={{ marginBottom: "2rem" }}>
//                   HireHub connects ambitious professionals with top companies.
//                   Smart matching. One-click apply. Real-time tracking.
//                   Your next chapter starts here.
//                 </p>

//                 {/* Search bar */}
//                 <div className="hh-search-bar" style={{ marginBottom: "1.5rem" }}>
//                   <span style={{ padding: "0 0 0 1.2rem", fontSize: "1rem" }}>🔍</span>
//                   <input
//                     className="hh-search-input"
//                     placeholder="Search jobs, companies, skills…"
//                     onKeyDown={(e) => { if (e.key === "Enter") window.location.href = "/jobs"; }}
//                   />
//                   <Link to="/jobs" className="hh-search-btn" style={{ textDecoration: "none" }}>
//                     Search Jobs
//                   </Link>
//                 </div>

//                 {/* CTA row */}
//                 <div className="hh-cta-row" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
//                   <Link to="/register" className="hh-btn-primary">
//                     Get Started Free →
//                   </Link>
//                   <Link to="/jobs" className="hh-btn-secondary">
//                     Browse Jobs
//                   </Link>
//                 </div>
//               </div>

//               {/* Floating info cards — hidden on mobile */}
//               <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
//                 <div className="hh-float-card">
//                   <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
//                     <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "10px", background: "linear-gradient(135deg,#2563eb,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>✓</div>
//                     <div>
//                       <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "white" }}>Application Sent</p>
//                       <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)" }}>Senior React Engineer · Google</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="hh-float-card-right">
//                   <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
//                     <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "10px", background: "linear-gradient(135deg,#059669,#10b981)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🎉</div>
//                     <div>
//                       <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "white" }}>You're Shortlisted!</p>
//                       <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)" }}>Product Designer · Notion</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="hh-float-card">
//                   <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
//                     <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "10px", background: "linear-gradient(135deg,#d97706,#f59e0b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>👁</div>
//                     <div>
//                       <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "white" }}>Profile Viewed</p>
//                       <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)" }}>by 3 Recruiters today</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </section>

//         {/* ══════════════════════════════
//             STATS
//         ══════════════════════════════ */}
//         <section className="hh-stats">
//           <div style={{ maxWidth: "72rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
//             {stats.map(({ num, label }, i) => (
//               <div key={i} style={{ textAlign: "center", padding: "0.5rem" }}>
//                 <div className="hh-stat-num hh-display">{num}</div>
//                 <div className="hh-stat-lbl">{label}</div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ══════════════════════════════
//             COMPANIES TICKER
//         ══════════════════════════════ */}
//         <div className="hh-ticker-wrap">
//           <div className="hh-ticker">
//             {[...companies, ...companies].map((c, i) => (
//               <div key={i} className="hh-ticker-item">
//                 <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#cbd5e1", display: "inline-block" }} />
//                 {c}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ══════════════════════════════
//             FEATURES
//         ══════════════════════════════ */}
//         <section className="hh-section" style={{ background: "#f8f9ff" }}>
//           <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
//             <div style={{ marginBottom: "3rem" }}>
//               <p className="hh-eyebrow">Why HireHub</p>
//               <h2 className="hh-section-title hh-display">
//                 Everything you need<br />to get hired.
//               </h2>
//               <p className="hh-section-sub">
//                 Built for job seekers and recruiters alike. No friction, no noise — just the tools that move careers forward.
//               </p>
//             </div>

//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
//               {features.map((f, i) => (
//                 <div key={i} className="hh-feature-card">
//                   <div className="hh-feature-icon">{f.icon}</div>
//                   <div className="hh-feature-title hh-display">{f.title}</div>
//                   <div className="hh-feature-desc">{f.desc}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ══════════════════════════════
//             HOW IT WORKS
//         ══════════════════════════════ */}
//         <section className="hh-section-alt">
//           <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
//             <div style={{ marginBottom: "3rem" }}>
//               <p className="hh-eyebrow">How It Works</p>
//               <h2 className="hh-section-title hh-display">
//                 Hired in 3 simple steps.
//               </h2>
//             </div>

//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
//               {[
//                 { n: "01", icon: "👤", title: "Build Your Profile", desc: "Add your skills, experience, education and upload your resume. Your profile becomes your universal application." },
//                 { n: "02", icon: "🔍", title: "Discover & Apply",   desc: "Browse thousands of jobs filtered by role, location, type and salary. Apply with one click — no forms to fill." },
//                 { n: "03", icon: "🚀", title: "Get Hired",          desc: "Track your application status in real time. Get shortlisted, schedule interviews, and land your dream role." },
//               ].map(({ n, icon, title, desc }) => (
//                 <div key={n} style={{ display: "flex", flexDirection: "column" }}>
//                   <div className="hh-step-num hh-display">{n}</div>
//                   <div style={{ width: "3rem", height: "3rem", borderRadius: "12px", background: "white", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", margin: "0.75rem 0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
//                     {icon}
//                   </div>
//                   <div className="hh-step-title hh-display">{title}</div>
//                   <div className="hh-step-desc">{desc}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ══════════════════════════════
//             TESTIMONIALS
//         ══════════════════════════════ */}
//         <section className="hh-section-dark">
//           <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
//             <div style={{ marginBottom: "3rem" }}>
//               <p className="hh-eyebrow">Testimonials</p>
//               <h2 className="hh-section-title hh-display hh-section-title-light">
//                 Real people.<br />Real results.
//               </h2>
//               <p className="hh-section-sub hh-section-sub-light">
//                 Join thousands of professionals who found their next opportunity through HireHub.
//               </p>
//             </div>

//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
//               {testimonials.map((t, i) => (
//                 <div key={i} className="hh-testi-card">
//                   <div style={{ display: "flex", gap: "2px", marginBottom: "1rem" }}>
//                     {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#fbbf24", fontSize: "0.85rem" }}>★</span>)}
//                   </div>
//                   <p className="hh-testi-text">"{t.text}"</p>
//                   <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
//                     <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "50%", background: `linear-gradient(135deg, ${t.color.replace("from-","").replace(" to-",", ").split(" ")[0]} var(--tw-gradient-from-position, ), ${t.color.split(" to-")[1]})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
//                       {t.avatar}
//                     </div>
//                     <div>
//                       <div className="hh-testi-name">{t.name}</div>
//                       <div className="hh-testi-role">{t.role}</div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ══════════════════════════════
//             DUAL CTA — FOR SEEKERS & RECRUITERS
//         ══════════════════════════════ */}
//         <section className="hh-section" style={{ background: "#f8f9ff" }}>
//           <div style={{ maxWidth: "72rem", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>

//             {/* Job Seeker card */}
//             <div style={{ background: "linear-gradient(135deg, #0f172a, #0d2340)", borderRadius: "24px", padding: "2.5rem", position: "relative", overflow: "hidden" }}>
//               <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)" }} />
//               <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#60a5fa", marginBottom: "0.75rem" }}>For Job Seekers</p>
//               <h3 className="hh-display" style={{ fontSize: "1.7rem", fontWeight: 800, color: "white", lineHeight: 1.2, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
//                 Find your next<br /><em style={{ color: "#fbbf24" }}>big opportunity.</em>
//               </h3>
//               <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
//                 Browse thousands of roles, apply instantly, and track every application in one clean dashboard.
//               </p>
//               <Link to={user ? "/jobs" : "/register"} className="hh-btn-primary" style={{ fontSize: "0.85rem", padding: "0.65rem 1.4rem" }}>
//                 Start Job Search →
//               </Link>
//             </div>

//             {/* Recruiter card */}
//             <div style={{ background: "linear-gradient(135deg, #1e3a1e, #14532d)", borderRadius: "24px", padding: "2.5rem", position: "relative", overflow: "hidden" }}>
//               <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)" }} />
//               <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#34d399", marginBottom: "0.75rem" }}>For Recruiters</p>
//               <h3 className="hh-display" style={{ fontSize: "1.7rem", fontWeight: 800, color: "white", lineHeight: 1.2, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
//                 Hire the best<br /><em style={{ color: "#fbbf24" }}>talent faster.</em>
//               </h3>
//               <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
//                 Post jobs, manage applicants, and find your next star hire — all in one streamlined recruiter dashboard.
//               </p>
//               <Link to={user ? "/recruiter/dashboard" : "/register"} className="hh-btn-primary" style={{ background: "#059669", fontSize: "0.85rem", padding: "0.65rem 1.4rem", boxShadow: "0 4px 24px rgba(5,150,105,0.4)" }}>
//                 Post a Job →
//               </Link>
//             </div>

//           </div>
//         </section>

//         {/* ══════════════════════════════
//             FINAL CTA
//         ══════════════════════════════ */}
//         <section className="hh-cta-section">
//           <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
//             <h2 className="hh-cta-title hh-display">
//               Your dream job is<br />one click away.
//             </h2>
//             <p className="hh-cta-sub" style={{ marginBottom: "2rem" }}>
//               Join 50,000+ professionals already using HireHub. Free forever for job seekers.
//             </p>
//             <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
//               <Link to="/register" className="hh-btn-white">
//                 Create Free Account →
//               </Link>
//               <Link to="/jobs" className="hh-btn-secondary" style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.25)" }}>
//                 Browse Jobs
//               </Link>
//             </div>
//           </div>
//         </section>

//       </div>
//     </>
//   );
// }
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const stats = [
  { num: "50,000+", label: "Job Seekers" },
  { num: "12,000+", label: "Open Roles"  },
  { num: "4,800+",  label: "Companies"   },
  { num: "98%",     label: "Satisfaction"},
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
  { abbr:"G", bg:"bg-blue-700",   title:"Senior React Engineer", co:"Google",   loc:"Remote",    tag:"Full-time", tc:"text-blue-300",  tbg:"bg-blue-500/15"   },
  { abbr:"N", bg:"bg-slate-800",  title:"Product Designer",      co:"Notion",   loc:"Bangalore", tag:"Hybrid",    tc:"text-indigo-300", tbg:"bg-indigo-500/15" },
  { abbr:"R", bg:"bg-sky-700",    title:"Backend Engineer",      co:"Razorpay", loc:"Mumbai",    tag:"On-site",   tc:"text-emerald-300",tbg:"bg-emerald-500/10"},
  { abbr:"S", bg:"bg-indigo-600", title:"Data Analyst",          co:"Stripe",   loc:"Hyderabad", tag:"Full-time", tc:"text-blue-300",  tbg:"bg-blue-500/15"   },
];

const testimonials = [
  { name:"Arjun Mehta",  role:"Frontend Engineer · Stripe",  av:"A", bg:"bg-blue-600",   text:"Found my role in 2 weeks. Every suggestion felt hand-picked for me."          },
  { name:"Priya Sharma", role:"UX Designer · Notion",        av:"P", bg:"bg-violet-600", text:"Three interviews in one week. The tracker made everything effortless."         },
  { name:"Ravi Kiran",   role:"Backend Engineer · Razorpay", av:"R", bg:"bg-sky-700",    text:"Posted a job and got 40 qualified applicants in just 3 days. Outstanding."     },
];

const steps = [
  { n:"01", icon:"👤", title:"Build Your Profile",  desc:"Add skills, experience, education and upload your resume. Your profile becomes your universal application." },
  { n:"02", icon:"🔍", title:"Discover & Apply",    desc:"Browse thousands of jobs by role, location and salary. Apply with one click — no forms to fill."           },
  { n:"03", icon:"🚀", title:"Get Hired",            desc:"Track your application in real time. Get shortlisted, interview, and land your dream role."                },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="bg-slate-50 overflow-x-hidden">

      {/* ═══════════════════════════════
          HERO
      ═══════════════════════════════ */}
      <section className="bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden px-5 pt-14 pb-16">

        {/* bg effects */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"52px 52px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* ── Left ── */}
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
                  { bg:"bg-blue-600",   icon:"✓",  title:"Application Sent",     sub:"Senior React Eng · Google"  },
                  { bg:"bg-emerald-600",icon:"🎉", title:"You're Shortlisted!",   sub:"Product Designer · Notion"  },
                  { bg:"bg-amber-500",  icon:"👁", title:"Profile Viewed",        sub:"by 3 Recruiters today"      },
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

            {/* ── Right: Live jobs panel ── */}
            <div className="hidden lg:block bg-white/5 border border-white/12 rounded-2xl p-4 backdrop-blur-sm">

              {/* header */}
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-bold text-white/38 tracking-widest uppercase">Latest Openings</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>

              {/* job rows */}
              <div className="space-y-2">
                {liveJobs.map((j,i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/16 rounded-xl px-3 py-2.5 transition cursor-pointer group">
                    <div className={`w-8 h-8 rounded-lg ${j.bg} flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0`}>{j.abbr}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white/90 truncate">{j.title}</p>
                      <p className="text-xs text-white/38 mt-0.5">{j.co} · {j.loc}</p>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border border-current ${j.tc} ${j.tbg} flex-shrink-0`}>{j.tag}</span>
                  </div>
                ))}
              </div>

              <Link to="/jobs" className="block text-center text-xs font-bold text-white/30 hover:text-white/60 mt-3 transition">
                View all 12,000+ jobs →
              </Link>

              {/* mini stats */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/8">
                {[
                  { n:"4,800+", l:"Companies Hiring" },
                  { n:"98%",    l:"Satisfaction"     },
                  { n:"50K+",   l:"Users Hired"      },
                  { n:"~1 day", l:"Avg. Response"    },
                ].map(({n,l},i) => (
                  <div key={i} className="bg-white/5 rounded-xl px-3 py-2.5">
                    <p className="text-base font-extrabold text-white tracking-tight">{n}</p>
                    <p className="text-xs text-white/32 mt-0.5">{l}</p>
                  </div>
                ))}
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
          {stats.map(({num, label},i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{num}</p>
              <p className="text-xs text-white/38 font-medium mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

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
