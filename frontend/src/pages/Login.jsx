import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await api.post("auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      toast.success("Login successfull")
      navigate("/profile");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={submit}>
          <input
            className="border p-2 w-full mb-3 rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="border p-2 w-full mb-3 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <p className="text-red-600 mt-3 text-center text-sm">{error}</p>
        )}

        <p className="text-center mt-3 text-sm">
  <Link
    to="/forgot-password"
    className="text-blue-600 hover:underline"
  >
    Forgot password?
  </Link>
</p>

<p className="text-center mt-4 text-sm">
  Don’t have an account?{" "}
  <Link to="/register" className="text-blue-600 hover:underline">
    Register
  </Link>
</p>

      </div>
    </div>
  );
}
