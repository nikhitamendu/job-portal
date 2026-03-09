// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../services/api";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const sendOtp = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       const res = await api.post("/auth/forgot-password", { email });
//       toast.success(res.data.message);
//       navigate("/verify-reset", { state: { email } });
//       //ou pass email through React Router state instead of URL.
//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Failed to send OTP"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-6">
        
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Forgot your password?
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Don’t worry, we’ll help you reset it
//           </p>
//         </div>

//         <form onSubmit={sendOtp} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email address
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

//           <button
//             disabled={loading}
//             className={`w-full py-2 rounded-md font-medium text-white transition ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Sending OTP..." : "Send OTP"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/forgot-password", { email });
      toast.success(res.data.message);
      navigate("/verify-reset", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100 flex items-center justify-center p-4">

      <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/60 border border-slate-200">

        {/* ── LEFT: Dark navy panel ── */}
        <div className="hidden lg:flex flex-col justify-end flex-1 bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 p-10 relative overflow-hidden">

          {/* Glow blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-0 w-48 h-48 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-6">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/35 rounded-full px-3.5 py-1.5 w-fit">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-bold text-amber-300 tracking-widest uppercase">
                Account Recovery
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
                Forgot your
              </h2>
              <h2 className="text-4xl font-extrabold text-amber-400 italic leading-tight tracking-tight">
                password?
              </h2>
              <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
                No worries.
              </h2>
            </div>

            {/* Sub */}
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Enter your registered email and we'll send you a one-time
              password to get back into your account securely.
            </p>

            {/* Steps */}
            <div className="space-y-3">
              {[
                ["01", "Enter your email address"],
                ["02", "Receive OTP in your inbox"],
                ["03", "Reset your password"],
              ].map(([step, label]) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/12 flex items-center justify-center text-xs font-extrabold text-white/50 flex-shrink-0">
                    {step}
                  </div>
                  <span className="text-sm text-white/60 font-medium">{label}</span>
                </div>
              ))}
            </div>

            {/* Company badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[["Google", "bg-blue-500"], ["Microsoft", "bg-sky-400"], ["Amazon", "bg-orange-400"], ["Stripe", "bg-indigo-500"]].map(
                ([name, dot]) => (
                  <div key={name} className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-3 py-1">
                    <div className={`w-2 h-2 rounded-full ${dot}`} />
                    <span className="text-xs font-semibold text-white/55">{name}</span>
                  </div>
                )
              )}
            </div>

          </div>
        </div>

        {/* ── RIGHT: Form panel ── */}
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
              Reset password
            </h1>
            <p className="text-sm text-slate-400 mb-7">
              We'll send a OTP to your registered email address.
            </p>

            {/* Form */}
            <form onSubmit={sendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-300 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer
                  ${loading
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-blue-700 text-white shadow-md shadow-blue-200 hover:bg-blue-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200"
                  }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending OTP…
                  </span>
                ) : (
                  "Send OTP →"
                )}
              </button>
            </form>

            {/* Back to login */}
            <p className="text-center text-xs text-slate-400 mt-6">
              Remember your password?{" "}
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

