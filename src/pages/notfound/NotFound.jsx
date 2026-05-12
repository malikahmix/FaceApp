// src/pages/notfound/NotFound.jsx
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function NotFound() {
  const { isDark } = useTheme();
  const bg   = isDark ? "bg-gray-950" : "bg-slate-50";
  const text = isDark ? "text-white"  : "text-slate-900";
  const sub  = isDark ? "text-gray-400" : "text-slate-500";

  return (
    <div className={`min-h-screen ${bg} flex items-center justify-center px-6`}>
      <div className="text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1
            className="text-[180px] font-black leading-none select-none"
            style={{
              fontFamily: "'Syne', sans-serif",
              background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: 0.15,
            }}
          >
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className={`text-3xl font-black ${text}`} style={{ fontFamily: "'Syne', sans-serif" }}>
                Page Not Found
              </h2>
            </div>
          </div>
        </div>

        <p className={`${sub} text-lg max-w-md mx-auto mb-10 leading-relaxed`}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 text-sm"
          >
            ← Back to Home
          </Link>
          <Link
            to="/contact"
            className={`px-8 py-4 border font-semibold rounded-xl transition-all text-sm ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            Contact Support
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12">
          <p className={`${sub} text-sm mb-4`}>Or go to one of these pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { to: "/",        label: "Home"    },
              { to: "/about",   label: "About"   },
              { to: "/contact", label: "Contact" },
              { to: "/signin",  label: "Sign In" },
              { to: "/signup",  label: "Sign Up" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isDark
                    ? "bg-gray-800 text-gray-400 hover:text-cyan-400 hover:bg-gray-700"
                    : "bg-slate-100 text-slate-500 hover:text-cyan-600 hover:bg-slate-200"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
