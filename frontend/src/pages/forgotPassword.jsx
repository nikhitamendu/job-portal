import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import api from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function sendOtp(e) {
    e.preventDefault();

    try {
      const res = await api.post("auth/forgot-password", { email });

      alert(res.data.message); // "OTP sent to your email"
      navigate("/verify-reset", { state: { email } });
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to send OTP"
      );
    }
  }

  return (
    <form onSubmit={sendOtp}>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send OTP</button>
    </form>
  );
}
