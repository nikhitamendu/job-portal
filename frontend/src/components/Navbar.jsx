import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        
        {/* LOGO */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide hover:opacity-90 transition"
        >
          Job<span className="text-blue-500">Portal</span>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-4 text-sm">
          {!isAuthenticated ? (
            <>
              <NavItem to="/login">Login</NavItem>
              <NavItem to="/register">Register</NavItem>
            </>
          ) : (
            <>
              <NavItem to="/profile">Profile</NavItem>

              {/* LOGOUT BUTTON */}
              <button
                onClick={handleLogout}
                className="ml-2 bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-md text-sm font-medium transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

/* ACTIVE LINK COMPONENT */
function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-2 py-1 rounded-md transition ${
          isActive
            ? "text-blue-400 font-semibold"
            : "text-gray-300 hover:text-white"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
