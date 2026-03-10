// import { Navigate } from "react-router-dom";
// import {jwtDecode} from "jwt-decode";

// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("token");

//   // ❌ No token
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   try {
//     const decoded = jwtDecode(token);

//     // ⏰ Token expired
//     if (decoded.exp * 1000 < Date.now()) {
//       localStorage.removeItem("token");
//       return <Navigate to="/login" replace />;
//     }

//     // ✅ Token valid
//     return children;
//   } catch (err) {
//     // ❌ Invalid token
//     localStorage.removeItem("token");
//     return <Navigate to="/login" replace />;
//   }
// }
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
//...
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
