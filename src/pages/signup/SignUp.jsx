import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", agree: false });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (!form.confirm) e.confirm = "Please confirm your password.";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match.";
    if (!form.agree) e.agree = "You must accept the terms.";
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
    setSubmitted(true);
  };

  const inputClass = (field) =>
    `w-full bg-gray-800 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
      errors[field] ? "border-red-500" : "border-gray-700 focus:border-cyan-500"
    }`;

  // Password strength
  const getStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };
  const strength = getStrength();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-red-500", "bg-amber-500", "bg-yellow-400", "bg-green-500"][strength];

  return (
    <MainLayout>
      <div className="min-h-screen py-16 px-6 flex items-center justify-center">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* ── LEFT: Info Panel ── */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-10">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-black text-lg">F</span>
              </div>
              <h2 className="text-3xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                Join 50,000+ People on FaceApp
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Create your free account today and start connecting with people who share your interests.
              </p>
              {/* Feature list */}
              {["Free forever — no credit card needed", "Encrypted & private by default", "Access from any device, anywhere", "Cancel or delete anytime"].map((f) => (
                <div key={f} className="flex items-center gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-400 text-xs">✓</span>
                  </div>
                  <span className="text-gray-400 text-sm">{f}</span>
                </div>
              ))}
              {/* Social proof */}
              <div className="mt-8 flex -space-x-2">
                {["AR","FM","UA","AK","ZK"].map((a) => (
                  <div key={a} className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 border-2 border-gray-900 flex items-center justify-center text-white text-xs font-bold">{a}</div>
                ))}
                <div className="w-9 h-9 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-gray-400 text-xs">+50k</div>
              </div>
              <p className="text-gray-500 text-xs mt-3">Join thousands of users already on the platform</p>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div>
            {submitted ? (
              <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <span className="text-green-400 text-3xl">✓</span>
                </div>
                <h2 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>Account Created!</h2>
                <p className="text-gray-400 text-sm mb-6">Welcome to FaceApp. Check your email to verify your account.</p>
                <Link to="/signin" className="block text-center py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all">
                  Sign In Now →
                </Link>
              </div>
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h1 className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>Create Account</h1>
                <p className="text-gray-500 text-sm mb-7">Fill in the details below to get started.</p>

                {/* Name */}
                <div className="mb-4">
                  <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={inputClass("name")} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClass("email")} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="mb-2">
                  <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Password *</label>
                  <div className="relative">
                    <input name="password" type={showPass ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="Min 8 characters" className={inputClass("password")} />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs transition-colors">
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Password Strength */}
                {form.password && (
                  <div className="mb-4">
                    <div className="flex gap-1 mt-2 mb-1">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : "bg-gray-700"}`} />
                      ))}
                    </div>
                    <p className={`text-xs ${["","text-red-400","text-amber-400","text-yellow-400","text-green-400"][strength]}`}>{strengthLabel} password</p>
                  </div>
                )}

                {/* Confirm Password */}
                <div className="mb-5">
                  <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Confirm Password *</label>
                  <input name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="Re-enter password" className={inputClass("confirm")} />
                  {errors.confirm && <p className="text-red-400 text-xs mt-1">{errors.confirm}</p>}
                </div>

                {/* Terms */}
                <div className="mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input name="agree" type="checkbox" checked={form.agree} onChange={handleChange} className="mt-0.5 accent-cyan-500" />
                    <span className="text-gray-400 text-sm">
                      I agree to the{" "}
                      <a href="#" className="text-cyan-400 hover:text-cyan-300">Terms of Service</a>{" "}
                      and{" "}
                      <a href="#" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.agree && <p className="text-red-400 text-xs mt-1">{errors.agree}</p>}
                </div>

                <button onClick={handleSubmit} className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all text-sm">
                  Create My Account →
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-gray-800" />
                  <span className="text-gray-600 text-xs">or</span>
                  <div className="flex-1 h-px bg-gray-800" />
                </div>

                {/* Social Sign Up */}
                <button className="w-full py-3 bg-gray-800 border border-gray-700 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                  <span>G</span> Continue with Google
                </button>

                <p className="text-gray-500 text-sm text-center mt-6">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                    Sign In
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
