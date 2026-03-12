import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return null;

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
