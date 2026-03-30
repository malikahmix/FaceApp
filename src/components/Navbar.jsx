// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { to: "/",        label: "Home"    },
  { to: "/about",   label: "About"   },
  { to: "/contact", label: "Contact" },
];
const authLinks = [
  { to: "/signin", label: "Sign In" },
  { to: "/signup", label: "Sign Up" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const nav    = isDark ? "bg-gray-900/95 border-gray-800"  : "bg-white/95 border-slate-200";
  const text   = isDark ? "text-gray-400 hover:text-white"  : "text-slate-600 hover:text-slate-900";
  const active = isDark ? "text-cyan-400"                   : "text-cyan-600";
  const mob    = isDark ? "bg-gray-900 border-gray-800"     : "bg-white border-slate-200";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${nav} backdrop-blur-md border-b shadow-sm transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-sm">F</span>
            </div>
            <span className={`font-bold text-xl tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Face<span className="text-cyan-400">App</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === to ? active : text
                } ${pathname === to ? (isDark ? "bg-cyan-500/10" : "bg-cyan-50") : (isDark ? "hover:bg-gray-800" : "hover:bg-slate-100")}`}>
                {label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button onClick={toggleTheme}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDark ? "bg-gray-800 hover:bg-gray-700 text-yellow-400" : "bg-slate-100 hover:bg-slate-200 text-slate-600"}`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              {isDark ? "☀️" : "🌙"}
            </button>

            <Link to="/signin"
              className={`px-4 py-2 text-sm font-medium transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>
              Sign In
            </Link>
            <Link to="/signup"
              className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20">
              Sign Up
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleTheme}
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? "bg-gray-800 text-yellow-400" : "bg-slate-100 text-slate-600"}`}>
              {isDark ? "☀️" : "🌙"}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-lg transition-colors ${isDark ? "text-gray-400 hover:bg-gray-800" : "text-slate-600 hover:bg-slate-100"}`}>
              {menuOpen
                ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden ${mob} border-t px-4 py-3 flex flex-col gap-1`}>
          {[...navLinks, ...authLinks].map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === to ? `${active} ${isDark ? "bg-cyan-500/10" : "bg-cyan-50"}` : text
              }`}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
