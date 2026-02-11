import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifySuccess() {
  const navigate = useNavigate();
  const shownRef = useRef(false);

  useEffect(() => {
    if (!shownRef.current) {
      toast.success("Email verified successfully! You can now log in.");
      shownRef.current = true;
    }

    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-2">Email Verified 🎉</h2>
        <p className="text-gray-600 mb-4">
          Redirecting you to login page...
        </p>

        <Link
          to="/login"
          className="text-blue-600 hover:underline text-sm"
        >
          Go to Login now
        </Link>
      </div>
    </div>
  );
}
