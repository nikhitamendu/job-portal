import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/forgotPassword";
import VerifyReset from "./pages/VerifyReset";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import VerifySuccess from "./pages/VerifySuccess";

import ProtectedRoute from "./routes/ProtectedRoute";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isAuthenticated, loading,user } = useAuth();

  // Prevent rendering until auth state is known
  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH ROUTES */}
       <Route
  path="/login"
  element={
    isAuthenticated ? (
      user?.role === "recruiter" ? (
        <Navigate to="/recruiter/dashboard" />
      ) : (
        <Navigate to="/profile" />
      )
    ) : (
      <Login />
    )
  }
/>


       <Route
  path="/register"
  element={
    isAuthenticated ? (
      user?.role === "recruiter" ? (
        <Navigate to="/recruiter/dashboard" />
      ) : (
        <Navigate to="/profile" />
      )
    ) : (
      <Register />
    )
  }
/>


        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset" element={<VerifyReset />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-success" element={<VerifySuccess />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />


        {/* PROTECTED ROUTES */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
  path="/recruiter/create-job"
  element={
    <ProtectedRoute>
      <CreateJob />
    </ProtectedRoute>
  }
/>

        {/* CATCH ALL */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
