import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: "Browse Jobs", to: "/jobs"    },
    { label: "About",       to: "/about"   },
    { label: "Contact",     to: "/contact" },
  ];

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-[#0d2340] to-slate-900 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-6 h-6 rounded-lg bg-blue-700 flex items-center justify-center text-white font-extrabold text-xs">H</div>
          <span className="text-sm font-extrabold text-white tracking-tight">Hire<span className="text-blue-400">Hub</span></span>
        </Link>

        {/* Links */}
        <div className="flex items-center flex-wrap justify-center gap-x-5 gap-y-1">
          {links.map(({ label, to }) => (
            <Link key={label} to={to} className="text-xs text-white/40 hover:text-white transition">
              {label}
            </Link>
          ))}
        </div>

        {/* Copyright + status */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="flex items-center gap-1.5 text-xs text-white/28">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All systems up
          </span>
          <span className="text-xs text-white/25">© {year} HireHub</span>
        </div>

      </div>
    </footer>
  );
}