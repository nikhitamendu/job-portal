
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../services/api";

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user"   // ✅ default role
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       setLoading(true);
//       // const res = await api.post("/auth/register", form);
//       // toast.success(res.data.message);
//       // setForm({ name: "", email: "", password: "", role: "user" });
//       const res = await api.post("/auth/register", form);

//       toast.success("OTP sent to your email");

//       // redirect to OTP verification page
//       window.location.href = `/verify-success?email=${form.email}`;
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         "Registration failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-6">

//         {/* HEADER */}
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Create your account 🚀
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Register to start your journey
//           </p>
//         </div>

//         {/* FORM */}
//         <form onSubmit={submit} className="space-y-4">

//           {/* ROLE SELECT */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Register As
//             </label>
//             <select
//               name="role"
//               value={form.role}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//             >
//               <option value="user">Job Seeker</option>
//               <option value="recruiter">Recruiter</option>
//             </select>
//           </div>

//           {/* NAME */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               placeholder="John Doe"
//               value={form.name}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           {/* EMAIL */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               placeholder="you@example.com"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           {/* PASSWORD */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="••••••••"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded-md px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700"
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>

//             <p className="text-xs text-gray-500 mt-1">
//               Must contain 1 uppercase, 1 number & 1 special character
//             </p>
//           </div>

//           {error && (
//             <p className="text-sm text-red-600 text-center">
//               {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 rounded-md font-medium text-white transition ${loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//               }`}
//           >
//             {/* {loading
//               ? "Sending verification email..."
//               : "Register"} */}
//               {loading
//   ? "Sending OTP..."
//   : "Register"}
//           </button>
//         </form>

//         {/* FOOTER */}
//         <div className="text-center mt-4 text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-blue-600 hover:underline font-medium"
//           >
//             Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
// //When a user registers, the frontend sends form data to the backend. Instead of immediately creating an account, the backend stores the user in a temporary collection and sends a verification email. Once the user clicks the verification link, the record is moved to the main user collection and the account becomes active.
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await api.post("/auth/register", form);
      toast.success("OTP sent to your email");
      window.location.href = `/verify-success?email=${form.email}`;
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStrength = (pw) => {
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const strength = getStrength(form.password);
  const strengthMeta = [
    null,
    { label: "Weak",   barColor: "bg-red-500",    text: "text-red-500"     },
    { label: "Good",   barColor: "bg-amber-400",   text: "text-amber-500"   },
    { label: "Strong", barColor: "bg-emerald-500", text: "text-emerald-600" },
  ];

  return (
    /* ── Full-page centering wrapper ── */
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100 flex items-center justify-center p-4">

      {/* ── Card ── */}
      <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/60 border border-slate-200">

        {/* ══════════════════════════════
            LEFT — Dark navy panel
        ══════════════════════════════ */}
        <div className="hidden lg:flex flex-col justify-end flex-1 bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 p-10 relative overflow-hidden">

          {/* Decorative glow blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-0 w-48 h-48 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 space-y-6">

            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/35 rounded-full px-3.5 py-1.5 w-fit">
              <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_6px_#60a5fa] animate-pulse" />
              <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">
                Now Hiring
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
                Your next big
              </h2>
              <h2 className="text-4xl font-extrabold text-amber-400 italic leading-tight tracking-tight">
                opportunity
              </h2>
              <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
                starts here.
              </h2>
            </div>

            {/* Sub */}
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Join thousands of professionals finding meaningful work and top
              companies discovering great talent — all in one place.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6">
              {[["50k+", "Professionals"], ["12k+", "Open Roles"], ["4.8k", "Companies"]].map(
                ([num, lbl], i) => (
                  <div key={lbl} className="flex items-center gap-6">
                    {i > 0 && <div className="w-px h-8 bg-white/15" />}
                    <div>
                      <div className="text-2xl font-extrabold text-white tracking-tight leading-none">
                        {num}
                      </div>
                      <div className="text-xs text-white/40 font-medium mt-0.5">{lbl}</div>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Testimonial */}
            <div className="bg-white/8 border border-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-xs">
              <p className="text-sm text-white/65 italic leading-relaxed mb-3">
                "Found my current role within 2 weeks of signing up. The job matching is genuinely impressive."
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  A
                </div>
                <div>
                  <div className="text-xs font-bold text-white/85">Arjun Mehta</div>
                  <div className="text-xs text-white/40">Frontend Engineer, Stripe</div>
                </div>
                <div className="ml-auto text-amber-400 text-xs tracking-wide">★★★★★</div>
              </div>
            </div>

            {/* Company badges */}
            <div className="flex flex-wrap gap-2">
              {[["Google", "bg-blue-500"], ["Microsoft", "bg-sky-400"], ["Amazon", "bg-orange-400"], ["Stripe", "bg-indigo-500"]].map(
                ([name, dot]) => (
                  <div
                    key={name}
                    className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-3 py-1"
                  >
                    <div className={`w-2 h-2 rounded-full ${dot}`} />
                    <span className="text-xs font-semibold text-white/55">{name}</span>
                  </div>
                )
              )}
            </div>

          </div>
        </div>

        {/* ══════════════════════════════
            RIGHT — Form panel
        ══════════════════════════════ */}
        <div className="w-full lg:w-[22rem] xl:w-[24rem] flex-shrink-0 bg-white flex items-center justify-center px-8 py-10">
          <div className="w-full">

            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-7">
              <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center text-white font-extrabold text-base">
                H
              </div>
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                HireHub
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
              Create account
            </h1>
            <p className="text-sm text-slate-400 mb-6">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700 font-semibold hover:underline">
                Sign in
              </Link>
            </p>

            {/* Role Toggle */}
            <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl mb-5">
              {[
                { value: "user",      label: "🎯 Job Seeker" },
                { value: "recruiter", label: "🏢 Recruiter"  },
              ].map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => { setForm({ ...form, role: r.value }); setError(""); }}
                  className={`py-2 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer
                    ${form.role === r.value
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={submit} className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-300 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-300 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 pr-10 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-300 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                {/* Strength bar */}
                {form.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                            i <= strength
                              ? strengthMeta[strength]?.barColor
                              : "bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs font-bold ${strengthMeta[strength]?.text}`}>
                      {strengthMeta[strength]?.label} password
                    </p>
                  </div>
                )}

                <p className="mt-1.5 text-xs text-slate-400">
                  Use uppercase, number &amp; special character
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer
                  ${loading
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-blue-700 text-white shadow-md shadow-blue-200 hover:bg-blue-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200"
                  }`}
              >
                {loading ? "Sending OTP…" : "Create Account →"}
              </button>

            </form>

            {/* Footer */}
            <p className="text-center text-xs text-slate-400 mt-5">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700 font-semibold hover:underline">
                Login here
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
