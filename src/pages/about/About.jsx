import { useState } from "react";
import MainLayout from "../../layout/MainLayout";

// ── 1. HERO BANNER ────────────────────────────────────────────────────────────
function AboutHero() {
  return (
    <section className="py-20 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-3xl mx-auto relative z-10">
        <span className="inline-block bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-4 py-1.5 rounded-full text-sm mb-6">About Us</span>
        <h1 className="text-5xl font-black text-white mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>
          We're Building the{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Future of Social
          </span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Founded in 2024, FaceApp is a team of passionate builders, designers, and dreamers on a mission to create a more human internet.
        </p>
      </div>
    </section>
  );
}

// ── 2. TIMELINE ───────────────────────────────────────────────────────────────
function Timeline() {
  const events = [
    { year: "Jan 2024", title: "The Idea", desc: "FaceApp was born in a small apartment with a big vision — reimagine social media." },
    { year: "Mar 2024", title: "First Prototype", desc: "Built our MVP in 6 weeks. First 100 users signed up in the first 24 hours." },
    { year: "Jun 2024", title: "Seed Funding", desc: "Raised $1.2M seed round from top angels. Team grew to 8 people." },
    { year: "Oct 2024", title: "Public Beta", desc: "Opened to the public. 10,000 users joined in the first week." },
    { year: "Jan 2025", title: "Version 1.0", desc: "Official launch with full feature set. 50,000 active users and growing." },
  ];
  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-black text-white mb-10 text-center" style={{ fontFamily: "'Syne', sans-serif" }}>Our Journey</h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 to-blue-600 opacity-30" />
        <div className="flex flex-col gap-8">
          {events.map(({ year, title, desc }) => (
            <div key={year} className="flex gap-6 pl-2">
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center z-10 relative">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex-1 hover:border-cyan-500/30 transition-colors">
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">{year}</span>
                <h3 className="text-white font-bold mt-1 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. TEAM SECTION ───────────────────────────────────────────────────────────
function Team() {
  const members = [
    { name: "Malik Ahmad", role: "CEO & Founder", avatar: "MA", gradient: "from-cyan-500 to-blue-600" },
    { name: "Faizan Ali", role: "CTO & Co-Founder", avatar: "FA", gradient: "from-purple-500 to-pink-600" },
    { name: "Rehan Meoww", role: "Head of Design", avatar: "RM", gradient: "from-green-500 to-teal-600" },
    { name: "Ayesha Khan", role: "Lead Developer", avatar: "AK", gradient: "from-orange-500 to-red-600" },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-black text-white mb-2 text-center" style={{ fontFamily: "'Syne', sans-serif" }}>Meet the Team</h2>
      <p className="text-gray-500 text-center mb-10">The people behind FaceApp</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {members.map(({ name, role, avatar, gradient }) => (
          <div key={name} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-cyan-500/30 hover:-translate-y-1 transition-all">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-black text-xl mx-auto mb-4`}>
              {avatar}
            </div>
            <h3 className="text-white font-bold text-sm">{name}</h3>
            <p className="text-gray-500 text-xs mt-1">{role}</p>
            <div className="flex justify-center gap-2 mt-3">
              {["T", "G", "L"].map((s) => (
                <a key={s} href="#" className="w-7 h-7 bg-gray-800 hover:bg-cyan-500/20 hover:text-cyan-400 text-gray-500 rounded-lg flex items-center justify-center text-xs transition-all">{s}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 4. ACCORDION / FAQ ────────────────────────────────────────────────────────
function Accordion() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "What is FaceApp?", a: "FaceApp is a next-generation social media platform focused on privacy, performance, and meaningful connections between real people." },
    { q: "Is FaceApp free to use?", a: "Yes! FaceApp has a generous free tier. We also offer Pro and Enterprise plans for power users and businesses." },
    { q: "How do you handle my data?", a: "We take privacy seriously. Your data is encrypted end-to-end and we never sell personal information to third parties." },
    { q: "Can I delete my account?", a: "Absolutely. You can permanently delete your account and all associated data from your settings at any time." },
  ];
  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-black text-white mb-2 text-center" style={{ fontFamily: "'Syne', sans-serif" }}>Frequently Asked</h2>
      <p className="text-gray-500 text-center mb-10">Got questions? We've got answers.</p>
      <div className="flex flex-col gap-3">
        {faqs.map(({ q, a }, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
            >
              <span className="text-white font-medium text-sm">{q}</span>
              <svg className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ml-4 ${open === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === i && (
              <div className="px-6 pb-5">
                <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 5. STATS ──────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { value: "50K+", label: "Active Users", icon: "👥" },
    { value: "200K+", label: "Posts Shared", icon: "📝" },
    { value: "150+", label: "Countries", icon: "🌍" },
    { value: "4.9★", label: "User Rating", icon: "⭐" },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label, icon }) => (
            <div key={label}>
              <div className="text-3xl mb-2">{icon}</div>
              <div className="text-4xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{value}</div>
              <div className="text-gray-500 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <MainLayout>
      <AboutHero />
      <Stats />
      <Timeline />
      <Team />
      <Accordion />
    </MainLayout>
  );
}
