// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { isDark } = useTheme();
  const bg      = isDark ? "bg-gray-900 border-gray-800"  : "bg-white border-slate-200";
  const text    = isDark ? "text-gray-500"                 : "text-slate-500";
  const heading = isDark ? "text-white"                    : "text-slate-900";
  const link    = isDark ? "text-gray-500 hover:text-cyan-400" : "text-slate-500 hover:text-cyan-600";

  return (
    <footer className={`${bg} border-t mt-20 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">F</span>
              </div>
              <span className={`font-bold text-xl ${heading}`} style={{ fontFamily: "'Syne', sans-serif" }}>
                Face<span className="text-cyan-400">App</span>
              </span>
            </div>
            <p className={`${text} text-sm leading-relaxed max-w-xs`}>
              A next-generation social platform for meaningful connections. Connect, share, and belong.
            </p>
            <div className="flex gap-3 mt-5">
              {["T", "G", "L"].map((s) => (
                <a key={s} href="#"
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${isDark ? "bg-gray-800 hover:bg-cyan-500/20 hover:text-cyan-400 text-gray-500" : "bg-slate-100 hover:bg-cyan-50 hover:text-cyan-600 text-slate-500"}`}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className={`${heading} font-semibold text-sm mb-4 uppercase tracking-widest`}>Pages</h3>
            <ul className="flex flex-col gap-3">
              {[{to:"/",l:"Home"},{to:"/about",l:"About"},{to:"/contact",l:"Contact"}].map(({to,l})=>(
                <li key={to}><Link to={to} className={`${link} text-sm transition-colors`}>{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className={`${heading} font-semibold text-sm mb-4 uppercase tracking-widest`}>Account</h3>
            <ul className="flex flex-col gap-3">
              {[{to:"/signin",l:"Sign In"},{to:"/signup",l:"Sign Up"}].map(({to,l})=>(
                <li key={to}><Link to={to} className={`${link} text-sm transition-colors`}>{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`border-t ${isDark ? "border-gray-800" : "border-slate-200"} mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3`}>
          <p className={`${text} text-sm`}>© 2025 FaceApp. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#" className={`${link} text-xs transition-colors`}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
