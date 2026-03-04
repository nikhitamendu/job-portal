// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ForgotPassword from "./pages/forgotPassword";
// import VerifyReset from "./pages/VerifyReset";
// import ResetPassword from "./pages/ResetPassword";
// import Profile from "./pages/Profile";
// import VerifySuccess from "./pages/VerifySuccess";

// import ProtectedRoute from "./routes/ProtectedRoute";
// import RecruiterDashboard from "./pages/RecruiterDashboard";
// import CreateJob from "./pages/CreateJob";
// import { useAuth } from "./context/AuthContext";
// import JobDetails from "./pages/JobDetails";
// import EditJob from "./pages/EditJob";
// import Jobs from "./pages/Jobs";
// import MyApplications from "./pages/MyApplications";
// import JobApplicants from "./pages/JobApplicants";
// import RecruiterLayout from "./layouts/RecruiterLayout";
// import RecruiterApplicants from "./pages/RecruiterApplicants";
// export default function App() {
//   const { isAuthenticated, loading, user } = useAuth();

//   // Prevent rendering until auth state is known
//   if (loading) {
//     return (
//       <div className="flex justify-center mt-20">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         {/* HOME */}
//         <Route path="/" element={<Home />} />

//         {/* AUTH ROUTES */}
//         <Route
//           path="/login"
//           element={
//             isAuthenticated ? (
//               user?.role === "recruiter" ? (
//                 <Navigate to="/recruiter/dashboard" />
//               ) : (
//                 <Navigate to="/profile" />
//               )
//             ) : (
//               <Login />
//             )
//           }
//         />


//         <Route
//           path="/register"
//           element={
//             isAuthenticated ? (
//               user?.role === "recruiter" ? (
//                 <Navigate to="/recruiter/dashboard" />
//               ) : (
//                 <Navigate to="/profile" />
//               )
//             ) : (
//               <Register />
//             )
//           }
//         />


//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/verify-reset" element={<VerifyReset />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/verify-success" element={<VerifySuccess />} />
//         <Route path="/jobs/:id" element={<JobDetails />} />
//         <Route path="/jobs" element={<Jobs />} />
//      <Route path="/recruiter" element={<RecruiterLayout />}>
//   <Route path="dashboard" element={<RecruiterDashboard />} />
//   <Route path="create-job" element={<CreateJob />} />
//   <Route path="edit-job/:id" element={<EditJob />} />
//   <Route path="applicants" element={<RecruiterApplicants />} />
//   <Route path="job/:jobId/applicants" element={<JobApplicants />} />
// </Route>
//           <Route
//             path="/my-applications"
//             element={<MyApplications />}
//           />
//           <Route
//             path="/recruiter/job/:jobId/applicants"
//             element={<JobApplicants />}
//           />


//           {/* PROTECTED ROUTES */}
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/recruiter/create-job"
//             element={
//               <ProtectedRoute>
//                 <CreateJob />
//               </ProtectedRoute>
//             }
//           />

//           {/* CATCH ALL */}
//           <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
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
import EditJob from "./pages/EditJob";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import JobApplicants from "./pages/JobApplicants";
import RecruiterApplicants from "./pages/RecruiterApplicants";

import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isAuthenticated, loading, user } = useAuth();

  // Wait for auth to load before rendering
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

  {/* AUTH */}
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

  {/* PUBLIC JOBS */}
  <Route path="/jobs" element={<Jobs />} />
  <Route path="/jobs/:id" element={<JobDetails />} />

  {/* JOB SEEKER */}
  <Route
    path="/my-applications"
    element={
      <ProtectedRoute>
        <MyApplications />
      </ProtectedRoute>
    }
  />

  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />

  {/* RECRUITER ROUTES (NO SIDEBAR) */}
  <Route
    path="/recruiter/dashboard"
    element={
      <ProtectedRoute>
        <RecruiterDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/recruiter/applicants"
    element={
      <ProtectedRoute>
        <RecruiterApplicants />
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

  <Route
    path="/recruiter/edit-job/:id"
    element={
      <ProtectedRoute>
        <EditJob />
      </ProtectedRoute>
    }
  />

  <Route
    path="/recruiter/job/:jobId/applicants"
    element={
      <ProtectedRoute>
        <JobApplicants />
      </ProtectedRoute>
    }
  />

  {/* CATCH ALL */}
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
    </BrowserRouter>
  );
}