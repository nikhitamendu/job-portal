import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMsg("");
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    try {
      setLoading(true);
      const res = await api.post("auth/register", form);
      toast.success(res.data.message)
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <form onSubmit={submit}>
          <input
            className="border p-2 w-full mb-3 rounded"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="border p-2 w-full mb-3 rounded"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="border p-2 w-full mb-3 rounded"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
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
            {loading ? "Sending verification email..." : "Register"}
          </button>
        </form>

        {msg && (
          <p className="text-green-600 mt-3 text-center text-sm">
            {msg}
            <br />
            <span className="text-gray-600">
              Check your inbox and verify your email.
            </span>
          </p>
        )}

        {error && (
          <p className="text-red-600 mt-3 text-center text-sm">{error}</p>
        )}

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
