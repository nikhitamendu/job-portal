import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    if (!email) {
        navigate("/forgot-password");
    }

    const resetPassword = async (e) => {
        e.preventDefault();

        const strongPasswordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

        if (!strongPasswordRegex.test(password)) {
            alert(
                "Password must contain at least 1 uppercase letter, 1 number, 1 special character, and be at least 6 characters long"
            );
            return;
        }


        try {
            await API.post("auth/reset-password", {
                email,
                password
            });

            alert("Password reset successful");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to reset password");
        }
    };

    return (
        <div className="flex justify-center mt-16">
            <form
                onSubmit={resetPassword}
                className="bg-white p-6 rounded shadow w-96"
            >
                <h2 className="text-xl font-bold mb-4 text-center">
                    Reset Password
                </h2>

                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full mb-3 rounded"
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    className="border p-2 w-full mb-3 rounded"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button className="bg-blue-600 text-white w-full py-2 rounded">
                    Reset Password
                </button>
            </form>
        </div>
    );
}
