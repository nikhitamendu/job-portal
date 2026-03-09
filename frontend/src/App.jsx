// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // import Navbar from "./components/Navbar";

// // import Home from "./pages/Home";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register";
// // import ForgotPassword from "./pages/forgotPassword";
// // import VerifyReset from "./pages/VerifyReset";
// // import ResetPassword from "./pages/ResetPassword";
// // import Profile from "./pages/Profile";
// // import VerifySuccess from "./pages/VerifySuccess";

// // import ProtectedRoute from "./routes/ProtectedRoute";
// // import RecruiterDashboard from "./pages/RecruiterDashboard";
// // import CreateJob from "./pages/CreateJob";
// // import { useAuth } from "./context/AuthContext";
// // import JobDetails from "./pages/JobDetails";
// // import EditJob from "./pages/EditJob";
// // import Jobs from "./pages/Jobs";
// // import MyApplications from "./pages/MyApplications";
// // import JobApplicants from "./pages/JobApplicants";
// // import RecruiterLayout from "./layouts/RecruiterLayout";
// // import RecruiterApplicants from "./pages/RecruiterApplicants";
// // export default function App() {
// //   const { isAuthenticated, loading, user } = useAuth();

// //   // Prevent rendering until auth state is known
// //   if (loading) {
// //     return (
// //       <div className="flex justify-center mt-20">
// //         <p>Loading...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <BrowserRouter>
// //       <Navbar />

// //       <Routes>
// //         {/* HOME */}
// //         <Route path="/" element={<Home />} />

// //         {/* AUTH ROUTES */}
// //         <Route
// //           path="/login"
// //           element={
// //             isAuthenticated ? (
// //               user?.role === "recruiter" ? (
// //                 <Navigate to="/recruiter/dashboard" />
// //               ) : (
// //                 <Navigate to="/profile" />
// //               )
// //             ) : (
// //               <Login />
// //             )
// //           }
// //         />


// //         <Route
// //           path="/register"
// //           element={
// //             isAuthenticated ? (
// //               user?.role === "recruiter" ? (
// //                 <Navigate to="/recruiter/dashboard" />
// //               ) : (
// //                 <Navigate to="/profile" />
// //               )
// //             ) : (
// //               <Register />
// //             )
// //           }
// //         />


// //         <Route path="/forgot-password" element={<ForgotPassword />} />
// //         <Route path="/verify-reset" element={<VerifyReset />} />
// //         <Route path="/reset-password" element={<ResetPassword />} />
// //         <Route path="/verify-success" element={<VerifySuccess />} />
// //         <Route path="/jobs/:id" element={<JobDetails />} />
// //         <Route path="/jobs" element={<Jobs />} />
// //      <Route path="/recruiter" element={<RecruiterLayout />}>
// //   <Route path="dashboard" element={<RecruiterDashboard />} />
// //   <Route path="create-job" element={<CreateJob />} />
// //   <Route path="edit-job/:id" element={<EditJob />} />
// //   <Route path="applicants" element={<RecruiterApplicants />} />
// //   <Route path="job/:jobId/applicants" element={<JobApplicants />} />
// // </Route>
// //           <Route
// //             path="/my-applications"
// //             element={<MyApplications />}
// //           />
// //           <Route
// //             path="/recruiter/job/:jobId/applicants"
// //             element={<JobApplicants />}
// //           />


// //           {/* PROTECTED ROUTES */}
// //           <Route
// //             path="/profile"
// //             element={
// //               <ProtectedRoute>
// //                 <Profile />
// //               </ProtectedRoute>
// //             }
// //           />
// //           <Route
// //             path="/recruiter/create-job"
// //             element={
// //               <ProtectedRoute>
// //                 <CreateJob />
// //               </ProtectedRoute>
// //             }
// //           />

// //           {/* CATCH ALL */}
// //           <Route path="*" element={<Navigate to="/" />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }
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
// import EditJob from "./pages/EditJob";
// import Jobs from "./pages/Jobs";
// import JobDetails from "./pages/JobDetails";
// import MyApplications from "./pages/MyApplications";
// import JobApplicants from "./pages/JobApplicants";
// import RecruiterApplicants from "./pages/RecruiterApplicants";

// import { useAuth } from "./context/AuthContext";

// export default function App() {
//   const { isAuthenticated, loading, user } = useAuth();

//   // Wait for auth to load before rendering
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

//     <Routes>
//   {/* HOME */}
//   <Route path="/" element={<Home />} />

//   {/* AUTH */}
//   <Route
//     path="/login"
//     element={
//       isAuthenticated ? (
//         user?.role === "recruiter" ? (
//           <Navigate to="/recruiter/dashboard" />
//         ) : (
//           <Navigate to="/profile" />
//         )
//       ) : (
//         <Login />
//       )
//     }
//   />

//   <Route
//     path="/register"
//     element={
//       isAuthenticated ? (
//         user?.role === "recruiter" ? (
//           <Navigate to="/recruiter/dashboard" />
//         ) : (
//           <Navigate to="/profile" />
//         )
//       ) : (
//         <Register />
//       )
//     }
//   />

//   <Route path="/forgot-password" element={<ForgotPassword />} />
//   <Route path="/verify-reset" element={<VerifyReset />} />
//   <Route path="/reset-password" element={<ResetPassword />} />
//   <Route path="/verify-success" element={<VerifySuccess />} />

//   {/* PUBLIC JOBS */}
//   <Route path="/jobs" element={<Jobs />} />
//   <Route path="/jobs/:id" element={<JobDetails />} />

//   {/* JOB SEEKER */}
//   <Route
//     path="/my-applications"
//     element={
//       <ProtectedRoute>
//         <MyApplications />
//       </ProtectedRoute>
//     }
//   />

//   <Route
//     path="/profile"
//     element={
//       <ProtectedRoute>
//         <Profile />
//       </ProtectedRoute>
//     }
//   />

//   {/* RECRUITER ROUTES (NO SIDEBAR) */}
//   <Route
//     path="/recruiter/dashboard"
//     element={
//       <ProtectedRoute>
//         <RecruiterDashboard />
//       </ProtectedRoute>
//     }
//   />

//   <Route
//     path="/recruiter/applicants"
//     element={
//       <ProtectedRoute>
//         <RecruiterApplicants />
//       </ProtectedRoute>
//     }
//   />

//   <Route
//     path="/recruiter/create-job"
//     element={
//       <ProtectedRoute>
//         <CreateJob />
//       </ProtectedRoute>
//     }
//   />

//   <Route
//     path="/recruiter/edit-job/:id"
//     element={
//       <ProtectedRoute>
//         <EditJob />
//       </ProtectedRoute>
//     }
//   />

//   <Route
//     path="/recruiter/job/:jobId/applicants"
//     element={
//       <ProtectedRoute>
//         <JobApplicants />
//       </ProtectedRoute>
//     }
//   />

//   {/* CATCH ALL */}
//   <Route path="*" element={<Navigate to="/" />} />
// </Routes>
//     </BrowserRouter>
//   );
// }
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-[#0d2340] to-slate-900 relative overflow-hidden">

        {/* bg grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"52px 52px" }} />

        {/* glow blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-indigo-600/10 blur-2xl pointer-events-none" />

        {/* Logo + name */}
        <div className="relative z-10 flex flex-col items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-blue-700 flex items-center justify-center shadow-2xl shadow-blue-900/60">
            <span className="text-white font-extrabold text-5xl">H</span>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-white tracking-tight">
              Hire<span className="text-blue-400">Hub</span>
            </p>
            <p className="text-sm text-white/35 mt-1 font-medium tracking-wide">Your career starts here</p>
          </div>

          {/* dot loader */}
          <div className="flex gap-1.5 mt-1">
            {[0,1,2].map(i => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-blue-400"
                style={{ animation:`hhBounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
              />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes hhBounce {
            0%, 80%, 100% { transform: scale(0.55); opacity: 0.25; }
            40%            { transform: scale(1);    opacity: 1;    }
          }
        `}</style>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
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
            <Route path="/verify-reset"    element={<VerifyReset />}    />
            <Route path="/reset-password"  element={<ResetPassword />}  />
            <Route path="/verify-success"  element={<VerifySuccess />}  />

            {/* PUBLIC JOBS */}
            <Route path="/jobs"     element={<Jobs />}       />
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

            {/* RECRUITER */}
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
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
