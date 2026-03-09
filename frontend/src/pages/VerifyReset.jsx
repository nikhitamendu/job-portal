// import { useState, useEffect } from "react";   //backend verifyotp
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../services/api";

// export default function VerifyReset() {
//   const [otp, setOtp] = useState("");
//   const [timeLeft, setTimeLeft] = useState(600);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email;

//   useEffect(() => {
//     if (!email) navigate("/forgot-password");
//   }, [email, navigate]);

//   useEffect(() => {
//     if (timeLeft <= 0) return;
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const formatTime = (seconds) => {
//     const min = Math.floor(seconds / 60);
//     const sec = seconds % 60;
//     return `${min}:${sec < 10 ? "0" : ""}${sec}`;
//   };

//   const verifyOtp = async (e) => {
//     e.preventDefault();

//     if (timeLeft === 0) {
//       toast.error("OTP expired. Please resend.");
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post("/auth/verify-otp", { email, otp });
//       toast.success("OTP verified");
//       navigate("/reset-password", { state: { email } });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resendOtp = async () => {
//     try {
//       await api.post("/auth/resend-otp", { email });
//       toast.success("New OTP sent");
//       setTimeLeft(600);
//     } catch {
//       toast.error("Failed to resend OTP");
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-6">
        
//         <h2 className="text-2xl font-bold text-center mb-4">
//           Verify OTP
//         </h2>

//         <form onSubmit={verifyOtp} className="space-y-4">
//           <input
//             type="number"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             required
//             className="w-full border rounded-md px-3 py-2 text-center tracking-widest focus:ring-2 focus:ring-blue-500 outline-none"
//           />

//           <p className="text-center text-sm text-gray-500">
//             OTP expires in <b>{formatTime(timeLeft)}</b>
//           </p>

//           <button
//             disabled={loading || timeLeft === 0}
//             className={`w-full py-2 rounded-md font-medium text-white ${
//               loading || timeLeft === 0
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             Verify OTP
//           </button>
//         </form>

//         <div className="text-center mt-4 text-sm">
//           <button
//             onClick={resendOtp}
//             className="text-blue-600 hover:underline"
//           >
//             Resend OTP
//           </button>
//         </div>

//         <p className="text-center text-sm mt-4">
//           <Link to="/login" className="text-gray-600 hover:underline">
//             Back to login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
// // User enters email
// // ↓
// // OTP sent to email
// // ↓
// // User enters OTP
// // ↓
// // POST /auth/verify-otp
// // ↓
// // Backend validates OTP
// // ↓
// // Allow reset password page
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

export default function VerifyReset() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(600);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) navigate("/forgot-password");
  }, [email, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (timeLeft === 0) {
      toast.error("OTP expired. Please resend.");
      return;
    }
    try {
      setLoading(true);
      await api.post("/auth/verify-otp", { email, otp });
      toast.success("OTP verified");
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      await api.post("/auth/resend-otp", { email });
      toast.success("New OTP sent");
      setTimeLeft(600);
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  /* Timer color */
  const timerColor = timeLeft > 120
    ? "text-slate-500"
    : timeLeft > 30
    ? "text-amber-500"
    : "text-red-500";

  const timerRing = timeLeft > 120
    ? "border-slate-200"
    : timeLeft > 30
    ? "border-amber-300"
    : "border-red-400";

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
                Check your
              </h2>
              <h2 className="text-4xl font-extrabold text-amber-400 italic leading-tight tracking-tight">
                inbox.
              </h2>
            </div>

            {/* Sub */}
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              We sent a 6-digit one-time password to{" "}
              <span className="text-white/75 font-semibold break-all">{email}</span>.
              Enter it on the right to continue.
            </p>

            {/* Steps */}
            <div className="space-y-3">
              {[
                ["01", "Check your email inbox",          true ],
                ["02", "Enter the 6-digit OTP",           true ],
                ["03", "Reset your password securely",    false],
              ].map(([step, label, done]) => (
                <div key={step} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold flex-shrink-0
                    ${done
                      ? "bg-blue-600/30 border border-blue-500/40 text-blue-300"
                      : "bg-white/8 border border-white/12 text-white/30"
                    }`}
                  >
                    {done ? "✓" : step}
                  </div>
                  <span className={`text-sm font-medium ${done ? "text-white/70" : "text-white/30"}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tip */}
            <div className="bg-white/6 border border-white/10 rounded-xl p-3.5 max-w-xs">
              <p className="text-xs text-white/45 leading-relaxed">
                💡 Can't find the email? Check your <span className="text-white/65 font-semibold">spam or junk folder</span>.
                OTP is valid for <span className="text-white/65 font-semibold">10 minutes</span>.
              </p>
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
              Enter OTP
            </h1>
            <p className="text-sm text-slate-400 mb-7">
              Sent to{" "}
              <span className="text-slate-600 font-semibold">{email}</span>
            </p>

            {/* Timer ring */}
            <div className={`flex flex-col items-center justify-center border-2 ${timerRing} rounded-2xl py-5 mb-6 transition-all duration-500`}>
              <span className={`text-3xl font-extrabold tracking-tight ${timerColor} transition-colors duration-500`}>
                {formatTime(timeLeft)}
              </span>
              <span className="text-xs text-slate-400 mt-1 font-medium">
                {timeLeft === 0 ? "OTP expired" : "remaining"}
              </span>
            </div>

            {/* Form */}
            <form onSubmit={verifyOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 tracking-wide">
                  6-Digit OTP
                </label>
                <input
                  type="number"
                  placeholder="· · · · · ·"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-3.5 py-3 text-xl font-bold text-center tracking-[0.5em] rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-200 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading || timeLeft === 0}
                className={`w-full py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer
                  ${loading || timeLeft === 0
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-blue-700 text-white shadow-md shadow-blue-200 hover:bg-blue-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200"
                  }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying…
                  </span>
                ) : timeLeft === 0 ? (
                  "OTP Expired"
                ) : (
                  "Verify OTP →"
                )}
              </button>
            </form>

            {/* Resend + back */}
            <div className="flex items-center justify-between mt-5 text-xs">
              <button
                onClick={resendOtp}
                className="text-blue-700 font-semibold hover:underline cursor-pointer bg-none border-none"
              >
                Resend OTP
              </button>
              <Link to="/login" className="text-slate-400 hover:text-slate-600 font-medium">
                ← Back to Login
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
