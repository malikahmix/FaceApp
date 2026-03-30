import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    return e;
  };

  const handleChange = (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setStatus("success");
  };

  const inputClass = (field) =>
    `w-full bg-gray-800 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
      errors[field] ? "border-red-500" : "border-gray-700 focus:border-cyan-500"
    }`;

  return (
    <MainLayout>
      <div className="min-h-screen py-16 px-6 flex items-center justify-center">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* ── LEFT: Form ── */}
          <div>
            {status === "success" ? (
              <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <span className="text-green-400 text-3xl">✓</span>
                </div>
                <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>Welcome Back!</h2>
                <p className="text-gray-400 text-sm mb-6">You're signed in successfully. Redirecting to your feed...</p>
                <Link to="/" className="block text-center py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all">
                  Go to Home →
                </Link>
              </div>
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h1 className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>Welcome Back</h1>
                <p className="text-gray-500 text-sm mb-7">Sign in to continue to your account.</p>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClass("email")} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">Password *</label>
                    <a href="#" className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <input name="password" type={showPass ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="Enter your password" className={inputClass("password")} />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs transition-colors">
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Remember me */}
                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input name="remember" type="checkbox" checked={form.remember} onChange={handleChange} className="accent-cyan-500" />
                    <span className="text-gray-400 text-sm">Remember me for 30 days</span>
                  </label>
                </div>

                <button onClick={handleSubmit} className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all text-sm">
                  Sign In →
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-gray-800" />
                  <span className="text-gray-600 text-xs">or continue with</span>
                  <div className="flex-1 h-px bg-gray-800" />
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 bg-gray-800 border border-gray-700 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                    <span className="font-bold">G</span> Google
                  </button>
                  <button className="py-3 bg-gray-800 border border-gray-700 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                    <span className="font-bold">f</span> Facebook
                  </button>
                </div>

                <p className="text-gray-500 text-sm text-center mt-6">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                    Sign Up
                  </Link>
                </p>
              </div>
            )}
          </div>

          {/* ── RIGHT: Info Panel ── */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-10">
              <h2 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                Good to see you again 👋
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Sign in to access your feed, messages, and everything you left behind.
              </p>

              {/* Recent activity mock */}
              <div className="flex flex-col gap-3">
                {[
                  { avatar: "SA", name: "Sara Ahmed", action: "posted a new story", time: "2m ago" },
                  { avatar: "AH", name: "Ali Hassan", action: "liked your post", time: "15m ago" },
                  { avatar: "ZK", name: "Zara Khan", action: "started following you", time: "1h ago" },
                ].map(({ avatar, name, action, time }) => (
                  <div key={name} className="flex items-center gap-3 bg-gray-900/50 rounded-xl p-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-semibold">{name}</p>
                      <p className="text-gray-500 text-xs truncate">{action}</p>
                    </div>
                    <span className="text-gray-600 text-xs flex-shrink-0">{time}</span>
                  </div>
                ))}
              </div>

              <p className="text-gray-500 text-xs mt-6 text-center">Sign in to see your full activity feed</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
