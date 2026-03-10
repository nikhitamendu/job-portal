// import { useState,useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { login, user } = useAuth();


//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       setLoading(true);
//       await login(email, password);
//       toast.success("Welcome back!");
//       // navigate("/profile");
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Invalid email or password"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//   if (user) {
//         console.log("Logged in user:", user);  
//     if (user.role === "recruiter") {
//       navigate("/recruiter/dashboard");
//     } else {
//       navigate("/profile");
//     }
//   }
// }, [user, navigate]);

 


//   return (
//     <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-6">

//         {/* HEADER */}
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Welcome Back 👋
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Login to continue to JobPortal
//           </p>
//         </div>

//         {/* FORM */}
//         <form onSubmit={submit} className="space-y-4">
          
//           {/* EMAIL */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           {/* PASSWORD WITH TOGGLE */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full border rounded-md px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-gray-700"
//                 aria-label="Toggle password visibility"
//               >
//                 {showPassword ? "🙈" : "👁️"}
//               </button>
//             </div>
//           </div>

//           {error && (
//             <p className="text-sm text-red-600 text-center">
//               {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 rounded-md font-medium text-white transition ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {/* LINKS */}
//         <div className="text-center mt-5 text-sm">
//           <Link
//             to="/forgot-password"
//             className="text-blue-600 hover:underline"
//           >
//             Forgot password?
//           </Link>
//         </div>

//         <div className="text-center mt-4 text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="text-blue-600 hover:underline font-medium"
//           >
//             Register
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
// //When the user submits the login form, React calls the login function from AuthContext, which sends credentials to the backend using Axios. The backend verifies the email and password using bcrypt, generates JWT access and refresh tokens, and returns the access token. The frontend stores the access token in memory and then fetches user details using /auth/me. Based on the user role, the application redirects to the appropriate dashboard.
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || null;

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await login(email, password);
      toast.success("Welcome back!");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("Logged in user:", user);
      if (from) {
        navigate(from, { replace: true });
      } else if (user.role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else {
        navigate("/profile");
      }
    }
  }, [user, navigate, from]);

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
                Welcome Back
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
                Your career
              </h2>
              <h2 className="text-4xl font-extrabold text-amber-400 italic leading-tight tracking-tight">
                one step closer
              </h2>
              <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
                every day.
              </h2>
            </div>

            {/* Sub */}
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Sign back in to track your applications, discover new roles,
              and connect with top recruiters waiting for you.
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
                "HireHub helped me land 3 interviews in a single week. The dashboard makes tracking so easy."
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  P
                </div>
                <div>
                  <div className="text-xs font-bold text-white/85">Priya Sharma</div>
                  <div className="text-xs text-white/40">UX Designer, Notion</div>
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
              Welcome back 👋
            </h1>
            <p className="text-sm text-slate-400 mb-7">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-700 font-semibold hover:underline">
                Register free
              </Link>
            </p>

            {/* Form */}
            <form onSubmit={submit} className="space-y-4">

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  required
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-300 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-600 tracking-wide">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-blue-700 font-semibold hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    required
                    aria-label="Toggle password visibility"
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
                {loading ? "Logging in…" : "Sign In →"}
              </button>

            </form>

            {/* Footer */}
            <p className="text-center text-xs text-slate-400 mt-5">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-700 font-semibold hover:underline">
                Register here
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
