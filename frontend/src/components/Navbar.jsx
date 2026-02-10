// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const logout = () => {
//     localStorage.removeItem("token");
//     toast.success("Logged out successfully")
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow">
//       <Link to="/" className="text-lg font-bold">
//         Job Portal
//       </Link>

//       <div className="space-x-4">
//         {!token ? (
//           <>
//             <Link to="/login" className="hover:underline">
//               Login
//             </Link>
//             <Link to="/register" className="hover:underline">
//               Register
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link to="/profile" className="hover:underline">
//               Profile
//             </Link>
//             <button
//               onClick={logout}
//               className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          Job<span className="text-blue-500">Portal</span>
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-6 text-sm">
          {!token ? (
            <>
              <NavItem to="/login">Login</NavItem>
              <NavItem to="/register">Register</NavItem>
            </>
          ) : (
            <>
              <NavItem to="/profile">Profile</NavItem>
              <button
                onClick={logout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
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
        `hover:text-blue-400 transition ${
          isActive ? "text-blue-400 font-semibold" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
}

