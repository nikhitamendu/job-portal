import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifySuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Email verified successfully! You can now log in.");

    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-2">Email Verified 🎉</h2>
        <p className="text-gray-600">
          Redirecting you to login page...
        </p>
      </div>
    </div>
  );
}
