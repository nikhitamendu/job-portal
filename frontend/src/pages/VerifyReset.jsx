import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function VerifyReset() {
    const [otp, setOtp] = useState("");
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    if (!email) {
        navigate("/forgot-password");
    }

    //countdown timer
    useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);


  //format mm:ss
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  

    const verifyOtp = async (e) => {
        e.preventDefault();

        if (timeLeft === 0) {
  alert("OTP has expired. Please resend OTP.");
  return;
}

        try {
            setLoading(true);
            await api.post("auth/verify-otp", { email, otp });
            navigate("/reset-password", { state: { email } });
        } catch (err) {
            alert(err.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    // 🔁 RESEND OTP
    const resendOtp = async () => {
        try {
            await api.post("/resend-otp", { email });
            alert("New OTP sent to your email");
            setTimeLeft(600);
        } catch (err) {
            alert("Failed to resend OTP");
        }
    };

    return (
        <div className="flex justify-center mt-16">
            <form
                onSubmit={verifyOtp}
                className="bg-white p-6 rounded shadow w-96"
            >
                <h2 className="text-xl font-bold mb-4 text-center">
                    Verify OTP
                </h2>

                <input
                    type="number"
                    placeholder="Enter OTP"
                    className="border p-2 w-full mb-3 rounded"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
     {/*Timer*/}
                 <p className="text-center text-sm text-gray-600 mb-3">
          OTP expires in <b>{formatTime(timeLeft)}</b>
        </p>
               <button
  disabled={loading || timeLeft === 0}
  className={`w-full py-2 rounded text-white ${
    loading || timeLeft === 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {timeLeft === 0 ? "OTP Expired" : "Verify OTP"}
</button>


                {/* 🔁 RESEND LINK */}
                <p
                    className="text-center text-sm mt-4 text-blue-600 cursor-pointer"
                    onClick={resendOtp}
                >
                    Resend OTP
                </p>
 {/* back to login link */}
<p className="text-center text-sm mt-3">
  <a
    href="/login"
    className="text-gray-600 hover:text-blue-600 hover:underline"
  >
    Back to login
  </a>
</p>

            </form>
        </div>
    );
}
