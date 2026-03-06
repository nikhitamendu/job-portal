// import { useEffect, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function VerifySuccess() {
//   const navigate = useNavigate();
//   const shownRef = useRef(false);

//   useEffect(() => {
//     if (!shownRef.current) {
//       toast.success("Email verified successfully! You can now log in.");
//       shownRef.current = true;
//     }

//     const timer = setTimeout(() => {
//       navigate("/login");
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-white p-6 rounded shadow text-center">
//         <h2 className="text-2xl font-bold mb-2">Email Verified 🎉</h2>
//         <p className="text-gray-600 mb-4">
//           Redirecting you to login page...
//         </p>

//         <Link
//           to="/login"
//           className="text-blue-600 hover:underline text-sm"
//         >
//           Go to Login now
//         </Link>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

export default function VerifySuccess() {

  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-register-otp", {
        email,
        otp
      });

      toast.success(res.data.message);

      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">

        <h2 className="text-xl font-bold text-center mb-4">
          Verify Your Email
        </h2>

        <p className="text-sm text-gray-500 text-center mb-4">
          Enter the OTP sent to your email
        </p>

        <form onSubmit={verifyOtp} className="space-y-4">

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>
      </div>
    </div>
  );
}