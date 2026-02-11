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

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md border border-gray-200 p-6">
        
        <h2 className="text-2xl font-bold text-center mb-4">
          Verify OTP
        </h2>

        <form onSubmit={verifyOtp} className="space-y-4">
          <input
            type="number"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 text-center tracking-widest focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <p className="text-center text-sm text-gray-500">
            OTP expires in <b>{formatTime(timeLeft)}</b>
          </p>

          <button
            disabled={loading || timeLeft === 0}
            className={`w-full py-2 rounded-md font-medium text-white ${
              loading || timeLeft === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Verify OTP
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <button
            onClick={resendOtp}
            className="text-blue-600 hover:underline"
          >
            Resend OTP
          </button>
        </div>

        <p className="text-center text-sm mt-4">
          <Link to="/login" className="text-gray-600 hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
