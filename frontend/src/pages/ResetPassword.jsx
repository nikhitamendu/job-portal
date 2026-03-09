// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../services/api";

// export default function ResetPassword() {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email;

//   useEffect(() => {
//     if (!email) navigate("/forgot-password");
//   }, [email, navigate]);

//   const resetPassword = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post("/auth/reset-password", { email, password });
//       //POST http://localhost:5000/api/auth/reset-password
// // Content-Type: application/json
//       toast.success("Password reset successful");
//       navigate("/login");
//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Failed to reset password"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-6">
        
//         <h2 className="text-2xl font-bold text-center mb-4">
//           Set New Password
//         </h2>

//         <form onSubmit={resetPassword} className="space-y-4">
//           <input
//             type="password"
//             placeholder="New password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           <input
//             type="password"
//             placeholder="Confirm password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           <button
//             disabled={loading}
//             className={`w-full py-2 rounded-md font-medium text-white ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Resetting..." : "Reset Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) navigate("/forgot-password");
  }, [email, navigate]);

  /* ── Password strength ── */
  const getStrength = (pw) => {
    if (!pw) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pw.length >= 8)              score++;
    if (/[A-Z]/.test(pw))            score++;
    if (/[0-9]/.test(pw))            score++;
    if (/[^A-Za-z0-9]/.test(pw))     score++;
    const map = [
      { label: "Too short",  color: "bg-red-500"    },
      { label: "Weak",       color: "bg-red-400"    },
      { label: "Fair",       color: "bg-amber-400"  },
      { label: "Good",       color: "bg-blue-500"   },
      { label: "Strong",     color: "bg-emerald-500"},
    ];
    return { score, ...map[score] };
  };
  const strength = getStrength(password);

  /* ── Match indicator ── */
  const passwordsMatch = confirmPassword && password === confirmPassword;
  const passwordsMismatch = confirmPassword && password !== confirmPassword;

  const resetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      await api.post("/auth/reset-password", { email, password });
      toast.success("Password reset successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/60 border border-slate-200">

        {/* ── LEFT: navy panel ── */}
        <div className="hidden lg:flex flex-col justify-end flex-1 bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 p-10 relative overflow-hidden">

          {/* glow blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-0 w-48 h-48 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />
          {/* grid */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"44px 44px" }} />

          <div className="relative z-10 space-y-6">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/35 rounded-full px-3.5 py-1.5 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-300 tracking-widest uppercase">Final Step</span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
                Almost
              </h2>
              <h2 className="text-4xl font-extrabold text-emerald-400 italic leading-tight tracking-tight">
                there!
              </h2>
            </div>

            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Set a strong new password for{" "}
              <span className="text-white/75 font-semibold break-all">{email}</span>.
              You'll be logged in right after.
            </p>

            {/* Steps — all done */}
            <div className="space-y-3">
              {[
                ["Entered your email",         true ],
                ["Verified the OTP",           true ],
                ["Set your new password",       false],
              ].map(([label, done], i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold flex-shrink-0
                    ${done
                      ? "bg-emerald-500/25 border border-emerald-500/40 text-emerald-300"
                      : "bg-blue-600/30 border border-blue-500/40 text-blue-300"
                    }`}
                  >
                    {done ? "✓" : "→"}
                  </div>
                  <span className={`text-sm font-medium ${done ? "text-white/50 line-through decoration-white/25" : "text-white/85"}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="bg-white/6 border border-white/10 rounded-xl p-3.5 max-w-xs space-y-1.5">
              <p className="text-xs font-bold text-white/55 uppercase tracking-wider">Strong password tips</p>
              {["At least 8 characters","Mix uppercase & lowercase","Include numbers","Add special characters (!@#$)"].map((t,i) => (
                <p key={i} className="text-xs text-white/40">· {t}</p>
              ))}
            </div>

          </div>
        </div>

        {/* ── RIGHT: form panel ── */}
        <div className="w-full lg:w-[22rem] xl:w-[24rem] flex-shrink-0 bg-white flex items-center justify-center px-8 py-10">
          <div className="w-full">

            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-7">
              <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center text-white font-extrabold text-base">H</div>
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">HireHub</span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
              New Password
            </h1>
            <p className="text-sm text-slate-400 mb-7">
              Setting password for <span className="text-slate-600 font-semibold">{email}</span>
            </p>

            <form onSubmit={resetPassword} className="space-y-4">

              {/* New password */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 tracking-wide">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 pr-10 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                  >
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>

                {/* Strength bar */}
                {password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {[1,2,3,4].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : "bg-slate-200"}`} />
                      ))}
                    </div>
                    <p className={`text-xs font-semibold ${
                      strength.score <= 1 ? "text-red-500" :
                      strength.score === 2 ? "text-amber-500" :
                      strength.score === 3 ? "text-blue-500" : "text-emerald-500"
                    }`}>
                      {strength.label}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 tracking-wide">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`w-full px-3.5 py-2.5 pr-10 text-sm rounded-lg border bg-slate-50 text-slate-900 outline-none transition-all focus:ring-3
                      ${passwordsMatch    ? "border-emerald-400 focus:border-emerald-500 focus:ring-emerald-100" :
                        passwordsMismatch ? "border-red-400 focus:border-red-500 focus:ring-red-100" :
                        "border-slate-200 focus:border-blue-600 focus:ring-blue-100 focus:bg-white"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                  >
                    {showConfirm ? "🙈" : "👁"}
                  </button>
                </div>

                {/* Match feedback */}
                {passwordsMatch && (
                  <p className="text-xs text-emerald-500 font-semibold mt-1.5 flex items-center gap-1">
                    <span>✓</span> Passwords match
                  </p>
                )}
                {passwordsMismatch && (
                  <p className="text-xs text-red-500 font-semibold mt-1.5 flex items-center gap-1">
                    <span>✕</span> Passwords don't match
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || passwordsMismatch}
                className={`w-full py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer mt-1
                  ${loading || passwordsMismatch
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-blue-700 text-white shadow-md shadow-blue-200 hover:bg-blue-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200"
                  }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Resetting…
                  </span>
                ) : (
                  "Reset Password →"
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 mt-5">
              Remembered it?{" "}
              <Link to="/login" className="text-blue-700 font-semibold hover:underline">
                Back to Login
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
